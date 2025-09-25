"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "./action"
import toast from "react-hot-toast"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validazioni client
        if (password.length < 6) {
            toast.error("La password deve avere almeno 6 caratteri")
            return
        }

        if (password !== confirm) {
            toast.error("Le password non coincidono")
            return
        }

        setLoading(true)
        const res = await updatePassword(password)

        if (!res.success) {
            toast.error(res.message)
            setLoading(false)
            return
        }

        toast.success(res.message)
        setTimeout(() => {
            setLoading(false)
            router.push("/")
        }, 1500)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-700 w-full">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    Imposta nuova password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="sr-only">Nuova password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nuova password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-white text-black border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm" className="sr-only">Conferma password</label>
                        <input
                            id="confirm"
                            type="password"
                            placeholder="Conferma password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className="w-full bg-white text-black border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? "Aggiornamento..." : "Aggiorna password"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-2">
                        Se non hai richiesto il reset, ignora questa email.
                    </p>
                </form>
            </div>
        </div>
    )
}
