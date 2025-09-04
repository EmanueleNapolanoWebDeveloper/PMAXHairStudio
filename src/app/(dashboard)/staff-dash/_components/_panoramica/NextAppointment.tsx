'use client'

import { useState, useEffect } from 'react';
import { Profile, Reservation, Service } from '@/src/lib/types';
import { Clock, User, Scissors, Calendar, Phone, MapPin, AlertCircle, X, CheckCircle } from 'lucide-react';
import { updateReservationStatus } from '@/src/lib/actions'

interface NextAppointmentProps {
    reservations?: Reservation[];
    onStartAppointment?: (reservationId: string) => void; // Callback per iniziare appuntamento
    onRefreshData?: () => void; // Callback per aggiornare i dati
}

export default function NextAppointment({
    reservations = [],
    onStartAppointment,
    onRefreshData
}: NextAppointmentProps) {
    const [nextAppointment, setNextAppointment] = useState<Reservation | null>(null);
    const [timeUntilNext, setTimeUntilNext] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    // Calcola il prossimo appuntamento
    const calculateNextAppointment = (): Reservation | null => {
        const now = new Date();
        const todayFormatted = now.toISOString().split('T')[0];

        // Filtra appuntamenti di oggi con status 'prenotato' o 'in_corso'
        const todayReservations = reservations.filter(r =>
            r.data === todayFormatted &&
            (r.status === 'prenotato' || r.status === 'in_corso')
        );

        if (todayReservations.length === 0) {
            return null;
        }

        // Ordina per orario di inizio
        const sortedReservations = todayReservations.sort((a, b) =>
            a.start_time.localeCompare(b.start_time)
        );

        // Trova eventuale appuntamento in corso
        const inProgressIndex = sortedReservations.findIndex(r => r.status === 'in_corso');

        if (inProgressIndex >= 0) {
            // Se c'è un appuntamento in corso, prendi il primo 'prenotato' dopo di esso
            const nextReservations = sortedReservations.slice(inProgressIndex + 1);
            return nextReservations.find(r => r.status === 'prenotato') || null;
        } else {
            // Altrimenti prendi il primo 'prenotato' disponibile
            return sortedReservations.find(r => r.status === 'prenotato') || null;
        }
    };

    // Calcola tempo rimanente
    const calculateTimeUntil = (appointment: Reservation): string => {
        const now = new Date();
        const [hours, minutes] = appointment.start_time.split(':').map(Number);
        const appointmentTime = new Date();
        appointmentTime.setHours(hours, minutes, 0, 0);

        const diffMs = appointmentTime.getTime() - now.getTime();

        if (diffMs <= 0) return "Ora";

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
            const next = calculateNextAppointment();
            setNextAppointment(next);

            if (next) {
                setTimeUntilNext(calculateTimeUntil(next));
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
                name: `${reservation.logged_id?.name || ''} ${reservation.logged_id?.surname || ''}`.trim() || 'Cliente registrato',
                phone: reservation.logged_id?.phone || ''
            };
        } else {
            return {
                name: reservation.guest_datas?.name || 'Cliente ospite',
                phone: reservation.guest_datas?.phone || ''
            };
        }
    };

    // Handler per iniziare appuntamento
    const handleStartAppointment = async () => {
        if (!nextAppointment) return;
        
        console.log('nextAppointment.id:', nextAppointment.id);

        try {
            setIsUpdating(true);
            
            // Aggiorna lo status a "in_corso"
            await updateReservationStatus(nextAppointment.id, "in_corso");
            
            // Callback originale se presente
            if (onStartAppointment) {
                onStartAppointment(nextAppointment.id);
            }

            // Refresh dei dati
            if (onRefreshData) {
                onRefreshData();
            }

        } catch (error) {
            console.error('Errore durante l\'avvio dell\'appuntamento:', error);
            // Qui potresti mostrare un toast di errore
        } finally {
            setIsUpdating(false);
        }
    };

    if (!nextAppointment) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Nessun Prossimo Appuntamento
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Non ci sono appuntamenti in programma per oggi
                    </p>
                </div>
            </div>
        );
    }

    const customerInfo = getCustomerInfo(nextAppointment);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Prossimo Appuntamento
                </h3>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    tra {timeUntilNext}
                </div>
            </div>

            {/* Orario */}
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white rounded-lg p-3 min-w-[80px] text-center">
                    <div className="text-lg font-bold">{nextAppointment.start_time}</div>
                    <div className="text-xs opacity-90">
                        {nextAppointment.end_time}
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
            {nextAppointment.services && nextAppointment.services.length > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="space-y-3">
                        {nextAppointment.services.map((service, index) => (                            
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
                                <div className="font-semibold text-gray-900">€{nextAppointment.amount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Note */}
            {nextAppointment.note && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">{nextAppointment.note}</p>
                    </div>
                </div>
            )}

            {/* Status e Pulsante Inizia */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${nextAppointment.status === 'in_corso' ? 'bg-green-500' :
                        nextAppointment.status === 'prenotato' ? 'bg-blue-500' :
                            nextAppointment.status === 'completato' ? 'bg-gray-500' : 'bg-yellow-500'
                        }`} />
                    <span className="text-sm text-gray-600 capitalize">
                        {nextAppointment.status === 'in_corso' ? 'In corso' :
                            nextAppointment.status === 'prenotato' ? 'Prenotato' :
                                nextAppointment.status === 'completato' ? 'Completato' : nextAppointment.status}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {nextAppointment.status === 'prenotato' && (
                        <button
                            onClick={handleStartAppointment}
                            disabled={isUpdating}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Avviando...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Inizia
                                </>
                            )}
                        </button>
                    )}

                    {nextAppointment.status === 'in_corso' && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium text-sm">
                            <CheckCircle className="w-4 h-4" />
                            In corso
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}