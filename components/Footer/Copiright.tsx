'use client'

import Script from 'next/script'

export default function Copyright() {
  const currentYear: number = new Date().getFullYear()

  return (
    <section className="col-span-3 h-[3rem] bg-slate-800 flex items-center justify-center gap-4 text-sm text-gray-300">
      <div className="flex items-center gap-2 text-[0.6rem]">
        <p>&copy; {currentYear} P-MAX Hair-Studio di Polverino Massimo</p>
        <span>|</span>
        <p>P.IVA: 08717761210</p>
        <span>|</span>
        <p>Powered by: EN_WebDeveloper</p>
      </div>

      <div className="flex items-center gap-4 text-[0.6rem]">
        <a
          href="https://www.iubenda.com/privacy-policy/97126684/cookie-policy"
          className="iubenda-white iubenda-noiframe iubenda-embed"
          title="Cookie Policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookie Policy
        </a>
        <a
          href="https://www.iubenda.com/privacy-policy/97126684"
          className="iubenda-white iubenda-noiframe iubenda-embed"
          title="Privacy Policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>

      {/* Script Iubenda caricato una sola volta */}
      <Script
        strategy="afterInteractive"
        src="https://cdn.iubenda.com/iubenda.js"
        id="iubenda-script"
      />
    </section>
  )
}
