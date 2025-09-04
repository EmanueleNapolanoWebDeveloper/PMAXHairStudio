'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from '@/src/app/(Customer)/reservation/_components/BarberChoise'
import ServicesChoise from '@/src/app/(Customer)/reservation/_components/ServicesChoise'
import DataChoise from '@/src/app/(Customer)/reservation/_components/DataChoise'
import TimeChoise from '@/src/app/(Customer)/reservation/_components/TimeChoise'
import SummaryReservation from '@/src/app/(Customer)/reservation/_components/SummaryReservation'
import GuestForm from './GuestForm'
import { createStaffReservation, getStaffIDAppointments, getEmployees, getServices } from '@/src/lib/actions'
import { useAuth } from '@/src/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Profile, Reservation, Service } from '@/src/lib/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/src/utils/supabase/client'
import ExampleUsage from './LoggedSearchBar'
import CustomerSearchBar from './LoggedSearchBar'

export default function ReviewStaffReservation() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { user, profile } = useAuth()

    // Utility per oggi
    const getToday = () => {
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const dd = String(today.getDate()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
    }

    type TimeSlot = { start_time: string; end_time: string }
    type GuestType = { name: string; surname: string; phone: string; email: string }

    // Stato interno
    const [guest, setGuest] = useState<GuestType>({
        name: '',
        surname: '',
        phone: '',
        email: ''
    })
    const [isGuestBooking, setIsGuestBooking] = useState(false) // Per decidere se è prenotazione guest
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
        queryKey: ['reservations', user?.id],
        queryFn: () => getStaffIDAppointments(user?.id),
        enabled: !!user?.id,
    })

    const employeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: () => getEmployees(),
    })

    const servicesQuery = useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
        onSuccess: (data) => {
            if (data && data.length > 0) {
                setActiveTab(data[0].category)
            }
        }
    })

    // Il barbiere è l'utente loggato (staff/admin)
    const barber = useMemo(() => {
        return employeesQuery.data?.find(emp => emp.id === user?.id)
    }, [employeesQuery.data, user?.id])

    // Mutation per creare prenotazione
    const createReservationMutation = useMutation({
        mutationFn: (newReservation: {
            barber_id: string,
            services: Service[],
            date: string,
            start_time: string,
            note: string,
            isGuest: boolean,
            guest_datas?: GuestType
        }) => createStaffReservation(newReservation),
        onSuccess: () => {
            toast.success('Prenotazione creata con successo!')
            queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] })
            // Reset form
            setSelectedServices([])
            setDate(getToday())
            setTime('')
            setNote('')
            setGuest({ name: '', surname: '', phone: '', email: '' })
            setIsGuestBooking(false)
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
        if (!user?.id || !barber) return

        // Validazioni aggiuntive per guest
        if (isGuestBooking) {
            if (!guest.name || !guest.surname || !guest.phone) {
                toast.error('Per prenotazioni guest sono obbligatori: Nome, Cognome e Telefono')
                return
            }

            // Validazione email se fornita
            if (guest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) {
                toast.error('Formato email non valido')
                return
            }

            // Validazione telefono
            if (!/^\d{10,}$/.test(guest.phone.replace(/\s/g, ''))) {
                toast.error('Il numero di telefono deve contenere almeno 10 cifre')
                return
            }
        }

        createReservationMutation.mutate({
            barber_id: user.id,
            services: selectedServices,
            date,
            start_time: time,
            note,
            isGuest: isGuestBooking,
            ...(isGuestBooking && { guest_datas: guest })
        })
    }

    // Validazione form
    const isFormValid = useMemo(() => {
        const basicValid = user?.id && selectedServices.length > 0 && date && time

        if (!basicValid) return false

        if (isGuestBooking) {
            return guest.name.trim() !== '' &&
                guest.surname.trim() !== '' &&
                guest.phone.trim() !== ''
        }

        return !!profile // Se non è guest, deve essere loggato
    }, [user?.id, selectedServices, date, time, isGuestBooking, guest, profile])

    // Setup Real-time subscriptions
    useEffect(() => {
        let channel: any = null

        const setupRealtime = async () => {
            try {
                const supabase = createClient()
                console.log('🔄 Configurazione real-time in corso...')

                channel = supabase
                    .channel('reservations_channel')
                    .on(
                        'postgres_changes',
                        {
                            event: 'INSERT',
                            schema: 'public',
                            table: 'appuntamenti'
                        },
                        (payload) => {
                            console.log('📥 Nuova prenotazione ricevuta:', payload.new)

                            queryClient.setQueryData<Reservation[]>(['reservations', user?.id], (oldData = []) => {
                                const exists = oldData.some(r => r.id === payload.new.id)
                                if (exists) return oldData
                                return [...oldData, payload.new as Reservation]
                            })

                            if (barber && payload.new.barber_id === barber.id) {
                                setBarberRes(prev => {
                                    const exists = prev.some(r => r.id === payload.new.id)
                                    if (exists) return prev
                                    return [...prev, payload.new as Reservation].sort(
                                        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
                                    )
                                })
                            }
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

                            queryClient.setQueryData<Reservation[]>(['reservations', user?.id], (oldData = []) =>
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

                            queryClient.setQueryData<Reservation[]>(['reservations', user?.id], (oldData = []) =>
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
                        }
                    })

            } catch (error) {
                console.error('❌ Errore setup real-time:', error)
            }
        }

        if (reservationsQuery.data && user?.id) {
            setupRealtime()
        }

        return () => {
            if (channel) {
                console.log('🔌 Chiusura canale real-time')
                channel.unsubscribe()
            }
        }
    }, [queryClient, barber?.id, reservationsQuery.data, user?.id])

    // Aggiorna barberRes quando cambiano le reservations o il barbiere selezionato
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

    // Loading states
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

    if (!barber) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">Barbiere non trovato. Assicurati di essere loggato come staff.</p>
            </section>
        )
    }

    return (
        <section className="min-h-screen w-full py-5">
            <div className="bg-white rounded-2xl shadow-md ">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Prenota appuntamento - {barber.name} {barber.surname}
                </h2>

                {/* Toggle per tipo di prenotazione */}
                <div className="mb-6 flex justify-center">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setIsGuestBooking(false)}
                            className={`px-4 py-2 rounded-md transition ${!isGuestBooking
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Cliente registrato
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsGuestBooking(true)}
                            className={`px-4 py-2 rounded-md transition ${isGuestBooking
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Cliente guest
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Guest - mostrato solo se isGuestBooking è true */}
                    {isGuestBooking && (
                        <GuestForm
                            guest={guest}
                            onGuestChange={setGuest}
                        />
                    )}

                    {!isGuestBooking && (
                        <CustomerSearchBar />
                    )}


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

                    {/* Note */}
                    <div>
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Note (opzionale)
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

                    <SummaryReservation
                        barber={barber}
                        services={selectedServices}
                        date={date}
                        time={time}
                        totalPrice={totalPrice}
                        guest={isGuestBooking ? guest : undefined}
                    />

                    {/* Bottone di submit */}
                    {(profile || isGuestBooking) ? (
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