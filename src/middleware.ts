import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('paisa_session');
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // In a real app, we would verify the session content/JWT here
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
