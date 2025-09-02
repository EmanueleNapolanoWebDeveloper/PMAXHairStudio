'use client'

import { Eye } from "lucide-react";


export default function PreviewReservationsStaff({ todayAppointments, getStatusIcon, getStatusColor }) {
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
                        {todayAppointments.map((appointment, index) => {
                            const StatusIcon = getStatusIcon(appointment.status);
                            return (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                                            <span className="text-xs text-gray-500">{appointment.duration}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium text-gray-900 truncate">{appointment.client}</p>
                                                {appointment.status === 'in_corso' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{appointment.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 flex-shrink-0">
                                        <span className="text-sm font-semibold text-green-600">{appointment.amount}</span>
                                        <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                            <StatusIcon className="w-3 h-3 mr-1" />
                                            <span className="hidden sm:inline">{appointment.status.replace('_', ' ')}</span>
                                        </span>
                                        {appointment.status === 'prossimo' && (
                                            <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors">
                                                Inizia
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}