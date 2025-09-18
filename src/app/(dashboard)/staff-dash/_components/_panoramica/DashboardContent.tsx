'use client'

import { useState } from 'react'
import { Calendar, UserCheck, Euro, Star } from 'lucide-react'
import WelcomeStaffSection from './WelcomeSection'
import PreviewReservationsStaff from './PreviewReservationsStaff'
import RecentlyReviews from './RecentlyReviews'
import WeeklyPerformance from './WeeklyPerformance'
import { Reservation, Reviews } from '@/src/lib/types'
import NextAppointment from './NextAppointment'
import InProgressReservation from './ReservationInCorso'

type DashBoardContentProps = {
    getStatusIcon: (status: string) => React.ElementType;
    getStatusColor: (status: string) => string;
    reservations: Reservation[] | undefined; // può essere undefined finché React Query carica
    reviews: Reviews[]
}

export default function DashboardContent({ getStatusIcon, getStatusColor, reservations, reviews }: DashBoardContentProps) {

    const [nextAppointment, setNextAppointment] = useState<Reservation | null>(null);

    const today = new Date()
    const todayFormatted = today.toISOString().split('T')[0] // "2025-09-03"

    const todayReservations = reservations?.filter((reservation: Reservation) =>
        reservation.date === todayFormatted
    );


    return (
        <>

            <div className="w-full h-full p-4 flex flex-col gap-2">
                <WelcomeStaffSection todayAppointments={todayReservations?.length} />

                {/* Appuntamento in corso */}
                <InProgressReservation reservations={reservations}/>

                {/* next appointment */}
                <NextAppointment reservations={reservations} />

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
                        <RecentlyReviews reviews={reviews} />
                        <WeeklyPerformance reservations={reservations} />
                    </div>
                </div>
            </div>
        </>
    )
}
