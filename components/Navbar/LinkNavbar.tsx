
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"


type LinkNavbarProps = {
    path: string,
    label: string;
    active: boolean
}

const LinkNav = [
    { label: "Home", path: "/" },
    { label: "Chi Siamo", path: "/about-us" },
    { label: "Servizi", path: "/servizi" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contatti", path: "/contatti" },
    { label: "Login", path: "/login" }

]



export function LinkNavbar({ path, label, active }: LinkNavbarProps) {
    return (
        <>
            <Link
                href={path}
                className={`relative md:text-xs lg:text-base xl:text-lg font-semibold px-4 py-2 transition-all duration-300 group text-white`}
            >
                {label}
                <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-[#8B0000] drop-shadow-[0_0_8px_rgba(139,0,0,0.8)] transition-all duration-300 
      ${active ? "w-full" : "w-0 group-hover:w-full"}
    `}
                ></span>
            </Link>

        </>
    )
}

export default function LinkMenuDesktop() {
    const pathName = usePathname()
    return (
        <div className="hidden lg:flex w-full">
            <ul className="flex flex-col items-center justify-around md:flex-row gap-4 mt-4 md:mt-0 w-full">
                {LinkNav.map((item) => {
                    const active = pathName === item.path
                    return (
                        <li key={item.label} className="flex flex-col items-center justify-center">
                            <LinkNavbar
                                path={item.path}
                                active={active}
                                label={item.label}>
                            </LinkNavbar>
                        </li>
                    )
                })}
                <li>
                    <button type="button" onClick={() => {signOut()}}>Logout</button>
                </li>
            </ul>
        </div>
    )
}