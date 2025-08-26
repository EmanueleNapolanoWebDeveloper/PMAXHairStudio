'use server'

import { createClient } from "@/utils/supabase/server"

export async function getUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('Errore nel fetch User:', error);
        return null;
    }

    return data.user
}

export async function getProfileUser({ id }: { id: string }) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()

    if (error) {
        console.log('Errore nel fetch User:', error);
        return null;
    }

    return data
}

export async function getBarber(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', id)
    .single()

    if (error) {
        console.log('Errore recupero barbiere:', error)
        return null
    }

    return data
}

export async function getUserReservations(id: string) {

    const supabase = await createClient()

    const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('customer_id', id)

    if (error) {
        console.log(error)
    }

    return (data)
}