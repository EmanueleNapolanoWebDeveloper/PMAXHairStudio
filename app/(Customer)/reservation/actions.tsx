"use server"
import { createClient } from "@/utils/supabase/server"

export type Service = { id: number; title: string; time: number; price: number }
export type EmployeeProfile = { id: string; name: string; surname: string; phone: string; email: string; role: string; reg_complete: boolean }

export type ReservationData = {
  barber_id: string
  date: string
  start_time: string
  services: Service[]
}

export async function createReservation({ barber_id, date, start_time, services }: ReservationData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: "Utente non autenticato" }

  const totalPrice = services.reduce((acc, s) => acc + (s.price || 0), 0)
  const totalDuration = services.reduce((acc, s) => acc + (s.time || 0), 0)

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
  let endTime = start_time
  if (durationArray.length > 0) {
    const lastSlot = durationArray[durationArray.length - 1]
    const [lastHour, lastMinute] = lastSlot.split(":").map(Number)
    const endTotalMinutes = lastHour * 60 + lastMinute + 30
    const endHour = Math.floor(endTotalMinutes / 60)
    const endMinute = endTotalMinutes % 60
    endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`
  }

  try {
    const { data, error } = await supabase
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
    if (error) return { error }
    return { data }
  } catch (err: any) {
    return { error: err.message || "Errore imprevisto" }
  }
}

export async function getEmployees(): Promise<EmployeeProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from<EmployeeProfile>("profiles")
    .select("*")
    .eq("role", "employee")
  if (error) return []
  return data || []
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from<Service>("services")
    .select("*")
    .order("title", { ascending: true })
  if (error) return []
  return data || []
}
