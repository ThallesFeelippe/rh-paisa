import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

/**
 * Hashing a password for storage
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Comparing a password for login
 */
export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

/**
 * Create a simple session cookie (Simplified for this project)
 * In a real production app, we would use JWT or Iron-Session.
 */
export function createSession(userId: string, role: string) {
  const sessionData = JSON.stringify({ userId, role, timestamp: Date.now() });
  const encoded = Buffer.from(sessionData).toString('base64');
  cookies().set('paisa_session', encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

/**
 * Get current session data
 */
export function getSession() {
  const sessionCookie = cookies().get('paisa_session');
  if (!sessionCookie) return null;
  try {
    return JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
  } catch (e) {
    return null;
  }
}

/**
 * Clear session
 */
export function logout() {
  cookies().delete('paisa_session');
}
