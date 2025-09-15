'use server'

import { createClient } from "@/src/utils/supabase/server"

type LoginEmailPasswordProps = {
    email: string,
    password: string,
    name: string,
    surname: string,
    phone: string
    role?: 'customer' | 'employee' | 'admin' // Rendi opzionale con default
}

export async function SignUpEmailPassword({
    email,
    password,
    name,
    surname,
    phone,
    role = 'customer' // Default value
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
            return { error: "Il numero di telefono deve contenere esattamente 10 cifre" }
        }

        const supabase = await createClient()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name.trim(),
                    surname: surname.trim(),
                    phone: phone.trim(),
                    role,
                    reg_complete: true
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            }
        })

        if (error) {

            console.log('ciao', error);


            // Gestisci errori specifici
            switch (error.message) {
                case 'Errore duplicate key value violates unique constraint "profiles_phone_key"':
                    return { error: "Un account con questo numero di telefono esiste già" }
                case 'user_already_exists':
                    return { error: "Un account con questa email esiste già" }
                case 'weak_password':
                    return { error: "La password è troppo debole" }
                case 'invalid_email':
                    return { error: "Formato email non valido" }
                case 'anonymous_provider_disabled':
                    return { error: "Registrazione temporaneamente non disponibile. Riprova più tardi." }
                default:
                    return { error: error.message || "Errore durante la registrazione" }
            }
        }

        if (!data.user) return { error: "Errore durante la creazione dell'utente" }

        const { data: profile, error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            phone: phone.trim(),
            role,
            reg_complete: true,
            is_Admin: false
        })

        if (profileError) return { error: profileError.message }


        return {
            success: true,
            data,
            message: data.user?.email_confirmed_at
                ? "Registrazione completata con successo!"
                : "Registrazione completata! Controlla la tua email per confermare l'account."
        }

    } catch (error) {
        console.error("Errore imprevisto nella registrazione:", error)
        return { error: "Errore imprevisto durante la registrazione" }
    }
}