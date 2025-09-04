'use client'
import LinksNavbar from "./_components/LinksNavbar"
import { usePathname } from "next/navigation"


const LinkNav = [
  { label: "Home", path: "/" },
  { label: "Servizi", path: "/services" },
  { label: "Prenota", path: "/reservation" },
]

export default function LinkMenuDesktop() {
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
      </ul>
    </div>
  )
}
