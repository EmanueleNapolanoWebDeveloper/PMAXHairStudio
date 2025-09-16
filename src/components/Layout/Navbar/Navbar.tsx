'use client'

import { useState, useEffect, useCallback } from 'react'
import LogoPM from './_components/Logo'
import { Menu, X } from 'lucide-react'
import LinkMenuDesktop from "./LinkNavbar"
import ContainerNavMobile from './ContainerNavMobile'
import { useAuth } from '@/src/app/store/AuthContext'
import AuthButton from './_components/AuthButton'

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { user, signOut, loading, profile } = useAuth()

  const handleClick = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}
        `}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
          {/* Logo */}
          <div className="flex items-center z-50">
            <LogoPM />
          </div>

          {/* Desktop Menu + Auth */}
          {isMounted && (
            <div className="hidden lg:flex items-center gap-8">
              <LinkMenuDesktop />
              <AuthButton user={user} signOut={signOut} loading={loading} profile={profile} />
            </div>
          )}

          {/* Mobile toggle */}
          <div className="lg:hidden z-50">
            <button
              onClick={handleClick}
              aria-label="Apri menu mobile"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
            >
              {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMounted && (
          <ContainerNavMobile toggleMenu={isSidebarOpen} onSelect={handleClick} />
        )}
      </nav>
    </>
  )
}
