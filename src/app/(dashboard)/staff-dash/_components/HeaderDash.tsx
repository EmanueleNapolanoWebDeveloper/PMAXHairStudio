"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "@/src/app/store/AuthContext"
import { Menu } from "lucide-react"
import Link from "next/link"

type HeaderDashProps = {
    currentSectionName: string,
    setIsOpen: (isOpen: boolean) => void
}

export default function Header({ currentSectionName, setIsOpen }: HeaderDashProps) {
    const [dateTime, setDateTime] = useState(new Date())
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { signOut } = useAuth()

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Chiude il dropdown se clicchi fuori
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const formattedDate = dateTime.toLocaleDateString("it-IT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const formattedTime = dateTime.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    return (
        <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {currentSectionName}
                        </h2>
                        <p className="text-sm text-black">
                            {formattedDate}, {formattedTime}
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">

                    {/* Dropdown button */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex w-[5rem] justify-center items-center space-x-2 bg-red-700/60 px-3 py-2 rounded-lg text-black text-sm font-medium focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            Menu
                        </button>

                        {dropdownOpen && (
                            <div className="absolute h-[7rem] w-[10rem] right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <ul className="flex flex-col h-full w-full">
                                    <li className="flex flex-col h-full w-full items-center justify-center">
                                        <Link href={'/'} prefetch={false} className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <button className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Home
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="flex flex-col h-full w-full items-center justify-center">
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </header>
    )
}
