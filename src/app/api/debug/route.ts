import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    return NextResponse.json({ 
      count: employees.length,
      employees: employees.map(e => ({
        id: e.id,
        name: e.name,
        cpf: e.cpf,
        createdAt: e.createdAt
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
