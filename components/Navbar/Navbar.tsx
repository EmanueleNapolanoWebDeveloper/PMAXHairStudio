'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { Menu } from 'lucide-react'

import Logo from '@/public/assets/logos/P-MaxLogoNoBg.png'
import LinkMenuDesktop from "./LinkNavbar";
import ContainerNavMobile from './ContainerNavMobile'



export default function Navbar() {

    const [isMounted, setIsMounted] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    function handleClick() {
        setIsSidebarOpen((prev) => !prev);
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
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
      `}>
                {/* logo */}
                <div className="col-span-1 flex items-center justify-start relative">
                <div className="relative w-[10rem] h-[6rem]">
                    <Image
                        src={Logo}
                        fill
                        alt="P-Max Logo" />
                </div>
            </div>

            {/* Menù Link */}
            <div className=" col-span-1 flex items-center justify-end p-2 w-full">

                {/* toggle Button for mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={handleClick}
                        aria-label="Apri menu di navigazione"
                        aria-controls="mobile-menu">
                        <Menu />
                    </button>
                </div>

                {/* Link Menù DESKTOP*/}
                <LinkMenuDesktop />
            </div>

        </nav >

        {
            isMounted &&
            <ContainerNavMobile toggleMenu={isSidebarOpen} onSelect={handleClick} />
}
        </>
    )
}