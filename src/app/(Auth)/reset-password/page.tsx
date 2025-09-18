"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "./action"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const type = searchParams.get("type")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirm) {
            setMessage("Le password non coincidono")
            return
        }
        setLoading(true)
        const res = await updatePassword(password)

        if (!res.success) {
            toast.error(res.message)
            setLoading(false)
            return
        }

        if (res.success) {
            toast.success(res.message);
            setTimeout(() => router.push("/"), 1500)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-700 w-full">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-center">Imposta nuova password</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Reset Password</h2>

                    <input
                        type="password"
                        placeholder="Nuova password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white text-black border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    />

                    <input
                        type="password"
                        placeholder="Conferma password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full bg-white text-black border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    />

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

                {message && <p className="text-sm mt-3 text-center">{message}</p>}
            </div>
        </div>
    )
}
