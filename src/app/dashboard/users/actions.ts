'use server';

import prisma from '@/lib/db';
import { hashPassword, ensureAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';



export async function createUser(formData: FormData) {
  ensureAuth();
  const username = formData.get('username') as string;

  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!username || !name || !password || !role) {
    throw new Error('Preencha todos os campos.');
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        role: role.toUpperCase(),
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
    ensureAuth();
    await prisma.$transaction([

      // Delete user messages first to avoid constraint errors
      prisma.message.deleteMany({
        where: { senderId: id }
      }),
      // Then delete the user
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
  ensureAuth();
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
