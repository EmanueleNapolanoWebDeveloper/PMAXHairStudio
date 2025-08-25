// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Pagine pubbliche che non richiedono login
const PUBLIC_PATHS = ['/login', '/register', '/auth/callback']

// Pagine admin (opzionale, esempio)
const ADMIN_PATHS = ['/admin']

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url)

  // Se è percorso pubblico, lascia passare
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Crea client server-side Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  // Prendi la sessione
  const { data: { session } } = await supabase.auth.getSession()

  // Se non loggato → redirect login
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Prendi profilo
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('reg_complete, role')
    .eq('id', session.user.id)
    .single()

  // Se errore o profilo non trovato → logout o redirect login
  if (error || !profile) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se registrazione incompleta → redirect complete-registration
  if (!profile.reg_complete && pathname !== '/complete-registration') {
    return NextResponse.redirect(new URL('/complete-registration', request.url))
  }

  // Controllo ruoli (opzionale)
  if (ADMIN_PATHS.some(path => pathname.startsWith(path)) && profile.role !== 'admin') {
    // Utente non admin cerca di accedere a pagina admin
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Tutto ok → lascia passare
  return NextResponse.next()
}
