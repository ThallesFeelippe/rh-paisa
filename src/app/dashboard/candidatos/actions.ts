'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ensureAuth } from '@/lib/auth';
import { validateFile, sanitizeFilename, ALLOWED_IMAGE_TYPES, ALLOWED_DOC_TYPES } from '@/lib/upload';

import fs from 'fs/promises';
import path from 'path';


export async function submitApplication(formData: FormData) {
  const name = formData.get('name') as string;
  const rawAge = formData.get('age') as string;
  const age = parseInt(rawAge) || 0; 

  // --- GERENCIAMENTO DE ERROS PRÉ-CANDIDATURA ---
  if (!name || name.length < 3) {
    return { success: false, message: 'O nome completo é obrigatório.' };
  }
  if (!cpf || cpf.length < 11) {
    return { success: false, message: 'O CPF informado é inválido.' };
  }
  if (!email || !email.includes('@')) {
    return { success: false, message: 'O e-mail informado é inválido.' };
  }
  if (age < 14) {
    return { success: false, message: 'A idade mínima para candidatura é 14 anos.' };
  }
  // ----------------------------------------------
  
  const cpf = formData.get('cpf') as string;
  const education = formData.get('education') as string;
  const maritalStatus = formData.get('maritalStatus') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const motivation = formData.get('motivation') as string;
  const jobId = formData.get('jobId') as string;
  
  const photoFile = formData.get('photoFile') as File | null;
  const resumeFile = formData.get('resumeFile') as File | null;

  let photoUrl = null;
  let resumeUrl = null;

  try {
    // Ensure upload directories exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const resumesDir = path.join(uploadsDir, 'resumes');
    const photosDir = path.join(uploadsDir, 'photos');
    
    await fs.mkdir(resumesDir, { recursive: true });
    await fs.mkdir(photosDir, { recursive: true });

    // Save Resume
    if (resumeFile && resumeFile.size > 0) {
      validateFile(resumeFile, ALLOWED_DOC_TYPES);
      const resumeName = sanitizeFilename(resumeFile.name);
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
      await fs.writeFile(path.join(resumesDir, resumeName), resumeBuffer);
      resumeUrl = `/uploads/resumes/${resumeName}`;
    }

    // Save Photo
    if (photoFile && photoFile.size > 0) {
      validateFile(photoFile, ALLOWED_IMAGE_TYPES);
      const photoName = sanitizeFilename(photoFile.name);
      const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
      await fs.writeFile(path.join(photosDir, photoName), photoBuffer);
      photoUrl = `/uploads/photos/${photoName}`;
    }


    await prisma.application.create({
      data: {
        name,
        age,
        cpf,
        education,
        maritalStatus,
        email,
        phone,
        address,
        motivation,
        jobId: (jobId === 'general' || !jobId) ? null : jobId,
        photoUrl,
        resumeUrl,
      },
    });

    revalidatePath('/dashboard/candidatos');
    return { success: true };
  } catch (error: any) {
    console.error('Erro detalhado ao processar candidatura:', error);
    return { 
      success: false, 
      message: `Erro no servidor: ${error.message || 'Verifique se os dados estão corretos.'}` 
    };
  }
}

export async function getApplications() {
  ensureAuth(['ADMIN', 'GESTOR_RH', 'PSICOLOGA']);
  return await prisma.application.findMany({

    include: {
      job: true
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteApplication(id: string) {
  try {
    ensureAuth(['ADMIN', 'GESTOR_RH']);
    await prisma.application.delete({

      where: { id },
    });
    revalidatePath('/dashboard/candidatos');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
