
'use client'

import { useState } from 'react'    

const availableTimes = ['09:00', '10:00', '11:00', '15:00', '16:00']

export default function TimeChoise() {
        const [time, setTime] = useState('')
    
    return (
        <div>
            <label className="block text-black font-semibold mb-2">
                Orario disponibile
            </label>
            <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((t) => (
                    <button
                        type="button"
                        key={t}
                        onClick={() => setTime(t)}
                        className={`p-2 rounded-lg border text-black ${time === t ? 'bg-gray-200 border-black' : 'bg-white border-gray-300'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    )
}