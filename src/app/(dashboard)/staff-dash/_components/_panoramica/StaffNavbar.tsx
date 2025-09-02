'use client'

import {
   Menu, Coffee, Bell
} from 'lucide-react';

type StaffNavBarProps = {
  activeSection: string;
  sidebarItems: { id: string; name: string; icon: any }[];
  setIsOpen: (isOpen: boolean) => void;
};

const StaffNavBar = ({ activeSection, sidebarItems, setIsOpen }) => {
  const currentSectionName = sidebarItems.find(item => item.id === activeSection)?.name || 'Dashboard';

  return (
    <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentSectionName}</h2>
            <p className="text-sm text-gray-500">Ciao Antonio! Hai 6 appuntamenti oggi</p>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Quick Status Toggle */}
          <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 text-sm font-medium">Disponibile</span>
          </div>
          
          {/* Break Button */}
          <button className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Pausa</span>
          </button>
          
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default StaffNavBar;