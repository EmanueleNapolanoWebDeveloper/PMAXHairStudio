'use client'

import React from 'react';
import { Clock, User, Calendar, Play, CheckCircle, XCircle, AlertCircle, Euro } from 'lucide-react';
import { Reservation } from '@/src/lib/types';

type AppointmentCardProp = {
    reservation: Reservation;
}

const AppointmentCard = ({ reservation }: AppointmentCardProp) => {

    const getStatusConfig = (status: string) => {
        const configs = {
            denied: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle, bgGlow: "" },
            in_progress: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock, bgGlow: "" },
            confirmed: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle, bgGlow: "" },
            pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock, bgGlow: "" },
            completed: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle, bgGlow: "" },
        };
        return configs[status] || configs['in_progress'];
    };

    const statusConfig = getStatusConfig(reservation.status);
    const StatusIcon = statusConfig.icon;

    const getSideBarColor = (status: string) => {
        const colors = {
            denied: 'bg-red-400',
            in_progress: 'bg-blue-400',
            confirmed: 'bg-green-400',
            pending: 'bg-yellow-400',
            completed: 'bg-green-600'
        };
        return colors[status] || colors['in_progress'];
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-4">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
                {/* Barra laterale stato */}
                <div className={`w-full sm:w-2 sm:h-auto ${getSideBarColor(reservation.status)}`}></div>

                {/* Contenuto principale */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6">

                    {/* Informazioni orario */}
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3 min-w-[80px] text-center">
                            <Calendar className="w-4 h-4 text-gray-500 mb-1" />
                            <span className="font-medium text-gray-900">{reservation.start_time}</span>
                            <span className="text-xs text-gray-500">{reservation.end_time}</span>
                        </div>
                    </div>

                    {/* Cliente e servizi */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {reservation.logged_id.name} {reservation.logged_id.surname}
                                </p>
                                <p className="text-sm text-gray-700 truncate">{reservation.services}</p>
                            </div>
                        </div>

                        {/* Prezzo e stato */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-green-50 rounded-xl px-3 py-2">
                                <Euro className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">{reservation.amount}</span>
                            </div>

                            <div className={`flex items-center px-3 py-2 border rounded-xl ${statusConfig.color} font-medium`}>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                <span className="text-sm capitalize">{reservation.status.replace('_', ' ')}</span>
                            </div>

                            {reservation.status === 'confirmed' && (
                                <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-xl font-medium text-sm">
                                    <Play className="w-4 h-4 mr-1" />
                                    Inizia
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
