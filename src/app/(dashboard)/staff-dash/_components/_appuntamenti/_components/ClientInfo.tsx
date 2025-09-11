'use client'

import { Clock, User, Scissors, Calendar, Plus, Phone, MapPin, Car, Info } from 'lucide-react';
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
        <div className='w-full flex flex-wrap items-center justify-between'>
            <div className="flex-1">
                <div className='flex items-center space-x-2'>
                    <User className="w-6 h-6 text-red-900" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {client.name} {client.surname}
                    </h3>
                </div>

                <p className="text-gray-600 mb-2">{services.join(', ')}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                    </div>
                    <div>
                        <Info className="w-4 h-4" />
                        <span>{note}</span>
                    </div>
                </div>
            </div>
            {/* Price & Status */}
            <div className="text-right">
                <div className="text-xl font-bold text-gray-900 mb-2">
                    €{price}
                </div>
                {status === 'prenotato' && (
                    <div className="flex space-x-2">
                        <button
                            onClick={async () => {
                                setLoading(true);
                                await onDelete();
                                setLoading(false);
                            }}
                            disabled={loading}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Eliminando...' : 'Rifiuta'}
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}