'use client'

import { useState, useEffect, useCallback } from 'react'
import LogoPM from './_components/Logo'
import { Menu } from 'lucide-react'

import LinkMenuDesktop from "./LinkNavbar"
import ContainerNavMobile from './ContainerNavMobile'
import { useAuth } from '@/src/app/store/AuthContext'

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { user, signOut, loading } = useAuth()

  // Toggle sidebar
  const handleClick = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  // Mount check per mobile menu
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll listener ottimizzato
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 150)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <nav
        className={`
          w-screen grid grid-cols-2 h-[7rem] fixed top-0 left-0 z-[99] transition-all duration-500
          ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}
        `}
      >
        {/* Logo */}
        <div className="col-span-1 flex items-center justify-start relative">
          <LogoPM />
        </div>

        {/* Menù link */}
        <div className="col-span-1 flex items-center justify-end p-2 w-full">
          {/* toggle mobile */}
          <div className="lg:hidden">
            <button
              onClick={handleClick}
              aria-label="Apri menu di navigazione"
              aria-controls="mobile-menu"
              aria-expanded={isSidebarOpen}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <Menu />
            </button>
          </div>

          {/* desktop menu */}
          <LinkMenuDesktop user={user} />
        </div>
      </nav>

      {/* mobile menu */}
      {isMounted && (
        <ContainerNavMobile toggleMenu={isSidebarOpen} onSelect={handleClick} />
      )}
    </>
  )
}
