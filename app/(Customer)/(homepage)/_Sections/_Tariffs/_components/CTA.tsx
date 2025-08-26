import Link from "next/link"

export default function CTA() {
    return (
        <div className="text-center mt-16">
            <Link href="/reservation">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white 
                             px-10 py-4 rounded-2xl text-lg font-semibold
                             transform transition-all duration-300 hover:-translate-y-1
                             hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105
                             active:scale-95">
                    <span className="flex items-center gap-2">
                        Prenota Ora
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </span>
                </button>
            </Link>
        </div>

    )
}