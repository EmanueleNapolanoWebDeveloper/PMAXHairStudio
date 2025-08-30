'use client'

import { useState } from 'react'

type Reservation = {
    start_time: string // "HH:mm"
    end_time: string   // "HH:mm"
}

type TimeChoiceProps = {
    time: string
    onChange: (t: string) => void
    reservations: Reservation[]
    duration: number // minuti totali dei servizi selezionati
}

export default function TimeChoice({ time, onChange, reservations, duration }: TimeChoiceProps) {
    const [activeTab, setActiveTab] = useState<'morning' | 'afternoon'>('morning')

    // funzione per generare slot ogni 30 minuti
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

    const isSlotAvailable = (slot: string) => {
        const slotStart = new Date(`2025-08-26T${slot}:00`) // puoi sostituire con data reale
        const slotEnd = new Date(slotStart.getTime() + duration * 60000)

        return reservations.every(r => {
            const resStart = new Date(`2025-08-26T${r.start_time}:00`)
            const resEnd = new Date(`2025-08-26T${r.end_time}:00`)
            return slotEnd <= resStart || slotStart >= resEnd // non si sovrappone
        })
    }

    const morningSlots = generateSlots('08:30', '14:00').filter(isSlotAvailable)
    const afternoonSlots = generateSlots('15:00', '20:00').filter(isSlotAvailable)
    const displayedSlots = activeTab === 'morning' ? morningSlots : afternoonSlots

    return (
        <div className="max-w-md mx-auto">
            <label className="block text-black font-semibold mb-2">Orario disponibile</label>

            {/* Tab buttons */}
            <div className="flex mb-4 border-b border-gray-300">
                <button
                    type="button"
                    onClick={() => setActiveTab('morning')}
                    className={`flex-1 py-2 font-semibold text-center transition ${
                        activeTab === 'morning'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500'
                    }`}
                >
                    Mattina
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('afternoon')}
                    className={`flex-1 py-2 font-semibold text-center transition ${
                        activeTab === 'afternoon'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500'
                    }`}
                >
                    Pomeriggio
                </button>
            </div>

            {/* Slots */}
            <div className="grid grid-cols-3 gap-3">
                {displayedSlots.length > 0 ? (
                    displayedSlots.map((t) => (
                        <button
                            type="button"
                            key={t}
                            onClick={() => onChange(t)}
                            className={`p-2 rounded-lg border text-black transition ${
                                time === t
                                    ? 'bg-black text-white border-black shadow'
                                    : 'bg-white border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {t}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3 text-center">Nessun orario disponibile</p>
                )}
            </div>
        </div>
    )
}
