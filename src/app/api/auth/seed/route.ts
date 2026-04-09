import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await prisma.user.findUnique({
      where: { username: 'admin_paisa' }
    });

    if (!admin) {
      const hashedPassword = await hashPassword('Paisa@2024!Secure#Admin#Industrial');
      await prisma.user.create({
        data: {
          username: 'admin_paisa',
          password: hashedPassword,
          name: 'Admin Paisa Master',
          role: 'ADMIN'
        }
      });
      return NextResponse.json({ message: 'Master Admin created (admin_paisa / Paisa@2024!Secure#Admin#Industrial)' });
    }

    return NextResponse.json({ message: 'Master Admin already exists' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
