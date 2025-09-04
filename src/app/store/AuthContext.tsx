'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/src/utils/supabase/client"
import { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

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

type AuthContextType = {
  user: User | null
  session: Session | null
  profile: ProfileType | null
  loading: boolean
  isLoggedIn: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<ProfileType>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)

  // Recupera il profilo dal DB
  const fetchProfile = async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single()

      if (error && error.code !== "PGRST116") throw error
      setProfile(data ?? null)
      return data ?? null
    } catch (err) {
      console.error("Errore fetch profilo:", err)
      setProfile(null)
      return null
    }
  }

  // Aggiorna solo il context
  const updateProfile = async (data: Partial<ProfileType>) => {
    if (!profile) return
    setProfile({ ...profile, ...data })

    // Aggiorna anche il DB
    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", profile.id)
      if (error) console.error("Errore updateProfile:", error)
    } catch (err) {
      console.error("Errore updateProfile:", err)
    }
  }

  // Aggiorna il profilo dal DB
  const refreshProfile = async () => {
    if (!user) return
    setLoading(true)
    await fetchProfile(user)
    setLoading(false)
  }

  // Logout centralizzato
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
      router.push("/")
    } catch (err) {
      console.error("Errore logout:", err)
    }
  }

  // 🔥 SOLUZIONE SEMPLICE: Debounce per evitare chiamate multiple
  let authTimeout: NodeJS.Timeout | null = null

  // Inizializzazione e subscription auth
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) await fetchProfile(user)
      setLoading(false)
    }

    init()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔥 Auth event:', event) // Per debug
        
        // 🔥 Cancella il timeout precedente se esiste
        if (authTimeout) {
          clearTimeout(authTimeout)
        }

        // 🔥 Aspetta 500ms prima di processare l'evento
        authTimeout = setTimeout(async () => {
          const currentUser = session?.user ?? null
          setUser(currentUser)
          setSession(session ?? null)

          switch (event) {
            case "INITIAL_SESSION":
              // Non fare nulla, già gestito in init()
              break
              
            case "SIGNED_IN":
            case "USER_UPDATED":
              if (currentUser) {
                setLoading(true)
                await fetchProfile(currentUser)
                setLoading(false)
              }
              break

            case "SIGNED_OUT":
              setUser(null)
              setSession(null)
              setProfile(null)
              router.push("/")
              break

            case "TOKEN_REFRESHED":
              setUser(currentUser)
              break

            default:
              console.log("Evento non gestito:", event)
          }
        }, 500) // 🔥 500ms di delay
      }
    )

    return () => {
      subscription?.subscription?.unsubscribe()
      if (authTimeout) clearTimeout(authTimeout) // 🔥 Cleanup
    }
  }, [])

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    isLoggedIn: !!user,
    signOut,
    refreshProfile,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve essere usato dentro <AuthProvider>")
  return context
}