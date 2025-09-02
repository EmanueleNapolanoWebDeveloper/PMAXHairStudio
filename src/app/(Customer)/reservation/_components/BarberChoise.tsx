'use client'
import { Profile, Reservation } from '@/src/lib/types'

export type BarberChoiseProps = {
  employees: Profile[] | null
  selecetedEmployee: Profile | null
  setBarber: (value: Profile | null) => void
  reservations: Reservation[]
  setReservations: (value: Reservation[]) => void
  loading: boolean
}

export default function BarberChoise({
  selecetedEmployee,
  setBarber,
  employees,
  reservations,
  setReservations,
  loading
}: BarberChoiseProps) {

  const handleSelect = (id: string) => {
    const selectedBarber = employees?.find(b => b.id === id) || null
    setBarber(selectedBarber)

    if (!selectedBarber) {
      setReservations([])
      return
    }

    const filteredReservations = reservations
      .filter(r => r.barber_id === selectedBarber.id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setReservations(filteredReservations)
  }
  

  return (
    <div>
      <label className="block text-black font-semibold mb-2">
        Scegli il barbiere
      </label>

      {loading ? (
        <div className="flex flex-col gap-2">
          {/* skeleton per la select */}
          <div className="h-10 w-full bg-white rounded-lg animate-pulse shadow-md shadow-red-300"></div>

          {/* testo animato */}
          <p className="text-sm font-medium text-red-600 animate-pulse">
            Stiamo caricando i dati...
          </p>
        </div>
      ) : (
        <select
          value={selecetedEmployee?.id || ''}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full border rounded-lg p-2 text-black"
          required
        >
          <option value="">-- Seleziona --</option>
          {employees?.map(e => (
            <option key={e.id} value={e.id}>
              {e.name} {e.surname}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
