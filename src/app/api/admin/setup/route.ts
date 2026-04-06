import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

/**
 * Endpoint for initial Admin user setup
 * VISITOR ACTION: Visit http://localhost:3000/api/admin/setup once.
 */
export async function GET() {
  const username = 'admin_paisa';
  const password = 'Paisa@2024!Secure#Admin#Industrial'; // Strong global password
  
  try {
    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'O administrador já foi criado anteriormente.', 
        success: false 
      }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    
    // Create the first Admin
    const admin = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: 'Administrador SugarLink',
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ 
      message: 'Administrador criado com sucesso!', 
      credentials: { username, password },
      success: true 
    });

  } catch (error: any) {
    console.error('Setup Error:', error);
    return NextResponse.json({ 
      message: 'Erro ao criar administrador.', 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
}
