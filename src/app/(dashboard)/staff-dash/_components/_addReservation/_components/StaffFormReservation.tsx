'use client'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import GuestForm from './GuestForm'
import CustomerSearchBar from './LoggedSearchBar'
import ServicesChoise from '@/src/app/(Customer)/reservation/_components/ServicesChoise'
import DataChoise from '@/src/app/(Customer)/reservation/_components/DataChoise'
import TimeChoise from '@/src/app/(Customer)/reservation/_components/TimeChoise'
import SummaryReservation from '@/src/app/(Customer)/reservation/_components/SummaryReservation'

import { createReservation } from '@/src/lib/actions'
import { useAuth } from '@/src/app/store/AuthContext'
import { useStaffContext } from '@/src/app/store/StaffContext'
import { Service, Profile, Reservation } from '@/src/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type GuestType = { name: string; surname: string; phone: string; email: string }

export default function AddStaffReservation() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { user, refreshProfile } = useAuth()
    const { barberRes, timeResBarber: tempoResBarber, customers, services, barber, refreshReservations } = useStaffContext()

    // Stati locali
    const [selectedCustomer, setSelectedCustomer] = useState<Profile | null>(null)
    const [guest, setGuest] = useState<GuestType>({ name: '', surname: '', phone: '', email: '' })
    const [isGuestBooking, setIsGuestBooking] = useState(false)
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [date, setDate] = useState(() => {
        const today = new Date()
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    })
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const [isWorkingDay, setIsWorkingDay] = useState(true)
    const [activeTab, setActiveTab] = useState(services[0]?.category || 'Barba')
    const [timeResBarber, setTimeResBarber] = useState<Reservation[]>([])

    useEffect(() => {
        if (!tempoResBarber) {
            return
        }

        setTimeResBarber(tempoResBarber)
    }, [])

    // Toggle servizio
    const toggleService = (service: Service) => {
        setSelectedServices(prev =>
            prev.some(s => s.title === service.title)
                ? prev.filter(s => s.title !== service.title)
                : [...prev, service]
        )
    }

    const totalPrice = useMemo(() => selectedServices.reduce((acc, s) => acc + s.price, 0), [selectedServices])
    const totalDuration = useMemo(() => selectedServices.reduce((acc, s) => acc + s.time, 0), [selectedServices])

    // Mutation per creare prenotazione
    const createReservationMutation = useMutation({
        mutationFn: (newReservation: {
            logged_id: string | undefined
            barber_id: string
            services: Service[]
            date: string
            start_time: string
            note: string
            isGuest: boolean
            guest_datas?: GuestType
        }) => createReservation(newReservation),
        onSuccess: () => {
            toast.success('Prenotazione creata con successo!')
            refreshReservations()
            setSelectedServices([])
            setDate(() => {
                const today = new Date()
                return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
            })
            setTime('')
            setNote('')
            setGuest({ name: '', surname: '', phone: '', email: '' })
            setIsGuestBooking(false)
            setSelectedCustomer(null)
            refreshProfile()
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Errore durante la prenotazione. Riprova.')
        }
    })

    // Validazione form
    const isFormValid = useMemo(() => {
        const basicValid = user?.id && selectedServices.length > 0 && date && time
        if (!basicValid) return false
        if (isGuestBooking) {
            return guest.name.trim() !== '' && guest.surname.trim() !== '' && guest.phone.trim() !== ''
        }
        return !!selectedCustomer
    }, [user?.id, selectedServices, date, time, isGuestBooking, guest, selectedCustomer])

    // Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!barber || !user?.id) return

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

    if (!barber) {
        return <p className="text-red-600 text-center mt-10">Barbiere non trovato. Assicurati di essere loggato come staff.</p>
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
                            onClick={() => { setIsGuestBooking(false); setSelectedCustomer(null) }}
                            className={`px-4 py-2 rounded-md transition ${!isGuestBooking ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Cliente registrato
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsGuestBooking(true); setSelectedCustomer(null) }}
                            className={`px-4 py-2 rounded-md transition ${isGuestBooking ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Cliente guest
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isGuestBooking && <GuestForm guest={guest} onGuestChange={setGuest} />}
                    {!isGuestBooking && <CustomerSearchBar allProfiles={customers} selectedProfile={selectedCustomer} setSelectedProfile={setSelectedCustomer} />}

                    <ServicesChoise services={selectedServices} onToggle={toggleService} allServices={services} setActiveTab={setActiveTab} activeTab={activeTab} />
                    <DataChoise isStaff={true} date={date} onChange={setDate} setTimeResBarber={setTimeResBarber} resBarber={barberRes} barberId={user?.id} setIsWorkingDay={setIsWorkingDay} />
                    <TimeChoise time={time} onChange={setTime} barber={barber} date={date} timeSlots={timeResBarber} isWorkingDay={isWorkingDay} totalDuration={selectedServices.reduce((acc, s) => acc + s.time, 0)} />

                    <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Note (opzionale)</label>
                        <textarea id="note" rows={4} value={note} onChange={e => setNote(e.target.value)} placeholder="Aggiungi eventuali note..." className="w-full rounded-lg border border-gray-300 shadow-sm p-3 text-sm text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none" />
                        <p className="mt-2 text-xs text-gray-500">Queste note saranno visibili solo allo staff.</p>
                    </div>

                    <SummaryReservation customer={selectedCustomer || undefined} barber={barber} services={selectedServices} date={date} time={time} totalPrice={totalPrice} guest={isGuestBooking ? guest : undefined} />

                    <button type="submit" disabled={!isFormValid || createReservationMutation.isPending} className={`w-full py-3 rounded-lg transition ${!isFormValid || createReservationMutation.isPending ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
                        {createReservationMutation.isPending ? 'Creando prenotazione...' : 'Conferma Prenotazione'}
                    </button>
                </form>
            </div>
        </section>
    )
}
