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

// SIDEBAR NAVIGATION COMPONENT
const StaffAsideNav = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'my-appointments', name: 'I Miei Appuntamenti', icon: Calendar },
    { id: 'schedule', name: 'Il Mio Orario', icon: Clock },
    { id: 'clients', name: 'I Miei Clienti', icon: UserCheck },
    { id: 'performance', name: 'Le Mie Performance', icon: Target },
    { id: 'earnings', name: 'I Miei Guadagni', icon: Euro },
    { id: 'gallery', name: 'La Mia Gallery', icon: Camera },
    { id: 'reviews', name: 'Le Mie Recensioni', icon: Star },
    { id: 'training', name: 'Formazione', icon: BookOpen },
    { id: 'profile', name: 'Il Mio Profilo', icon: User }
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
        w-64 bg-gradient-to-b from-gray-900 to-black shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">StaffDash</h1>
                <p className="text-sm text-gray-300">Area Dipendenti</p>
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

        {/* Staff Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AM</span>
            </div>
            <div>
              <p className="text-white font-semibold">Antonio Marchetti</p>
              <p className="text-gray-300 text-sm">Senior Barber</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-300 text-xs">In Servizio</span>
              </div>
            </div>
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
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeSection === item.id 
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
  );
};

// STAFF NAVBAR COMPONENT
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

// STAFF MAIN CONTENT COMPONENT
const StaffMainContent = ({ activeSection }) => {
  const todayStats = [
    { title: 'Appuntamenti Oggi', value: '6', change: '+1', icon: Calendar, color: 'bg-red-600' },
    { title: 'Clienti Serviti', value: '4', change: 'in corso', icon: UserCheck, color: 'bg-gray-800' },
    { title: 'Guadagno Oggi', value: '€120', change: '+€25', icon: Euro, color: 'bg-red-500' },
    { title: 'Rating Medio', value: '4.9', change: '+0.1', icon: Star, color: 'bg-black' }
  ];

  const todayAppointments = [
    { time: '09:00', client: 'Marco Rossi', service: 'Taglio + Barba', duration: '45min', status: 'completato', amount: '€35' },
    { time: '10:00', client: 'Luigi Bianchi', service: 'Taglio Classico', duration: '30min', status: 'in_corso', amount: '€25' },
    { time: '11:00', client: 'Giuseppe Verde', service: 'Barba + Styling', duration: '40min', status: 'prossimo', amount: '€30' },
    { time: '14:00', client: 'Carlo Neri', service: 'Taglio Moderno', duration: '35min', status: 'confermato', amount: '€30' },
    { time: '15:30', client: 'Andrea Blu', service: 'Taglio + Barba', duration: '45min', status: 'confermato', amount: '€35' },
    { time: '16:30', client: 'Fabio Gialli', service: 'Styling', duration: '20min', status: 'confermato', amount: '€20' }
  ];

  const recentClients = [
    { name: 'Marco Rossi', lastVisit: 'Oggi', totalVisits: 12, favorite: true, phone: '3401234567' },
    { name: 'Luigi Bianchi', lastVisit: '2 giorni fa', totalVisits: 8, favorite: false, phone: '3401234568' },
    { name: 'Giuseppe Verde', lastVisit: '1 settimana fa', totalVisits: 15, favorite: true, phone: '3401234569' }
  ];

  const weeklyStats = [
    { day: 'Lun', appointments: 8, earnings: 180 },
    { day: 'Mar', appointments: 6, earnings: 140 },
    { day: 'Mer', appointments: 7, earnings: 165 },
    { day: 'Gio', appointments: 9, earnings: 200 },
    { day: 'Ven', appointments: 6, earnings: 120 },
    { day: 'Sab', appointments: 12, earnings: 280 },
    { day: 'Dom', appointments: 0, earnings: 0 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completato: 'bg-green-100 text-green-800',
      in_corso: 'bg-red-100 text-red-800',
      prossimo: 'bg-orange-100 text-orange-800',
      confermato: 'bg-gray-100 text-gray-800',
      annullato: 'bg-red-200 text-red-900'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completato: CheckCircle,
      in_corso: Activity,
      prossimo: AlertCircle,
      confermato: Calendar,
      annullato: X
    };
    return icons[status] || Calendar;
  };

  // DASHBOARD CONTENT
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Buongiorno, Antonio! 👋</h3>
            <p className="text-red-100">Oggi hai 6 appuntamenti programmati. Pronto per una grande giornata?</p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-red-200">Prossimo cliente</p>
              <p className="text-lg font-semibold">Luigi Bianchi</p>
              <p className="text-sm text-red-200">alle 10:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-red-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="xl:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">I Miei Appuntamenti di Oggi</h3>
              <button className="flex items-center text-red-600 hover:text-red-700 transition-colors text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Calendario</span>
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {todayAppointments.map((appointment, index) => {
                const StatusIcon = getStatusIcon(appointment.status);
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                        <span className="text-xs text-gray-500">{appointment.duration}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 truncate">{appointment.client}</p>
                          {appointment.status === 'in_corso' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="text-sm font-semibold text-green-600">{appointment.amount}</span>
                      <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">{appointment.status.replace('_', ' ')}</span>
                      </span>
                      {appointment.status === 'prossimo' && (
                        <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors">
                          Inizia
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Clients */}
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

          {/* Weekly Performance */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Performance Settimanale</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{day.appointments}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-600">€{day.earnings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // MY APPOINTMENTS CONTENT
  const MyAppointmentsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Tutti i Miei Appuntamenti</h3>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Oggi</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Settimana</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Mese</button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {todayAppointments.map((appointment, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{appointment.time}</div>
                      <div className="text-sm text-gray-500">{appointment.duration}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.client}</h4>
                      <p className="text-gray-600">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-red-600">{appointment.amount}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
        {sectionName}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 mb-4">
        Questa sezione conterrà le funzionalità per {sectionName.toLowerCase()}.
      </p>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base">
        Sviluppa Sezione
      </button>
    </div>
  );

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'my-appointments', name: 'I Miei Appuntamenti', icon: Calendar },
    { id: 'schedule', name: 'Il Mio Orario', icon: Clock },
    { id: 'clients', name: 'I Miei Clienti', icon: UserCheck },
    { id: 'performance', name: 'Le Mie Performance', icon: Target },
    { id: 'earnings', name: 'I Miei Guadagni', icon: Euro },
    { id: 'gallery', name: 'La Mia Gallery', icon: Camera },
    { id: 'reviews', name: 'Le Mie Recensioni', icon: Star },
    { id: 'training', name: 'Formazione', icon: BookOpen },
    { id: 'profile', name: 'Il Mio Profilo', icon: User }
  ];

  // Render content based on active section
  switch (activeSection) {
    case 'dashboard':
      return <DashboardContent />;
    case 'my-appointments':
      return <MyAppointmentsContent />;
    default:
      const currentSection = sidebarItems.find(item => item.id === activeSection);
      return (
        <PlaceholderContent 
          sectionName={currentSection?.name} 
          sectionIcon={currentSection?.icon}
        />
      );
  }
};

// MAIN STAFF DASHBOARD COMPONENT
const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'my-appointments', name: 'I Miei Appuntamenti', icon: Calendar },
    { id: 'schedule', name: 'Il Mio Orario', icon: Clock },
    { id: 'clients', name: 'I Miei Clienti', icon: UserCheck },
    { id: 'performance', name: 'Le Mie Performance', icon: Target },
    { id: 'earnings', name: 'I Miei Guadagni', icon: Euro },
    { id: 'gallery', name: 'La Mia Gallery', icon: Camera },
    { id: 'reviews', name: 'Le Mie Recensioni', icon: Star },
    { id: 'training', name: 'Formazione', icon: BookOpen },
    { id: 'profile', name: 'Il Mio Profilo', icon: User }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Staff Sidebar Navigation */}
      <StaffAsideNav 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Staff Navigation Bar */}
        <StaffNavBar 
          activeSection={activeSection}
          sidebarItems={sidebarItems}
          setIsOpen={setSidebarOpen}
        />

        {/* Staff Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <StaffMainContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;