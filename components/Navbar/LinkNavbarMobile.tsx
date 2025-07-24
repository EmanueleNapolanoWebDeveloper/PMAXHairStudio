'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import styles from './navbar.module.css'

const LinkNav = [
    { label: "Home", path: "/" },
    { label: "Chi Siamo", path: "/about-us" },
    { label: "Servizi", path: "/servizi" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contatti", path: "/contatti" }
]

type LinkMenuProps = {
    onSelect: () => void;
}

export default function LinkMenu({ onSelect }: LinkMenuProps) {
    return (
        <div className="w-full h-full">
            <ul className="flex flex-col gap-4 mt-4 md:mt-0 items-center justify-center w-full h-full">
                {LinkNav.map((items) => {
                    return (
                        <li key={items.label} className={styles.linkToggleMenu}>
                            <Link href={items.path} className="relative text-white text-lg font-semibold px-4 py-2 transition-colors duration-300 hover:text-red-400"
                                onClick={onSelect}>
                                {items.label}
                            </Link>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}