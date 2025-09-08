'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'
import SummaryReservation from './_components/SummaryReservation'
import { createReservation, getAllReservations, getEmployees, getServices } from '@/src/lib/actions'
import { useAuth } from '@/src/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Profile, Reservation, Service, GuestType } from '@/src/lib/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/src/utils/supabase/client'
import GuestForm from '../../(dashboard)/staff-dash/_components/_addReservation/_components/GuestForm'

export default function ReservationPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { profile } = useAuth()

  // Utility per oggi
  const getToday = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  type TimeSlot = { start_time: string; end_time: string }

  // States
  const [guest, setGuest] = useState<GuestType | null>({
    name: '',
    surname: '',
    phone: '',
    email: ''
  })
  const [barber, setBarber] = useState<Profile | null>(null)
  const [barberRes, setBarberRes] = useState<Reservation[]>([])
  const [timeResBarber, setTimeResBarber] = useState<TimeSlot[]>([])
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [activeTab, setActiveTab] = useState('Barba')
  const [date, setDate] = useState(getToday())
  const [time, setTime] = useState('')
  const [note, setNote] = useState<string>('')
  const [isWorkingDay, setIsWorkingDay] = useState(true)

  // Queries
  const reservationsQuery = useQuery({
    queryKey: ['reservations'],
    queryFn: () => getAllReservations(),
  })


  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployees()
  })

  const servicesQuery = useQuery({
    queryKey: ['services'],
    queryFn: () => getServices(),
    onSuccess: (data) => {
      if (data.length > 0) setActiveTab(data[0].category)
    }
  })

  // Mutation per creare prenotazione
  const createReservationMutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success('Prenotazione creata con successo!')
      // ✅ Invalida le query per aggiornare i dati
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      // reset form
      setSelectedServices([])
      setDate(getToday())
      setTime('')
      router.push('/')
    },
    onError: (error: Error) => {
      console.error(error)
      toast.error(error.message || 'Errore durante la prenotazione. Riprova.')
    }
  })

  // Funzioni
  const toggleService = (service: Service) => {
    setSelectedServices(prev =>
      prev.some(s => s.title === service.title)
        ? prev.filter(s => s.title !== service.title)
        : [...prev, service]
    )
  }

  const totalPrice = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.price, 0),
    [selectedServices]
  )

  const totalDuration = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.time, 0),
    [selectedServices]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!barber) return

    createReservationMutation.mutate({
      logged_id: profile?.id,
      guest_datas: {
        name: guest?.name,
        surname: guest?.surname,
        phone: guest?.phone,
        email: guest?.email
      },
      barber_id: barber.id,
      services: selectedServices,
      date,
      start_time: time,
      note: note,
      isGuest: profile ? false : true
    })
  }

  const isFormValid = barber && selectedServices.length > 0 && date && time

  // ✅ Setup Real-time subscriptions - VERSIONE CORRETTA
  // Setup Real-time subscriptions - VERSIONE CORRETTA
  useEffect(() => {
    let channel: any = null

    const setupRealtime = async () => {
      try {
        const supabase = createClient() // Rimosso await - createClient() è sincrono

        console.log('🔄 Configurazione real-time in corso...')

        channel = supabase
          .channel('reservations_channel') // Nome univoco per il canale
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'appuntamenti'
            },
            (payload) => {
              console.log('📥 Nuova prenotazione ricevuta:', payload.new)

              // Aggiorna la cache delle reservations con la query key corretta
              queryClient.setQueryData<Reservation[]>(['reservations'], (oldData = []) => {
                const exists = oldData.some(r => r.id === payload.new.id)
                if (exists) return oldData

                return [...oldData, payload.new as Reservation]
              })

              // Aggiorna lo stato locale se necessario
              setBarberRes(prev => {
                const exists = prev.some(r => r.id === payload.new.id)
                if (exists) return prev

                // Se la nuova prenotazione è dello stesso barbiere, aggiungila
                if (barber && payload.new.barber_id === barber.id) {
                  return [...prev, payload.new as Reservation].sort(
                    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
                  )
                }
                return prev
              })
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'appuntamenti'
            },
            (payload) => {
              console.log('📝 Prenotazione aggiornata:', payload.new)

              // Usa la query key corretta
              queryClient.setQueryData<Reservation[]>(['reservations'], (oldData = []) =>
                oldData.map(r => r.id === payload.new.id ? payload.new as Reservation : r)
              )

              setBarberRes(prev =>
                prev.map(r => r.id === payload.new.id ? payload.new as Reservation : r)
              )
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'DELETE',
              schema: 'public',
              table: 'appuntamenti'
            },
            (payload) => {
              console.log('🗑️ Prenotazione eliminata:', payload.old)

              // Usa la query key corretta
              queryClient.setQueryData<Reservation[]>(['reservations'], (oldData = []) =>
                oldData.filter(r => r.id !== payload.old.id)
              )

              setBarberRes(prev => prev.filter(r => r.id !== payload.old.id))
            }
          )
          .subscribe((status) => {
            console.log('Real-time status:', status)
            if (status === 'SUBSCRIBED') {
              console.log('✅ Real-time subscriptions attive!')
            } else if (status === 'CHANNEL_ERROR') {
              console.error('❌ Errore nella subscription real-time')
            } else if (status === 'TIMED_OUT') {
              console.warn('⏰ Timeout nella subscription real-time')
            } else if (status === 'CLOSED') {
              console.log('🔌 Canale real-time chiuso')
            }
          })

      } catch (error) {
        console.error('❌ Errore setup real-time:', error)
      }
    }

    // Configura real-time solo se i dati iniziali sono caricati
    if (reservationsQuery.data) {
      setupRealtime()
    }

    // Cleanup function
    return () => {
      if (channel) {
        console.log('🔌 Chiusura canale real-time')
        channel.unsubscribe()
        channel = null
      }
    }
  }, [queryClient, barber?.id, reservationsQuery.data])

  // ✅ Aggiorna barberRes quando cambiano le reservations o il barbiere selezionato
  useEffect(() => {
    if (barber && reservationsQuery.data) {
      const filteredReservations = reservationsQuery.data
        .filter(r => r.barber_id === barber.id)
        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

      setBarberRes(filteredReservations)
    } else {
      setBarberRes([])
    }
  }, [barber, reservationsQuery.data])

  // Loader stato query
  if (reservationsQuery.isLoading || employeesQuery.isLoading || servicesQuery.isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <p className="ml-3">Caricamento dati...</p>
      </section>
    )
  }

  if (reservationsQuery.isError || employeesQuery.isError || servicesQuery.isError) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Errore durante il caricamento dei dati.</p>
      </section>
    )
  }


  return (
    <section className="min-h-screen py-5">
      <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mt-[7rem]">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {profile ? (
            <>
              <span>Benvenuto {profile.name}</span> <br />
            </>

          ) : (
            <>
              <span>Benvenuto</span> <br />
            </>)}
          Prenota il tuo appuntamento
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* GUEST */}
          {!profile && (
            <GuestForm guest={guest} onGuestChange={setGuest} />
          )}

          <BarberChoise
            selecetedEmployee={barber}
            employees={employeesQuery.data || []}
            setBarber={setBarber}
            reservations={reservationsQuery.data || []}
            setReservations={setBarberRes}
            loading={employeesQuery.isLoading}
          />

          <ServicesChoise
            services={selectedServices}
            onToggle={toggleService}
            allServices={servicesQuery.data || []}
            loading={servicesQuery.isLoading}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <DataChoise
            isStaff={false}
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

          <div>
            <div className="w-full">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Note
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Aggiungi eventuali note sulla prenotazione..."
                className="w-full rounded-lg border border-gray-300 shadow-sm p-3 text-sm text-gray-900 
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                Queste note saranno visibili solo allo staff.
              </p>
            </div>
          </div>
          <SummaryReservation
            barber={barber}
            services={selectedServices}
            date={date}
            time={time}
            totalPrice={totalPrice}
          />


          <button
            type="submit"
            disabled={!isFormValid || createReservationMutation.isPending}
            className={`w-full py-3 rounded-lg transition ${!isFormValid || createReservationMutation.isPending
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
              }`}
          >
            {createReservationMutation.isPending
              ? 'Creando prenotazione...'
              : 'Conferma Prenotazione'}
          </button>

        </form>
      </div>
    </section>
  )
}