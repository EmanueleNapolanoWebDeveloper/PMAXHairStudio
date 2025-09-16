'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/src/app/store/AuthContext'
import { CompleteRegistration } from '@/src/lib/actions'
import { useMutation } from '@tanstack/react-query'

interface FormData {
    name: string
    surname: string
    phone: string
    email: string
}

const PHONE_REGEX = /^\d{9,11}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CompleteProfile() {
    const router = useRouter()
    const { refreshProfile, user } = useAuth()

    const [form, setForm] = useState<FormData>({
        name: '',
        surname: '',
        phone: '',
        email: '',
    })
    const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({})
    const [isLoading, setIsLoading] = useState(true)

    console.log('form:', form);

    useEffect(() => {
        if (user) {
            setForm({
                name: '',
                surname: '',
                phone: user.user_metadata?.phone || '',
                email: user.email || '',
            })
        }
        setIsLoading(false)
    }, [user])

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            if (!user) throw new Error('Utente non loggato')
            await CompleteRegistration({ userID: user.id, data })
        },
        onSuccess: async () => {
            await refreshProfile()
            toast.success('Profilo salvato con successo!')
            router.push('/')
        },
        onError: (err: any) => {
            console.error('Errore completamento profilo:', err)
            toast.error(err?.message || 'Errore nel completamento del profilo')
        }
    })

    const validateForm = (data: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {}

        if (!data.name.trim()) errors.name = 'Il nome è obbligatorio'
        if (!data.surname.trim()) errors.surname = 'Il cognome è obbligatorio'
        if (!data.email.trim()) errors.email = 'L\'email è obbligatoria'
        else if (!EMAIL_REGEX.test(data.email)) errors.email = 'Email non valida'
        if (!data.phone.trim()) errors.phone = 'Il telefono è obbligatorio'
        else if (!PHONE_REGEX.test(data.phone)) errors.phone = 'Formato telefono: +39 123 456 7890'

        return errors
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))

        if (fieldErrors[name as keyof FormData]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errors = validateForm(form)
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            const firstError = Object.values(errors)[0]
            if (firstError) toast.error(firstError)
            return
        }
        setFieldErrors({})
        mutation.mutate(form)
    }

    if (isLoading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Caricamento...</p>
                </div>
            </main>
        )
    }

    const fields = [
        {
            name: 'name',
            label: 'Nome'
        },
        {
            name: 'surname',
            label: 'Cognome'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'phone',
            label: 'Telefono'
        }
    ]

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-red-600/20 to-black/20 flex items-center justify-center px-4 py-8 mt-[100px]">
            <div className="w-full max-w-md sm:max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Completa il tuo profilo
                    </h1>
                    <p className="text-white text-base sm:text-lg">
                        {user?.user_metadata?.reg_complete
                            ? 'Aggiorna i tuoi dati personali'
                            : 'Inserisci i tuoi dati per completare la registrazione'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {fields.map(field => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                                    {field.label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.name === 'phone' ? '3331122333' : field.name === 'email' ? 'esempio@email.com' : field.name === 'name' ? 'Mario' : 'Rossi'}
                                    value={form[field.name as keyof FormData]}
                                    onChange={handleChange}
                                    disabled={mutation.isPending || (field.name === 'email' && !!user?.email)}
                                    className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-base ${fieldErrors[field.name as keyof FormData]
                                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                                        : mutation.isPending || (field.name === 'email' && !!user?.email)
                                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500'
                                            : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50 hover:border-gray-300'
                                        }`}
                                />
                                {fieldErrors[field.name as keyof FormData] && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {fieldErrors[field.name as keyof FormData]}
                                    </p>
                                )}
                                {field.name === 'email' && user?.email && (
                                    <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Email verificata
                                    </p>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:from-red-900 hover:via-red-800 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base sm:text-lg shadow-2xl hover:shadow-red-900/20 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-800 hover:border-red-600 relative overflow-hidden group"
                            disabled={mutation.isPending}
                        >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

                            <span className="relative z-10">
                                {mutation.isPending ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/70 border-t-red-400"></div>
                                        <span className="tracking-wide">Salvataggio...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-wide font-semibold">
                                         Completa Profilo
                                    </span>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

            </div>
        </main>
    )
}