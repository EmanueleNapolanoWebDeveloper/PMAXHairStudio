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
        email: ''
    })
    const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user) {
            setForm({
                name: user.user_metadata?.name || '',
                surname: user.user_metadata?.surname || '',
                phone: user.user_metadata?.phone || '',
                email: user.email || ''
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
            <main className="h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
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
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {user?.user_metadata?.reg_complete ? 'Modifica Profilo' : 'Completa il tuo profilo'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {fields.map(field => (
                        <div key={field}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field.label} *
                            </label>
                            <input
                                type={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                                name={field.name}
                                id={field.label}
                                placeholder={field.name === 'phone' ? '+39 123 456 7890' : field.name === 'email' ? 'esempio@email.com' : field.name === 'name' ? 'Mario' : 'Rossi'}
                                value={form[field.name as keyof FormData]}
                                onChange={handleChange}
                                disabled={mutation.isLoading || (field === 'email' && !!user?.email)}
                                className={`w-full border rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors[field.name as keyof FormData]
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                            />
                            {fieldErrors[field.name as keyof FormData] && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors[field.name as keyof FormData]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Salvataggio...' : user?.user_metadata?.reg_complete ? 'Salva Modifiche' : 'Completa Profilo'}
                    </button>
                </form>
            </div>
        </main>
    )
}
