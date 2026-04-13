import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getSession } from '@/lib/auth';
import { validateFile, sanitizeFilename, ALLOWED_IMAGE_TYPES } from '@/lib/upload';

export async function POST(request: Request) {
  try {
    // 1. Security Check: Session
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'news');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths: string[] = [];

    for (const file of files) {
      // 2. Security Check: File Validation
      validateFile(file, ALLOWED_IMAGE_TYPES);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 3. Security: Sanitize Filename
      const filename = sanitizeFilename(file.name);
      const path = join(uploadDir, filename);
      
      await writeFile(path, buffer);
      savedPaths.push(`/uploads/news/${filename}`);
    }

    return NextResponse.json({ 
      success: true, 
      paths: savedPaths 
    });

  } catch (error: any) {
    console.error('News upload error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno no servidor' }, { status: 400 });
  }
}

