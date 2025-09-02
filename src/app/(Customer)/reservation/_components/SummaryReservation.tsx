import { Profile } from "../actions"
import { Service } from "./ServicesChoise"

export type SummaryReservationType = {
  barber: Profile | null
  services: Service[]
  date: string
  time: string
  totalPrice: number
}

export default function SummaryReservation({ barber, services, date, time, totalPrice }: SummaryReservationType) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-black">
      <h3 className="font-bold mb-2">Riepilogo</h3>
      <p><strong>Barbiere:</strong> {barber?.name || 'Nessuno'}</p>
      <p><strong>Servizi:</strong> {services.length > 0 ? services.map(s => s.title).join(', ') : 'Nessuno'}</p>

      <p><strong>Data:</strong> {date || 'Non selezionata'}</p>
      <p><strong>Orario:</strong> {time || 'Non selezionato'}</p>
      <p><strong>Prezzo totale:</strong> {totalPrice}€</p>
    </div>
  )
}
