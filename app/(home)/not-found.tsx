// app/not-found.tsx

'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Spiacenti, la pagina che stai cercando non esiste.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition"
      >
        Torna alla Home
      </Link>
    </main>
  )
}
