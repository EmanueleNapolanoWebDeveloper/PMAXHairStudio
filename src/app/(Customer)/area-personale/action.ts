'use server'
import { createClient } from "@/src/utils/supabase/server"

type FormData = {
    name: string
    surname: string,
    phone: string,
    user_id: string
}

export async function UpdateProfile({ name, surname, phone, user_id }: FormData) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.updateUser({
        data: {
            name,
            surname,
            phone,
            reg_complete: true,
        },
    })

    if (error) {
        console.error('Errore UpdateProfile:', error.message)
        return { success: false, error: error.message }
    }

    return { success: true, data }
}