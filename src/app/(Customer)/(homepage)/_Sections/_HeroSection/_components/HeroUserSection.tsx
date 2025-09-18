'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "../../../../homepage.module.css"
import FlipText from "@/src/components/UI/FlipText"
import { texts } from "@/src/lib/datas"
import { useEffect, useState } from "react"
import { createClient } from "@/src/utils/supabase/client"
import ReservationForm from "@/src/app/(Customer)/reservation/_components/ReservationForm"
import ReservationModal from "@/src/components/Layout/ReservationModal"

interface Profile {
  id?: string
  name?: string
  role?: string
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
        className="relative px-8 py-4 font-semibold
             bg-black/20 backdrop-blur-md border border-amber-500/30
             rounded-xl shadow-2xl overflow-hidden group
             hover:border-amber-400/50 hover:shadow-amber-500/20 hover:bg-black/30
             active:scale-95 active:bg-black/40 active:border-amber-300/60
             transform transition-all duration-200 ease-out"
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-600/10 
                  group-hover:from-amber-400/20 group-hover:to-amber-500/20
                  group-active:from-amber-300/30 group-active:to-amber-400/30
                  transition-all duration-200" />

        {/* Gold gradient text */}
        <span className="relative z-10 bg-gradient-to-r from-amber-300 to-yellow-500 
                   bg-clip-text text-transparent font-medium tracking-wide
                   group-hover:from-amber-200 group-hover:to-yellow-400
                   group-active:from-amber-100 group-active:to-yellow-300
                   transition-all duration-200">
          {label}
        </span>

        {/* Top shine */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r 
                  from-transparent via-amber-400/50 to-transparent
                  group-hover:via-amber-300/70 group-active:via-amber-200/90
                  transition-all duration-200" />
      </button>
    </Link>
  )

  return (
    <header className="relative w-full min-h-screen max-h-screen overflow-hidden">
      {/* Background overlay per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Main content container */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">

        {/* Welcome section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-1">

          <div className="h-[7rem] w-full flex items-center justify-center">
            <Image
              src="/assets/logos/P-MaxLogoNoBg.png"
              alt="Logo P-MAX HAIR STUDIO"
              width={350}
              height={350}
              className={`z-10 mt-10 mb-10 lg:mb-10 transition-all duration-700 ease-out ${styles.animateslideInLeft}`}
            />
          </div>
          {isLogged ? (
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 mt-[25px]">
                Benvenuto, {userName}!
              </h1>
              <p className="text-lg sm:text-xl text-white/90">
                È un piacere rivederti
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                Benvenuto
              </h1>
              <p className="text-lg sm:text-xl text-white/90">
                Non solo un taglio, ma un’esperienza unica
              </p>
            </div>
          )}
        </div>

        {/* FlipText Animation */}


        {/* Action buttons */}
        <div className="flex gap-4 sm:gap-6 items-center justify-center">
          {isLogged ? (
            <>
              <ActionButton href="/reservation" label="Prenota" />
              <ActionButton href="/area-personale" label="Il Mio Profilo" />
            </>
          ) : (
            <>
              <ActionButton href="/login" label="Accedi" />
              <ActionButton href="/#tariff" label="Esplora Menu" />
            </>
          )}
        </div>


        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}