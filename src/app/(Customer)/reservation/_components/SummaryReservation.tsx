import { GuestType, Profile, Service } from "@/src/lib/types"

export type SummaryReservationType = {
  customer?: Profile
  barber: Profile | null
  services: Service[]
  date: string
  time: string
  totalPrice: number
  guest?: GuestType
}

export default function SummaryReservation({ customer, barber, services, date, time, totalPrice, guest }: SummaryReservationType) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-black">
      <h3 className="font-bold mb-2">Riepilogo</h3>
      {customer && <p><strong>Cliente:</strong> {customer.name} {customer.surname}</p>}
      {guest && <p><strong>Cliente:</strong> {guest.name} {guest.surname}</p>}
      <p><strong>Barbiere:</strong> {barber?.name} {barber?.surname || 'Nessuno'}</p>
      <p><strong>Servizi:</strong> {services.length > 0 ? services.map(s => s.title).join(', ') : 'Nessuno'}</p>

      <p><strong>Data:</strong> {date || 'Non selezionata'}</p>
      <p><strong>Orario:</strong> {time || 'Non selezionato'}</p>
      <p><strong>Prezzo totale:</strong> {totalPrice}€</p>
    </div>
  )
}
