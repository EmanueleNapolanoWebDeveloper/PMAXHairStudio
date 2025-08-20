'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"
import { User, Session } from "@supabase/supabase-js"
import { useRouter, usePathname } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
  session: Session | null
  profile: ProfileType | null
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>  // AGGIUNTA: funzione per aggiornare il profilo
  updateProfile: (profileData: Partial<ProfileType>) => void  // AGGIUNTA: per update diretto
}

export type ProfileType = {
  id: string
  name: string
  surname: string
  phone: string
  email: string
  auth_user_id: string
  role: string
  reg_complete: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Funzione per controllare il profilo utente
  const checkUserProfile = async (currentUser: User) => {
    try {
      // Prende i dati dalla tabella public_users
      const { data, error } = await supabase
        .from('public_users')
        .select('*')
        .eq('auth_user_id', currentUser.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profilo non esiste - primo accesso
        console.log('Profilo non trovato - primo accesso')
        setProfile(null)
        return false
      } else if (data) {
        // Profilo esiste - salva nel state
        setProfile(data)
        return true
      }
      
      return false
    } catch (error) {
      console.log('Errore controllo profilo:', error)
      setProfile(null)
      return false
    }
  }

  // AGGIUNTA: Funzione pubblica per aggiornare il profilo
  const refreshProfile = async () => {
    if (!user) {
      console.log('Nessun utente loggato per refresh profilo')
      return
    }

    try {
      const { data, error } = await supabase
        .from('public_users')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        console.log('Profilo non trovato durante refresh')
        setProfile(null)
      } else if (data) {
        console.log('Profilo aggiornato:', data)
        setProfile(data)
      }
    } catch (error) {
      console.error('Errore refresh profilo:', error)
    }
  }

  // AGGIUNTA: Funzione per update diretto del profilo (più veloce)
  const updateProfile = (profileData: Partial<ProfileType>) => {
    if (profile) {
      setProfile({
        ...profile,
        ...profileData
      })
    }
  }

  // Funzione per gestire i redirect
  const handleAuthRedirect = async (currentUser: User | null, event: string) => {
    // Pagine dove non fare redirect automatici
    const authPages = ['/login', '/register', '/complete-registration', '/auth/callback']
    const isOnAuthPage = authPages.some(page => pathname?.startsWith(page))

    // Se non è loggato
    if (!currentUser) {
      // Reset profile quando non loggato
      setProfile(null)
      // Solo reindirizza se non è già in una pagina di auth o homepage
      if (!isOnAuthPage && pathname === '/reservation') {
        router.push('/')
      }
      return
    }

    // Utente loggato - controlla se ha completato registrazione
    const hasCompleteReg = await checkUserProfile(currentUser)
    console.log(hasCompleteReg, pathname);
    

    // Primo accesso o registrazione non completata
    if (!hasCompleteReg && pathname !== '/complete-registration') {
      console.log('Reindirizzo a complete-registration')
      router.push('/complete-registration')
    }
    // Registrazione già completata ma si trova in complete-registration
    else if (hasCompleteReg && pathname === '/complete-registration') {
      console.log('Registrazione già completata, reindirizzo a homepage')
      router.push('/')
    }
    // Utente registrato che va in login o register
    else if (hasCompleteReg && (pathname === '/login' || pathname === '/register')) {
      console.log('Utente già loggato, reindirizzo a homepage')
      router.push('/')
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      // Prende la sessione corrente
      const { data } = await supabase.auth.getSession()
      const currentUser = data.session?.user ?? null
      
      setUser(currentUser)
      setSession(data.session ?? null)
      
      // Se c'è un utente, controlla il profilo
      if (currentUser) {
        await checkUserProfile(currentUser)
      }
      
      setLoading(false)
    }

    fetchSession()

    // Ascolta i cambiamenti di stato dell'autenticazione
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)

      const currentUser = session?.user ?? null
      setUser(currentUser)
      setSession(session ?? null)

      if (event === 'INITIAL_SESSION') {
        setLoading(false)
        if (currentUser) {
          await handleAuthRedirect(currentUser, event)
        }
      } else if (event === 'SIGNED_IN') {
        await handleAuthRedirect(currentUser, event)
      } else if (event === 'SIGNED_OUT') {
        setProfile(null)  // Reset profile al logout
        router.push('/')
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session ?? null)
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null)
        if (currentUser) {
          await checkUserProfile(currentUser)
        }
      }
    })

    // Cleanup della subscription
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)  // Reset profile
    } catch (error) {
      console.error('Errore durante logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      session, 
      profile, 
      signOut, 
      refreshProfile,  // AGGIUNTA
      updateProfile    // AGGIUNTA
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve essere usato dentro <AuthProvider>")
  }
  return context
}