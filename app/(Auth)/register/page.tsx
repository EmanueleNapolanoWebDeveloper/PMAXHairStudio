'use client'

import Link from "next/link";
import React, { useState } from "react";
import { registerUser } from "@/actions";


const initalStateForm = {
  email: '',
  password: '',
  pass_confirm: '',
}


export default function Register() {

  const [form, setForm] = useState(initalStateForm)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
    setSuccess(null)
  }



  async function registerSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const pass_confirm = formData.get("pass_confirm") as string

    if (!email || !password || !pass_confirm) {
      setError("Tutti i campi sono obbligatori")
      return
    }

    if (password !== pass_confirm) {
      setError('Le password non coincidono')
      return 
    }

    setLoading(true)

    try {
      await registerUser(email, password)
      setSuccess('Registrazione avvenuta con successo! Controlla la tua mail per confermare!')
      setForm(initalStateForm)
    } catch (error: any) {
      setError(error.message || 'Errore nella registrazione')
    } finally {
      setLoading(false)
    }

    setLoading(false)


    if (error) {
      setError(error.message)
    } else {
      setSuccess("Registrazione avvenuta con successo! Controlla la tua mail per confermare!")
      setForm(initalStateForm)
    }
  }


  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Registrati</h2>

      <form className="space-y-6" onSubmit={registerSubmit}>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
            placeholder="esempio@email.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
            placeholder="••••••••"
          />
        </div>

        {/* Conferma Password */}
        <div>
          <label htmlFor="pass_confirm" className="block mb-1 font-medium text-gray-700">Conferma Password</label>
          <input
            type="password"
            name="pass_confirm"
            id="pass_confirm"
            value={form.pass_confirm}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
            placeholder="••••••••"
          />
        </div>

        {/* Messaggi */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Registrazione..." : "Registrati"}
        </button>
      </form>

      <p className="text-center text-gray-700 mb-2">
        Hai già un account?
        <Link href="/login" className="text-blue-600 hover:underline ml-1">Accedi</Link>
      </p>
    </div>
  )
}
