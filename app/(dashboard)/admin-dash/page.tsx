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
  X
} from 'lucide-react';

// SIDEBAR NAVIGATION COMPONENT
const AsideNav = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const sidebarItems = [
    { id: 'overview', name: 'Panoramica', icon: BarChart3 },
    { id: 'appointments', name: 'Appuntamenti', icon: Calendar },
    { id: 'employees', name: 'Dipendenti', icon: Users },
    { id: 'clients', name: 'Clienti', icon: UserCheck },
    { id: 'services', name: 'Servizi', icon: Scissors },
    { id: 'inventory', name: 'Inventario', icon: Package },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'finance', name: 'Finanze', icon: Euro },
    { id: 'reviews', name: 'Recensioni', icon: Star },
    { id: 'settings', name: 'Impostazioni', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BarberAdmin</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
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
                  setIsOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeSection === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
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
  );
};

// NAVBAR COMPONENT
const NavBar = ({ activeSection, sidebarItems, setIsOpen }) => {
  const currentSectionName = sidebarItems.find(item => item.id === activeSection)?.name || 'Panoramica';

  return (
    <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button + Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {currentSectionName}
          </h2>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:block relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
          
          {/* Mobile search button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Filter Button - Hidden on small screens */}
          <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
          
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          
          {/* User Avatar */}
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

// MAIN CONTENT COMPONENT
const MainContent = ({ activeSection }) => {
  const stats = [
    { title: 'Appuntamenti Oggi', value: '18', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Ricavi Mese', value: '€3,240', change: '+8%', icon: Euro, color: 'bg-green-500' },
    { title: 'Clienti Attivi', value: '156', change: '+5%', icon: UserCheck, color: 'bg-purple-500' },
    { title: 'Rating Medio', value: '4.8', change: '+0.2', icon: Star, color: 'bg-yellow-500' }
  ];

  const todayAppointments = [
    { time: '09:00', client: 'Marco Rossi', service: 'Taglio + Barba', barber: 'Antonio', status: 'confermato' },
    { time: '09:30', client: 'Luigi Bianchi', service: 'Taglio Classico', barber: 'Francesco', status: 'in_corso' },
    { time: '10:00', client: 'Giuseppe Verde', service: 'Barba', barber: 'Antonio', status: 'attesa' },
    { time: '10:30', client: 'Carlo Neri', service: 'Taglio Moderno', barber: 'Marco', status: 'confermato' }
  ];

  const employees = [
    { name: 'Antonio Barbiere', role: 'Senior Barber', status: 'disponibile', appointments: 6, rating: 4.9 },
    { name: 'Francesco Rossi', role: 'Junior Barber', status: 'occupato', appointments: 4, rating: 4.7 },
    { name: 'Marco Silva', role: 'Barber', status: 'disponibile', appointments: 5, rating: 4.8 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confermato: 'bg-green-100 text-green-800',
      in_corso: 'bg-blue-100 text-blue-800',
      attesa: 'bg-yellow-100 text-yellow-800',
      annullato: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getEmployeeStatusColor = (status) => {
    const colors = {
      disponibile: 'bg-green-100 text-green-800',
      occupato: 'bg-red-100 text-red-800',
      pausa: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // OVERVIEW CONTENT
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule & Employee Status */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Appuntamenti di Oggi */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Appuntamenti di Oggi</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm">
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Nuovo</span>
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="flex flex-col flex-shrink-0">
                      <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                      <span className="text-xs text-gray-500 truncate">{appointment.barber}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{appointment.client}</p>
                      <p className="text-sm text-gray-500 truncate">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      <span className="hidden sm:inline">{appointment.status.replace('_', ' ')}</span>
                      <span className="sm:hidden">●</span>
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Status */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Staff in Servizio</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Dettagli</span>
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {employees.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm sm:text-base">{employee.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{employee.name}</p>
                      <p className="text-sm text-gray-500 truncate">{employee.role}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmployeeStatusColor(employee.status)}`}>
                      <span className="hidden sm:inline">{employee.status}</span>
                      <span className="sm:hidden">●</span>
                    </span>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      <span className="hidden sm:inline">{employee.appointments} app. • ⭐ {employee.rating}</span>
                      <span className="sm:hidden">⭐ {employee.rating}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Azioni Rapide</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <button className="flex flex-col items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-center">Nuovo Appuntamento</span>
            </button>
            <button className="flex flex-col items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-center">Aggiungi Cliente</span>
            </button>
            <button className="flex flex-col items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <Scissors className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-center">Nuovo Servizio</span>
            </button>
            <button className="flex flex-col items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-center">Visualizza Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // PLACEHOLDER CONTENT for other sections
  const PlaceholderContent = ({ sectionName, sectionIcon }) => (
    <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
      <div className="text-gray-400 mb-4">
        {React.createElement(sectionIcon || Activity, { className: "w-12 h-12 sm:w-16 sm:h-16 mx-auto" })}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        Sezione {sectionName}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 mb-4">
        Questa sezione conterrà le funzionalità per gestire {sectionName.toLowerCase()}.
      </p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
        Sviluppa Sezione
      </button>
    </div>
  );

  const sidebarItems = [
    { id: 'overview', name: 'Panoramica', icon: BarChart3 },
    { id: 'appointments', name: 'Appuntamenti', icon: Calendar },
    { id: 'employees', name: 'Dipendenti', icon: Users },
    { id: 'clients', name: 'Clienti', icon: UserCheck },
    { id: 'services', name: 'Servizi', icon: Scissors },
    { id: 'inventory', name: 'Inventario', icon: Package },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'finance', name: 'Finanze', icon: Euro },
    { id: 'reviews', name: 'Recensioni', icon: Star },
    { id: 'settings', name: 'Impostazioni', icon: Settings }
  ];

  // Render content based on active section
  if (activeSection === 'overview') {
    return <OverviewContent />;
  } else {
    const currentSection = sidebarItems.find(item => item.id === activeSection);
    return (
      <PlaceholderContent 
        sectionName={currentSection?.name} 
        sectionIcon={currentSection?.icon}
      />
    );
  }
};

// MAIN DASHBOARD COMPONENT
const BarberDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'overview', name: 'Panoramica', icon: BarChart3 },
    { id: 'appointments', name: 'Appuntamenti', icon: Calendar },
    { id: 'employees', name: 'Dipendenti', icon: Users },
    { id: 'clients', name: 'Clienti', icon: UserCheck },
    { id: 'services', name: 'Servizi', icon: Scissors },
    { id: 'inventory', name: 'Inventario', icon: Package },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'finance', name: 'Finanze', icon: Euro },
    { id: 'reviews', name: 'Recensioni', icon: Star },
    { id: 'settings', name: 'Impostazioni', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <AsideNav 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Navigation Bar */}
        <NavBar 
          activeSection={activeSection}
          sidebarItems={sidebarItems}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <MainContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default BarberDashboard;