'use server'

import { createClient } from "@/src/utils/supabase/server"

export async function resetPassword(email: string) {
    const supabase = await createClient()

    if (!email) {
        return { success: false, message: "Inserisci un indirizzo email" }
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: "Email inviata con successo" }
}