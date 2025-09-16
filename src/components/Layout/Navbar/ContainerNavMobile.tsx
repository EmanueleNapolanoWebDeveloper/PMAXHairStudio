import LinkNavbarMobile from "./LinkNavbarMobile"
import { useAuth } from '@/src/app/store/AuthContext'
import LogoPM from './_components/Logo'

type ContainerNavMobileProps = {
    onSelect: () => void
    toggleMenu: boolean
}

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/reservation", label: "Prenotazioni" },
]

export default function ContainerNavMobile({ onSelect, toggleMenu }: ContainerNavMobileProps) {
    const { user, profile, signOut } = useAuth()

    return (
        <>
            {/* Overlay cliccabile */}
            {toggleMenu && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onSelect}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-black via-gray-900 to-black text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-90
                    ${toggleMenu ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-900/50 to-black py-6 px-5 shadow-md flex items-center justify-between">
                    <div className="col-span-1 flex items-center justify-start relative w-[9rem] h-[2.5rem]">
                        <LogoPM />
                    </div>                    <button
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
                            <p className="text-white/80 text-sm">
                                Ciao, <span className="font-semibold">{profile?.name || "Utente"}</span>
                            </p>
                            {profile.role === "admin" && (
                                <a
                                    href="/area-admin"
                                    onClick={onSelect}
                                    className="block bg-white hover:bg-gray-200 transition text-black px-4 py-2 rounded-lg shadow text-center"
                                >
                                    Area Admin
                                </a>
                            )}
                            {profile.role === "employee" && (
                                <a
                                    href="/staff-dash"
                                    onClick={onSelect}
                                    className="block bg-white hover:bg-gray-200 transition text-black px-4 py-2 rounded-lg shadow text-center"
                                >
                                    Staff DashBoard
                                </a>
                            )}
                            <a
                                href="/area-personale"
                                onClick={onSelect}
                                className="block bg-gray-800 hover:bg-gray-700 transition text-white px-4 py-2 rounded-lg shadow text-center"
                            >
                                Profilo
                            </a>
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
                    {NAV_LINKS.map((link) => (
                        <div key={link.href}>
                            <LinkNavbarMobile href={link.href} onSelect={onSelect} label={link.label} >
                                {link.label}
                            </LinkNavbarMobile>
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
