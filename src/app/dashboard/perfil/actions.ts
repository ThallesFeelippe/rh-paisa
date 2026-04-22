'use server';

import prisma from '@/lib/db';
import { getSession, hashPassword, verifyPassword } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getCurrentUser() {
  const session = getSession();
  if (!session || !session.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        avatarUrl: true
      }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function updateProfile(formData: FormData) {
  const session = getSession();
  if (!session || !session.userId) {
    return { success: false, error: 'Sessão expirada. Faça login novamente.' };
  }

  const name = formData.get('name') as string;
  const avatarUrl = formData.get('avatarUrl') as string;
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!name) {
    return { success: false, error: 'O nome é obrigatório.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { password: true }
    });

    if (!user) {
      return { success: false, error: 'Usuário não encontrado.' };
    }

    const updateData: any = {
      name,
      ...(avatarUrl && { avatarUrl })
    };

    // Password change logic
    if (newPassword) {
      if (!currentPassword) {
        return { success: false, error: 'A senha atual é necessária para definir uma nova.' };
      }

      const isPasswordValid = await verifyPassword(currentPassword, user.password);
      if (!isPasswordValid) {
        return { success: false, error: 'Senha atual incorreta.' };
      }

      if (newPassword.length < 6) {
        return { success: false, error: 'A nova senha deve ter pelo menos 6 caracteres.' };
      }

      if (newPassword !== confirmPassword) {
        return { success: false, error: 'A nova senha e a confirmação não coincidem.' };
      }

      updateData.password = await hashPassword(newPassword);
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    return { success: false, error: 'Erro ao salvar alterações no banco de dados.' };
  }
}

