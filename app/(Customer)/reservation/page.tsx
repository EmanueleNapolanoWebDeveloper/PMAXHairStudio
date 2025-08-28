'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise, { Service } from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'
import SummaryReservation from './_components/SummaryReservation'
import { createReservation, EmployeeProfile } from './actions'
import { useAuth } from '@/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { Reservation } from '@/lib/types/homepage'

export default function ReservationPage() {

  // test
  type TimeSlot = {
    start_time: string; // es: "10:00"
    end_time: string;   // es: "10:30"
  };

  const [reservations, setReservations] = useState<any[]>([])
  const [barberRes, setBarberRes] = useState<Reservationt[]>([]) // salvo tutte le res del barber selezionato
  const [timeResBarber, setTimeResBarber] = useState<TimeSlot | null>(null)


  useEffect(() => {
    const fecthReservations = async () => {
      try {
        const supabase = await createClient()
        const { data, error } = await supabase.from('reservations').select('*');
        setReservations(data)
      } catch (error) {
        console.log(error);
        return []
      }
    }
    fecthReservations()
  }, [])


  const [barber, setBarber] = useState<EmployeeProfile | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const { profile } = useAuth()
  const router = useRouter()

  const totalPrice = useMemo(() => services.reduce((acc, s) => acc + s.price, 0), [services])
  const totalDuration = useMemo(() => services.reduce((acc, s) => acc + s.time, 0), [services])

  // FUNCTIONS
  // toggle per i servizi
  const toggleService = (service: Service) => {
    setServices(prev =>
      prev.some(s => s.title === service.title)
        ? prev.filter(s => s.title !== service.title)
        : [...prev, service]
    )
  }

  //filtro per data e barbiere


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!barber) return
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const result = await createReservation({
        barber_id: barber.id,
        services,
        date,
        start_time: time
      })

      if (result.error) {
        setSubmitMessage('Errore durante la prenotazione. Riprova.')
        toast.error('Errore durante la prenotazione. Riprova.')
      } else {
        setSubmitMessage('Prenotazione creata con successo!')
        toast.success('Prenotazione creata con successo!')
        setBarber(null)
        setServices([])
        setDate('')
        setTime('')
        router.push('/')
      }
    } catch {
      setSubmitMessage('Errore durante la prenotazione. Riprova.')
      toast.error('Errore durante la prenotazione. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // CONSOLE LOG
  

  const isFormValid = barber && services.length > 0 && date && time

  return (
    <section className="min-h-screen py-5">
      <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mt-[7rem]">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Prenota il tuo appuntamento</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BarberChoise barber={barber} onChange={setBarber} reservationsLvlDwn={reservations} setReservations={setBarberRes} />
          <ServicesChoise services={services} onToggle={toggleService} />
          <DataChoise date={date} onChange={setDate} setTimeResBarber={setTimeResBarber} resBarber={barberRes} barberId={barber?.id}/>
          <TimeChoise time={time} onChange={setTime} barber={barber} date={date} timeSlots={timeResBarber} />
          <SummaryReservation barber={barber} services={services} date={date} time={time} totalPrice={totalPrice} />

          {submitMessage && (
            <div className={`p-3 rounded-lg text-center ${submitMessage.includes('successo') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage}
            </div>
          )}

          {profile ? (
            <button type="submit" disabled={!isFormValid || isSubmitting} className={`w-full py-3 rounded-lg transition ${!isFormValid || isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
              {isSubmitting ? 'Creando prenotazione...' : 'Conferma Prenotazione'}
            </button>
          ) : (
            <Link href="/login" className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition text-center">Accedi per prenotare</Link>
          )}
        </form>
      </div>
    </section>
  )
}
