'use server';

import prisma from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { revalidatePath } from 'next/cache';
import { ensureAuth } from '@/lib/auth';
import { validateFile, sanitizeFilename, ALLOWED_DOC_TYPES } from '@/lib/upload';


export async function getSustainabilitySettings() {
  try {
    ensureAuth();
    const reportUrl = await prisma.setting.findUnique({

      where: { key: 'sustainability_report_url' }
    });
    
    return {
      reportUrl: reportUrl?.value || ''
    };
  } catch (error) {
    console.error('Error fetching sustainability settings:', error);
    return { reportUrl: '' };
  }
}

export async function uploadSustainabilityReport(formData: FormData) {
  try {
    ensureAuth(['ADMIN', 'SECRETARIA', 'GESTOR_RH']);
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'Arquivo não encontrado.' };
    }

    validateFile(file, ALLOWED_DOC_TYPES);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'reports');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Standard name or dynamic based on date
    const filename = sanitizeFilename(file.name);
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    const publicPath = `/uploads/reports/${filename}`;


    // Update the database setting
    await prisma.setting.upsert({
      where: { key: 'sustainability_report_url' },
      update: { value: publicPath },
      create: { 
        key: 'sustainability_report_url',
        value: publicPath 
      }
    });

    revalidatePath('/meio-ambiente');
    revalidatePath('/dashboard/sustentabilidade');

    return { success: true, url: publicPath };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}
