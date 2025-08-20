'use client'
import { useState } from 'react'

export type barberChoiseType = {
    barber: string,
    onChange: (value: string) => void,
    barbers: string[]
}
export default function BarberChoise({ barber, onChange, barbers }) {
    
    return (
        <div>
            <label className="block text-black font-semibold mb-2">
                Scegli il barbiere
            </label>
            <select
                value={barber}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg p-2 text-black"
                required
            >
                <option value="">-- Seleziona --</option>
                {barbers.map((b) => (
                    <option key={b} value={b}>
                        {b}
                    </option>
                ))}
            </select>
        </div>)
}