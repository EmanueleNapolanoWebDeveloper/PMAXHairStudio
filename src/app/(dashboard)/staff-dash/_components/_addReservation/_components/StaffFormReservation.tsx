'use client'
import { useState, useMemo, useEffect } from 'react'
import BarberChoise from '@/src/app/(Customer)/reservation/_components/BarberChoise'
import ServicesChoise from '@/src/app/(Customer)/reservation/_components/ServicesChoise'
import DataChoise from '@/src/app/(Customer)/reservation/_components/DataChoise'
import TimeChoise from '@/src/app/(Customer)/reservation/_components/TimeChoise'
import SummaryReservation from '@/src/app/(Customer)/reservation/_components/SummaryReservation'
import GuestForm from './GuestForm'
import { createReservation, getStaffIDAppointments, getEmployees, getServices, fetchAllProfiles } from '@/src/lib/actions'
import { useAuth } from '@/src/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Profile, Reservation, Service } from '@/src/lib/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/src/utils/supabase/client'
import CustomerSearchBar from './LoggedSearchBar'



export default function AddStaffReservation({ reservations }: { reservations: Reservation[] }) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { user, profile, refreshProfile } = useAuth()

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

    // States
    const [selectedCustomer, setSelectedCustomer] = useState<Profile | null>(null)
    const [guest, setGuest] = useState<GuestType>({
        name: '',
        surname: '',
        phone: '',
        email: ''
    })
    const [isGuestBooking, setIsGuestBooking] = useState(false)
    const [barberRes, setBarberRes] = useState<Reservation[]>([])
    const [timeResBarber, setTimeResBarber] = useState<TimeSlot[]>([])
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [activeTab, setActiveTab] = useState('Barba')
    const [date, setDate] = useState(getToday())
    const [time, setTime] = useState('')
    const [note, setNote] = useState<string>('')
    const [isWorkingDay, setIsWorkingDay] = useState(true)

    // Query per le prenotazioni dello staff loggato

    const customersQuery = useQuery({
        queryKey: ['customers'],
        queryFn: () => fetchAllProfiles(),
        staleTime: 5 * 60 * 1000, // 5 minuti per i profili
    })

    const employeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: () => getEmployees(),
        staleTime: 10 * 60 * 1000, // 10 minuti per gli impiegati
    })

    const servicesQuery = useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
        staleTime: 10 * 60 * 1000, // 10 minuti per i servizi
        onSuccess: (data) => {
            if (data && data.length > 0) {
                setActiveTab(data[0].category)
            }
        }
    })

    // Il barbiere è l'utente loggato
    const barber = useMemo(() => {
        return employeesQuery.data?.find(emp => emp.id === user?.id)
    }, [employeesQuery.data, user?.id])

    // ✅ Mutation ottimizzata con invalidazione multipla
    const createReservationMutation = useMutation({
        mutationFn: (newReservation: {
            logged_id: string | undefined,
            barber_id: string,
            services: Service[],
            date: string,
            start_time: string,
            note: string,
            isGuest: boolean,
            guest_datas?: GuestType
        }) => createReservation(newReservation),
        onSuccess: () => {
            toast.success('Prenotazione creata con successo!')
            // ✅ Invalida tutte le query rilevanti
            queryClient.invalidateQueries({ queryKey: ['reservations'] })
            queryClient.invalidateQueries({ queryKey: ['all-reservations'] })
            queryClient.invalidateQueries({ queryKey: ['staff-appointments'] })

            // Reset form
            setSelectedServices([])
            setDate(getToday())
            setTime('')
            setNote('')
            setGuest({ name: '', surname: '', phone: '', email: '' })
            setIsGuestBooking(false)
            setSelectedCustomer(null)
            refreshProfile()
        },
        onError: (error: Error) => {
            console.error('Errore creazione prenotazione:', error)
            toast.error(error.message || 'Errore durante la prenotazione. Riprova.')
        }
    })

    // ✅ Realtime subscription ottimizzata


    // ✅ Aggiorna barberRes quando cambiano i dati
    useEffect(() => {
        if (!reservations || !user?.id) {
            setBarberRes([])
            return
        }

        console.log('reservations che ci sono:', reservations);


        const filteredReservations: Reservation[] = reservations
            .filter(r => {
                if (!r.barber_id) return false; // null o undefined
                if (typeof r.barber_id === 'string') {
                    return r.barber_id === user.id;
                } else {
                    return r.barber_id.id === user.id;
                }
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        console.log('filtered da StaffFormReservation: ',filteredReservations);


        setBarberRes(filteredReservations)
    }, [reservations, user?.id])

    // ✅ Aggiorna slot disponibili
    useEffect(() => {
        if (!barberRes.length) {
            setTimeResBarber([])
            return
        }

        const slots: TimeSlot[] = barberRes.map(r => ({
            start_time: r.start_time,
            end_time: r.end_time
        }))

        console.log("⏰ Aggiornamento slot temporali:", slots.length)
        setTimeResBarber(slots)
    }, [barberRes])

    // ✅ Funzioni resto del componente
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

        if (isGuestBooking) {
            if (!guest.name || !guest.surname || !guest.phone) {
                toast.error('Per prenotazioni guest sono obbligatori: Nome, Cognome e Telefono')
                return
            }
            if (guest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) {
                toast.error('Formato email non valido')
                return
            }
            if (!/^\d{10,}$/.test(guest.phone.replace(/\s/g, ''))) {
                toast.error('Il numero di telefono deve contenere almeno 10 cifre')
                return
            }
        } else if (!selectedCustomer) {
            toast.error('Seleziona un cliente registrato')
            return
        }

        console.log("📝 Creazione prenotazione per:", isGuestBooking ? guest : selectedCustomer)

        createReservationMutation.mutate({
            logged_id: isGuestBooking ? undefined : selectedCustomer?.id,
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
        return !!selectedCustomer
    }, [user?.id, selectedServices, date, time, isGuestBooking, guest, selectedCustomer])

    // Loading states
    if (reservations.isLoading || employeesQuery.isLoading || servicesQuery.isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <p className="ml-3">Caricamento dati...</p>
            </section>
        )
    }

    if (reservations.isError || employeesQuery.isError || servicesQuery.isError) {
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
        <section className="min-h-screen w-full p-2">
            <div className="bg-white rounded-2xl shadow-md p-3">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Prenota appuntamento - {barber.name} {barber.surname}
                </h2>


                {/* Toggle tipo prenotazione */}
                <div className="mb-6 flex justify-center">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setIsGuestBooking(false)
                                setSelectedCustomer(null)
                            }}
                            className={`px-4 py-2 rounded-md transition ${!isGuestBooking
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Cliente registrato
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsGuestBooking(true)
                                setSelectedCustomer(null)
                            }}
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
                    {isGuestBooking && (
                        <GuestForm guest={guest} onGuestChange={setGuest} />
                    )}

                    {!isGuestBooking && (
                        <CustomerSearchBar
                            allProfiles={customersQuery.data || []}
                            selectedProfile={selectedCustomer}
                            setSelectedProfile={setSelectedCustomer}
                        />
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
                        isStaff={true}
                        date={date}
                        onChange={setDate}
                        setTimeResBarber={setTimeResBarber}
                        resBarber={barberRes}
                        barberId={user?.id}
                        setIsWorkingDay={setIsWorkingDay}
                    />

                    <TimeChoise
                        time={time}
                        onChange={setTime}
                        barber={barber}
                        date={date}
                        timeSlots={timeResBarber}
                        isWorkingDay={isWorkingDay}
                        totalDuration={totalDuration}
                    />

                    {/* Note */}
                    <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                            Note (opzionale)
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Aggiungi eventuali note..."
                            className="w-full rounded-lg border border-gray-300 shadow-sm p-3 text-sm text-gray-900 
                            focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Queste note saranno visibili solo allo staff.
                        </p>
                    </div>

                    <SummaryReservation
                        customer={selectedCustomer || undefined}
                        barber={barber}
                        services={selectedServices}
                        date={date}
                        time={time}
                        totalPrice={totalPrice}
                        guest={isGuestBooking ? guest : undefined}
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