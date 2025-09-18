"use client"

import { useState } from "react"
import { useAuth } from '@/src/app/store/AuthContext'
import LogoPM from './_components/Logo'
import Link from "next/link"
import { ChevronDown } from "lucide-react"

type ContainerNavMobileProps = {
    onSelect: () => void
    toggleMenu: boolean
}

const NAV_LINKS = [
    { href: "/", label: "Naviga in Home", hasSubmenu: true },
]

const HOME_SUB_LINKS = [
    { href: "/", label: "Torna in Home" },
    { href: "/#chi-siamo", label: "Chi Siamo" },
    { href: "/#servicehome", label: "Servizi" },
    { href: "/#tariffHome", label: "Listino Prezzi" },
    { href: "/#reviewsHome", label: "Dicono di noi" },
    { href: "/#footerHome", label: "Contatti" },
]

export default function ContainerNavMobile({ onSelect, toggleMenu }: ContainerNavMobileProps) {
    const { profile, signOut } = useAuth()
    const [showHomeSubmenu, setShowHomeSubmenu] = useState(false)

    const handleHomeClick = () => {
        // impedisce che il menu mobile si chiuda subito
        // mostra il submenu
        setShowHomeSubmenu(prev => !prev)
    }

    return (
        <>
            {/* Overlay cliccabile */}
            {toggleMenu && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={onSelect} />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-72 bg-gradient-to-b from-black via-gray-900 to-black text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
          ${toggleMenu ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-900/50 to-black py-6 px-5 shadow-md flex items-center justify-between">
                    <div className="col-span-1 flex items-center justify-start relative w-[9rem] h-[2.5rem]">
                        <LogoPM />
                    </div>
                    <button
                        onClick={onSelect}
                        className="text-white hover:text-red-400 transition text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* User Section */}
                <div className="px-5 py-6 border-b border-white/10">
                    {profile ? (
                        <div className="flex flex-col gap-3">
                            <p className="text-white/80 text-md">
                                Ciao, <span className="font-semibold">{profile?.name || "Utente"}</span>
                            </p>
                            {profile.role === "employee" && (
                                <a
                                    href="/staff-dash"
                                    onClick={onSelect}
                                    className="block bg-white hover:bg-gray-200 transition text-black px-4 py-2 rounded-lg shadow text-center"
                                >
                                    Staff DashBoard
                                </a>
                            )}
                            {profile.role === "customer" && (
                                <>
                                    <Link
                                        href="/area-personale"
                                        onClick={onSelect}
                                        prefetch={false}
                                        className="block bg-gray-800 hover:bg-gray-700 transition text-white px-4 py-2 rounded-lg shadow text-center"
                                    >
                                        Il mio Profilo
                                    </Link>

                                    <Link
                                        href="/reservation"
                                        onClick={onSelect}
                                        prefetch={false}
                                        className="block relative bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500
             text-black px-4 py-2 rounded-lg shadow-md text-center font-semibold
             transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-yellow-400 hover:to-yellow-300"
                                    >
                                        Prenota Ora
                                        <span className="absolute inset-0 rounded-lg border border-black/20 pointer-events-none" />
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={() => {
                                    signOut()
                                    onSelect()
                                }}
                                className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg shadow"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <a
                            href="/login"
                            onClick={onSelect}
                            className="block bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg shadow-md text-center"
                        >
                            Login
                        </a>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 px-5 py-6 text-lg font-medium">
                    {NAV_LINKS.map(link => (
                        <div key={link.href}>
                            {link.hasSubmenu ? (
                                // Link con submenu
                                <button
                                    onClick={handleHomeClick}
                                    className="w-full flex items-center justify-between text-left text-white font-semibold text-lg py-3 px-2 rounded-xl
             transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95"
                                >
                                    {link.label}
                                    <ChevronDown
                                        className={`w-5 h-5 ml-2 transition-transform duration-300 ${showHomeSubmenu ? "rotate-180" : ""}`}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    onClick={() => {
                                        onSelect()
                                        // anche se non ha sub, assicurati che submenu chiuso
                                        setShowHomeSubmenu(false)
                                    }}
                                    className="block text-white font-semibold text-lg py-3 rounded-xl transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-lg"
                                >
                                    {link.label}
                                </Link>
                            )}

                            {/* Submenu per Home */}
                            {link.hasSubmenu && showHomeSubmenu && (
                                <div className="mt-2 ml-4 flex flex-col gap-1">
                                    {HOME_SUB_LINKS.map(sub => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={() => {
                                                onSelect()
                                                setShowHomeSubmenu(false)
                                            }}
                                            className="block text-white text-base py-2 rounded-lg transition-all duration-200 hover:bg-red-600 hover:scale-105 hover:shadow"
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Footer Bar */}
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-black to-red-600 py-3 text-center text-xs text-white/70">
                    © 2025 P-Max Barber • All rights reserved
                </div>
            </div>
        </>
    )
}
