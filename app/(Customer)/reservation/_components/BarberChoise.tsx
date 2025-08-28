'use client'
import { useState, useEffect } from 'react'
import { getEmployees, EmployeeProfile } from '../actions'
import { Reservation } from '@/lib/types/homepage'

export type BarberChoiseProps = {
  barber: EmployeeProfile | null
  onChange: (value: EmployeeProfile) => void
  reservationsLvlDwn: Reservation[]
  setReservations: ((value: any[]) => void | undefined)
}

export default function BarberChoise({ barber, onChange, reservationsLvlDwn, setReservations }: BarberChoiseProps) {
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

    if (!selectedBarber) {
      setReservations([])
      return
    }

    // filtriamo le prenotazioni del barber selezionato
    const filteredReservations = reservationsLvlDwn
      .filter(r => r.barber_id === selectedBarber.id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setReservations(filteredReservations)
    console.log(filteredReservations)
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
