import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SECRET = process.env.AUTH_SECRET || 'paisa-industrial-secret-key-2024';

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
 * Create a signed session cookie
 */
export function createSession(userId: string, role: string) {
  const sessionData = JSON.stringify({ userId, role, timestamp: Date.now() });
  const encoded = Buffer.from(sessionData).toString('base64');
  
  // Create signature to prevent tampering
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(encoded)
    .digest('hex');

  const cookieValue = `${encoded}.${signature}`;

  cookies().set('paisa_session', cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

/**
 * Get current session data and verify signature
 */
export function getSession() {
  const sessionCookie = cookies().get('paisa_session');
  if (!sessionCookie) return null;

  const [encoded, signature] = sessionCookie.value.split('.');
  
  if (!encoded || !signature) return null;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(encoded)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Session tampering detected!');
    return null;
  }

  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'));
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
