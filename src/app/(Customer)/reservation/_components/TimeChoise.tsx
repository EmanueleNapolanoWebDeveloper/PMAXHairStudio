'use client'

import { Profile } from '@/src/lib/types'
import { useState } from 'react'

export type ReservationSlot = {
  start_time: string // es: "18:30:00"
  end_time: string   // es: "19:30:00"
}

type TimeChoiceProps = {
  barber: Profile | null
  date: string
  time: string
  onChange: (t: string) => void
  timeSlots?: ReservationSlot[]
  isWorkingDay: boolean
}

export default function TimeChoice({ barber, date, time, onChange, timeSlots, isWorkingDay }: TimeChoiceProps) {
  const [activeTab, setActiveTab] = useState<'morning' | 'afternoon'>('morning')

  if (!barber || !date || !isWorkingDay) {
    return (
      <div className="max-w-md mx-auto p-6 text-center border rounded-lg border-gray-300 bg-gray-50">
        <p className="text-gray-500 mb-2">
          Seleziona prima un barbiere e una data per visualizzare gli orari disponibili.
        </p>
        <p className="text-sm text-gray-400">
          I slot saranno mostrati qui una volta effettuata la selezione.
        </p>
      </div>
    )
  }

  // Genera slot ogni 30 minuti
  const generateSlots = (start: string, end: string) => {
    const slots: string[] = []
    let [hour, minute] = start.split(':').map(Number)

    while (`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}` <= end) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
      minute += 30
      if (minute === 60) {
        minute = 0
        hour++
      }
    }

    return slots
  }

  const morningSlots = generateSlots('08:30', '13:30')
  const afternoonSlots = generateSlots('15:00', '20:00')
  const displayedSlots = activeTab === 'morning' ? morningSlots : afternoonSlots

  // Controlla se uno slot è disponibile
  const isSlotAvailable = (slot: string) => {

    const today = new Date()
    const selectedDate = new Date(date)
    const isToday = today.toDateString() === selectedDate.toDateString()

    // Se è oggi, controlla se lo slot è nel passato
    if (isToday) {
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

      // Se lo slot è già passato, disabilitalo
      if (slot < currentTime) {
        return false
      }
    }
    
    if (!timeSlots || timeSlots.length === 0) return true
    const slotTime = slot + ':00' // aggiungiamo secondi
    return !timeSlots.some(res => slotTime >= res.start_time && slotTime < res.end_time)
  }

  return (
    <div className="max-w-md mx-auto">
      <label className="block text-black font-semibold mb-2">Orario disponibile</label>

      {/* Tab buttons */}
      <div className="flex mb-4 border-b border-gray-300">
        <button
          type="button"
          onClick={() => setActiveTab('morning')}
          className={`flex-1 py-2 font-semibold text-center transition ${activeTab === 'morning'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
            }`}
        >
          Mattina
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('afternoon')}
          className={`flex-1 py-2 font-semibold text-center transition ${activeTab === 'afternoon'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
            }`}
        >
          Pomeriggio
        </button>
      </div>

      {/* Slots */}
      <div className="grid grid-cols-3 gap-3">
        {displayedSlots.map(t => {
          const available = isSlotAvailable(t)
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              disabled={!available}
              className={`p-2 rounded-lg border text-black transition ${time === t
                  ? 'bg-black text-white border-black shadow'
                  : available
                    ? 'bg-white border-gray-300 hover:bg-gray-100'
                    : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                }`}
            >
              {t}
            </button>
          )
        })}
      </div>
    </div>
  )
}
