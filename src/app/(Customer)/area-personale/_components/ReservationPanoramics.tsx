'use client'

import { useState, useMemo } from 'react'
import { Calendar, Filter, Clock, CheckCircle, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Reservation, ReservationFull, Reviews } from '@/src/lib/types'

type ReservationStatus = 'all' | 'prenotato' | 'completato'

type ReservationPanoramicProps = {
  reservations: ReservationFull[] | null
  setIsModalOpen: (value: boolean) => void
  setSelectedReservation: (value: ReservationFull | null) => void
  reviews: Reviews[]
  onDelete: (id: number) => void
}



// ==================== COMPONENTI INTERNI ====================

const HeaderFilter = ({ filter, setFilter }: { filter: 'prenotato' | ReservationStatus, setFilter: (value: 'prenotato' | ReservationStatus) => void }) => {
  const statusList: (ReservationStatus)[] = ['prenotato', 'completato']

  const getStatusText = (status: ReservationStatus) => {
    if (status === 'prenotato') return 'Prenotato'
    if (status === 'completato') return 'Completata'
    return status
  }

  return (
    <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">Le Mie Prenotazioni</h2>
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex gap-2 flex-wrap">
          {statusList.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === status
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {getStatusText(status)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const EmptyState = ({ filter }: { filter: 'all' | ReservationStatus }) => (
  <div className="text-center py-12">
    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-500 mb-2">Nessuna prenotazione</h3>
    <p className="text-gray-400">
      {filter === 'all' ? 'Non ci sono prenotazioni da mostrare' : `Nessuna prenotazione ${filter}`}
    </p>
  </div>
)

const ReservationItem = ({
  reservation,
  review,
  onDelete,
  onOpenModal
}: {
  reservation: ReservationFull
  review?: Reviews
  onDelete: (id: number) => void
  onOpenModal: (reservation: ReservationFull) => void
}) => {


  const getStatusIcon = () => {
    switch (reservation.status) {
      case 'completato': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'prenotato': return <Clock className="w-5 h-5 text-blue-500" />
      default: return null
    }
  }

  const getStatusColor = () => {
    switch (reservation.status) {
      case 'completato': return 'bg-green-100 text-green-800'
      case 'prenotato': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = () => {
    switch (reservation.status) {
      case 'completato': return 'Completata'
      case 'prenotato': return 'Prenotato'
      default: return reservation.status
    }
  }



  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-start justify-center gap-3 border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-200"
    >

      {/* Status */}
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Data e Orario */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">
              {new Date(reservation.date).toLocaleDateString('it-IT', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
            <p className="text-gray-600 font-medium">{reservation.start_time} - {reservation.end_time}</p>
          </div>
        </div>
      </div>

      {/* Servizi */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2 font-medium">Servizi richiesti:</p>
        <div className="flex flex-wrap gap-2">
          {(Array.isArray(reservation.services) ? reservation.services : [reservation.services]).map((service, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Barbiere e Totale */}
      <div className="flex w-full justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            Barbiere : <span className="font-medium">{reservation.barber_id?.name} {reservation.barber_id?.surname}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Totale</p>
          <p className="font-bold text-xl text-gray-800">€{reservation.amount}</p>
        </div>
      </div>

      {/* Azioni */}
      {reservation.status === 'prenotato' && (
        <button
          onClick={() => onDelete(reservation.id)}
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-md mt-3"
        >
          Annulla prenotazione
        </button>
      )}

      {reservation.status === 'completato' && !review && (
        <button
          onClick={() => onOpenModal(reservation)}
          type="button"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg mt-3"
        >
          Lascia una recensione
        </button>
      )}

      {review && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mt-3">
          <p className="font-medium text-gray-800">Recensione già lasciata:</p>
          <p className="text-gray-700 mt-1">⭐ {review.rating} / 5</p>
          <p className="text-gray-600 mt-1">{review.comment}</p>
        </div>
      )}

    </motion.div>
  )
  
}

const ReservationPanoramics = ({
  reservations = [],
  setIsModalOpen,
  setSelectedReservation,
  reviews,
  onDelete
}: ReservationPanoramicProps) => {

  const [filter, setFilter] = useState<'all' | ReservationStatus>('all')

  const filteredReservations = useMemo(() =>
    reservations?.filter(res => filter === 'all' ? true : res.status === filter)
    , [reservations, filter])

  const handleOpenModal = (reservation: ReservationFull) => {
    setSelectedReservation(reservation)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <HeaderFilter filter={filter} setFilter={setFilter} />

      {!filteredReservations?.length ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredReservations.map(reservation => {
              const review = reviews.find(r => r.reservation_id?.id === reservation.id)
              console.log('5 - review filtrate:', review);

              return (
                <ReservationItem
                  key={reservation.id}
                  reservation={reservation}
                  review={review}
                  onDelete={onDelete}
                  onOpenModal={handleOpenModal}
                />
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default ReservationPanoramics
