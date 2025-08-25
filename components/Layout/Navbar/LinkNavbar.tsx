'use client'

import { getUser } from "@/actions"
import Logout from "@/app/(Auth)/signout/_components/Logout"
import LinksNavbar from "./_components/LinksNavbar"
import { usePathname } from "next/navigation"


const LinkNav = [
  { label: "Home", path: "/" },
  { label: "Chi Siamo", path: "/about-us" },
  { label: "Servizi", path: "/services" },
  { label: "Prenota", path: "/reservation" },
  { label: "Contatti", path: "/contact-us" },
]

export default function LinkMenuDesktop({ user }: { user: string | null }) {
  const pathName = usePathname()

  return (
    <div className="hidden lg:flex w-full">
      <ul className="flex flex-col items-center justify-around md:flex-row gap-4 mt-4 md:mt-0 w-full">
        {LinkNav.map((item) => {
          const active = pathName === item.path
          return (
            <li key={item.label} className="flex flex-col items-center justify-center">
              <LinksNavbar
                path={item.path}
                active={active}
                label={item.label}
              />
            </li>
          )
        })}
        <li>
          {!user ?
            <LinksNavbar path={'/login'} label="Accedi" active={pathName === "/login"} />
            :
            <Logout />
          }
        </li>
      </ul>
    </div>
  )
}
