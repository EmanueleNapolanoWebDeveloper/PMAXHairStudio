import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {

  const publicPaths = ['/', '/services', '/login', '/about-us','/contatti'];

  const pathname = request.nextUrl.pathname

  if (publicPaths.some(path => pathname.startsWith(path))) {
    // per pagine pubbliche solo aggiorna la sessione senza fare redirect
    return await updateSession(request, { redirectOnNoSession: false })
  }


  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}