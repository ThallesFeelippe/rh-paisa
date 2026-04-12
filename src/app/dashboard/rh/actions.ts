'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- WORK LOCATIONS ---

export async function getWorkLocations() {
  try {
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
    await prisma.workLocation.delete({ where: { id } });
    revalidatePath('/dashboard/rh/unidades');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: 'Não é possível excluir unidades que possuem funcionários vinculados.' };
  }
}

export async function updateWorkLocation(id: string, data: { name?: string, category?: string, parentId?: string | null }) {
  try {
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
    await prisma.employee.delete({ where: { id } });
    revalidatePath('/dashboard/rh/aprendizes');
    revalidatePath('/dashboard/rh/funcionarios');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
