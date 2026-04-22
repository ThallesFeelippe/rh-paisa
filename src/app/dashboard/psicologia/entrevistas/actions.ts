'use server';

import prisma from '@/lib/db';
import { ensureAuth, getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getInterviews() {
  ensureAuth(['ADMIN', 'PSICOLOGA']);
  
  return await prisma.psychologicalInterview.findMany({
    orderBy: { date: 'desc' },
    include: {
      employee: {
        select: {
          name: true,
          registrationNumber: true
        }
      }
    }
  });
}

export async function createInterview(formData: FormData) {
  const session = getSession();
  if (!session) throw new Error('Não autorizado');
  ensureAuth(['ADMIN', 'PSICOLOGA']);

  const employeeName = formData.get('employeeName') as string;
  const employeeId = formData.get('employeeId') as string;
  const type = formData.get('type') as string;
  const category = formData.get('category') as string;
  const dateStr = formData.get('date') as string;
  const content = formData.get('content') as string;
  const conclusion = formData.get('conclusion') as string;
  const status = formData.get('status') as string;

  if (!employeeName || !type || !category || !content) {
    throw new Error('Preencha os campos obrigatórios.');
  }

  try {
    await prisma.psychologicalInterview.create({
      data: {
        employeeName,
        employeeId: employeeId || null,
        type,
        category,
        date: dateStr ? new Date(dateStr) : new Date(),
        content,
        conclusion,
        status: status || 'ABERTO',
        authorId: session.userId,
      }
    });

    revalidatePath('/dashboard/psicologia/entrevistas');
    return { success: true };
  } catch (error: any) {
    console.error('Create Interview Error:', error);
    return { success: false, message: error.message || 'Erro ao criar entrevista.' };
  }
}

export async function deleteInterview(id: string) {
  ensureAuth(['ADMIN', 'PSICOLOGA']);

  try {
    await prisma.psychologicalInterview.delete({
      where: { id }
    });

    revalidatePath('/dashboard/psicologia/entrevistas');
    return { success: true };
  } catch (error: any) {
    console.error('Delete Interview Error:', error);
    return { success: false, message: 'Erro ao excluir entrevista.' };
  }
}

export async function getEmployees() {
  ensureAuth(['ADMIN', 'PSICOLOGA']);
  return await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      registrationNumber: true
    },
    orderBy: { name: 'asc' }
  });
}
