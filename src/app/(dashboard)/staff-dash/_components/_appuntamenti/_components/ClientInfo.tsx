'use client'

import { Clock, User, Scissors, Calendar, Plus, Phone, MapPin, Car } from 'lucide-react';
import { Profile } from '@/src/lib/types';

type ClientInfoType = {
    client: Profile;
    services: string[];
    duration: number;
    price: number;
    status : string;

}

export default function ClientInfo({ client, services, duration,price,status }: ClientInfoType) {

    if(!client){
        return null;
    }

    console.log('client:', client);
    

    return (
        <div className='w-full flex flex-wrap items-center justify-between'>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {client.name} {client.surname} 
                </h3>
                <p className="text-gray-600 mb-2">{services.join(', ')}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
            {/* Price & Status */}
            <div className="text-right">
                <div className="text-xl font-bold text-gray-900 mb-2">
                    €{price}
                </div>
                {status === 'pending' && (
                    <div className="flex space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                            Conferma
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                            Rifiuta
                        </button>
                    </div>
                )}
                {status === 'confirmed' && (
                    <button className="text-gray-400 hover:text-gray-600 text-sm">
                        Modifica
                    </button>
                )}
            </div>
        </div>

    )
}