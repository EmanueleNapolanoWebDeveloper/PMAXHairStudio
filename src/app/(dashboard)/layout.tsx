'use client'

import DashNavbar from "./staff-dash/_components/DashNavbar"
import { useAuth } from "@/src/app/store/AuthContext"
import DashSidebar from "./staff-dash/_components/DashSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, signOut } = useAuth() // prendi user e profile dal context

    return (
        <>
            {children}
        </>

    )
}
