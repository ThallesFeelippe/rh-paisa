'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

import fs from 'fs/promises';
import path from 'path';

export async function submitApplication(formData: FormData) {
  const name = formData.get('name') as string;
  const age = parseInt(formData.get('age') as string);
  const cpf = formData.get('cpf') as string;
  const education = formData.get('education') as string;
  const maritalStatus = formData.get('maritalStatus') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const motivation = formData.get('motivation') as string;
  const jobId = formData.get('jobId') as string;
  
  const photoFile = formData.get('photoFile') as File;
  const resumeFile = formData.get('resumeFile') as File;

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
      const resumeName = `${Date.now()}-${resumeFile.name.replace(/\s+/g, '_')}`;
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
      await fs.writeFile(path.join(resumesDir, resumeName), resumeBuffer);
      resumeUrl = `/uploads/resumes/${resumeName}`;
    }

    // Save Photo
    if (photoFile && photoFile.size > 0) {
      const photoName = `${Date.now()}-${photoFile.name.replace(/\s+/g, '_')}`;
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
        jobId: jobId === 'general' ? null : jobId,
        photoUrl,
        resumeUrl,
      },
    });

    revalidatePath('/dashboard/candidatos');
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar candidatura:', error);
    return { success: false, message: 'Erro ao processar sua inscrição. Verifique os arquivos.' };
  }
}

export async function getApplications() {
  return await prisma.application.findMany({
    include: {
      job: true
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteApplication(id: string) {
  try {
    await prisma.application.delete({
      where: { id },
    });
    revalidatePath('/dashboard/candidatos');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
