'use client'

import { useState } from 'react'

type TimeChoiceProps = {
    time: string
    onChange: (t: string) => void
}

export default function TimeChoise({ time, onChange }: TimeChoiceProps) {
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

    const morningSlots = generateSlots('08:30', '14:00')
    const afternoonSlots = generateSlots('15:00', '20:00')

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
                {displayedSlots.map((t) => (
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
                ))}
            </div>
        </div>
    )
}
