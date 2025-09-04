'use client'

import { useState, useEffect } from 'react';
import { Reservation } from '@/src/lib/types';
import { Clock, User, Scissors, Calendar, Phone, AlertCircle, CheckCircle, Square } from 'lucide-react';
import { updateReservationStatus } from '@/src/lib/actions'

interface InProgressReservationProps {
    reservations?: Reservation[];
    onCompleteAppointment?: (reservationId: string) => void;
}

export default function InProgressReservation({
    reservations = [],
}: InProgressReservationProps) {
    const [inProgressAppointment, setInProgressAppointment] = useState<Reservation | null>(null);
    const [elapsedTime, setElapsedTime] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    

    // Trova l'appuntamento in corso
    const findInProgressAppointment = (): Reservation | null => {
        const now = new Date();
        const todayFormatted = now.toISOString().split('T')[0];

        // Trova appuntamento in corso di oggi
        return reservations.find(r =>
            r.data === todayFormatted && r.status === 'in_corso'
        ) || null;
    };

    // Calcola tempo trascorso dall'inizio
    const calculateElapsedTime = (appointment: Reservation): string => {
        const now = new Date();
        const [hours, minutes] = appointment.start_time.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);

        const diffMs = now.getTime() - startTime.getTime();

        if (diffMs <= 0) return "0m";

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const remainingMinutes = diffMinutes % 60;

        if (diffHours > 0) {
            return `${diffHours}h ${remainingMinutes}m`;
        } else {
            return `${remainingMinutes}m`;
        }
    };

    // Aggiorna ogni minuto
    useEffect(() => {
        const updateAppointment = () => {
            const inProgress = findInProgressAppointment();
            setInProgressAppointment(inProgress);

            if (inProgress) {
                setElapsedTime(calculateElapsedTime(inProgress));
            }
        };

        updateAppointment();
        const interval = setInterval(updateAppointment, 60000);

        return () => clearInterval(interval);
    }, [reservations]);

    // Ottieni dettagli cliente
    const getCustomerInfo = (reservation: Reservation) => {
        if (reservation.logged_id) {
            return {
                name: reservation.logged_id?.name || 'Cliente registrato',
                phone: reservation.logged_id?.phone || ''
            };
        } else {
            return {
                name: reservation.guest_datas?.name || 'Cliente ospite',
                phone: reservation.guest_datas?.phone || ''
            };
        }
    };

    // Handler per terminare appuntamento
    const handleCompleteAppointment = async () => {

        
        if (!inProgressAppointment) return;
        
        console.log('inProgressAppointment.id:', inProgressAppointment.id);

        try {
            setIsUpdating(true);
            
            // Aggiorna lo status a "completato" (dovrai modificare la funzione per accettare il nuovo status)
            await updateReservationStatus(inProgressAppointment.id, "completato");
          
            setInProgressAppointment(null);


        } catch (error) {
            console.error('Errore durante il completamento dell\'appuntamento:', error);
            // Qui potresti mostrare un toast di errore
        } finally {
            setIsUpdating(false);
        }
    };

    if (!inProgressAppointment) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Nessun Appuntamento in Corso
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Non ci sono appuntamenti attualmente in corso
                    </p>
                </div>
            </div>
        );
    }

    const customerInfo = getCustomerInfo(inProgressAppointment);

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="relative">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    Appuntamento in Corso
                </h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    da {elapsedTime}
                </div>
            </div>

            {/* Orario */}
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 text-white rounded-lg p-3 min-w-[80px] text-center">
                    <div className="text-lg font-bold">{inProgressAppointment.start_time}</div>
                    <div className="text-xs opacity-90">
                        {inProgressAppointment.end_time}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
                        <User className="w-4 h-4 text-gray-600" />
                        {customerInfo.name}
                    </div>
                    {customerInfo.phone && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                            <Phone className="w-3 h-3" />
                            {customerInfo.phone}
                        </div>
                    )}
                </div>
            </div>

            {/* Servizi */}
            {inProgressAppointment.services && inProgressAppointment.services.length > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="space-y-3">
                        {inProgressAppointment.services.map((service, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Scissors className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">{service}</span>
                                </div>
                            </div>
                        ))}
                        {/* Totale */}
                        <div className="pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">Totale</span>
                                <div className="font-semibold text-gray-900">€{inProgressAppointment.amount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Note */}
            {inProgressAppointment.note && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">{inProgressAppointment.note}</p>
                    </div>
                </div>
            )}

            {/* Status e Pulsante Termina */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">
                        In corso
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCompleteAppointment}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Terminando...
                            </>
                        ) : (
                            <>
                                <Square className="w-4 h-4" />
                                Termina
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}