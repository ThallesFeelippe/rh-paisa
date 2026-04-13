import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET = process.env.AUTH_SECRET || 'paisa-industrial-secret-key-2024';

// Allowed origins for CORS and Server Actions
const ALLOWED_ORIGINS = [
  'https://rh-paisa.vercel.app', // Example production URL
  'http://localhost:3000',
  'http://localhost:3001',
];

// Add logic to check for GitHub Codespaces dynamic URLs
function isAllowedOrigin(origin: string | null) {
  if (!origin) return true; // Allow same-origin (no Origin header)
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.endsWith('.app.github.dev')) return true;
  return false;
}

// Use standard Web Crypto for Middleware compatibility
async function verifySignature(encoded: string, signature: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET);
  const data = encoder.encode(encoded);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigBuffer = new Uint8Array(
    signature.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );

  return await crypto.subtle.verify('HMAC', key, sigBuffer, data);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  // CORS check for API routes
  if (pathname.startsWith('/api')) {
    if (!isAllowedOrigin(origin)) {
      return NextResponse.json({ error: 'Origem não permitida (CORS)' }, { status: 403 });
    }
  }

  const sessionCookie = request.cookies.get('paisa_session');

  // Paths that are public even if they start with /api or /dashboard (e.g., login API)
  const isPublicPath = pathname === '/login' || pathname.startsWith('/api/auth') || pathname === '/api/upload/candidates'; // Adjust if needed

  if (pathname.startsWith('/dashboard') || (pathname.startsWith('/api') && !isPublicPath)) {
    if (!sessionCookie) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const [encoded, signature] = sessionCookie.value.split('.');
    if (!encoded || !signature) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const isValid = await verifySignature(encoded, signature);
    if (!isValid) {
      console.error('Session tampering detected in middleware!');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('paisa_session');
      return response;
    }
  }

  const response = NextResponse.next();

  // Add CORS headers to API responses
  if (pathname.startsWith('/api')) {
    if (origin && isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  return response;
}


export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};

