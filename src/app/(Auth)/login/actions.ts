'use server'

import { createClient } from "@/src/utils/supabase/server"


// LOGIN EMAIL E PASSWORD

export async function LoginWithEmailPassword(email: string, password: string) {

    const supabase = await createClient()

    if (!email || !password) {
        return { success: false, message: "Inserisci email e password" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { success: false, message: "Inserisci un indirizzo email valido" }
    }

    if (password.length < 6) {
        return { success: false, message: "La password deve avere almeno 6 caratteri" }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        switch (error.code) {
            case "invalid_credentials":
                return { success: false, message: "Email o password non validi" }
            case "over_email_send_rate_limit":
                return { success: false, message: "Troppi tentativi. Attendi un minuto e riprova." }
            default:
                return { success: false, message: error.message }
        }
    }

    return {
        success: true,
        message: "Login effettuato con successo",
        user: data.user,
        session: data.session,
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

