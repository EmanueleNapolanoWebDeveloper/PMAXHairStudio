'use client'

import { Eye } from "lucide-react";
import AppointmentCard from "./AppointmentCard";


export default function PreviewReservationsStaff({ todayReservations, getStatusIcon, getStatusColor }) {

    const orderedReservations = todayReservations.sort((a, b) => {
        const [hoursA, minutesA] = a.start_time.split(":").map(Number)
        const [hoursB, minutesB] = b.start_time.split(":").map(Number)

        return hoursA === hoursB
            ? minutesA - minutesB
            : hoursA - hoursB
    })

    return (
        <>
            <div className="xl:col-span-2 bg-white rounded-lg shadow">
                <div className="p-4 sm:p-6 border-b">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">I Miei Appuntamenti di Oggi</h3>
                        <button className="flex items-center text-red-600 hover:text-red-700 transition-colors text-sm">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Calendario</span>
                        </button>
                    </div>
                </div>
                <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                        {orderedReservations.map((appointment, index) => {
                            const StatusIcon = getStatusIcon(appointment.status);
                            return (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <AppointmentCard reservation={appointment} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}