'use client'

import { User } from 'lucide-react';
import ClientInfo from './ClientInfo';
import { Reservation } from '@/src/lib/types';
import { deleteReservation } from '@/src/lib/actions';

type ReservationSlotType = {
    appointment: Reservation;
    appointmentsLenght: number;
}

export default function ReservationSlot({ appointment }: ReservationSlotType) {

    return (
        <div className="flex flex-col md:flex-row w-full">

            {/* Time Column (desktop only) */}
            <div className="hidden md:block w-20 flex-shrink-0 text-right pr-6">
                <div className="sticky top-4">
                    <div className="text-sm font-medium text-gray-900">{appointment.start_time}</div>
                    <div className="text-xs text-gray-500">{appointment.end_time}</div>
                </div>
            </div>

            {/* Timeline Line */}
            <div className="flex-shrink-0 md:flex md:flex-col items-center mr-6 mt-2 md:mt-0 hidden ">
                <div className={`w-3 h-3 rounded-full border-2 
                    ${appointment.status === 'completato' ? 'bg-green-500 border-green-500' :
                        appointment.status === 'prenotato' ? 'bg-yellow-500 border-yellow-500' :
                            appointment.status === 'annullato' ? 'bg-red-500 border-red-500' : 'border-gray-400'}`}>
                </div>
                <div className="hidden md:block w-px flex-1 bg-gray-200 mt-1"></div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <div
                    className={`bg-white rounded-lg shadow-sm border-l-4 p-4 sm:p-6
                        ${appointment.status === 'completato' ? 'border-l-green-500' :
                            appointment.status === 'prenotato' ? 'border-l-yellow-500' :
                                appointment.status === 'annullato' ? 'border-l-red-500' : 'border-l-gray-300'}
                    `}
                >
                    {/* Ora visibile in mobile dentro la card */}
                    <div className="md:hidden mb-3 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{appointment.start_time}</span>
                        <span>-</span>
                        <span>{appointment.end_time}</span>
                    </div>

                    <ClientInfo
                        client={appointment.logged_id || JSON.parse(appointment.guest_datas)}
                        services={appointment.services}
                        note={appointment.note}
                        price={appointment.amount}
                        status={appointment.status}
                        onDelete={() => deleteReservation(appointment.id)}
                    />
                </div>
            </div>
        </div>
    )
}
