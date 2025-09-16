'use client'
import LinksNavbar from "./_components/LinksNavbar"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// Sezioni homepage per dropdown
const homepageSections = [
  { label: "Chi Siamo", anchor: "#chi-siamo" },
  { label: "Saloon", anchor: "#saloonHome" },
  { label: "Staff", anchor: "#staffHome" },
  { label: "Servizi", anchor: "#serviceHome" },
  { label: "Partners", anchor: "#partnersHome" },
  { label: "Listino Prezzi", anchor: "#tariffHome" },
  { label: "Dicono di noi", anchor: "#reviewsHome" },
  { label: "Contatti", anchor: "#footerHome" },
]

export default function LinkMenuDesktop() {
  const pathName = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Chiudi dropdown quando clicchi fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSectionClick = (anchor) => {
    setIsDropdownOpen(false)
    // Scroll to section se siamo sulla homepage
    if (pathName === "/") {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Naviga alla homepage con anchor
      window.location.href = `/${anchor}`
    }
  }

  return (
    <div className="hidden lg:flex w-full items-center justify-end gap-8">

      {/* Dropdown Sezioni HomePage */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-white hover:text-red-400 transition-all duration-300 font-medium text-base tracking-wide group"
        >
          <span className="relative">
            HomePage
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-4 w-56 bg-black/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50 transform origin-top-right">
            <div className="py-2">
              <Link href="/">
                <button
                  className="w-full text-left px-5 py-3 text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium text-sm border-l-2 border-transparent hover:border-red-500 group"
                >
                  <span className="flex items-center justify-between">
                    Torna alla Home
                    <svg
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
              {homepageSections.map((section, index) => (
                <button
                  key={section.anchor}
                  onClick={() => handleSectionClick(section.anchor)}
                  className="w-full text-left px-5 py-3 text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium text-sm border-l-2 border-transparent hover:border-red-500 group"
                >
                  <span className="flex items-center justify-between">
                    {section.label}
                    <svg
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>

            {/* Footer del dropdown */}
            <div className="border-t border-gray-700/50 px-5 py-3 bg-red-950/10">
              <p className="text-xs text-gray-500 text-center font-medium">
                Naviga facilmente nel sito
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Button Prenotazione */}
      <Link href="/reservation">
        <button className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-900/30 border border-red-500/30 overflow-hidden">

          {/* Effetto shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

          {/* Contenuto */}
          <div className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-left leading-tight">
              <div className="text-sm font-bold">PRENOTA</div>
              <div className="text-xs font-medium opacity-90">APPUNTAMENTO</div>
            </div>
          </div>
        </button>
      </Link>
    </div>
  )
}