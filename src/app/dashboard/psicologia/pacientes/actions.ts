'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getPatientProfiles() {
  const session = getSession();
  if (!session || !['ADMIN', 'PSICOLOGA'].includes(session.role)) {
    throw new Error('Não autorizado');
  }

  return await prisma.patientProfile.findMany({
    include: {
      employee: {
        include: {
          sector: true,
          workLocation: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}

export async function getPatientProfile(id: string) {
  const session = getSession();
  if (!session || !['ADMIN', 'PSICOLOGA'].includes(session.role)) {
    throw new Error('Não autorizado');
  }

  return await prisma.patientProfile.findUnique({
    where: { id },
    include: {
      employee: {
        include: {
          sector: true,
          workLocation: true
        }
      },
      evolutions: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });
}

export async function savePatientProfile(data: any) {
  const session = getSession();
  if (!session || !['ADMIN', 'PSICOLOGA'].includes(session.role)) {
    return { success: false, error: 'Não autorizado' };
  }

  try {
    const { 
      employeeId, 
      preExistingConditions, 
      allergies, 
      medications, 
      mentalHealthHistory, 
      initialObservations,
      bfpTestStatus,
      paloTestStatus,
      stressScaleStatus,
      expectedStressLevel,
      psychologicalRequirements,
      status 
    } = data;

    const profile = await prisma.patientProfile.upsert({
      where: { employeeId },
      update: {
        preExistingConditions,
        allergies,
        medications,
        mentalHealthHistory: !!mentalHealthHistory,
        initialObservations,
        bfpTestStatus,
        paloTestStatus,
        stressScaleStatus,
        expectedStressLevel: parseInt(expectedStressLevel) || 1,
        psychologicalRequirements,
        status
      },
      create: {
        employeeId,
        preExistingConditions,
        allergies,
        medications,
        mentalHealthHistory: !!mentalHealthHistory,
        initialObservations,
        bfpTestStatus,
        paloTestStatus,
        stressScaleStatus,
        expectedStressLevel: parseInt(expectedStressLevel) || 1,
        psychologicalRequirements,
        status
      }
    });

    revalidatePath('/dashboard/psicologia/pacientes');
    return { success: true, data: profile };
  } catch (error: any) {
    console.error('Error saving patient profile:', error);
    return { success: false, error: error.message || 'Erro ao salvar perfil do paciente' };
  }
}

export async function addEvolution(profileId: string, content: string) {
  const session = getSession();
  if (!session || !['ADMIN', 'PSICOLOGA'].includes(session.role)) {
    return { success: false, error: 'Não autorizado' };
  }

  try {
    const evolution = await prisma.patientEvolution.create({
      data: {
        patientProfileId: profileId,
        content,
        authorId: session.userId,
        authorName: session.name || 'Psicóloga'
      }
    });

    revalidatePath(`/dashboard/psicologia/pacientes/${profileId}`);
    return { success: true, data: evolution };
  } catch (error: any) {
    console.error('Error adding evolution:', error);
    return { success: false, error: error.message || 'Erro ao adicionar evolução' };
  }
}

export async function getEmployeesForPatient() {
  const session = getSession();
  if (!session || !['ADMIN', 'PSICOLOGA'].includes(session.role)) {
    throw new Error('Não autorizado');
  }

  return await prisma.employee.findMany({
    where: {
      deletedAt: null
    },
    select: {
      id: true,
      name: true,
      registrationNumber: true,
      cpf: true,
      position: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

import fs from 'fs';
import path from 'path';

/**
 * Dedicated action for quick employee creation from Psychology module
 * Simplified to the absolute minimum for debugging persistence issues
 */
export async function createQuickEmployee(data: {
  name: string;
  cpf: string;
  registrationNumber?: string;
  position: string;
}) {
  const logPath = path.join(process.cwd(), 'persistence_log.txt');
  const timestamp = new Date().toISOString();
  
  try {
    fs.appendFileSync(logPath, `[${timestamp}] Attempting to create: ${data.name} (CPF: ${data.cpf})\n`);

    // Basic validation
    if (!data.name || !data.cpf) {
      fs.appendFileSync(logPath, `[${timestamp}] Validation failed: Name or CPF missing\n`);
      return { success: false, error: 'Nome e CPF são obrigatórios.' };
    }

    const employee = await prisma.employee.create({
      data: {
        name: data.name.trim().toUpperCase(),
        cpf: data.cpf.trim(),
        registrationNumber: data.registrationNumber?.trim() || null,
        position: data.position?.trim().toUpperCase() || 'FUNCIONÁRIO',
        startDate: new Date(),
        isApprentice: false,
        salary: 0
      }
    });

    fs.appendFileSync(logPath, `[${timestamp}] SUCCESS: Created ID ${employee.id}\n`);

    // BROAD REVALIDATION
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/rh/funcionarios');
    revalidatePath('/dashboard/psicologia/pacientes');
    revalidatePath('/dashboard/psicologia/pacientes/novo');
    
    return { success: true, data: employee };
  } catch (error: any) {
    fs.appendFileSync(logPath, `[${timestamp}] ERROR: ${error.message}\n`);
    console.error('CRITICAL ERROR in createQuickEmployee:', error);
    return { success: false, error: 'Erro no banco de dados: ' + (error.message || 'Erro desconhecido') };
  }
}
