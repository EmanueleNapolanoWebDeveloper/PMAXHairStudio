'use client'

import { Clock, User, Scissors, Calendar, Plus, Phone, MapPin } from 'lucide-react';
import ClientInfo from './ClientInfo';

type ReservationSlotType = {
    appointment: any;
    appointmentsLenght: number;
}

export default function ReservationSlot({ appointment, appointmentsLenght }: ReservationSlotType) {

    return (
        <>
            {/* Time Column */}
            <div className="w-20 flex-shrink-0 text-right pr-6">
                <div className="sticky top-4">
                    <div className="text-sm font-medium text-gray-900">{appointment.start_time}</div>
                    <div className="text-xs text-gray-500">{appointment.end_time}</div>
                </div>
            </div>

            {/* Timeline Line */}
            <div className="flex-shrink-0 flex flex-col items-center mr-6">
                <div className={`w-3 h-3 rounded-full border-2 ${appointment.status === 'confirmed' ? 'bg-green-500 border-green-500' :
                    appointment.status === 'pending' ? 'bg-yellow-500 border-yellow-500' :
                        'bg-gray-300 border-gray-300'
                    }`}></div>
                
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                {appointment.status === 'free' ? (
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer">
                        <div className="flex items-center justify-center text-gray-400 space-x-2">
                            <Plus className="w-5 h-5" />
                            <span className="font-medium">Slot Disponibile</span>
                        </div>
                    </div>
                ) : (
                    <div className={`bg-white rounded-lg shadow-sm border-l-4 p-6 ${appointment.status === 'confirmed' ? 'border-l-green-500' :
                        appointment.status === 'pending' ? 'border-l-yellow-500' : 'border-l-gray-300'
                        }`}>
                        <div className="flex items-start justify-between">
                            <div className="flex flex-wrap items-start space-x-4 w-full">
                                {/* Avatar */}
                                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-semibold">
                                    {appointment.avatar}
                                </div>

                                {/* Client Info */}
                                <ClientInfo
                                    client={appointment.customer_id}
                                    services={appointment.services}
                                    duration={appointment.end_time - appointment.start_time}
                                    price={appointment.total_price}
                                    status={appointment.status}
                                />
                            </div>


                        </div>
                    </div>
                )}
            </div>
        </>

    )
}