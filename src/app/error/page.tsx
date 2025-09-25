"use client"

import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Qualcosa è andato storto
      </h1>
      <p className="text-gray-700 mb-6">
        Ci dispiace, si è verificato un errore inatteso.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
      >
        Torna alla Home
      </Link>
    </div>
  )
}
