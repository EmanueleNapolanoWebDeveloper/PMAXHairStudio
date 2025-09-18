"use server"

import { createClient } from "@/src/utils/supabase/server"

export async function updatePassword(newPassword: string) {
    const supabase = await createClient()

    try {

        const { error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) {
            return { success: false, message: error.message }
        }

        return { success: true, message: "Password aggiornata con successo " }
    } catch (error) {
        return { success: false, message: (error as Error).message }

    }
}


