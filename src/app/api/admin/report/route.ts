import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const reportSetting = await prisma.setting.findUnique({
      where: { key: 'transparency_report' }
    });

    return NextResponse.json({ 
      report: reportSetting ? JSON.parse(reportSetting.value) : null 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'reports');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Check for existing report to delete
    const existing = await prisma.setting.findUnique({
      where: { key: 'transparency_report' }
    });

    if (existing) {
      const oldData = JSON.parse(existing.value);
      const oldPath = join(process.cwd(), 'public', oldData.path);
      if (existsSync(oldPath)) {
        await unlink(oldPath);
      }
    }

    // Save new file
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    const relativePath = `/uploads/reports/${filename}`;
    const reportData = {
      name: file.name,
      path: relativePath,
      updatedAt: new Date().toISOString()
    };

    const updatedSetting = await prisma.setting.upsert({
      where: { key: 'transparency_report' },
      update: { value: JSON.stringify(reportData) },
      create: { key: 'transparency_report', value: JSON.stringify(reportData) }
    });

    return NextResponse.json({ 
      success: true, 
      report: reportData 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const existing = await prisma.setting.findUnique({
      where: { key: 'transparency_report' }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Nenhum relatório encontrado.' }, { status: 404 });
    }

    const reportData = JSON.parse(existing.value);
    const filePath = join(process.cwd(), 'public', reportData.path);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    await prisma.setting.delete({
      where: { key: 'transparency_report' }
    });

    return NextResponse.json({ success: true, message: 'Relatório excluído com sucesso.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
