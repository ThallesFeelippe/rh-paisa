import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

/**
 * Endpoint for user login
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ message: 'E-mail e senha são obrigatórios.', success: false }, { status: 400 });
    }

    // Find the user by username (matching the login form's "email")
    const user = await prisma.user.findUnique({
      where: { username: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Credenciais inválidas.', success: false }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: 'Credenciais inválidas.', success: false }, { status: 401 });
    }

    // Start session
    createSession(user.id, user.role);

    return NextResponse.json({ 
      message: 'Login realizado com sucesso!', 
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        username: user.username
      },
      success: true 
    });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.', success: false }, { status: 500 });
  }
}
