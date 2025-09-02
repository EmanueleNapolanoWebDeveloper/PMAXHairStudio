'use client'

import { Heart, MessageCircle } from "lucide-react";

export default function RecentlyCustomers({ recentClients } : string[]) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Clienti Recenti</h3>
            </div>
            <div className="p-4 sm:p-6">
                <div className="space-y-4">
                    {recentClients.map((client, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-gray-800 font-semibold text-sm">{client.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-medium text-gray-900 text-sm">{client.name}</p>
                                        {client.favorite && <Heart className="w-3 h-3 text-red-500 fill-current" />}
                                    </div>
                                    <p className="text-xs text-gray-500">{client.lastVisit} • {client.totalVisits} visite</p>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700">
                                <MessageCircle className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}