// Importa NextResponse per gestire le risposte HTTP in Next.js
import { NextResponse } from "next/server"

// Importa il client Supabase configurato per il server-side
import { createClient } from "@/src/utils/supabase/server"

// Funzione che gestisce le richieste GET alla route /auth/callback
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  // Parametri dalla query string
  const code = searchParams.get("code")
  let next = searchParams.get("next") ?? "/"

  // ✅ Sicurezza: accetta solo path relativi
  if (!next.startsWith("/")) {
    next = "/"
  }

  if (code) {
    const supabase = await createClient()

    // Scambia il codice OAuth con una sessione
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.session) {

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data?.user.id).single()

      if (!profile || !profile.reg_complete) {
        return NextResponse.redirect(`${origin}/complete-registration`)
      }

      // Recupera host forwarding (utile su Vercel/Netlify dietro proxy)
      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocalEnv = process.env.NODE_ENV === "development"
      

      // ✅ Se locale: usa origin
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      }

      // ✅ Se prod: consenti solo il tuo dominio
      if (!isLocalEnv && forwardedHost && forwardedHost.endsWith("pmaxhairstudio.it")) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }

      // ✅ redirect a complete registration
      return NextResponse.redirect(`${origin}${next}`)
    }

    // Log sicuro solo in dev
    if (process.env.NODE_ENV === "development") {
      console.error("OAuth Exchange Error:", error)
    }
  }

  // Se non c’è code o sessione → redirect a pagina di errore
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
