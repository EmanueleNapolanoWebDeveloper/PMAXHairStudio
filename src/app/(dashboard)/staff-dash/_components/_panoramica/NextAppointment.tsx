'use client'

import { useState, useEffect, useMemo } from 'react';
import { Reservation } from '@/src/lib/types';
import { Clock, User, Scissors, Calendar, Phone, AlertCircle, CheckCircle, X } from 'lucide-react';
import { updateReservationStatus, deleteReservation } from '@/src/lib/actions';
import next from 'next';
import { div } from 'framer-motion/client';

interface NextAppointmentProps {
  reservations?: Reservation[];
  onStartAppointment?: (reservationId: string) => void;
  onRefreshData?: () => void;
}

export default function NextAppointment({
  reservations = [],
  onStartAppointment,
  onRefreshData
}: NextAppointmentProps) {
  const [nextAppointment, setNextAppointment] = useState<Reservation | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // 📌 Calcola prossimo appuntamento
  const calculateNextAppointment = (list: Reservation[]): Reservation | null => {
    const today = new Date().toISOString().split('T')[0];

    const todayReservations = list
      .filter(r => r.date === today && (r.status === 'prenotato' || r.status === 'in_corso'))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

    if (!todayReservations.length) return null;

    const inProgressIndex = todayReservations.findIndex(r => r.status === 'in_corso');

    if (inProgressIndex >= 0) {
      const next = todayReservations.slice(inProgressIndex + 1).find(r => r.status === 'prenotato');
      return next || null;
    }

    return todayReservations.find(r => r.status === 'prenotato') || null;
  };



  // 🧠 Memo per calcolare automaticamente al cambio delle reservations
  useEffect(() => {
    const updateNext = () => {
      const next = calculateNextAppointment(reservations);
      setNextAppointment(next);
    };

    updateNext();
    const interval = setInterval(updateNext, 60000); // ogni minuto
    return () => clearInterval(interval);
  }, [reservations]);

  // 🧑‍💼 Dettagli cliente
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

  // 🚀 Inizia appuntamento e carica automaticamente il prossimo
  const handleStartAppointment = async () => {
    if (!nextAppointment) return;
    setIsUpdating(true);

    try {
      await updateReservationStatus(nextAppointment.id, 'in_corso');

      if (onStartAppointment) onStartAppointment(nextAppointment.id);
      if (onRefreshData) onRefreshData();

      // Aggiorna localmente il prossimo appuntamento
      const updatedReservations = reservations.map(r =>
        r.id === nextAppointment.id ? { ...r, status: 'in_corso' } : r
      );

      const next = calculateNextAppointment(updatedReservations);
      setNextAppointment(next);

    } catch (error) {
      console.error('Errore nell\'avviare l\'appuntamento:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!nextAppointment) return;
    setIsUpdating(true);

    try {
      await deleteReservation(nextAppointment.id);
      if (onRefreshData) onRefreshData();
    } catch (error) {
      console.error('Errore nell\'annullare l\'appuntamento:', error);
    } finally {
      setIsUpdating(false);
    }
  }

  // 🟦 Nessun appuntamento
  if (!nextAppointment) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Nessun Prossimo Appuntamento</h3>
        <p className="text-gray-500 text-sm">Non ci sono appuntamenti in programma per oggi</p>
      </div>
    );
  }

  const customerInfo = getCustomerInfo(nextAppointment);


  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" /> Prossimo Appuntamento
        </h3>
      </div>

      {/* Orario e cliente */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 text-white rounded-lg p-3 min-w-[80px] text-center">
          <div className="text-lg font-bold">{nextAppointment.start_time}</div>
          <div className="text-xs opacity-90">{nextAppointment.end_time}</div>
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
      {nextAppointment.services?.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-4">
          {nextAppointment.services.map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Scissors className="w-4 h-4 text-gray-600" /> <span className="font-medium text-gray-900">{s}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold text-gray-900">
            <span>Totale</span>
            <span>€{nextAppointment.amount}</span>
          </div>
        </div>
      )}

      {/* Note */}
      {nextAppointment.note && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">{nextAppointment.note}</p>
          </div>
        </div>
      )}

      {/* Status e pulsante */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${nextAppointment.status === 'in_corso'
              ? 'bg-green-500'
              : nextAppointment.status === 'prenotato'
                ? 'bg-blue-500'
                : 'bg-gray-500'
              }`}
          />
          <span className="text-sm text-gray-600 capitalize">
            {nextAppointment.status === 'in_corso' ? 'In corso' : 'Prenotato'}
          </span>
        </div>

        {nextAppointment.status === 'prenotato' && (
          <div className="flex items-center gap-3 mt-4">
            {/* Bottone Avvio */}
            <button
              onClick={handleStartAppointment}
              disabled={isUpdating}
              className={`
      flex items-center gap-2 px-5 py-2.5
      rounded-lg font-medium text-sm transition-all duration-300
      shadow-sm
      ${isUpdating
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-95 text-white"
                }
    `}
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Avviando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Inizia
                </>
              )}
            </button>

            {/* Bottone Annulla */}
            <button
              onClick={handleCancelAppointment}
              type="button"
              className="
      flex items-center gap-2 px-5 py-2.5
      rounded-lg font-medium text-sm transition-all duration-300
      bg-red-500 text-white hover:bg-red-600 active:scale-95
      shadow-sm
    "
            >
              <X className="w-4 h-4" /> Annulla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
