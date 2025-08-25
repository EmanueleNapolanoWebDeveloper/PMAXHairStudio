'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"
import { User, Session } from "@supabase/supabase-js"
import { useRouter, usePathname } from "next/navigation"

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
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<ProfileType>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)

  /** Recupera il profilo dal DB e aggiorna lo state */
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

  /** Aggiorna solo il context senza toccare DB */
  const updateProfile = (data: Partial<ProfileType>) => {
    if (!profile) return
    setProfile({ ...profile, ...data })
  }

  /** Aggiorna il profilo dal DB */
  const refreshProfile = async () => {
    if (!user) return
    await fetchProfile(user)
  }

  /** Logout centralizzato */
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

  /** Gestisce redirect automatici */
  const handleRedirect = async (currentUser: User | null) => {
    const authPages = ["/login", "/register", "/complete-registration", "/auth/callback"]
    const isAuthPage = authPages.some(page => pathname?.startsWith(page))

    if (!currentUser) {
      setProfile(null)
      if (!isAuthPage && pathname !== "/") router.push("/")
      return
    }

    const prof = await fetchProfile(currentUser)

    if (!prof?.reg_complete && pathname !== "/complete-registration") {
      router.push("/complete-registration")
    } else if (prof?.reg_complete && pathname === "/complete-registration") {
      router.push("/")
    } else if (prof?.reg_complete && (pathname === "/login" || pathname === "/register")) {
      router.push("/")
    }
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const currentUser = data.session?.user ?? null
      setUser(currentUser)
      setSession(data.session ?? null)

      if (currentUser) await handleRedirect(currentUser)
      setLoading(false)
    }

    init()

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setSession(session ?? null)

      if (event === "SIGNED_OUT") setProfile(null)
      if (currentUser) await handleRedirect(currentUser)
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signOut,
      refreshProfile,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve essere usato dentro <AuthProvider>")
  return context
}
