import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/shopping-cart', '/checkout', '/profile', '/orders'];
// Rutas que solo pueden ser visitadas por usuarios no autenticados
const guestRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 1. Verificar si la ruta es protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 2. Verificar si es una ruta de invitado (login/register) y ya tiene token
  const isGuestRoute = guestRoutes.some(route => pathname.startsWith(route));
  
  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se debe ejecutar el middleware
export const config = {
  matcher: [
    '/shopping-cart/:path*',
    '/checkout/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/auth/:path*',
  ],
};
