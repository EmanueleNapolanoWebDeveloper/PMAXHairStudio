"use client"
import { useState } from "react"
import { Bell, ChevronDown } from "lucide-react"
import { User } from "@supabase/supabase-js"
import { ProfileType } from "@/app/store/AuthContext"
import Image from "next/image"
import Logo from '@/public/assets/logos/P-MaxLogoNoBg.png'
import Link from "next/link"


type DashNavbarProps = {
    user: User | null
    profile: ProfileType | null
    onLogout: () => void
}

export default function DashNavbar({ user, profile, onLogout }: DashNavbarProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const getInitials = (name?: string, surname?: string) =>
        `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase() || "?"

    return (
        <nav className="w-full h-16 bg-black shadow-md flex items-center justify-between px-6">

            {/* Logo */}
            <div className="flex items-center">
                {/* Inserisci qui il logo */}
                <div className="relative w-[8rem] h-[5rem]">
                    <Image
                        src={Logo}
                        fill
                        alt="P-Max Logo" />
                </div>
            </div>

            {/* Azioni lato destro */}
            <div className="flex items-center gap-4 relative">

                {/* Notifiche */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {/* badge notifiche */}
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Dropdown utente */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                    >
                        {/* Avatar cerchio con iniziali */}
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-bold">
                            {getInitials(profile?.name, profile?.surname)}
                        </div>
                        <span className="text-gray-700 font-medium">
                            {profile?.name} {profile?.surname}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Dropdown menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 h-[8rem] bg-white border rounded-md shadow-lg z-50">
                            <ul className="flex flex-col h-full items-center justify-around">
                                <li className="w-full h-full flex items-center justify-center text-[1.4rem]">
                                    <Link
                                        href="/"
                                        className="w-full text-left px-4 py-2 text-black hover:bg-red-600 hover:text-white transition">
                                        <button
                                            type="button" >

                                            Home
                                        </button>
                                    </Link>
                                </li>
                                <li className="w-full h-full flex items-center justify-center text-[1.4rem]">
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-2 text-black hover:bg-red-600 hover:text-white transition"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>

                        </div>
                    )}
                </div>

            </div >
        </nav >
    )
}
