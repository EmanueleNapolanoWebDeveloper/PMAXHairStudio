"use client"

import { useState } from "react"
import { sendOTP, verifyOTP } from "../actions"
import toast from "react-hot-toast"

export default function LoginSMS() {
    const [phone, setPhone] = useState<string | null>(null)
    const [otp, setOtp] = useState<string | null>(null)
    const [step, setStep] = useState<"send" | "verify">("send")
    const [loading, setLoading] = useState(false)

    async function handleSendOTP() {


        const phoneRegex = /^\+39\s?\d{3}\s?\d{3}\s?\d{4}$/
        if (!phoneRegex.test(phone!)) {
            setPhone('')
            toast.error("Inserisci un numero di telefono valido")
            return
        }

        setLoading(true)
        const res = await sendOTP(phone)
        setLoading(false)

        if (!res.success) {
            toast.error(res.message)
        } else {
            setStep("verify")
        }
    }

    async function handleVerifyOTP() {

        if (otp.length !== 6) {
            setOtp('')
            toast.error("Inserisci un codice di accesso valido")

            return
        }

        setLoading(true)
        const res = await verifyOTP({ phone, otp })
        setLoading(false)

        if (!res.success) {
            toast.error(res.message)
        } else {
            toast.success(res.message)
        }
    }



    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
            {step === "send" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Accedi tramite SMS</h2>
                    <p className="text-gray-500 text-sm text-center">
                        Inserisci il tuo numero per ricevere il codice di accesso.
                    </p>
                    <input
                        type="tel"
                        placeholder="+393331234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
                    />
                    <button
                        onClick={handleSendOTP}
                        disabled={loading || !phone}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? "Invio..." : "Invia OTP"}
                    </button>
                </>
            )}

            {step === "verify" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Verifica il codice</h2>
                    <p className="text-gray-500 text-sm text-center">
                        Inserisci il codice ricevuto via SMS.
                    </p>
                    <input
                        type="text"
                        placeholder="Es. 123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
                    />
                    <button
                        onClick={verifyOTP}
                        disabled={loading || !otp}
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? "Verifico..." : "Verifica OTP"}
                    </button>
                </>
            )}
        </div>

    )
}
