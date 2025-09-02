'use server'

import { Profile } from "@/src/lib/types"
import { createClient } from "@/src/utils/supabase/server"


// GET USER 
export async function getUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.log('Errore nel fetch User:', error);
        return null;
    }

    return data
}


// COMPLETE REGISTRATION

type CompleteRegistrationProps = {
    userID: string
    data: Profile
}

// Function
export async function CompleteRegistration({ userID, data }: CompleteRegistrationProps) {

    // check profilo già esistente

    try {
        const supabase = await createClient()

        const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id,phone,email')
            .or(`email.eq.${data.email?.toLowerCase().trim()},phone.eq.${data.phone?.replace(/\s/g, '')}`)
            .neq('id', userID) // Esclude il profilo corrente

        if (checkError) {
            console.error('Errore controllo duplicati:', checkError)
            return { error: 'Errore durante la verifica dei dati' }
        }

        if (existingProfile && existingProfile.length > 0) {
            const duplicateEmail = existingProfile.find(p => p.email === data.email?.toLowerCase().trim())
            const duplicatePhone = existingProfile.find(p => p.phone === data.phone?.replace(/\s/g, ''))

            if (duplicateEmail && duplicatePhone) {
                return { error: 'duplicate: Email e telefono già registrati' }
            } else if (duplicateEmail) {
                return { error: 'duplicate email: Questa email è già registrata' }
            } else if (duplicatePhone) {
                return { error: 'duplicate phone: Questo numero di telefono è già registrato' }
            }
        }

        // Se ok continua a inserire profile
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
        }

        return { success: true }

    } catch (error: any) {
        console.error("Errore nella registrazione:", error)
        return { error: error.message || 'Errore durante la registrazione' }
    }
}

// FETCH ALL PROFILES// ✅ Versione function declaration
export async function fetchProfile(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()

    if (error) throw error
    return data
}
