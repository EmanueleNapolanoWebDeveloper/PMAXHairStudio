'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, XCircle, Edit, Star } from 'lucide-react';


export default function UserDashboard({params}: {params: {id: string}}) {
    // Dati mock dell'utente - sostituisci con chiamata API reale
    const [userData, setUserData] = useState({
        id: params.id,
        name: 'Mario Rossi',
        email: 'mario.rossi@email.com',
        phone: '+39 333 123 4567',
        joinDate: '2024-01-15',
        totalAppointments: 12,
        completedAppointments: 8
    });

    // Appuntamenti mock - sostituisci con chiamata API reale
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            date: '2024-03-15',
            time: '14:30',
            service: 'Taglio + Barba',
            barber: 'Giuseppe',
            price: 40,
            status: 'completed',
            rating: 5
        },
        {
            id: 2,
            date: '2024-03-22',
            time: '16:00',
            service: 'Taglio Classico',
            barber: 'Marco',
            price: 25,
            status: 'completed',
            rating: 4
        },
        {
            id: 3,
            date: '2024-03-30',
            time: '15:00',
            service: 'Royal Treatment',
            barber: 'Giuseppe',
            price: 55,
            status: 'scheduled',
            rating: null
        },
        {
            id: 4,
            date: '2024-04-05',
            time: '17:30',
            service: 'Barba Completa',
            barber: 'Antonio',
            price: 25,
            status: 'scheduled',
            rating: null
        }
    ]);

    const [activeTab, setActiveTab] = useState('all');

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            case 'scheduled':
                return <Clock className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (activeTab === 'completed') return appointment.status === 'completed';
        if (activeTab === 'scheduled') return appointment.status === 'scheduled';
        return true;
    });

    const renderStars = (rating) => {
        if (!rating) return null;
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Dashboard */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Dashboard Personale
                    </h1>
                    <p className="text-gray-600">
                        Gestisci i tuoi appuntamenti e visualizza la cronologia
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{userData.totalAppointments}</p>
                                <p className="text-sm text-gray-600">Totale Appuntamenti</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{userData.completedAppointments}</p>
                                <p className="text-sm text-gray-600">Completati</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {appointments.filter(a => a.status === 'scheduled').length}
                                </p>
                                <p className="text-sm text-gray-600">In Programma</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-3 rounded-full">
                                <User className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">Cliente</p>
                                <p className="text-sm text-gray-600">dal {new Date(userData.joinDate).toLocaleDateString('it-IT')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Dati Personali */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Dati Personali</h2>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Edit className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-800">{userData.name}</p>
                                    <p className="text-sm text-gray-500">Nome completo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-800">{userData.email}</p>
                                    <p className="text-sm text-gray-500">Email</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-800">{userData.phone}</p>
                                    <p className="text-sm text-gray-500">Telefono</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista Appuntamenti */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">I Miei Appuntamenti</h2>
                            
                            {/* Tab Navigation */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeTab === 'all' 
                                            ? 'bg-red-600 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Tutti ({appointments.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('scheduled')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeTab === 'scheduled' 
                                            ? 'bg-red-600 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    In Programma ({appointments.filter(a => a.status === 'scheduled').length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('completed')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeTab === 'completed' 
                                            ? 'bg-red-600 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Completati ({appointments.filter(a => a.status === 'completed').length})
                                </button>
                            </div>
                        </div>

                        {/* Appointments List */}
                        <div className="p-6">
                            {filteredAppointments.length === 0 ? (
                                <div className="text-center py-8">
                                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Nessun appuntamento trovato</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                                                        {getStatusIcon(appointment.status)}
                                                        {appointment.status === 'completed' ? 'Completato' : 'In Programma'}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-red-600 text-lg">€{appointment.price}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-lg mb-2">
                                                        {appointment.service}
                                                    </h3>
                                                    <div className="space-y-1 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{new Date(appointment.date).toLocaleDateString('it-IT')}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{appointment.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4" />
                                                            <span>Barbiere: {appointment.barber}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between">
                                                    {appointment.rating && (
                                                        <div className="mb-2">
                                                            <p className="text-sm text-gray-600 mb-1">La tua valutazione:</p>
                                                            {renderStars(appointment.rating)}
                                                        </div>
                                                    )}
                                                    
                                                    {appointment.status === 'scheduled' && (
                                                        <div className="flex gap-2">
                                                            <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                                                                Modifica
                                                            </button>
                                                            <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                                                                Annulla
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 text-center">
                    <button className="bg-gradient-to-r from-red-600 to-red-700 text-white 
                                     px-8 py-4 rounded-2xl text-lg font-semibold
                                     transform transition-all duration-300 hover:-translate-y-1
                                     hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105
                                     active:scale-95">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Prenota Nuovo Appuntamento
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}