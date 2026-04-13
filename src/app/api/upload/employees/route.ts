import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getSession } from '@/lib/auth';
import { validateFile, sanitizeFilename, ALLOWED_IMAGE_TYPES, ALLOWED_DOC_TYPES } from '@/lib/upload';

export async function POST(request: Request) {
  try {
    // 1. Security Check: Session
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const type = formData.get('type') as string || 'generic'; // photo, document, certificate

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    // Determine allowed types based on category
    const allowedTypes = type === 'photo' ? ALLOWED_IMAGE_TYPES : [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES];

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'employees', type);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths: string[] = [];

    for (const file of files) {
      // 2. Security Check: File Validation
      validateFile(file, allowedTypes);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 3. Security: Sanitize Filename
      const filename = sanitizeFilename(file.name);
      const path = join(uploadDir, filename);
      
      await writeFile(path, buffer);
      savedPaths.push(`/uploads/employees/${type}/${filename}`);
    }

    return NextResponse.json({ 
      success: true, 
      paths: savedPaths 
    });

  } catch (error: any) {
    console.error('Employee upload error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno no servidor' }, { status: 400 });
  }
}

