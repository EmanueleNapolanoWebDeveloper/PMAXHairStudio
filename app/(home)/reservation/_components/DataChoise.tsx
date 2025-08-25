"use client"
import { useState } from "react"
import { DayPicker, Matcher } from "react-day-picker"
import "react-day-picker/dist/style.css"

const FESTIVALS = [
  "2025-01-01", // Capodanno
  "2025-01-06", // Epifania
  "2025-04-25", // Festa della Liberazione
  "2025-05-01", // Festa dei lavoratori
  "2025-06-02", // Festa della Repubblica
  "2025-08-15", // Ferragosto
  "2025-11-01", // Ognissanti
  "2025-12-08", // Immacolata
  "2025-12-25", // Natale
  "2025-12-26"  // Santo Stefano
].map(d => new Date(d))

export type DataChoiseType = {
  date: string
  onChange: (date: string) => void
}

export default function DataChoise({ date, onChange }: DataChoiseType) {
  const [selected, setSelected] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  )

  const today = new Date()

  const handleSelect = (day: Date | undefined) => {
    setSelected(day)
    if (day) {
      const yyyy = day.getFullYear()
      const mm = String(day.getMonth() + 1).padStart(2, "0")
      const dd = String(day.getDate()).padStart(2, "0")
      onChange(`${yyyy}-${mm}-${dd}`)
    }
  }

  // Matcher per disabilitare domenica e lunedì
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
              ? `Selezionato: ${selected.toLocaleDateString()}`
              : "Seleziona una data"
          }
        />
      </div>
    </div>
  )
}
