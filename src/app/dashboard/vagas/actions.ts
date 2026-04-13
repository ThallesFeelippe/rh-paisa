'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ensureAuth } from '@/lib/auth';


export async function createJob(formData: FormData) {
  ensureAuth(['ADMIN', 'GESTOR_RH']);
  const title = formData.get('title') as string;

  const area = formData.get('area') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const requirements = formData.get('requirements') as string;
  const benefits = formData.get('benefits') as string;
  const status = formData.get('status') as string || 'PUBLICO';

  // --- GERENCIAMENTO DE ERROS PRÉ-CRIAÇÃO ---
  if (!title || title.length < 5) {
    return { success: false, message: 'O título da vaga deve ter pelo menos 5 caracteres.' };
  }
  if (!area) {
    return { success: false, message: 'A área de atuação é obrigatória.' };
  }
  if (!description || description.length < 20) {
    return { success: false, message: 'A descrição da vaga está muito curta.' };
  }
  // ------------------------------------------

  try {
    await prisma.job.create({
      data: {
        title,
        area,
        location,
        type,
        description,
        requirements,
        benefits,
        status,
      },
    });

    revalidatePath('/dashboard/vagas');
    revalidatePath('/vagas');
    return { success: true };
  } catch (error: any) {
    console.error('Erro detalhado ao criar vaga:', error);
    return { 
      success: false, 
      message: error.message || 'Erro ao criar vaga no banco de dados.' 
    };
  }
}

export async function updateJobStatus(id: string, status: string) {
  try {
    ensureAuth(['ADMIN', 'GESTOR_RH']);
    await prisma.job.update({

      where: { id },
      data: { status },
    });
    revalidatePath('/dashboard/vagas');
    revalidatePath('/vagas');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteJob(id: string) {
  try {
    ensureAuth(['ADMIN', 'GESTOR_RH']);
    await prisma.job.delete({

      where: { id },
    });
    revalidatePath('/dashboard/vagas');
    revalidatePath('/vagas');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  });
}
