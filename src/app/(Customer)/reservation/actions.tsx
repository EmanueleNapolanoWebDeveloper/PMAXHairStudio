"use server"
import { createClient } from "@/src/utils/supabase/server"
import { Profile, Reservation, Service } from "@/src/lib/types";



export async function createReservation({ barber_id, date, start_time, services }: Reservation) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error("Utente non autenticato")

  const totalPrice = services.reduce((acc, s) => acc + (s.price || 0), 0)
  const totalDuration = services.reduce((acc, s) => acc + (s.time || 0), 0)

  // Funzione helper per generare intervalli di tempo a step di 30 minuti
  const generateTimeSlots = (start: string, totalMinutes: number, step = 30) => {
    const [h, m] = start.split(":").map(Number)
    const slots: string[] = []
    let minutes = h * 60 + m
    const endMinutes = minutes + totalMinutes

    while (minutes < endMinutes) {
      const hour = Math.floor(minutes / 60)
      const minute = minutes % 60
      slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
      minutes += step
    }
    return slots
  }

  const durationArray = generateTimeSlots(start_time, totalDuration, 30)

  // Calcolo orario di fine
  const lastSlot = durationArray[durationArray.length - 1]
  const [lastHour, lastMinute] = lastSlot.split(":").map(Number)
  const endTotalMinutes = lastHour * 60 + lastMinute + 30
  const endHour = Math.floor(endTotalMinutes / 60)
  const endMinute = endTotalMinutes % 60
  const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`

  // --- Controllo sovrapposizioni ---
  const { data: existingReservations, error: fetchError } = await supabase
    .from("reservations")
    .select("start_time, end_time")
    .eq("barber_id", barber_id)
    .eq("date", date)

  if (fetchError) throw new Error("Errore nel recupero delle prenotazioni esistenti")

  if (existingReservations && existingReservations.length > 0) {
    const hasOverlap = existingReservations.some((r: any) => {
      const existingSlots = generateTimeSlots(
        r.start_time,
        (parseInt(r.end_time.split(":")[0]) * 60 + parseInt(r.end_time.split(":")[1])) -
        (parseInt(r.start_time.split(":")[0]) * 60 + parseInt(r.start_time.split(":")[1]))
      )
      return durationArray.some(slot => existingSlots.includes(slot))
    })

    if (hasOverlap) {
      throw new Error("Il tuo servizio si sovrappone con una prenotazione esistente. Riprova con un altro orario.")
    }
  }

  // --- Inserimento prenotazione ---
  const { data, error: insertError } = await supabase
    .from("reservations")
    .insert([{
      customer_id: user.id,
      barber_id,
      date,
      start_time,
      end_time: endTime,
      services: services.map(s => s.title),
      total_price: totalPrice
    }])
    .select()

  if (insertError) throw new Error(insertError.message)

  return data
}






export async function getEmployees(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "employee")
  if (error) return []
  return data
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("title", { ascending: true })
  if (error) return []
  return data || []
}


export async function getReservations(): Promise<Reservation[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("reservations")
    .select("*")

  if (error) {
    console.error("Errore fetch reservations:", error.message)
    return []
  }

  return data ?? []
}
