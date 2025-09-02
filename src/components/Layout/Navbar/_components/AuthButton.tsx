'use client';

import { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/app/store/AuthContext';
import { ro } from 'react-day-picker/locale';
import Link from 'next/link';
export default function AuthButton() {
    // Simula lo stato di autenticazione - sostituisci con la tua logica
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    const router = useRouter()
    const { signOut, loading, profile } = useAuth()

    const handleLogin = () => {
        router.push('/login')
    };

    const handleLogout = async () => {

        try {
            await signOut()
            toast.success('Logout effettuato!')
            router.replace('/login') // Redirect alla login
        } catch (err) {
            console.error('Errore durante il logout:', err)
            toast.error('Si è verificato un errore durante il logout.')
        }

    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Se non autenticato, mostra il bottone Login
    if (!profile) {
        return (
            <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white 
                         px-6 py-2.5 rounded-lg font-semibold
                         transform transition-all duration-300 hover:-translate-y-0.5
                         hover:shadow-lg hover:shadow-red-500/25 hover:scale-105
                         active:scale-95 flex items-center gap-2"
            >
                <User className="w-4 h-4" />
                Login
            </button>
        );
    }

    // Se autenticato, mostra avatar con dropdown
    return (
        <div className="relative">
            {/* Avatar Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 bg-white rounded-full p-1 pr-3
                         shadow-lg border border-gray-200 hover:shadow-xl
                         transition-all duration-300 hover:scale-105"
            >
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 
                               rounded-full flex items-center justify-center text-white font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                </div>

                {/* Nome utente */}
                <span className="text-gray-700 font-medium hidden sm:block">
                    {profile.name.split(' ')[0]}
                </span>

                {/* Icona dropdown */}
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200
                               ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl 
                               border border-gray-100 z-50 overflow-hidden
                               animate-in slide-in-from-top-2 duration-200">

                    {/* Header del dropdown con info utente */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 
                                           rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{profile.name}</p>
                                <p className="text-sm text-gray-500">{profile.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {/* Profilo */}
                        <Link
                            href="/area-personale"
                        >
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 text-left
                                     hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    // Aggiungi logica per il profilo
                                }}
                            >
                                <User className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700 font-medium">Il mio profilo</span>
                            </button>
                        </Link>

                        {/* Dashboard */}
                        {profile.role === 'employee' &&
                            <Link
                                href="/dashboard"
                            >
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left
                                     hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        // Aggiungi logica per le impostazioni
                                    }}
                                >
                                    <Settings className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700 font-medium">DashBoard</span>
                                </button>
                            </Link>
                        }

                        {/* Divider */}
                        <div className="my-2 border-t border-gray-200"></div>

                        {/* Logout */}
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 text-left
                                     hover:bg-red-50 transition-colors duration-200 text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Disconnetti</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay per chiudere il dropdown cliccando fuori */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}
        </div>
    );
}