import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (!admin) {
      const hashedPassword = await hashPassword('admin123');
      await prisma.user.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          name: 'Administrador',
          role: 'ADMIN'
        }
      });
      return NextResponse.json({ message: 'User admin created (admin/admin123)' });
    }

    return NextResponse.json({ message: 'User admin already exists' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
