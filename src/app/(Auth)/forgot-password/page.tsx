"use client"

import { useState } from "react"
import { resetPassword } from "./action"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await resetPassword(email)

        if (!res.success) {
            toast.error(res.message)
            setLoading(false)
            return
        }

        toast.success(res.message)
        setLoading(false)

        router.push('/')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-700 w-full">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
                <h2 className="text-xl font-bold text-black mb-4 text-center">Recupera Password</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="w-full py-2 text-black">Inserisci la tua email</label>
                        <input
                            type="email"
                            placeholder="Inserisci la tua email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg text-black"
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            {loading ? "Invio in corso..." : "Invia email reset"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
