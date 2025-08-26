'use client'

import Link from "next/link"
import FlipText from "@/components/UI/FlipText"
import { texts } from "@/lib/datas"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

interface Profile {
  id?: string
  name?: string
  role?: string
  avatar_url?: string
}

export default function HeroUserSection() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      setProfile(profileData || null)
    }

    fetchProfile()
  }, [supabase])

  const isLogged = !!profile
  const userName = profile?.name ?? "Utente"

  const ActionButton = ({ href, label }: { href: string; label: string }) => (
    <Link href={href}>
      <button
        aria-label={label}
        className="mt-4 bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-lg 
                   hover:bg-white hover:text-red-600 transition-colors duration-300 ease-in-out"
      >
        {label}
      </button>
    </Link>
  )

  return (
    <div className="text-center mt-4 relative z-10">
      {isLogged ? (
        <>
          <h2 className="text-3xl md:text-3xl font-semibold text-white">
            Benvenuto, {userName}
          </h2>
          <ActionButton href="/reservation" label="PRENOTA UN APPUNTAMENTO" />
        </>
      ) : (
        <>
          <div className="mb-4">
            <FlipText texts={texts} />
          </div>
          <ActionButton href="/login" label="ACCEDI PER PRENOTARE" />
        </>
      )}
    </div>
  )
}
