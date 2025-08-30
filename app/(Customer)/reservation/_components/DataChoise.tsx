'use client'
import { Reservation } from "@/lib/types/homepage"
import { useState, useEffect } from "react"
import { DayPicker, Matcher } from "react-day-picker"
import "react-day-picker/dist/style.css"

const FESTIVALS = [
  "2025-01-01", "2025-01-06", "2025-04-25", "2025-05-01",
  "2025-06-02", "2025-08-15", "2025-11-01", "2025-12-08",
  "2025-12-25", "2025-12-26"
].map(d => new Date(d))

export type DataChoiseType = {
  date: string
  onChange: (date: string) => void
  setTimeResBarber: (timeResBarber: Reservation[]) => void
  resBarber: Reservation[]
  barberId?: string
}

export default function DataChoise({ date, onChange, setTimeResBarber, resBarber, barberId }: DataChoiseType) {
  const [selected, setSelected] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  )

  const filterReservations = (barberId: string, date: string) => {
    const filtered = resBarber
      .filter(r => r.barber_id === barberId && r.date === date)
      .map(r => ({ start_time: r.start_time, end_time: r.end_time }))
    setTimeResBarber(filtered)
  }

  // ✅ filtro solo quando barberId o date cambiano
  useEffect(() => {
    if (barberId && date) {
      filterReservations(barberId, date)
    }
  }, [barberId, date, resBarber])  

  const today = new Date()

  const handleSelect = (day: Date | undefined) => {
    if (!day) return

    setSelected(day)
    const yyyy = day.getFullYear()
    const mm = String(day.getMonth() + 1).padStart(2, "0")
    const dd = String(day.getDate()).padStart(2, "0")
    const formattedDate = `${yyyy}-${mm}-${dd}`
    onChange(formattedDate)

    if (barberId) {
      filterReservations(barberId, formattedDate)
    }
  }

  const disableWeekDays: Matcher = (date) => {
    const day = date.getDay()
    return day === 0 || day === 1
  }

  return (
    <div className="w-full">
      <label className="block text-black font-semibold mb-2">Data</label>
      <div className="border rounded-lg overflow-hidden flex items-center justify-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          disabled={[{ before: today }, disableWeekDays, ...FESTIVALS]}
          className="bg-white text-black p-2 rounded-lg"
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: "bg-black text-white rounded-full",
            disabled: "text-gray-400 cursor-not-allowed",
            today: "border border-black"
          }}
          footer={selected ? `Selezionato: ${selected.toLocaleDateString()}` : "Seleziona una data"}
        />
      </div>
    </div>
  )
}
