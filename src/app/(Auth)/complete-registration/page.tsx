'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/src/app/store/AuthContext'
import { CompleteRegistration, getUser } from '@/src/lib/actions'
import { useMutation, useQuery } from '@tanstack/react-query'

interface FormData {
    name: string
    surname: string
    phone: string
    email: string
}

const PHONE_REGEX = /^\+39\s?\d{3}\s?\d{3}\s?\d{4}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CompleteProfile() {
    const router = useRouter()
    const { refreshProfile, user } = useAuth()

    const [form, setForm] = useState<FormData>({
        name: '',
        surname: '',
        phone: '',
        email: ''
    })
    const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({})

    // ✅ Query per ottenere i dati iniziali dell'utente
    const {
        data: userData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUser,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minuti
    })

    // ✅ Popola il form con i dati esistenti
    useEffect(() => {

        if (userData) {
            setForm(prev => ({
                name: prev.name,
                surname: prev.surname,
                phone: userData?.user.phone || prev.phone,
                email: userData?.user.email || prev.email,
            }))
        }
    }, [userData])

    // ✅ Gestione errori query con useEffect
    useEffect(() => {
        if (isError) {
            console.error('Errore nel caricamento utente:', error)
            toast.error('Errore nel caricamento dei dati utente')
            // Redirect solo se l'utente non è autenticato
            if (!user) {
                router.push('/login')
            }
        }
    }, [isError, error, user, router])

    // ✅ Mutazione per completare il profilo
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            if (!userData) throw new Error('Utente non loggato')
            await CompleteRegistration({ userID: userData?.user.id, data })
        },
        onSuccess: async () => {
            await refreshProfile()
            toast.success('Profilo completato con successo!')
            router.push('/')
        },
        onError: (err: any) => {
            console.error('Errore completamento profilo:', err)
            const message = err.message || 'Errore nel completamento del profilo'
            toast.error(message)
        }
    })

    // ✅ Validazione migliorata
    const validateForm = (data: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {}

        if (!data.name.trim()) {
            errors.name = 'Il nome è obbligatorio'
        } else if (data.name.trim().length < 2) {
            errors.name = 'Il nome deve contenere almeno 2 caratteri'
        }

        if (!data.surname.trim()) {
            errors.surname = 'Il cognome è obbligatorio'
        } else if (data.surname.trim().length < 2) {
            errors.surname = 'Il cognome deve contenere almeno 2 caratteri'
        }

        if (!data.email.trim()) {
            errors.email = 'L\'email è obbligatoria'
        } else if (!EMAIL_REGEX.test(data.email)) {
            errors.email = 'Inserisci un indirizzo email valido'
        }

        if (!data.phone.trim()) {
            errors.phone = 'Il telefono è obbligatorio'
        } else if (!PHONE_REGEX.test(data.phone)) {
            errors.phone = 'Formato telefono: +39 123 456 7890'
        }

        return errors
    }

    console.log('Utente:', userData);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setForm(prev => ({ ...prev, [name]: value }))

        // ✅ Rimuovi errore del campo quando l'utente inizia a digitare
        if (fieldErrors[name as keyof FormData]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // ✅ Validazione completa
        const errors = validateForm(form)

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)

            // Mostra il primo errore come toast
            const firstError = Object.values(errors)[0]
            if (firstError) {
                toast.error(firstError)
            }
            return
        }

        // ✅ Reset errori e invia
        setFieldErrors({})
        mutation.mutate(form)
    }

    // ✅ Loading state migliorato
    if (isLoading) {
        return (
            <main className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-700">Caricamento dati profilo...</p>
            </main>
        )
    }

    // ✅ Error state
    if (isError && !user) {
        return (
            <main className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">
                        Errore di autenticazione
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Reindirizzamento alla pagina di login...
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Completa il tuo profilo
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome *
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Mario"
                            value={form.name}
                            onChange={handleChange}
                            disabled={mutation.isPending}
                            className={`w-full border rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        />
                        {fieldErrors.name && (
                            <p id="name-error" className="mt-1 text-sm text-red-600">
                                {fieldErrors.name}
                            </p>
                        )}
                    </div>

                    {/* Cognome */}
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                            Cognome *
                        </label>
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Rossi"
                            value={form.surname}
                            onChange={handleChange}
                            disabled={mutation.isPending}
                            className={`w-full border rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors.surname
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            aria-describedby={fieldErrors.surname ? 'surname-error' : undefined}
                        />
                        {fieldErrors.surname && (
                            <p id="surname-error" className="mt-1 text-sm text-red-600">
                                {fieldErrors.surname}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="esempio@email.com"
                            value={form.email}
                            onChange={handleChange}
                            disabled={mutation.isPending || !!user?.email}
                            className={`w-full border rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        />
                        {fieldErrors.email && (
                            <p id="email-error" className="mt-1 text-sm text-red-600">
                                {fieldErrors.email}
                            </p>
                        )}
                    </div>

                    {/* Telefono */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Telefono *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+39 123 456 7890"
                            value={form.phone}
                            onChange={handleChange}
                            disabled={mutation.isPending || !!user?.phone}
                            className={`w-full border rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors.phone
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                        />
                        {fieldErrors.phone && (
                            <p id="phone-error" className="mt-1 text-sm text-red-600">
                                {fieldErrors.phone}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? (
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