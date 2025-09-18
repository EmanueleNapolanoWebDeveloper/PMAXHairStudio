'use client'

import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Home,
  Star,
  BarChart3,
  Clock,
  Info,
  User,
  Activity,
  CheckCircle,
  AlertCircle,
  X,
} from 'lucide-react'

import StaffSideBar from './_components/SideBar'
import HeaderDash from './_components/HeaderDash'
import DashboardContent from './_components/_panoramica/DashboardContent'
import BarberCalendar from './_components/_appuntamenti/Reservations'
import { Reservation } from '@/src/lib/types'
import { useAuth } from '@/src/app/store/AuthContext'
import { useStaffContext } from '../../store/StaffContext'
import { createClient } from '@/src/utils/supabase/client'
import AddStaffReservation from './_components/_addReservation/_components/StaffFormReservation'
import StaffNotes from './_components/_staffMemo/StaffMemo'
import ActivityReviews from './_components/_StaffReviews.tsx/StaffReviews'
import MonthlyDashboard from './_components/_managing/Managing'
import toast from 'react-hot-toast'

// ==============================
// Costanti comuni
// ==============================
const sidebarItems = [
  { id: 'dashboard', name: 'Panoramica', icon: Home },
  { id: 'my-appointments', name: 'Calendario Appuntamenti', icon: Calendar },
  { id: 'addReservation', name: 'Aggiungi Appuntamenti', icon: Clock },
  { id: 'staff-notes', name: 'Note dello STAFF', icon: Info },
  { id: 'reviews', name: 'Recensioni P-Max', icon: Star },
  { id: 'managing', name: 'Panoramica Attività', icon: BarChart3 },
  { id: 'profile', name: 'Il Mio Profilo', icon: User },
]

// ==============================
// Utils per status appuntamenti
// ==============================
const getStatusColor = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-red-100 text-red-800',
    pending: 'bg-orange-100 text-orange-800',
    confirmed: 'bg-gray-100 text-gray-800',
    denied: 'bg-red-200 text-red-900',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIcon = (status: string) => {
  const icons = {
    completed: CheckCircle,
    in_progress: Activity,
    pending: AlertCircle,
    confirmed: Calendar,
    denied: X,
  }
  return icons[status] || Calendar
}

// ==============================
// Placeholder per sezioni non sviluppate
// ==============================
const PlaceholderContent = ({ name, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow p-6 text-center">
    <div className="text-gray-400 mb-4">
      <Icon className="w-12 h-12 mx-auto" />
    </div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-sm text-gray-500 mb-4">
      Questa sezione conterrà le funzionalità per {name.toLowerCase()}.
    </p>
    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Sviluppa Sezione
    </button>
  </div>
)

// ==============================
// Main Dashboard
// ==============================
const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { reservations,  allReviews, staffReviews, isLoadingReservations, isLoadingReviews, isErrorReservations, errorReservations, refetchReservations } = useStaffContext()


  const currentSection = sidebarItems.find((item) => item.id === activeSection)

  // Gestione stati
  if (!user) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Caricamento utente...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoadingReservations) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <StaffSideBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          sidebarItems={sidebarItems}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <HeaderDash
            currentSectionName={currentSection?.name || 'Dashboard'}
            setIsOpen={setSidebarOpen}
          />
          <main className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p>Caricamento prenotazioni...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (isErrorReservations) {
    return (
      <div className="flex min-h-screen bg-gray-50 overflow-hidden">
        <StaffSideBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          sidebarItems={sidebarItems}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <HeaderDash
            currentSectionName={currentSection?.name || 'Dashboard'}
            setIsOpen={setSidebarOpen}
          />
          <main className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center">
            <div className="text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <p>Errore nel caricamento: {error?.message || 'Errore sconosciuto'}</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const safeReservations = reservations || []


  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardContent
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            reservations={safeReservations}
            reviews={staffReviews}
          />
        )
      case 'my-appointments':
        return <BarberCalendar reservations={safeReservations} isLoading={isLoadingReservations} isError={isErrorReservations} error={errorReservations?.message} />
      case 'addReservation':
        return <AddStaffReservation reservations={safeReservations} />
      case 'staff-notes':
        return <StaffNotes />
      case 'reviews':
        return <ActivityReviews allReviews={allReviews} />
      case 'managing':
        return <MonthlyDashboard />
      default:
        return (
          <PlaceholderContent
            name={currentSection?.name}
            icon={currentSection?.icon || Activity}
          />
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <StaffSideBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        sidebarItems={sidebarItems}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderDash
          currentSectionName={currentSection?.name || 'Dashboard'}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

export default StaffDashboard
