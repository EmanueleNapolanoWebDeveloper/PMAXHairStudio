'use client'

import { Clock, User, Scissors, Calendar, Phone, Info } from 'lucide-react';
import { Profile } from '@/src/lib/types';
import { useState } from 'react';

type ClientInfoType = {
    client: Profile;
    services: string[];
    note: string;
    price: number;
    status: string;
    onDelete: () => void
}

export default function ClientInfo({ client, services, note, price, status, onDelete }: ClientInfoType) {

    const [loading, setLoading] = useState(false);

    if (!client) {
        return null;
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

                {/* Servizi richiesti */}
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Scissors className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                        {services.join(', ')}
                    </p>
                </div>

                {/* Contatti */}
                <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{client.phone}</span>
                </div>

                {/* Nota */}
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
                    <button
                        onClick={async () => {
                            setLoading(true);
                            await onDelete();
                            setLoading(false);
                        }}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50 shadow-sm"
                    >
                        {loading ? 'Eliminando...' : 'Rifiuta'}
                    </button>
                )}
            </div>
        </div>
    )
}
