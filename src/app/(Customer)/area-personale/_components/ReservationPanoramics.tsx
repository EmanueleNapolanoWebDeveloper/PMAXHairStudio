'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Plus, Filter } from 'lucide-react';
import { deleteReservation } from '@/src/lib/actions';
import { Reservation } from '@/src/lib/types';

type ReservationPanoramicProps = {
  reservations: Reservation[] | null;
  setIsModalOpen: (value: boolean) => void; // setIsModalOpen
  setSelectedReservation: (value: Reservation | null) => void;
}

const ReservationPanoramics = ({ reservations, setIsModalOpen, setSelectedReservation }: ReservationPanoramicProps) => {



  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [localReservation, setLocalReservations] = useState(reservations);

  const filteredReservations = reservations?.filter(res =>
    filter === 'all' ? true : res.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completato': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'prenotato': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completato': return 'bg-green-100 text-green-800';
      case 'prenotato': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completato': return 'Completata';
      case 'prenotato': return 'Prenotato';
      default: return status;
    }
  };

  const handleCancelReservation = async (reservationId) => {
    setLoading(true);
    await deleteReservation(reservationId);
    setLocalReservations(localReservation.filter(res => res.id !== reservationId));
    setLoading(false);
  };

  const handleOpenModal = (reservationID: Reservation['id']) => {
    setIsModalOpen(true);
    setSelectedReservation(reservationID);
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Le Mie Prenotazioni</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex gap-2 flex-wrap">
            {['all', 'prenotato', 'completato'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === status
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {status === 'all' ? 'Tutti' : getStatusText(status)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredReservations?.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">Nessuna prenotazione</h3>
          <p className="text-gray-400">
            {filter === 'all' ? 'Non ci sono prenotazioni da mostrare' : `Nessuna prenotazione ${getStatusText(filter).toLowerCase()}`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations?.map(reservation => (
            <div key={reservation.id} className="flex flex-col items-start justify-center gap-3 border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="flex items-center gap-2">
                {getStatusIcon(reservation.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {new Date(reservation.data).toLocaleDateString('it-IT', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600 font-medium">
                      {reservation.start_time} - {reservation.end_time}
                    </p>
                  </div>
                </div>

              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Servizi richiesti:</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(reservation.services) ? reservation.services.map((service, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                      {service}
                    </span>
                  )) : (
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                      {reservation.services}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Barbiere : <span className="font-medium">{reservation.barber_id?.name} {reservation.barber_id?.surname}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Totale</p>
                  <p className="font-bold text-xl text-gray-800">
                    €{reservation.amount}
                  </p>
                </div>
              </div>

              {reservation.status === 'prenotato' &&
                <div className='w-full flex items-center'>
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    disabled={loading}
                    type="button"
                    className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-md'>
                    {loading ? 'Sto annullando' : 'Annulla prenotazione'}
                  </button>
                </div>
              }

              {reservation.status === 'completato' &&
                <div className='w-full flex items-center'>
                  <button
                    onClick={() => handleOpenModal(reservation.id)}
                    disabled={loading}
                    type="button"
                    className='w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {loading ? 'Invio recensione...' : 'Lascia una recensione'}
                  </button>
                </div>
              }

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationPanoramics;