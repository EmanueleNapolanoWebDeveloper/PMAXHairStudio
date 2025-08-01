'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/app/store/AuthContext'
import Link from 'next/link'
import LoginGoogle from './_components/LoginGoogle'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const { setUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setUser(data.user)
    router.push('/')
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Accedi al tuo account</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            placeholder="esempio@email.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            placeholder="••••••••"
          />
        </div>

        {/* Pulsante Login */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Caricamento..." : "Accedi"}
          </button>
        </div>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <div className='w-full p-3 flex items-center justify-center gap-3'>
          <LoginGoogle />
        </div>
      </form>

      {/* Link Registrazione */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Non hai un account?
        <Link href="/register" className="text-blue-600 hover:underline font-semibold">
          Registrati
        </Link>
      </p>
    </div>

  )
}
