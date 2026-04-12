import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const type = formData.get('type') as string || 'generic'; // photo, document, certificate

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'employees', type);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const extension = file.name.split('.').pop();
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
