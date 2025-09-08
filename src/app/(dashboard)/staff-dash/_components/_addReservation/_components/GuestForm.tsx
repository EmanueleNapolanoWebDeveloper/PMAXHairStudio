'use client'
import { useState } from 'react'
import { GuestType } from '@/src/lib/types'



interface GuestFormProps {
    guest: GuestType
    onGuestChange: (guest: GuestType) => void
}

export default function GuestForm({ guest, onGuestChange }: GuestFormProps) {
    const [errors, setErrors] = useState<Partial<GuestType>>({})

    const handleInputChange = (field: keyof GuestType, value: string) => {
        onGuestChange({
            ...guest,
            [field]: value
        })

        // Rimuovi l'errore quando l'utente inizia a digitare
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const validateField = (field: keyof GuestType, value: string) => {
        const newErrors = { ...errors }

        switch (field) {
            case 'name':
                if (!value.trim()) {
                    newErrors.name = 'Nome è obbligatorio'
                } else if (value.length < 2) {
                    newErrors.name = 'Nome deve essere di almeno 2 caratteri'
                } else {
                    delete newErrors.name
                }
                break

            case 'surname':
                if (!value.trim()) {
                    newErrors.surname = 'Cognome è obbligatorio'
                } else if (value.length < 2) {
                    newErrors.surname = 'Cognome deve essere di almeno 2 caratteri'
                } else {
                    delete newErrors.surname
                }
                break

            case 'phone':
                const phoneDigits = value.replace(/\s/g, '')
                if (!phoneDigits) {
                    newErrors.phone = 'Numero di telefono è obbligatorio'
                } else if (!/^\d{10,}$/.test(phoneDigits)) {
                    newErrors.phone = 'Numero di telefono non valido (min 10 cifre)'
                } else {
                    delete newErrors.phone
                }
                break

            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = 'Formato email non valido'
                } else {
                    delete newErrors.email
                }
                break
        }

        setErrors(newErrors)
    }

    const formatPhoneNumber = (phone: string) => {
        // Rimuovi tutti i caratteri non numerici
        const cleaned = phone.replace(/\D/g, '')

        // Formatta il numero con spazi per maggiore leggibilità
        if (cleaned.length <= 3) return cleaned
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
        if (cleaned.length <= 10) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`

        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
    }

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Dati del cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                    <label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome *
                    </label>
                    <input
                        id="guest-name"
                        type="text"
                        value={guest.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onBlur={(e) => validateField('name', e.target.value)}
                        placeholder="Nome del cliente"
                        className={`w-full rounded-lg border shadow-sm p-3 text-sm text-gray-900 
                            focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${errors.name
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300'
                            }`}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Cognome */}
                <div>
                    <label htmlFor="guest-surname" className="block text-sm font-medium text-gray-700 mb-1">
                        Cognome *
                    </label>
                    <input
                        id="guest-surname"
                        type="text"
                        value={guest.surname}
                        onChange={(e) => handleInputChange('surname', e.target.value)}
                        onBlur={(e) => validateField('surname', e.target.value)}
                        placeholder="Cognome del cliente"
                        className={`w-full rounded-lg border shadow-sm p-3 text-sm text-gray-900 
                            focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${errors.surname
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300'
                            }`}
                    />
                    {errors.surname && (
                        <p className="mt-1 text-xs text-red-600">{errors.surname}</p>
                    )}
                </div>

                {/* Telefono */}
                <div>
                    <label htmlFor="guest-phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefono *
                    </label>
                    <input
                        id="guest-phone"
                        type="tel"
                        value={guest.phone}
                        onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value)
                            handleInputChange('phone', formatted)
                        }}
                        onBlur={(e) => validateField('phone', e.target.value)}
                        placeholder="123 456 7890"
                        className={`w-full rounded-lg border shadow-sm p-3 text-sm text-gray-900 
                            focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${errors.phone
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300'
                            }`}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email (opzionale)
                    </label>
                    <input
                        id="guest-email"
                        type="email"
                        value={guest.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={(e) => validateField('email', e.target.value)}
                        placeholder="cliente@email.com"
                        className={`w-full rounded-lg border shadow-sm p-3 text-sm text-gray-900 
                            focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${errors.email
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300'
                            }`}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">
                        <p className="text-blue-800 font-medium">Informazione importante</p>
                        <p className="text-blue-700 mt-1">
                            I dati inseriti verranno utilizzati solo per questa prenotazione.
                            L'email è facoltativa ma utile per eventuali comunicazioni.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}