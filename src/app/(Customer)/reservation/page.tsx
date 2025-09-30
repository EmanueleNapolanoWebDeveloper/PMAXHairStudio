'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'
import SummaryReservation from './_components/SummaryReservation'
import { createReservation, getAllReservations, getEmployees, getServices } from '@/src/lib/actions'
import { useAuth } from '@/src/app/store/AuthContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Profile, Reservation, Service, GuestType, ReservationFull } from '@/src/lib/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/src/utils/supabase/client'
import GuestForm from '../../(dashboard)/staff-dash/_components/_addReservation/_components/GuestForm'
import { RealtimeChannel } from '@supabase/supabase-js'
import { filter } from 'framer-motion/client'


export type TimeSlot = { start_time: string; end_time: string; date: string }


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


  // States
  const [guest, setGuest] = useState<GuestType>({
    name: '',
    surname: '',
    phone: '',
    email: ''
  })
  const [barber, setBarber] = useState<Profile | null>(null)
  const [barberRes, setBarberRes] = useState<ReservationFull[]>([])
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

  // ✅ Setup Real-time subscriptions 
  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    // Tipi corretti per i payload
    type PayloadInsert = { new: ReservationFull };
    type PayloadUpdate = { new: ReservationFull };
    type PayloadDelete = { old: { id: string; barber_id: { id: string }; date: string } }; // ⚠️ DELETE restituisce solo i campi base

    const updateQueryCache = (
      mutation: 'insert' | 'update' | 'delete',
      data: ReservationFull | { id: string }
    ) => {
      queryClient.setQueryData<ReservationFull[]>(['reservations'], (old = []) => {
        switch (mutation) {
          case 'insert':
          case 'update':
            const fullData = data as ReservationFull;
            return mutation === 'insert'
              ? old.some(r => r.id === fullData.id) ? old : [...old, fullData]
              : old.map(r => (r.id === fullData.id ? fullData : r));
          case 'delete':
            return old.filter(r => r.id !== data.id);
        }
      });
    };

    const updateBarberRes = (
      mutation: 'insert' | 'update' | 'delete',
      data: ReservationFull | { id: string; barber_id?: string }
    ) => {
      setBarberRes(prev => {
        switch (mutation) {
          case 'insert':
            const insertData = data as ReservationFull;
            if (prev.some(r => r.id === insertData.id)) return prev;
            if (barber && insertData.barber_id?.id === barber.id) {
              return [...prev, insertData].sort((a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
              );
            }
            return prev;
          case 'update':
            const updateData = data as ReservationFull;
            return prev.map(r => (r.id === updateData.id ? updateData : r));
          case 'delete':
            // ⚠️ Per DELETE usiamo solo l'ID
            return prev.filter(r => r.id !== data.id);
        }
      });
    };

    const setupRealtime = () => {
      const supabase = createClient();

      channel = supabase
        .channel('reservations_channel')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'appuntamenti' },
          (payload: PayloadInsert) => {
            console.log('📥 Nuova prenotazione:', payload.new);
            updateQueryCache('insert', payload.new);
            updateBarberRes('insert', payload.new);
          }
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'appuntamenti' },
          (payload: PayloadUpdate) => {
            console.log('📝 Prenotazione aggiornata:', payload.new);
            updateQueryCache('update', payload.new);
            updateBarberRes('update', payload.new);
          }
        )
        .subscribe(status => {
          console.log('Real-time status:', status);
        });
    };

    if (reservationsQuery.data) setupRealtime();

    return () => {
      if (channel) {
        console.log('🔌 Chiusura canale real-time');
        channel.unsubscribe();
        channel = null;
      }
    };
  }, [queryClient, barber, reservationsQuery.data]);


  // ✅ Aggiorna barberRes quando cambiano le reservations o il barbiere selezionato
  useEffect(() => {
    if (barber && reservationsQuery.data) {

      const filteredReservations: ReservationFull[] = (reservationsQuery.data || [])
        .filter(r => {
          if (!barber) return false;               // nessun barber selezionato
          if (!r.barber_id) return false;          // barber_id mancante
          const barberId = typeof r.barber_id === 'string' ? r.barber_id : r.barber_id.id;
          return barberId === barber.id;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log('filteredReservations:', filteredReservations);

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