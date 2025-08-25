'use client'
import { useState, useEffect } from 'react'
import { getEmployees, EmployeeProfile } from '../actions'

export type BarberChoiseProps = {
  barber: EmployeeProfile | null
  onChange: (value: EmployeeProfile) => void
}

export default function BarberChoise({ barber, onChange }: BarberChoiseProps) {
  const [barbers, setBarbers] = useState<EmployeeProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEmployees()
      .then(setBarbers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (id: string) => {
    const selectedBarber = barbers.find(b => b.id === id) || null
    onChange(selectedBarber)
  }

  return (
    <div>
      <label className="block text-black font-semibold mb-2">
        Scegli il barbiere
      </label>
      <select
        value={barber?.id || ''}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={loading}
        className="w-full border rounded-lg p-2 text-black"
        required
      >
        <option value="">-- Seleziona --</option>
        {barbers.map(b => (
          <option key={b.id} value={b.id}>
            {b.name} {b.surname}
          </option>
        ))}
      </select>
    </div>
  )
}
