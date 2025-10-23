'use server'

import { createClient } from "@/src/utils/supabase/server"

type LoginEmailPasswordProps = {
    email: string,
    password: string,
    name: string,
    surname: string,
    phone: string
}

export async function SignUpEmailPassword({
    email,
    password,
    name,
    surname,
    phone,
}: LoginEmailPasswordProps) {
    try {
        // Validazione input lato server
        if (!email || !password || !name || !surname || !phone) {
            return { error: "Tutti i campi sono obbligatori" }
        }

        if (password.length < 6) {
            return { error: "La password deve essere di almeno 6 caratteri" }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: "Formato email non valido" }
        }

        const phoneRegex = /^\d{9,11}$/;
        if (!phoneRegex.test(phone)) {
            return { error: "Il numero di telefono deve contenere dalle 9 alle 11 cifre" }
        }

        const supabase = await createClient()

        // . Controlla se l’email o il telefono esistono già in `profiles`
        const { data: existingProfile, error: existingError } = await supabase
            .from('profiles')
            .select('email, phone')
            .or(`email.eq.${email},phone.eq.${phone}`) // controllo multiplo
            .maybeSingle()

        if (existingError) {
            console.error("Errore nel controllo duplicati:", existingError)
            return { error: "Errore nel controllo dei dati esistenti" }
        }

        if (existingProfile) {
            if (existingProfile.email === email) {
                return { error: "Un account con questa email esiste già" }
            }
            if (existingProfile.phone === phone) {
                return { error: "Un account con questo numero di telefono esiste già" }
            }
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name.trim(),
                    surname: surname.trim(),
                    phone: phone.trim(),
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`
            }
        })

        if (error) {
            return { error: error.message }
        }

        if (!data.user) return { error: "Errore durante la creazione dell'utente" }

        const { data: profile, error: profileError } = await supabase.from('profiles').insert([{
            id: data.user.id,
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            phone: phone.trim(),
            reg_complete: true,
        }])
            .select()

        if (profileError) return { error: profileError.message }


        return {
            success: true,
            profile: profile?.[0],
            message: data.user?.email_confirmed_at
                ? "Registrazione completata con successo!"
                : "Registrazione completata! Controlla la tua email per confermare l'account."
        }

    } catch (error) {
        console.error("Errore imprevisto nella registrazione:", error)
        return { error: "Errore imprevisto durante la registrazione" }
    }
}