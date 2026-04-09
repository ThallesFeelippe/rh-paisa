import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const hashedPassword = await hashPassword('Paisa@2024!Secure#Admin#Industrial');
    
    await prisma.user.upsert({
      where: { username: 'admin_paisa' },
      update: {
        password: hashedPassword,
        name: 'Admin Paisa Master',
        role: 'ADMIN'
      },
      create: {
        username: 'admin_paisa',
        password: hashedPassword,
        name: 'Admin Paisa Master',
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ message: 'Master Admin synchronized (admin_paisa / Paisa@2024!Secure#Admin#Industrial)' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
