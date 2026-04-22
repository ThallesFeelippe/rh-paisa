'use server';

import prisma from '@/lib/db';
import { hashPassword, ensureAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Role } from '@prisma/client';

export async function createUser(formData: FormData) {
  // Apenas ADMIN pode criar novos usuários
  ensureAuth(['ADMIN']);
  
  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const roleInput = formData.get('role') as string;

  if (!username || !name || !password || !roleInput) {
    throw new Error('Preencha todos os campos.');
  }

  // Validar se a Role é válida
  const role = roleInput.toUpperCase() as Role;
  if (!Object.values(Role).includes(role)) {
    throw new Error('Role inválida.');
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        role: role,
      },
    });

    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { success: false, message: 'Usuário já existe ou erro interno.' };
  }
}

export async function deleteUser(id: string) {
  try {
    // Apenas ADMIN pode excluir usuários
    ensureAuth(['ADMIN']);
    
    await prisma.$transaction([
      // Deletar mensagens primeiro para evitar erros de restrição
      prisma.message.deleteMany({
        where: { senderId: id }
      }),
      // Depois deletar o usuário
      prisma.user.delete({
        where: { id },
      })
    ]);
    
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error: any) {
    console.error('Delete error:', error);
    return { success: false, message: error.message || 'Erro ao excluir usuário.' };
  }
}

export async function getUsers() {
  ensureAuth(['ADMIN', 'GESTOR_RH']); // Apenas RH e Admin vêem lista de usuários
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    }
  });
}

export async function resetPassword(userId: string, newPassword: string) {
  ensureAuth(['ADMIN']);
  
  if (!newPassword || newPassword.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }

  const hashedPassword = await hashPassword(newPassword);
  
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, message: 'Erro ao resetar senha do usuário.' };
  }
}

