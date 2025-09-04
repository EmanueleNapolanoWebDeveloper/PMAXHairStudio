'use client'
import { Clock, User, Scissors, Calendar, Plus, Phone, MapPin, Car } from 'lucide-react';
import TopHeader from './_components/TopHeader';
import DateHeader from './_components/DateHeader';
import ReservationSlot from './_components/ReservationSlot';
import CardStats from './_components/CardStats';
import { getStaffIDAppointments } from '@/src/lib/actions';
import { useAuth } from '@/src/app/store/AuthContext';
import { useState } from 'react';
import TimeLine from './_components/TimeLine';
import { Profile } from '@/src/lib/types';
import { useQuery } from '@tanstack/react-query';

export type Appointments = {
    id: number;
    start_time: string;
    end_time: string;
    customer: {
        id: string;
        name: string;
        surname: string;
        phone: string;
    };
    services: string[];
    phone: string;
    price: number;
    status: string;
    barber_id: string;
    date : Date;
}

const BarberCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // Hook per auth
    const { user, profile } = useAuth();

    // Query per gli appuntamenti
    const { 
        data: appointments = [], 
        isLoading, 
        isError, 
        error,
        refetch 
    } = useQuery({
        queryKey: ['appointments', user?.id],
        queryFn: async () => {
            if (!user?.id) {
                return [];
            }
            const appointmentsFetched = await getStaffIDAppointments(user.id);
            return appointmentsFetched || [];
        },
        enabled: !!user?.id, // Esegui solo se hai l'ID utente
        staleTime: 5 * 60 * 1000, // 5 minuti
        gcTime: 10 * 60 * 1000, // 10 minuti (era cacheTime)
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Caricamento appuntamenti...</p>
                    <p className="text-sm text-gray-500 mt-1">Un momento per favore</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <Clock className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-lg font-medium">Ops! Qualcosa è andato storto</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {error?.message || 'Errore nel caricamento degli appuntamenti'}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => refetch()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Riprova
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                            Ricarica pagina
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Se non hai un utente
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-700">Accesso richiesto</p>
                    <p className="text-sm text-gray-500 mt-1">Devi essere loggato per vedere i tuoi appuntamenti</p>
                </div>
            </div>
        );
    }

    function handleDateSelect(data: Date) {
        setSelectedDate(data);
    }

    // Calcoli dopo il caricamento (ora appointments è sempre un array)
    const totalEarnings = appointments
        .filter(apt => apt.status === 'confirmed')
        .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const nextAppointment = appointments.find(apt => apt.status === 'confirmed');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <TopHeader barber={profile} />

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Date Header */}
                <DateHeader 
                    nextAppointment={nextAppointment} 
                    selectedDate={selectedDate} 
                    setSelectedData={handleDateSelect} 
                />

                {/* Timeline */}
                <TimeLine appointment={appointments} date={selectedDate} />

            </div>

            {/* Refresh Button (opzionale) */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => refetch()}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    title="Aggiorna appuntamenti"
                >
                    <Clock className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default BarberCalendar;