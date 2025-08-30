'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'
import SummaryReservation from './_components/SummaryReservation'
import { createReservation, getReservations, getEmployees, getServices } from './actions'
import { useAuth } from '@/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Profile, Reservation, Service } from '@/lib/types/homepage'

export default function ReservationPage() {

  const getToday = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // TYPES
  type TimeSlot = {
    start_time: string
    end_time: string
  }

  // STATES
  const [loadingEmployee, setLoadingEmployee] = useState<boolean>(false)

  // reservation
  const [reservations, setReservations] = useState<Reservation[]>([]) // tutte le res
  const [barberRes, setBarberRes] = useState<Reservation[]>([]) // tutte le res del barber selezionato
  const [timeResBarber, setTimeResBarber] = useState<TimeSlot[]>([]) // time slots disponibili del barber

  // Employee
  const [barbers, setBarbers] = useState<Profile[]>([]) // tutti i barber
  const [barber, setBarber] = useState<Profile | null>(null) // barber selezionato

  // services
  const [loading, setLoading] = useState(true)
  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [activeTab, setActiveTab] = useState('')
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [date, setDate] = useState(getToday())
  const [time, setTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isWorkingDay, setIsWorkingDay] = useState(true)

  // hooks
  const { profile } = useAuth()
  const router = useRouter()

  // fetching reservations
  useEffect(() => {
    setLoadingEmployee(true)
    const fetchReservations = async () => {
      try {
        const fetchedReservations = await getReservations()
        setReservations(fetchedReservations)
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
        setLoadingEmployee(false)
      } finally {
        setLoadingEmployee(false)
      }
    }
    fetchReservations()
  }, [])

  // fetching employees
  useEffect(() => {
    setLoadingEmployee(true)
    const getBarbers = async () => {
      try {
        const fetchingBarbers = await getEmployees()
        setBarbers(fetchingBarbers)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
          setLoadingEmployee(false)
        }
      } finally {
        setLoadingEmployee(false)
      }
    }
    getBarbers()
  }, [])

  useEffect(() => {
    getServices()
      .then((data: Service[]) => {
        setAvailableServices(data)
        if (data.length > 0) setActiveTab(data[0].category)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // functions
  const totalPrice = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.price, 0),
    [selectedServices]
  )
  const totalDuration = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.time, 0),
    [selectedServices]
  )

  // toggle per i servizi
  const toggleService = (service: Service) => {
    setSelectedServices(prev =>
      prev.some(s => s.title === service.title)
        ? prev.filter(s => s.title !== service.title)
        : [...prev, service]
    )
  }

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!barber) return
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const result = await createReservation({
        barber_id: barber.id,
        services : selectedServices,
        date,
        start_time: time
      })

      if (result.error) {
        setSubmitMessage(result.error)
        toast.error(result.error)
      } else {
        setSubmitMessage('Prenotazione creata con successo!')
        toast.success('Prenotazione creata con successo!')

        // reset sicuro
        setSelectedServices([])
        setDate(getToday())
        setTime('')
        router.push('/')
      }
    } catch(error : any) {
      setSubmitMessage('Errore durante la prenotazione. Riprova.')
      console.log(error);
      
      toast.error('Errore durante la prenotazione. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // TESTING AREA
  console.log('selezionato:', barber);


  const isFormValid = barber && selectedServices.length > 0 && date && time

  return (
    <section className="min-h-screen py-5">
      <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mt-[7rem]">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Prenota il tuo appuntamento
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BarberChoise
            selecetedEmployee={barber}
            employees={barbers}
            setBarber={setBarber}
            reservations={reservations}
            setReservations={setBarberRes}
            loading={loadingEmployee}
          />
          <ServicesChoise services={selectedServices} onToggle={toggleService} allServices={availableServices} loading={loading} setActiveTab={setActiveTab} activeTab={activeTab}/>
          <DataChoise
            date={date}
            onChange={setDate}
            setTimeResBarber={setTimeResBarber}
            resBarber={barberRes}
            barberId={barber?.id}
            setIsWorkingDay={setIsWorkingDay}
          />
          <TimeChoise
            time={time}
            onChange={setTime}
            barber={barber}
            date={date}
            timeSlots={timeResBarber}
            isWorkingDay={isWorkingDay}

          />
          <SummaryReservation
            barber={barber}
            services={selectedServices}
            date={date}
            time={time}
            totalPrice={totalPrice}
          />

          {submitMessage && (
            <div
              className={`p-3 rounded-lg text-center ${submitMessage.includes('successo')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}
            >
              {submitMessage}
            </div>
          )}

          {profile ? (
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 rounded-lg transition ${!isFormValid || isSubmitting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              {isSubmitting ? 'Creando prenotazione...' : 'Conferma Prenotazione'}
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition text-center"
            >
              Accedi per prenotare
            </Link>
          )}
        </form>
      </div>
    </section>
  )
}
