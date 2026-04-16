'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ensureAuth } from '@/lib/auth';

// --- WORK LOCATIONS ---



export async function getWorkLocations() {
  try {
    ensureAuth();
    return await prisma.workLocation.findMany({

      include: {
        children: {
          include: {
            employees: {
              select: { id: true, name: true, position: true }
            }
          }
        },
        employees: {
          select: { id: true, name: true, position: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('getWorkLocations error:', error);
    return [];
  }
}

export async function createWorkLocation(name: string, category?: string, parentId?: string) {
  try {
    ensureAuth();
    const location = await prisma.workLocation.create({

      data: { 
        name,
        category,
        parentId: parentId || null
      }
    });
    revalidatePath('/dashboard/rh/unidades');
    return { success: true, location };
  } catch (error: any) {
    return { success: false, error: 'Erro ao criar unidade/área: ' + error.message };
  }
}

export async function deleteWorkLocation(id: string) {
  try {
    ensureAuth();
    await prisma.workLocation.delete({ where: { id } });

    revalidatePath('/dashboard/rh/unidades');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: 'Não é possível excluir unidades que possuem funcionários vinculados.' };
  }
}

export async function updateWorkLocation(id: string, data: { name?: string, category?: string, parentId?: string | null }) {
  try {
    ensureAuth();
    const location = await prisma.workLocation.update({

      where: { id },
      data: {
        ...data,
        parentId: data.parentId === "" ? null : data.parentId
      }
    });
    revalidatePath('/dashboard/rh/unidades');
    return { success: true, location };
  } catch (error: any) {
    return { success: false, error: 'Erro ao atualizar: ' + error.message };
  }
}

// --- SECTORS ---

export async function getSectors() {
  try {
    return await prisma.sector.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('getSectors error:', error);
    return [];
  }
}

export async function createSector(name: string) {
  try {
    const sector = await prisma.sector.create({
      data: { name }
    });
    return { success: true, sector };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- EMPLOYEES & APPRENTICES ---

export async function getEmployees(isApprentice?: boolean) {
  try {
    return await prisma.employee.findMany({
      where: isApprentice !== undefined ? { isApprentice } : {},
      include: {
        sector: true,
        workLocation: true,
        documents: true,
        courses: true,
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('getEmployees error:', error);
    return [];
  }
}

export async function getEmployee(id: string) {
  try {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        sector: true,
        workLocation: true,
        documents: true,
        courses: true,
      }
    });
  } catch (error) {
    console.error('getEmployee error:', error);
    return null;
  }
}

export async function createEmployee(data: any) {
  try {
    ensureAuth();
    const { 
      documents, 
      courses, 
      sectorId, 
      workLocationId, 
      birthDate, 
      startDate, 
      contractEnd,
      salary,
      ...simpleFields 
    } = data;

    // Clean up workLocationId - ensuring it's not an empty string
    const finalLocationId = (workLocationId && workLocationId !== "") ? workLocationId : null;

    const employee = await prisma.employee.create({

      data: {
        ...simpleFields,
        salary: Number(salary) || 0,
        birthDate: birthDate ? new Date(birthDate) : null,
        startDate: startDate ? new Date(startDate) : new Date(),
        contractEnd: contractEnd ? new Date(contractEnd) : null,
        // Using direct ID linkage for workLocationId if sectorId is not provided
        workLocation: finalLocationId ? { connect: { id: finalLocationId } } : undefined,
        documents: {
          create: documents?.map((doc: any) => ({
            name: doc.name,
            url: doc.url
          })) || []
        },
        courses: {
          create: courses?.map((course: any) => ({
            name: course.name,
            institution: course.institution,
            completionDate: course.completionDate ? new Date(course.completionDate) : null,
            certificateUrl: course.certificateUrl
          })) || []
        }
      }
    });

    revalidatePath('/dashboard/rh/aprendizes');
    revalidatePath('/dashboard/rh/funcionarios');
    revalidatePath('/dashboard/rh/unidades');
    return { success: true, employee };
  } catch (error: any) {
    console.error('createEmployee error:', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'campo';
      const friendlyField = field === 'registrationNumber' ? 'MATRÍCULA' : field.toUpperCase();
      return { success: false, error: `Já existe um colaborador cadastrado com este ${friendlyField}.` };
    }
    return { success: false, error: 'Erro técnico ao salvar: ' + error.message };
  }
}

export async function updateEmployee(id: string, data: any) {
  try {
    ensureAuth();
    const { 
      documents, 
      courses, 
      sectorId, 
      workLocationId, 
      birthDate, 
      startDate, 
      contractEnd,
      ...simpleFields 
    } = data;

    await prisma.employee.update({

      where: { id },
      data: {
        ...simpleFields,
        birthDate: birthDate ? new Date(birthDate) : null,
        startDate: startDate ? new Date(startDate) : undefined,
        contractEnd: contractEnd ? new Date(contractEnd) : null,
        sector: sectorId ? { connect: { id: sectorId } } : undefined,
        workLocation: workLocationId ? { connect: { id: workLocationId } } : { disconnect: true },
      }
    });

    if (documents) {
      await prisma.employeeDocument.deleteMany({ where: { employeeId: id } });
      await prisma.employeeDocument.createMany({
        data: documents.map((doc: any) => ({
          name: doc.name,
          url: doc.url,
          employeeId: id
        }))
      });
    }

    if (courses) {
      await prisma.course.deleteMany({ where: { employeeId: id } });
      await prisma.course.createMany({
        data: courses.map((course: any) => ({
          name: course.name,
          institution: course.institution,
          completionDate: course.completionDate ? new Date(course.completionDate) : null,
          certificateUrl: course.certificateUrl,
          employeeId: id
        }))
      });
    }

    revalidatePath('/dashboard/rh/aprendizes');
    revalidatePath('/dashboard/rh/funcionarios');
    revalidatePath('/dashboard/rh/unidades');
    return { success: true };
  } catch (error: any) {
    console.error('updateEmployee error:', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'campo';
      const friendlyField = field === 'registrationNumber' ? 'MATRÍCULA' : field.toUpperCase();
      return { success: false, error: `Já existe outro colaborador com este ${friendlyField}.` };
    }
    return { success: false, error: 'Erro ao atualizar: ' + error.message };
  }
}

export async function deleteEmployee(id: string) {
  try {
    ensureAuth();
    await prisma.employee.delete({ where: { id } });

    revalidatePath('/dashboard/rh/aprendizes');
    revalidatePath('/dashboard/rh/funcionarios');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- LEAVE MANAGEMENT ---

export async function getLeaveTypes() {
  try {
    return await prisma.leaveType.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('getLeaveTypes error:', error);
    return [];
  }
}

export async function createLeaveType(name: string) {
  try {
    ensureAuth();
    const type = await prisma.leaveType.create({
      data: { name }
    });
    return { success: true, type };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLeaves() {
  try {
    return await prisma.leave.findMany({
      include: {
        employee: {
          include: {
            sector: true,
            workLocation: true
          }
        },
        leaveType: true
      },
      orderBy: { startDate: 'desc' }
    });
  } catch (error) {
    console.error('getLeaves error:', error);
    return [];
  }
}

export async function createLeave(data: any) {
  try {
    ensureAuth();
    const { employeeId, leaveTypeId, startDate, expectedReturn, observation, documentUrl } = data;
    
    const leave = await prisma.leave.create({
      data: {
        employeeId,
        leaveTypeId,
        startDate: new Date(startDate),
        expectedReturn: expectedReturn ? new Date(expectedReturn) : null,
        observation,
        documentUrl,
        status: 'ATIVO'
      }
    });

    revalidatePath('/dashboard/rh/afastados');
    return { success: true, leave };
  } catch (error: any) {
    console.error('createLeave error:', error);
    return { success: false, error: 'Erro ao salvar afastamento: ' + error.message };
  }
}

export async function updateLeave(id: string, data: any) {
  try {
    ensureAuth();
    const { leaveTypeId, startDate, expectedReturn, observation, documentUrl, status } = data;
    
    const leave = await prisma.leave.update({
      where: { id },
      data: {
        leaveTypeId,
        startDate: new Date(startDate),
        expectedReturn: expectedReturn ? new Date(expectedReturn) : null,
        observation,
        documentUrl,
        status: status || 'ATIVO'
      }
    });

    revalidatePath('/dashboard/rh/afastados');
    return { success: true, leave };
  } catch (error: any) {
    console.error('updateLeave error:', error);
    return { success: false, error: 'Erro ao atualizar: ' + error.message };
  }
}

export async function seedAfastados() {
  try {
    // Check if we have employees
    const employees = await prisma.employee.findMany({ take: 3 });
    if (employees.length < 3) return { success: false, error: 'Cadastre pelo menos 3 funcionários primeiro.' };

    // Check if we have leave types
    let types = await prisma.leaveType.findMany();
    if (types.length === 0) {
      await prisma.leaveType.createMany({
        data: [
          { name: 'INSS (Auxílio Doença - B31)' },
          { name: 'INSS (Acidente de Trabalho - B91)' },
          { name: 'Licença Maternidade' },
          { name: 'Licença Médica (< 15 dias)' },
          { name: 'Afastamento Administrativo' },
        ]
      });
      types = await prisma.leaveType.findMany();
    }

    // Create 3 leaves
    const leaveData = [
      {
        employeeId: employees[0].id,
        leaveTypeId: types[0].id,
        startDate: new Date('2024-05-12'),
        expectedReturn: new Date('2024-09-15'),
        observation: 'Afastamento padrão INSS',
        status: 'ATIVO'
      },
      {
        employeeId: employees[1].id,
        leaveTypeId: types[2].id,
        startDate: new Date('2024-06-01'),
        expectedReturn: new Date('2024-10-05'),
        observation: 'Licença maternidade confirmada',
        status: 'ATIVO'
      },
      {
        employeeId: employees[2].id,
        leaveTypeId: types[3].id,
        startDate: new Date('2024-07-20'),
        expectedReturn: new Date('2024-07-28'),
        observation: 'Atestado de 8 dias',
        status: 'ATIVO'
      }
    ];

    for (const data of leaveData) {
      const exists = await prisma.leave.findFirst({
        where: { employeeId: data.employeeId, startDate: data.startDate }
      });
      if (!exists) {
        await prisma.leave.create({ data });
      }
    }

    revalidatePath('/dashboard/rh/afastados');
    return { success: true };
  } catch (error: any) {
    console.error('seedAfastados error:', error);
    return { success: false, error: error.message };
  }
}
