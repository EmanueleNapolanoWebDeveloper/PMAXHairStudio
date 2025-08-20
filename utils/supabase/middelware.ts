import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  const pathname = request.nextUrl.pathname

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        },
      },
    }
  )

  // Prendi la sessione corrente
  const { data: { session } } = await supabase.auth.getSession()

  // Se c'è utente loggato
  if (session?.user) {
    // Controlla reg_complete dalla tabella public_users
    const { data: profile, error } = await supabase
      .from('public_users')
      .select('reg_complete')
      .eq('auth_user_id', session.user.id)
      .single()

    if (!error && profile && !profile.reg_complete && pathname !== '/complete-registration') {
      return NextResponse.redirect(new URL('/complete-registration', request.url))
    }
  }

  return NextResponse.next()
}
