import { createClient } from "@/utils/supabase/client";

export async function getEmployeeReservation(employeeID: string){
    const supabase = await createClient()
    const { data, error} = await supabase.from('reservations').select('*').eq('barber_id',employeeID ).order('date', { ascending: true })

    if(error){
        console.error("Errore caricamento employee:", error)
        return []
    }

    console.log('Appuntamenti caricati:', data);
    
    return data
}