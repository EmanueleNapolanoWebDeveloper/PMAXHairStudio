'use client'

import Link from "next/link";


type LinkMenuProps = {
    onSelect: () => void;
    href: string,
    key: string,
    label: string
}

export default function LinkMenu({ onSelect, href, label }: LinkMenuProps) {
    return (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center px-6 py-4">
            <Link
                href={href}
                onClick={onSelect}
                className="w-full text-center text-white font-semibold text-lg 
                     py-3 rounded-xl transition-all duration-300 
                     hover:bg-red-600 hover:scale-105 hover:shadow-lg 
                     bg-gradient-to-r from-black/80 to-black/60 border border-red-500"
            >
                {label}
            </Link>

        </div>
    )
}