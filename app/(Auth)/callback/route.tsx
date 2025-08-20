// Importa NextResponse per gestire le risposte HTTP in Next.js
import { NextResponse } from 'next/server'

// Importa il client Supabase configurato per il server-side
import { createClient } from '@/utils/supabase/server'

// Funzione che gestisce le richieste GET alla route /auth/callback
export async function GET(request : Request) {

  console.log('Sono dentro la callback');
  
  // Estrae i parametri dalla URL (es: ?code=abc123&next=/dashboard) e il dominio base
  const { searchParams, origin } = new URL(request.url)

  // Cerca il parametro "code" - questo è il codice di autorizzazione temporaneo da Google
  const code = searchParams.get('code')
      console.log("CODE ricevuto:", code)


  // Cerca il parametro "next" per sapere dove reindirizzare dopo il login
  // Se non specificato, usa '/' (homepage) come default
  let next = searchParams.get('next') ?? '/'

  // CONTROLLO DI SICUREZZA: verifica che "next" sia un percorso relativo
  if (!next.startsWith('/')) {
    // Se "next" non inizia con '/', potrebbe essere un URL esterno malevolo
    // Lo ignora e usa '/' per sicurezza
    next = '/'
  }

  // Se abbiamo ricevuto un codice di autorizzazione
  if (code) {

    // Crea una connessione al database Supabase
    const supabase = await createClient()

    // PASSO CRUCIALE: scambia il codice temporaneo con una sessione di login vera
    // Questo conferma l'identità dell'utente e crea la sessione
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log("DATA:", data)
    console.log("ERROR:", error)

    // Se lo scambio è andato a buon fine (nessun errore)
    if (!error) {

      // Prende l'header X-Forwarded-Host per gestire i load balancer
      // Questo header contiene il dominio originale prima del proxy/load balancer
      const forwardedHost = request.headers.get('x-forwarded-host')

      // Controlla se siamo in ambiente di sviluppo locale
      const isLocalEnv = process.env.NODE_ENV === 'development'

      // Se siamo in sviluppo locale (localhost)
      if (isLocalEnv) {
        // Non c'è load balancer, usa l'origin normale
        // Es: http://localhost:3000/dashboard
        return NextResponse.redirect(`${origin}${next}`)
      }
      // Se siamo in produzione E abbiamo il forwarded host
      else if (forwardedHost) {
        // Usa il dominio originale (prima del load balancer)
        // Es: https://miosito.com/dashboard invece di https://proxy123.vercel.app/dashboard
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }
      // Fallback: se non abbiamo forwarded host, usa l'origin
      else {
        // Es: https://miosito.com/dashboard
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
    // Se c'è stato un errore nello scambio codice-sessione, continua al redirect di errore
  }

  // Se arriviamo qui significa che:
  // - Non abbiamo ricevuto un codice, OPPURE
  // - C'è stato un errore nello scambio codice-sessione
  // Reindirizza l'utente a una pagina di errore con istruzioni
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}