"use server"
import { createClient } from "@/utils/supabase/server";

// LOGICA SERVIZI
export type Service = {
    id: number
    title: string
    time: string
    price: string
}

export async function getServices(): Promise<Service[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from<Service>("services")
        .select("*")
        .order("title", { ascending: true })

    if (error) {
        console.error("Errore caricamento servizi:", error)
        return []
    }

    return data || []
}


// LOGICA PRENOTAZIONE
type ReservationData = {
    user_id: string;
    barber: string;
    date: string;
    start_time: string;
    services: string[];
    duration: number; // in minuti
};

export async function createReservation({
    barber,
    date,
    start_time,
    services,
    duration
}: ReservationData) {
    const supabase = await createClient();

    // verifica inserimento orario
    console.log(start_time);
    
    // Calcolo end_time
    const [hour, minute] = start_time.split(":").map(Number);    
    let totalMinutes = hour * 60 + minute + duration;
    console.log('Totale minuti:', totalMinutes);
    
    const endHour = Math.floor(totalMinutes / 60);
    console.log(endHour);
    
    const endMinute = totalMinutes % 60;
    console.log(endMinute);
    
    const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;

    console.log('EndTime' , endTime);


    const { data, error } = await supabase
        .from("reservations")
        .insert([{
            barber: barber,
            date,
            start: start_time,
            end: endTime,
            services
        }])
        .select();

    if (error) {
        console.error("Errore prenotazione:", error);
        return { error };
    }

    return { data };
}
