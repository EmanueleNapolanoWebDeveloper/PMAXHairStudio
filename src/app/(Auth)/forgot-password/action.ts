'use server'

import { createClient } from "@/src/utils/supabase/server"

export async function resetPassword(email: string) {
    const supabase = await createClient()

    if (!email) {
        return { success: false, message: "Inserisci un indirizzo email" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { success: false, message: "Inserisci un indirizzo email valido" }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    })

    if (error) {
        if (error.code === "over_email_send_rate_limit") {
            return { success: false, message: "Troppi tentativi ravvicinati. Riprova tra 1 minuto." }
        }
        return { success: false, message: error.message }
    }


    return { success: true, message: "Se l'email è registrata, riceverai un link per reimpostare la password." }
}