'use client'

import DashNavbar from "./(employee)/_components/DashNavbar"
import { useAuth } from "@/app/store/AuthContext"
import DashSidebar from "./(employee)/_components/DashSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, signOut } = useAuth() // prendi user e profile dal context

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Navbar fissa in alto */}
            <DashNavbar user={user} profile={profile} onLogout={signOut} />

            {/* Corpo: Sidebar + Contenuto */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <DashSidebar />

                {/* Contenuto dinamico */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
