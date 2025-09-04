'use client'

import { useState } from 'react'
import { Calendar, UserCheck, Euro, Star } from 'lucide-react'
import WelcomeStaffSection from './WelcomeSection'
import PreviewReservationsStaff from './PreviewReservationsStaff'
import RecentlyCustomers from './RecentlyCustomers'
import WeeklyPerformance from './WeeklyPerformance'
import { Reservation } from '@/src/lib/types'
import NextAppointment from './NextAppointment'
import InProgressReservation from './ReservationInCorso'

type DashBoardContentProps = {
    getStatusIcon: (status: string) => React.ElementType;
    getStatusColor: (status: string) => string;
    reservations: Reservation[] | undefined; // può essere undefined finché React Query carica
}

export default function DashboardContent({ getStatusIcon, getStatusColor, reservations }: DashBoardContentProps) {

    const [nextAppointment, setNextAppointment] = useState<Reservation | null>(null);


    const today = new Date()
    const todayFormatted = today.toISOString().split('T')[0] // "2025-09-03"

    const todayReservations = reservations.filter((reservation: Reservation) =>
        reservation.data === todayFormatted
    );

    // Determina il prossimo appuntamento



    const todayStats = [
        { title: 'Appuntamenti Oggi', value: todayReservations.length, change: '+1', icon: Calendar, color: 'bg-red-600' },
        { title: 'Clienti Serviti', value: todayReservations.filter((reservations: Reservation) => reservations.status === 'completed').length, change: 'in corso', icon: UserCheck, color: 'bg-gray-800' },
        { title: 'Guadagno Oggi', value: '€120', change: '+€25', icon: Euro, color: 'bg-red-500' },
        { title: 'Rating Medio', value: '4.9', change: '+0.1', icon: Star, color: 'bg-black' },
    ]

    const recentClients = [
        { name: 'Marco Rossi', lastVisit: 'Oggi', totalVisits: 12, favorite: true, phone: '3401234567' },
        { name: 'Luigi Bianchi', lastVisit: '2 giorni fa', totalVisits: 8, favorite: false, phone: '3401234568' },
    ]

    return (
        <>

            <div className="w-full h-full p-4 flex flex-col gap-2">
                <WelcomeStaffSection todayAppointments={todayReservations.length} />

                {/* Appuntamento in corso */}
                <InProgressReservation reservations={reservations}/>

                {/* next appointment */}
                <NextAppointment reservations={reservations}/>

                {/* Griglia principale */}
                <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
                    <div className="col-span-6 lg:col-span-4">
                        <PreviewReservationsStaff
                            todayReservations={todayReservations}
                            getStatusIcon={getStatusIcon}
                            getStatusColor={getStatusColor}
                        />
                    </div>

                    <div className="col-span-6 lg:col-span-2 space-y-6">
                        <RecentlyCustomers recentClients={recentClients} />
                        <WeeklyPerformance reservations={reservations} />
                    </div>
                </div>
            </div>
        </>
    )
}
