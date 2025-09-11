'use client'

import { useState, useEffect } from 'react';
import { Reservation } from '@/src/lib/types';
import { Clock, User, Scissors, Phone, AlertCircle, Square } from 'lucide-react';
import { updateReservationStatus } from '@/src/lib/actions';

interface InProgressReservationProps {
  reservations?: Reservation[];
  onCompleteAppointment?: (reservationId: string) => void;
}

export default function InProgressReservation({
  reservations = [],
  onCompleteAppointment
}: InProgressReservationProps) {
  const [inProgressAppointment, setInProgressAppointment] = useState<Reservation | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Trova l'appuntamento in corso
  const findInProgressAppointment = (): Reservation | null => {
    const today = new Date().toISOString().split('T')[0];
    return reservations.find(r => r.data === today && r.status === 'in_corso') || null;
  };

  // Calcola tempo trascorso
  const calculateElapsedTime = (appointment: Reservation): string => {
    const now = new Date();
    const [hours, minutes] = appointment.start_time.split(':').map(Number);
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);

    const diffMs = now.getTime() - startTime.getTime();
    if (diffMs <= 0) return '0m';

    const diffMinutes = Math.floor(diffMs / 60000);
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  useEffect(() => {
    const update = () => {
      const current = findInProgressAppointment();
      setInProgressAppointment(current);
      if (current) setElapsedTime(calculateElapsedTime(current));
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [reservations]);
  const getCustomerInfo = (reservation: Reservation) => {
    if (reservation.logged_id) {
      return {
        name: `${reservation.logged_id?.name || ''} ${reservation.logged_id?.surname || ''}`.trim() || 'Cliente registrato',
        phone: reservation.logged_id?.phone || ''
      };
    } else {
      let guest = reservation.guest_datas ? JSON.parse(reservation.guest_datas) : '';
      return {
        name: guest.name || 'Cliente ospite',
        surname: guest.surname || '',
        phone: guest.phone || ''
      };
    }
  };


  const handleCompleteAppointment = async () => {
    if (!inProgressAppointment) return;

    setIsUpdating(true);
    try {
      await updateReservationStatus(inProgressAppointment.id, 'completato');
      setInProgressAppointment(null);
      if (onCompleteAppointment) onCompleteAppointment(inProgressAppointment.id);
    } catch (error) {
      console.error('Errore completamento appuntamento:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Render principale
  if (!inProgressAppointment) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Nessun Appuntamento in Corso</h3>
        <p className="text-gray-500 text-sm">Non ci sono appuntamenti attualmente in corso</p>
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          Appuntamento in Corso
        </h3>
      </div>

      {/* Orario e cliente */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-600 text-white rounded-lg p-3 min-w-[80px] text-center">
          <div className="text-lg font-bold">{inProgressAppointment.start_time}</div>
          <div className="text-xs opacity-90">{inProgressAppointment.end_time}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
            <User className="w-4 h-4 text-gray-600" /> {customerInfo.name} {customerInfo.surname}
          </div>
          {customerInfo.phone && (
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <Phone className="w-3 h-3" /> {customerInfo.phone}
            </div>
          )}
        </div>
      </div>

      {/* Servizi */}
      {inProgressAppointment.services?.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-4">
          {inProgressAppointment.services.map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Scissors className="w-4 h-4 text-gray-600" /> <span className="font-medium text-gray-900">{s}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold text-gray-900">
            <span>Totale</span>
            <span>€{inProgressAppointment.amount}</span>
          </div>
        </div>
      )}

      {/* Note */}
      {inProgressAppointment.note && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <p className="text-sm text-yellow-800">{inProgressAppointment.note}</p>
        </div>
      )}

      {/* Pulsante Termina */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 font-medium">In corso</span>
        </div>
        <button
          onClick={handleCompleteAppointment}
          disabled={isUpdating}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isUpdating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Square className="w-4 h-4" /> Termina
            </>
          )}
        </button>
      </div>
    </div>
  );
}
