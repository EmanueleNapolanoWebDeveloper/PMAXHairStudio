"use server"

import { createClient } from "@/utils/supabase/server"

type CompleteRegistrationProps = {
    user: { id: string; phone?: string; email?: string }
    name: string
    surname: string
    email?: string
    phone?: string
}

export async function CompleteRegistration({ user, name, surname, email, phone }: CompleteRegistrationProps) {
    const supabase = await createClient()

    const finalEmail = user?.email || email || null
    const finalPhone = user?.phone || phone || null

    // 🔍 Controllo email duplicata
    if (finalEmail) {
        const { data: emailExists, error: emailError } = await supabase
            .from("public_users")
            .select("id")
            .eq("email", finalEmail)
            .neq("auth_user_id", user.id) // escludo l'utente corrente
            .maybeSingle()

        if (emailError) {
            console.error("Errore controllo email:", emailError)
            return { error: emailError }
        }
        if (emailExists) {
            return { error: { message: "Email già registrata" } }
        }
    }

    // 🔍 Controllo telefono duplicato
    if (finalPhone) {
        const { data: phoneExists, error: phoneError } = await supabase
            .from("public_users")
            .select("id")
            .eq("phone", finalPhone)
            .neq("auth_user_id", user.id) // escludo l'utente corrente
            .maybeSingle()

        if (phoneError) {
            console.error("Errore controllo telefono:", phoneError)
            return { error: phoneError }
        }
        if (phoneExists) {
            return { error: { message: "Numero di telefono già registrato" } }
        }
    }

    // ✅ Se passa i controlli, aggiorno/inserisco
    const { data, error } = await supabase
        .from("public_users")
        .upsert([
            {
                auth_user_id: user.id,
                email: finalEmail,
                name,
                surname,
                phone: finalPhone,
                role: "customer",
                reg_complete: true,
            }
        ], { onConflict: "auth_user_id" })
        .select()

    if (error) {
        console.error("❌ Errore Supabase:", error)
        return { error }
    }

    return { data }
}
