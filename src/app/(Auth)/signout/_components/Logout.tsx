'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/app/store/AuthContext'
import { toast } from 'react-hot-toast'

export default function Logout() {
  const { signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if (loading) return
    setLoading(true)

    try {
      await signOut()
      toast.success('Logout effettuato!')
    } catch (err) {
      console.error('Errore durante il logout:', err)
      toast.error('Si è verificato un errore durante il logout.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`bg-red-600 text-white px-4 py-2 rounded transition 
        hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Uscita in corso...' : 'Logout'}
    </button>
  )
}
