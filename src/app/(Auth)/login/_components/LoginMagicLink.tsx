"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { loginWithMagicLink } from "../actions"
import { useRouter } from "next/navigation"

export default function MagicLinkLogin() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return toast.error("Inserisci un'email valida")

        setLoading(true)

        const res = await loginWithMagicLink({ email })

        if (!res?.success) return toast.error(res.message)

        toast.success(res.message)
        setLoading(false)

        router.push("/")
    }

    return (
        <form onSubmit={handleMagicLink} className="w-full flex flex-col gap-4">
            <input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl bg-red-600 text-white font-semibold shadow-md transition-all duration-200
                    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 hover:shadow-lg"}
                `}
            >
                {loading ? "Invio Magic Link..." : "Accedi con Magic Link"}
            </button>

            <p className="text-sm text-gray-500 text-center">
                Riceverai un link via email per accedere senza password.
            </p>
        </form>
    )
}
