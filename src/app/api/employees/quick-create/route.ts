import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const logPath = path.join(process.cwd(), 'persistence_log.txt');
  const timestamp = new Date().toISOString();
  
  try {
    const data = await request.json();
    fs.appendFileSync(logPath, `[${timestamp}] API CALL: Attempting to create: ${data.name}\n`);
    
    if (!data.name || !data.cpf) {
      fs.appendFileSync(logPath, `[${timestamp}] API ERROR: Missing Name or CPF\n`);
      return NextResponse.json({ success: false, error: 'Nome e CPF são obrigatórios.' }, { status: 400 });
    }

    const employee = await prisma.employee.create({
      data: {
        name: String(data.name).trim().toUpperCase(),
        cpf: String(data.cpf).trim(),
        registrationNumber: data.registrationNumber ? String(data.registrationNumber).trim() : null,
        position: data.position ? String(data.position).trim().toUpperCase() : 'FUNCIONÁRIO',
        startDate: new Date(),
        isApprentice: false,
        salary: 0
      }
    });

    fs.appendFileSync(logPath, `[${timestamp}] API SUCCESS: Created ID ${employee.id}\n`);

    // BROAD REVALIDATION
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/rh/funcionarios');
    revalidatePath('/dashboard/psicologia/pacientes');
    revalidatePath('/dashboard/psicologia/pacientes/novo');
    
    return NextResponse.json({ success: true, data: employee });
  } catch (error: any) {
    fs.appendFileSync(logPath, `[${timestamp}] API CRITICAL ERROR: ${error.message}\n`);
    console.error('API ERROR in quick-create:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Já existe um funcionário com este CPF ou Matrícula.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
