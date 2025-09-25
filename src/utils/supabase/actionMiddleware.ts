import { createClient } from '@/src/utils/supabase/server'
import { UserIdentity } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

type identidyProps = {
  identity: UserIdentity
}

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = await createClient()


  const {
    data: { user },
  } = await supabase.auth.getUser()


  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()



  if (request.nextUrl.pathname.startsWith('/reset-password')) {

    const { data: identitiesData, error: errorIdentities } = await supabase.auth.getUserIdentities()
    const googleIdentity = identitiesData?.identities?.find(i => i.provider === 'google')

    const code = request.nextUrl.searchParams.get('code')

    if (!code) {
      const url = request.nextUrl.clone()
      url.pathname = '/login' // nessun code, non autorizzato
      return NextResponse.redirect(url)
    }

    if (googleIdentity) {
      const url = request.nextUrl.clone()
      url.pathname = `/`
      return NextResponse.redirect(url)
    }

    const url = request.nextUrl.clone()
    url.pathname = '/login' // nessun code, non autorizzato
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith('/forgot-password')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if ((user && profile) && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if ((!user && !profile) && request.nextUrl.pathname.startsWith('/complete-registration')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if ((user && !profile) && !request.nextUrl.pathname.startsWith('/complete-registration')) {
    const url = request.nextUrl.clone()
    url.pathname = '/complete-registration'
    return NextResponse.redirect(url)
  }

  if (!user && request.nextUrl.pathname.startsWith('/complete-registration')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)

  }

  if (request.nextUrl.pathname.startsWith('/area-personale') && !profile) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith('/area-personale') && (profile.role === 'employee' || profile.role === 'admin')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith('/admin-dash') && (!profile || profile.role !== 'admin')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith('/staff-dash') && (!profile || profile.role !== 'employee')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (profile && !profile.reg_complete) {
    const url = request.nextUrl.clone()
    url.pathname = '/complete-registration'
    return NextResponse.redirect(url)
  }

  if (profile && profile.reg_complete && request.nextUrl.pathname.startsWith('/complete-registration')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }





  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}