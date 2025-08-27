'use client'


import { Scissors, Plus } from 'lucide-react';
import { Customer } from '../page';


export default function TopHeader({ barber }: Customer) {


  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Ciao , {barber ? `${barber.name}  ${barber.surname}` : 'Utente' } </h1>
              <p className="text-sm text-gray-500">Calendario Giornaliero</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuovo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}