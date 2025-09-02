'use client'
import { Clock, Calendar, User } from 'lucide-react';
import { Customer } from '../../../appuntamenti/page';
import { Reservation, Profile } from '@/src/lib/types';

interface NextAppointmentProps {
  nextAppointment?: {
    id: number;
    start_time: string;
    end_time: string;
    customer_id: {
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
    date: string;
  };
  barber?: Profile
}

export default function NextAppointmentHeader({ barber, nextAppointment }: NextAppointmentProps) {

  console.log('nextAppointment:', nextAppointment);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // HH:MM format
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Prossimo Appuntamento Card */}

          {nextAppointment ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Cliente Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg truncate">
                      {nextAppointment.customer_id.name} {nextAppointment.customer_id.surname}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">Servizi:</p>
                      <div className="flex flex-wrap gap-1">
                        {nextAppointment.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data/Ora e Azioni */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:flex-col lg:items-end">

                  {/* Data e Ora */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {formatTime(nextAppointment.start_time)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                      {formatDate(nextAppointment.date)}
                    </p>
                  </div>

                  {/* Button Inizia */}
                  <button
                    onClick={() => {
                      console.log('Inizia appuntamento');
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-500/30"
                  >
                    🚀 Inizia
                  </button>

                  <button
                    onClick={() => {
                      console.log('Elimina appuntamento');
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-500/30"
                  >
                    Annulla
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 min-w-[250px]">
              <div className="text-center">
                <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Nessun appuntamento</p>
                <p className="text-xs text-gray-400">in programma</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}