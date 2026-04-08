import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const path = join(uploadDir, filename);
      await writeFile(path, buffer);
      savedPaths.push(`/uploads/projects/${filename}`);
    }

    return NextResponse.json({ 
      success: true, 
      paths: savedPaths 
    });

  } catch (error: any) {
    console.error('Projects upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
