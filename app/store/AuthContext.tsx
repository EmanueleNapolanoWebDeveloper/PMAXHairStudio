'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"
import { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
  session: Session | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)



export function AuthProvider({ children }: { children: ReactNode }) {

  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setSession(data.session ?? null)
      setLoading(false)
    }

    fetchSession()

    // Registriamo l'ascoltatore degli eventi auth
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, session)

      if (event === 'INITIAL_SESSION') {
        setUser(session?.user ?? null)
        setSession(session ?? null)
        setLoading(false)
        router.push('/')
      } else if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        setSession(session ?? null)
        router.push('/')
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setSession(null)
                router.push('/')
      } else if (event === 'PASSWORD_RECOVERY') {
        // Qui puoi mostrare UI per reset password
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session ?? null)
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null)
      }
    })

    // Pulizia della subscription al dismount
    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, session, signOut }}>
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
