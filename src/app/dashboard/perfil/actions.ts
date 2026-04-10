'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';
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

  if (!name) {
    return { success: false, error: 'O nome é obrigatório.' };
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        name,
        ...(avatarUrl && { avatarUrl })
      }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    return { success: false, error: 'Erro ao salvar alterações no banco de dados.' };
  }
}
