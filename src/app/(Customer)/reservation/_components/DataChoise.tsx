'use client'
import { Reservation } from "@/src/lib/types"
import { useState, useEffect, useCallback } from "react"
import { DayPicker, Matcher } from "react-day-picker"
import "react-day-picker/dist/style.css"

const FESTIVALS = [
  "2025-01-01", "2025-01-06", "2025-04-25", "2025-05-01",
  "2025-06-02", "2025-08-15", "2025-11-01", "2025-12-08",
  "2025-12-25", "2025-12-26"
].map(d => new Date(d))

export type DataChoiseType = {
  isStaff: boolean
  date: string
  onChange: (date: string) => void
  setTimeResBarber: (timeResBarber: Reservation[]) => void
  resBarber: Reservation[]
  barberId?: string
  setIsWorkingDay: (isWorking: boolean) => void // ✅ Fixed: boolean invece di function
}

export default function DataChoise({
  isStaff,
  date,
  onChange,
  setTimeResBarber,
  resBarber,
  barberId,
  setIsWorkingDay
}: DataChoiseType) {

  const [selected, setSelected] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  )

  // ✅ Funzione per verificare se un giorno è feriale
  const isWorkingDay = useCallback((d: Date) => {
    const day = d.getDay()
    const isWeekend = day === 0 || day === 1 // domenica/lunedì
    const isFestival = FESTIVALS.some(f => f.toDateString() === d.toDateString())
    return !isWeekend && !isFestival
  }, [])

  // ✅ Aggiorna isWorkingDay quando selected cambia
  useEffect(() => {
    if (selected) {
      setIsWorkingDay(isWorkingDay(selected))
    }
  }, [selected, setIsWorkingDay, isWorkingDay])

  // ✅ Funzione per filtrare le prenotazioni
  const filterReservations = useCallback((barberId: string, date: string) => {
    const filtered = resBarber.filter(r => {
      if (!r.barber_id) return false; // sicurezza

      const id = typeof r.barber_id === 'string' ? r.barber_id : r.barber_id.id;

      return id === barberId && r.date === date;
    });

    setTimeResBarber(filtered);
  }, [resBarber, setTimeResBarber]);

  // ✅ Filtro solo quando barberId o date cambiano
  useEffect(() => {
    if (barberId && date) {
      filterReservations(barberId, date)
    }
  }, [barberId, date, filterReservations])

  // ✅ Trova il prossimo giorno feriale a partire da today o date (se serve)
  const getNextWorkingDay = useCallback((fromDate: Date) => {
    const d = new Date(fromDate)
    while (!isWorkingDay(d)) {
      d.setDate(d.getDate() + 1)
    }
    return d
  }, [isWorkingDay])

  const today = new Date()

  // ✅ Handler per selezione data
  const handleSelect = useCallback((day: Date | undefined) => {
    if (!day || !isWorkingDay(day)) return

    setSelected(day)

    const yyyy = day.getFullYear()
    const mm = String(day.getMonth() + 1).padStart(2, "0")
    const dd = String(day.getDate()).padStart(2, "0")
    const formattedDate = `${yyyy}-${mm}-${dd}`

    onChange(formattedDate)

    if (barberId) {
      filterReservations(barberId, formattedDate)
    }
  }, [isWorkingDay, onChange, barberId, filterReservations])

  // ✅ Matcher per disabilitare weekend
  const disableWeekDays: Matcher = useCallback((date : Date) => {
    const day = date.getDay()
    return day === 0 || day === 1
  }, [])

  return (
    <div className="w-full">
      <label className="block text-black font-semibold mb-2">Data</label>
      <div className="border rounded-lg overflow-hidden flex items-center justify-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          disabled={[
            { before: today },
            disableWeekDays,
            ...FESTIVALS
          ]}
          className="bg-white text-black p-2 rounded-lg"
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: "bg-black text-white rounded-full",
            disabled: "text-gray-400 cursor-not-allowed",
            today: "border border-black"
          }}
          footer={
            selected
              ? `Selezionato: ${selected.toLocaleDateString('it-IT')}`
              : "Seleziona una data"
          }
        />
      </div>
    </div>
  )
}