'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CompleteRegistration } from '@/actions'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export default function CompleteProfile() {

    const router = useRouter()

    const [user, setUser] = useState(null)
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
                router.push('/register')
            } else {
                setUser(user)
                setForm(prev => ({ ...prev, email: user.email || '' }))
            }

            setLoading(false)
        }

        getUser()
    }, [])


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

        if (!name || !surname || !phone || !email) {
            setError('Compila tutti i campi')
            return
        }

        if (!user || !user.id || !user.email) {
            setError('Utente non autenticato')
            router.push('/register')
            return
        }

        try {
            const res = await fetch('/api/complete_registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: { id: user.id, email: user.email },
                    name,
                    surname,
                    phone
                })
            })

            const rawText = await res.text()
            let data = null

            try {
                data = JSON.parse(rawText)
            } catch (err) {
                console.error("❌ Errore nel parsing JSON:", err)
                console.log("Contenuto grezzo ricevuto:", rawText)
                throw new Error("Errore interno: risposta non valida dal server")
            }

            if (!res.ok) {
                throw new Error(data.error || 'Errore interno al server')
            }

            toast.success("Benvenuto!")        // Mostra il toast
            router.push("/")
        } catch (err: any) {
            console.error("Errore nel salvataggio:", err)
            setError(err.message || 'Errore imprevisto')
        } finally {
            setSaving(false)
        }

        setSaving(false)
    }

    if (loading) return (
        <main className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <p className='text-black'>Loading ...</p>
        </main>)

    return (
        <main className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Telefono */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="1234567890"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Messaggi */}
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {saving ? 'Salvataggio dati ...' : 'Salva'}
                    </button>
                </form>
            </div>
        </main>

    )
}
