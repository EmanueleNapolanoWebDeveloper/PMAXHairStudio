'use server'

import { createClient } from "@/src/utils/supabase/server"


// LOGIN EMAIL E PASSWORD

export async function LoginWithEmailPassword(email: string, password: string) {

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { success: false, message: error.message }
    } else {
        return { success: true, message: "Login effettuato con successo" }
    }
}


// LOGIN SMS
export async function sendOTP({ phone }: { phone: string }) {
    console.log('phone ricevuto: ', phone);

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { shouldCreateUser: true },
    })


    if (error) {
        return { success: false, message: `Errore qui : ${error.message}` }
    }

    return { success: true, message: "OTP inviato con successo" }
}

export async function verifyOTP({ phone, otp }: { phone: string, otp: string }) {
    console.log('phone ricevuto: ', phone);
    console.log('otp ricevuto: ', otp);


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

