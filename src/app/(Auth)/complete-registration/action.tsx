'use server'

import { createClient } from "@/src/utils/supabase/server"

// Types
type CompleteRegistrationProps = {
    userID: string
    data: {
        name: string
        surname: string
        email?: string
        phone?: string
    }
}

// Function
export async function CompleteRegistration({ userID, data }: CompleteRegistrationProps) {

    try {
        const supabase = await createClient()

        const { name, surname, email, phone } = data

        const { error } = await supabase.from('profiles').insert({
            id: userID,
            name,
            surname,
            email,
            phone,
            role: 'customer',
            reg_complete: true
        })

        if (error) {
            console.error("Errore nella registrazione:", error)
            return { error: error.message }
        } else {
            return { success: true }
        }
    } catch (error : any) {
        console.error("Errore nella registrazione:", error)
        return { error: error.message }
    }
}