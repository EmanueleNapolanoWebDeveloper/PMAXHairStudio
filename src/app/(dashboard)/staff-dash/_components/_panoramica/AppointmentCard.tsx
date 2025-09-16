'use client'

import React from 'react';
import { Clock, User, Calendar, Play, CheckCircle, XCircle, AlertCircle, Euro, Info } from 'lucide-react';
import { Reservation, Service } from '@/src/lib/types';

type AppointmentCardProp = {
    reservation: {
        logged_id: {
            name: string;
            surname: string;
            phone: string;
            email?: string;
        };
        barbrer_id: {
            name: string;
            surname: string;
            phone: string;
            email?: string;
        }
        id: string;
        services: string[];
        date: string;
        time: string;
        status: string;
        amount: number;
        guest_datas: string;
        start_time: string;
        end_time: string;
        note: string;
    };
}

// Configurazioni per gli stati
const STATUS_CONFIGS = {
    annullato: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: AlertCircle,
        sidebarColor: 'bg-red-400'
    },
    in_corso: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
        sidebarColor: 'bg-blue-400'
    },
    confermato: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        sidebarColor: 'bg-green-400'
    },
    prenotato: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: Clock,
        sidebarColor: 'bg-yellow-400'
    },
    completato: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        sidebarColor: 'bg-green-600'
    },
};

const AppointmentCard = ({ reservation }: AppointmentCardProp) => {
    const guest = JSON.parse(reservation.guest_datas);
    const statusConfig = STATUS_CONFIGS[reservation.status] || STATUS_CONFIGS['in_corso'];
    const StatusIcon = statusConfig.icon;

    // Componente per la sezione dell'orario
    const TimeSection = () => (
        <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3 min-w-[80px] text-center">
                <Calendar className="w-4 h-4 text-gray-500 mb-1" />
                <span className="font-medium text-gray-900">{reservation.start_time}</span>
                <span className="text-xs text-gray-500">{reservation.end_time}</span>
            </div>
        </div>
    );

    // Componente per le informazioni del cliente
    const CustomerInfo = () => (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                    {reservation.logged_id
                        ? `${reservation.logged_id.name} ${reservation.logged_id.surname}`
                        : `${guest?.name} ${guest?.surname}`
                    }
                </p>
            </div>
        </div>
    );

    const NotesBox = () => {
        return (
            <div className='w-full bg-red-200/50 p-2 rounded-lg'>
                {reservation.note ? (
                    <div className='min-h-[2rem] flex items-center space-x-2'>
                        <span><Info className="w-4 h-4 text-red-600" /></span>
                        <p className="text-sm text-gray-600">{reservation.note}</p>
                    </div>
                ) : (
                    <div className='min-h-[2rem] flex items-center space-x-2'>
                        <span><Info className="w-4 h-4 text-red-600" /></span>
                        <p className="text-sm text-gray-600">Nessuna Nota!</p>
                    </div>)}
            </div>
        )
    }

    // Componente per la lista dei servizi
    const ServicesList = () => (
        <div className="flex flex-col gap-2 mt-1">
            {Array.isArray(reservation?.services) && reservation.services.length > 0 ? (
                reservation.services.map((service, index) => (
                    <p key={index} className="text-sm text-gray-600">{service}</p>
                ))
            ) : (
                <p className="text-sm text-gray-400 italic">Nessun servizio selezionato</p>
            )}
        </div>
    );


    // Componente per prezzo e stato
    const PriceAndStatus = () => (
        <div className="flex items-center space-x-3">
            <PriceTag />
            <StatusBadge />
            {reservation.status === 'confirmed' && <StartButton />}
        </div>
    );

    // Componente per il prezzo
    const PriceTag = () => (
        <div className="flex items-center bg-green-50 rounded-xl px-3 py-2">
            <Euro className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">{reservation.amount}</span>
        </div>
    );

    // Componente per il badge dello stato
    const StatusBadge = () => (
        <div className={`flex items-center px-3 py-2 border rounded-xl ${statusConfig.color} font-medium`}>
            <StatusIcon className="w-4 h-4 mr-1" />
            <span className="text-sm capitalize">{reservation.status.replace('_', ' ')}</span>
        </div>
    );

    // Componente per il pulsante di avvio
    const StartButton = () => (
        <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-xl font-medium text-sm hover:bg-blue-600 transition-colors">
            <Play className="w-4 h-4 mr-1" />
            Inizia
        </button>
    );

    // Componente per la sidebar colorata
    const StatusSidebar = () => (
        <div className={`w-full sm:w-2 sm:h-auto ${statusConfig.sidebarColor}`}></div>
    );

    return (
        <div className="w-full max-w-3xl mx-auto my-4">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
                <StatusSidebar />

                <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6">
                    <TimeSection />

                    <div className="flex-1 flex flex-col space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                            <CustomerInfo />
                            <PriceAndStatus />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <ServicesList />
                        </div>
                        <NotesBox />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;