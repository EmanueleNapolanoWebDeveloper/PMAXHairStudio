'use client'

import { useState } from 'react'
import BarberChoise from './_components/BarberChoise'
import ServicesChoise from './_components/ServicesChoise'
import DataChoise from './_components/DataChoise'
import TimeChoise from './_components/TimeChoise'

export default function ReservationPage() {
    const [barber, setBarber] = useState('')
    const [services, setServices] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')


    const availableBarbers = ['Mario', 'Luca', 'Giovanni']
    const availableServices = ['Taglio', 'Barba', 'Shampoo', 'Colore']

    const toggleService = (service) => {
        setServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            barber,
            services,
            date,
            time,
        })
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
                    <ServicesChoise services={services} onToggle={toggleService} availableServices={availableServices}/>

                    {/* Date */}
                    <DataChoise date={date} onChange={setDate}/>

                    {/* Time */}
                    <TimeChoise />

                    {/* Summary */}


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
