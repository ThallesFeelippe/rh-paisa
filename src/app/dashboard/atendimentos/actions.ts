'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getConsultations() {
  try {
    // Ordenar por data: os mais próximos primeiro
    const consultations = await prisma.consultation.findMany({
      orderBy: { date: 'asc' },
    });
    return consultations;
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return [];
  }
}

export async function createConsultation(data: any) {
  const session = getSession();
  if (!session) return { success: false, error: 'Não autorizado' };

  try {
    const consultation = await prisma.consultation.create({
      data: {
        employeeName: data.employeeName,
        employeeRegistration: data.employeeRegistration,
        employeeRole: data.employeeRole,
        type: data.type,
        category: data.category,
        status: data.status || 'AGENDADO',
        date: new Date(data.date),
        observation: data.observation,
      },
    });
    revalidatePath('/dashboard/atendimentos');
    return { success: true, data: consultation };
  } catch (error) {
    console.error('Error creating consultation:', error);
    return { success: false, error: 'Erro ao criar atendimento' };
  }
}

export async function updateConsultation(id: string, data: any) {
  const session = getSession();
  if (!session) return { success: false, error: 'Não autorizado' };

  try {
    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        employeeName: data.employeeName,
        employeeRegistration: data.employeeRegistration,
        employeeRole: data.employeeRole,
        type: data.type,
        category: data.category,
        status: data.status,
        date: new Date(data.date),
        observation: data.observation,
      },
    });
    revalidatePath('/dashboard/atendimentos');
    return { success: true, data: consultation };
  } catch (error) {
    console.error('Error updating consultation:', error);
    return { success: false, error: 'Erro ao atualizar atendimento' };
  }
}

export async function deleteConsultation(id: string) {
  const session = getSession();
  if (!session) return { success: false, error: 'Não autorizado' };

  try {
    await prisma.consultation.delete({
      where: { id },
    });
    revalidatePath('/dashboard/atendimentos');
    return { success: true };
  } catch (error) {
    console.error('Error deleting consultation:', error);
    return { success: false, error: 'Erro ao excluir atendimento' };
  }
}

export async function resetMonthlyConsultations() {
  const session = getSession();
  if (!session) return { success: false, error: 'Não autorizado' };

  try {
    await prisma.consultation.deleteMany({});
    revalidatePath('/dashboard/atendimentos');
    return { success: true };
  } catch (error) {
    console.error('Error resetting consultations:', error);
    return { success: false, error: 'Erro ao zerar banco de dados' };
  }
}

export async function seedConsultations() {
  try {
    const count = await prisma.consultation.count();
    if (count === 0) {
      await prisma.consultation.createMany({
        data: [
          {
            employeeName: 'Ricardo Silva',
            employeeRegistration: '254585',
            employeeRole: 'Operador de Moagem • Setor A',
            type: 'INDIVIDUAL',
            category: 'PSICOLOGIA',
            status: 'REALIZADO',
            date: new Date('2026-04-21T09:30:00'),
            observation: 'Atendimento de rotina.',
          },
          {
            employeeName: 'Ana Maria Oliveira',
            employeeRegistration: '252426',
            employeeRole: 'Administrativo • RH',
            type: 'GRUPO',
            category: 'RH',
            status: 'AGENDADO',
            date: new Date('2026-04-18T14:00:00'),
            observation: 'Integração de novos colaboradores.',
          },
        ],
      });
      revalidatePath('/dashboard/atendimentos');
    }
  } catch (error) {
    console.error('Error seeding consultations:', error);
  }
}
