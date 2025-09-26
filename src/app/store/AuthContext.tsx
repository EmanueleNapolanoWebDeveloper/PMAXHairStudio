'use client'

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react"
import { createClient } from "@/src/utils/supabase/client"
import { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Profile } from "@/src/lib/types"

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  isLoggedIn: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const authTimeout = useRef<NodeJS.Timeout | null>(null)

  // Fetch profile memoizzato per evitare warning
  const fetchProfile = useCallback(async (currentUser: User) => {
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
  }, [supabase])

  // Aggiorna solo il context e DB
  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    if (!profile) return
    setProfile({ ...profile, ...data })

    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", profile.id)
      if (error) console.error("Errore updateProfile:", error)
    } catch (err) {
      console.error("Errore updateProfile:", err)
    }
  }, [profile, supabase])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    setLoading(true)
    await fetchProfile(user)
    setLoading(false)
  }, [user, fetchProfile])

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
      router.push("/")
      refreshProfile()
    } catch (err) {
      console.error("Errore logout:", err)
    }
  }, [router, supabase])

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
        if (authTimeout.current) clearTimeout(authTimeout.current)

        authTimeout.current = setTimeout(async () => {
          const { data: { user: currentUser } } = await supabase.auth.getUser()
          setUser(currentUser)
          setSession(session ?? null)

          switch (event) {
            case "INITIAL_SESSION":
              break
            case "SIGNED_IN":
              if (currentUser) {
                setLoading(true)
                await fetchProfile(currentUser)
                setLoading(false)
              }
              break
            case "USER_UPDATED":
              if (currentUser) {
                setLoading(true)
                await fetchProfile(currentUser)
                setLoading(false)
              }
              break
            case "PASSWORD_RECOVERY":
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
              break
          }
        }, 500)
      }
    )

    return () => {
      subscription?.subscription?.unsubscribe()
      if (authTimeout.current) clearTimeout(authTimeout.current)
    }
  }, [router, supabase, fetchProfile])

  const value: AuthContextType = {
    user,
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
