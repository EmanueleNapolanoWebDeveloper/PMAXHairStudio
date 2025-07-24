'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'


const formattedForm = {
    'name': '',
    'email': '',
    'message': '',
}

const FormContacts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [inputForm, setInputForm] = useState(formattedForm)

    function handleInputChange(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setInputForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        }
        )
    }

    async function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)

        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputForm)
            })

            if (res.ok) {
                toast.success('Messaggio inviato con successo!')
                setInputForm(formattedForm)
            } else {
                toast.error('Errore nell\'invio del messaggio')
            }
        } catch (error) {
            alert('Errore nella richiesta')
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="name" className="text-gray-300 font-semibold mb-1">Nome</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className={`px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-slate-700 text-slate-500' : ''}`}
                    placeholder="Inserisci il tuo nome"
                    value={inputForm.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}

                />
            </div>

            <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="email" className="text-gray-300 font-semibold mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-slate-700 text-slate-900' : ''}`}
                    placeholder="Inserisci la tua email"
                    value={inputForm.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}

                />
            </div>

            <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="message" className="text-gray-300 font-semibold mb-1">Scrivimi</label>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    className={`px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-slate-700 text-slate-500' : ''}`}
                    placeholder="Scrivi qui il tuo messaggio"
                    value={inputForm.message}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                disabled={isLoading}

            >
                {isLoading && (
                    // spinner
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        ></path>
                    </svg>
                )}

                {isLoading ? "Invio in corso ..." : "Invia"}
            </button>
        </form>
    )
}

export default FormContacts