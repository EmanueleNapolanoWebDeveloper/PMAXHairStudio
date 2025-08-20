"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function LoginSMS() {
    const supabase = createClient()
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState<"send" | "verify">("send")
    const [loading, setLoading] = useState(false)

    async function sendOTP() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
            phone,
            options: { shouldCreateUser: true },
        })
        console.log('Inviato');

        setLoading(false)

        if (error) {
            alert(error.message)
        } else {
            setStep("verify")
        }
    }

    async function verifyOTP() {
        setLoading(true)
        const { error } = await supabase.auth.verifyOtp({
            phone,
            token: otp,
            type: "sms",
        })
        setLoading(false)

        if (error) {
            alert(error.message)
        } else {
            window.location.href = "/" // reindirizza dopo login
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
            {step === "send" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Login via SMS</h2>
                    <p className="text-gray-500 text-sm text-center">
                        Inserisci il tuo numero per ricevere il codice di accesso.
                    </p>
                    <input
                        type="tel"
                        placeholder="+39 333 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
                    />
                    <button
                        onClick={sendOTP}
                        disabled={loading}
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
                        disabled={loading}
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? "Verifico..." : "Verifica OTP"}
                    </button>
                </>
            )}
        </div>

    )
}
