'use client'

import { useEffect, useState } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'
import SummaryReservation from './_components/SummaryReservation'

import { createReservation, getServices } from './actions'
import { useAuth } from '@/app/store/AuthContext'

export default function ReservationPage() {
    const [barber, setBarber] = useState('')
    const [services, setServices] = useState([])
    const [availableServices, setAvailableServices] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    // GET RPOFILE
    const { profile } = useAuth()

    // GET SERVICES
    useEffect(() => {
        getServices()
            .then((data) => {
                setAvailableServices(data)
            })
            .catch((error) => {
                console.error('Errore caricamento servizi:', error)
            })
    }, [])
    const availableBarbers = ['Mario', 'Luca', 'Giovanni']


    const selectedServices = availableServices.filter(s => services.includes(s.title));
    const duration = selectedServices.reduce((sum, s) => sum + Number(s.time), 0);

    const toggleService = (service) => {
        setServices((prev) =>
            prev.includes(service.title)
                ? prev.filter((s) => s !== service.title)
                : [...prev, service.title]
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createReservation({ barber, services, date, start_time: time , duration : duration})

        } catch (error) {
            console.error('Errore creazione prenotazione:', error)
        }
    }

    return (
        <section>
            <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mt-[7rem]">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Prenota il tuo appuntamento
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Barber */}
                    <BarberChoise barber={barber} onChange={setBarber} barbers={availableBarbers} />

                    {/* Services */}
                    <ServicesChoise services={services} onToggle={toggleService} availableServices={availableServices} />

                    {/* Date */}
                    <DataChoise date={date} onChange={setDate} />

                    {/* Time */}
                    <TimeChoise time={time} onChange={setTime} />

                    {/* Summary */}
                    <SummaryReservation barber={barber} services={services} date={date} time={time} />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Conferma Prenotazione
                    </button>
                </form>
            </div>
        </section>

    )
}
