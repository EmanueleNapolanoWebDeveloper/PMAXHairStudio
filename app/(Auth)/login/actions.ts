'use server'

import { createClient } from "@/utils/supabase/server"


// LOGIN SMS
export async function sendOTP({ phone }: { phone: string }) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { shouldCreateUser: true },
    })


    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: "OTP inviato con successo" }
}

export async function verifyOTP({ phone, otp }: { phone: string, otp: string }) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: "OTP verificato con successo" }
}

