'use client'

import React, { useState } from 'react';
import {
    Calendar,
    Users,
    Scissors,
    UserCheck,
    TrendingUp,
    Euro,
    Clock,
    Star,
    Package,
    BarChart3,
    Settings,
    Bell,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    ChevronRight,
    Activity,
    Menu,
    X,
    User,
    Target,
    Award,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    Coffee,

    DollarSign,
    BookOpen,
    Camera,
    Heart
} from 'lucide-react';
import { useAuth } from '@/src/app/store/AuthContext';

type StaffSideBarType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    activeSection: string,
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
    sidebarItems: { id: string; name: string; icon: any }[]
}

export default function StaffSideBar({ isOpen, setIsOpen, activeSection, setActiveSection, sidebarItems }: StaffSideBarType) {

    const { profile } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 to-black shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
              

                {/* Staff Info */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                            <Scissors className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-semibold">{profile?.name} {profile?.surname}</p>
                            <p className="text-gray-300 text-sm">Senior Barber</p>
                            <div className="flex items-center mt-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span className="text-green-300 text-xs">In Servizio</span>
                            </div>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            className="lg:hidden p-1 text-gray-300 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 pb-6 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeSection === item.id
                                    ? 'bg-red-600 text-white border-r-4 border-red-400'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span className="truncate">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>

    )
}