"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { ProfileType, User } from "@/app/store/AuthContext"

type UserSectionnavMobileProps = {
  onClickMenu: () => void
  user: User | null
  profile: ProfileType | null
  onLogout: () => Promise<void> // Logout async
}

export default function UserSectionnavMobile({
  onClickMenu,
  user,
  profile,
  onLogout,
}: UserSectionnavMobileProps) {

  const getInitials = (name?: string, surname?: string) =>
    `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase() || "?"

  const buttonBaseClasses =
    "px-3 py-2 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"

  const handleLogout = async () => {
    await onLogout()      // aspetta che il logout finisca
    onClickMenu()         // chiudi il menu
  }

  return (
    <div className="flex w-full h-[100px] bg-slate-600 justify-between items-center px-4 pt-2">

      {/* Toggle menu */}
      <button
        onClick={onClickMenu}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 ease-in-out text-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 shadow-lg"
        aria-controls="container-navbar-mobile"
        aria-label="Toggle menu"
      >
        <X size={22} />
      </button>

      {/* Login / Logout / Avatar */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* Cerchio con iniziali */}
          <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
            {getInitials(profile?.name, profile?.surname)}
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className={`${buttonBaseClasses} bg-red-600 hover:bg-red-700`}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={onClickMenu}  // chiude il menu quando vai al login
          className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}
          aria-label="Login"
        >
          Login
        </Link>
      )}
    </div>
  )
}
