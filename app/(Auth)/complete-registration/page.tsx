'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { toast } from 'react-hot-toast'
import { CompleteRegistration } from './action'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/app/store/AuthContext'  // AGGIUNTA: import del context

export default function CompleteProfile() {
    const router = useRouter()
    const { refreshProfile } = useAuth()  // AGGIUNTA: funzione per aggiornare il context

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({ name: '', surname: '', phone: '', email: '' })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const supabase = await createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
            } else {
                setUser(user)
                // Inizializza il form con i dati dell'utente se disponibili
                setForm(prev => ({
                    ...prev,
                    phone: user.phone || '',
                    email: user.email || ''
                }))
            }

            setLoading(false)
        }

        getUser()
    }, [router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('SUBMIT INTERCETTATO')
        setError(null)
        setSuccess(null)
        setSaving(true)

        const { name, surname, phone, email } = form

        // Validazione telefono (formato italiano +39, spazi opzionali)
        const phoneRegex = /^\+39\s?\d{3}\s?\d{3}\s?\d{4}$/
        if (!phoneRegex.test(phone)) {
            setError("Inserisci un numero di telefono valido (es. +39 123 456 7890)")
            setSaving(false)
            return
        }

        // Validazione dei campi
        if (!name || !surname || !phone || !email) {
            setError('Compila tutti i campi')
            setSaving(false)
            return
        }

        // Validazione email semplice
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Inserisci un indirizzo email valido')
            setSaving(false)
            return
        }

        if (!user || !user.id) {
            setError('Utente non autenticato')
            setSaving(false)
            router.push('/login')
            return
        }

        const res = await CompleteRegistration({
            userID: user.id,
            data: form
        })

        setSaving(false)

        if (!res.success) {
            setError(res.error.message)
            setSaving(false)
        } else {
            refreshProfile()
            setSuccess('Profilo completato con successo')
            toast.success('Profilo completato con successo')
            setTimeout(() => {
                router.push('/')
            }, 1500)
        }


    }

    if (loading) {
        return (
            <main className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className='text-gray-700'>Caricamento...</p>
            </main>
        )
    }

    return (
        <main className="h-screen w-full flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Completa il tuo profilo</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Mario"
                            value={form.name}
                            onChange={handleChange}
                            required
                            disabled={saving}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Cognome */}
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Rossi"
                            value={form.surname}
                            onChange={handleChange}
                            required
                            disabled={saving}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="esempio@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={saving}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Telefono */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+39 123 456 7890"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            disabled={saving}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Messaggi */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <p className="text-red-600 text-sm">❌ {error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <p className="text-green-600 text-sm">✅ {success}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={saving}
                    >
                        {saving ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Salvataggio in corso...
                            </div>
                        ) : (
                            'Completa Profilo'
                        )}
                    </button>
                </form>
            </div>
        </main>
    )
}