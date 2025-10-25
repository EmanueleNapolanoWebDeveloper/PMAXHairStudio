'use client'
import Link from 'next/link'
import Script from 'next/script'

export default function Copyright() {
  const currentYear: number = new Date().getFullYear()

  return (
    <section className="col-span-3 relative w-screen min-h-[4rem] bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-300 px-8 py-6">
      {/* Main Copyright Info */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <p className="text-white">&copy; {currentYear} P-MAX Hair-Studio</p>
        </div>
        <div className="hidden md:block w-px h-4 bg-gray-600"></div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>di Polverino Massimo</span>
          <span className="text-gray-600">|</span>
          <span>P.IVA: 08717761210</span>
        </div>
      </div>

      {/* Links Section */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://www.iubenda.com/privacy-policy/97126684/cookie-policy"
            className="iubenda-white iubenda-noiframe iubenda-embed px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-red-500/20 hover:text-red-300 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
            title="Cookie Policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>
          <a
            href="https://www.iubenda.com/privacy-policy/97126684"
            className="iubenda-white iubenda-noiframe iubenda-embed px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-red-500/20 hover:text-red-300 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
            title="Privacy Policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>

        {/* Developer Credit */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <span>Powered by</span>
          <Link href="https://enwebdeveloper.it" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors duration-300" prefetch={false}>
            <span className="font-semibold text-red-400">EN_WebDeveloper</span>
          </Link>
        </div>
      </div>

      {/* Script Iubenda */}
      <Script
        strategy="afterInteractive"
        src="https://cdn.iubenda.com/iubenda.js"
        id="iubenda-script"
      />
    </section >
  )
}