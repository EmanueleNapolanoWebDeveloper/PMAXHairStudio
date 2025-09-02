import { createClient } from "@/src/utils/supabase/client";

export async function getEmployeeReservation(employeeID: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('reservations').select('*').eq('barber_id', employeeID).order('date', { ascending: true })

    if (error) {
        console.error("Errore caricamento employee:", error)
        return []
    }

    console.log('Appuntamenti caricati:', data);

    return data
}

export async function getAppointments(barber_id: string) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from("reservations")
        .select(`
    id,
    date,
    services,
    total_price,
    start_time,
    end_time,
    status,
    barber_id (
    id,
    name,
    surname),
    customer_id (
      id,
      name,
      surname,
      phone
    )
  `)
        .eq("barber_id", barber_id)
        .order("date", { ascending: true });

    if (error) {
        console.log("Errore caricamento appuntamenti:", error);
        return []
    }
    const user = data

    return user

}
