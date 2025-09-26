'use client'

import { User, Scissors, Phone, Info, X } from 'lucide-react';
import { Profile, Reservation, ReservationFull } from '@/src/lib/types';
import { useState } from 'react';
import ModalEditRes from './ModalEditRes';

type ClientInfoType = {
    reservation: ReservationFull
    client: {
        name: string;
        surname: string;
        phone: string;
        email: string;
    };
    services: string[];
    note: string;
    price: number;
    status: string;
    onDelete: () => void;
    onReschedule: (newDate: string, newTime: string) => void; // aggiorniamo la firma
}

export default function ClientInfo({ reservation, client, services, note, price, status, onDelete, onReschedule }: ClientInfoType) {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showReschedule, setShowReschedule] = useState(false);

    // stati per nuova data/ora
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    if (!client) return null;

    const handleDelete = async () => {
        setLoading(true);
        await onDelete();
        setLoading(false);
        setShowConfirm(false);
    }

    const handleRescheduleConfirm = async () => {
        if (!newDate || !newTime) return;
        setLoading(true);
        await onReschedule(newDate, newTime);
        setLoading(false);
        setShowReschedule(false);
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col gap-6">

            {/* Header: Cliente */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                    <User className="w-6 h-6 text-red-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {client.name} {client.surname}
                </h3>
            </div>

            {/* Body: Servizi + Contatti + Note */}
            <div className="flex flex-col gap-4">

                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Scissors className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                        {services.join(', ')}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{client.phone}</span>
                </div>

                {note && (
                    <div className="flex items-start gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-lg shadow-sm border border-green-200">
                        <Info className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm font-medium leading-snug">{note}</span>
                    </div>
                )}
            </div>

            {/* Footer: Prezzo + Azioni */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="text-xl font-bold text-gray-900">
                    €{price}
                </div>
                {status === 'prenotato' && (
                    <div className="flex gap-2">
                        {/* Pulsante Sposta */}
                        <button
                            onClick={() => setShowReschedule(true)}
                            disabled={loading}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50 shadow-sm"
                        >
                            {loading ? 'Caricamento...' : 'Modifica appuntamento'}
                        </button>

                        {/* Pulsante Rifiuta */}
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50 shadow-sm"
                        >
                            {loading ? 'Eliminando...' : 'Rifiuta'}
                        </button>
                    </div>
                )}
            </div>

            {/* Modale di conferma Rifiuto */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-900">Conferma Rifiuto</h4>
                            <button onClick={() => setShowConfirm(false)}>
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-700">Sei sicuro di voler rifiutare questa prenotazione?</p>
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
                            >
                                {loading ? 'Eliminando...' : 'Conferma'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modale Sposta Appuntamento */}
            {showReschedule && (
                <ModalEditRes
                    setShowReschedule={setShowReschedule}
                    reservation={reservation}
                    loading={loading}
                    handleRescheduleConfirm={handleRescheduleConfirm}
                />
            )}

        </div>
    )
}
