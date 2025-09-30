"use client"

import { useState, useMemo } from "react"
import { Calendar, Filter, Clock, CheckCircle, User, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ReservationFull, Reviews } from "@/src/lib/types"

type ReservationStatus = "all" | "prenotato" | "completato"

type ReservationPanoramicProps = {
  reservations: ReservationFull[] | null
  setIsModalOpen: (value: boolean) => void
  setSelectedReservation: (value: ReservationFull | null) => void
  reviews: Reviews[]
  onDelete: (id: number) => void
}

// ==================== COMPONENTI INTERNI ====================

const HeaderFilter = ({
  filter,
  setFilter,
}: { filter: "prenotato" | ReservationStatus; setFilter: (value: "prenotato" | ReservationStatus) => void }) => {
  const statusList: ReservationStatus[] = ["prenotato", "completato"]

  const getStatusText = (status: ReservationStatus) => {
    if (status === "prenotato") return "Prenotato"
    if (status === "completato") return "Completata"
    return status
  }

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-rose-300 bg-clip-text text-transparent">
        Le Mie Prenotazioni
      </h2>
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-red-400" />
        <div className="flex gap-2 flex-wrap">
          {statusList.map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === status
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/30"
                }`}
            >
              {getStatusText(status)}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

const EmptyState = ({ filter }: { filter: "all" | ReservationStatus }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
    <Calendar className="w-20 h-20 text-gray-700 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-400 mb-2">Nessuna prenotazione</h3>
    <p className="text-gray-500">
      {filter === "all" ? "Non ci sono prenotazioni da mostrare" : `Nessuna prenotazione ${filter}`}
    </p>
  </motion.div>
)

const ReservationItem = ({
  reservation,
  review,
  onDelete,
  onOpenModal,
}: {
  reservation: ReservationFull
  review?: Reviews
  onDelete: (id: number) => void
  onOpenModal: (reservation: ReservationFull) => void
}) => {
  const getStatusIcon = () => {
    switch (reservation.status) {
      case "completato":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />
      case "prenotato":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (reservation.status) {
      case "completato":
        return "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30"
      case "prenotato":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-800/50 text-gray-300 border-gray-700"
    }
  }

  const getStatusText = () => {
    switch (reservation.status) {
      case "completato":
        return "Completata"
      case "prenotato":
        return "Prenotato"
      default:
        return reservation.status
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-br from-black via-red-950/20 to-black rounded-2xl p-6 border border-red-900/30 hover:border-red-700/50 transition-all duration-300 shadow-xl hover:shadow-red-500/10 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent animate-pulse" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Status */}
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>

        {/* Data e Orario */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-600/20 to-rose-600/20 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="font-bold text-white text-lg mb-1">
                {new Date(reservation.date).toLocaleDateString("it-IT", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-400 font-semibold">
                {reservation.start_time} - {reservation.end_time}
              </p>
            </div>
          </div>
        </div>

        {/* Servizi */}
        <div>
          <p className="text-sm text-gray-400 mb-3 font-semibold">Servizi richiesti:</p>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(reservation.services) ? reservation.services : [reservation.services]).map((service, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-red-600/20 to-rose-600/20 text-red-300 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30 backdrop-blur-sm"
              >
                {service}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Barbiere e Totale */}
        <div className="flex w-full justify-between items-center pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-400">
              Barbiere:{" "}
              <span className="font-semibold text-white">
                {reservation.barber_id?.name} {reservation.barber_id?.surname}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Totale</p>
            <p className="font-bold text-2xl bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              €{reservation.amount}
            </p>
          </div>
        </div>

        {/* Azioni */}
        {reservation.status === "prenotato" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDelete(reservation.id)}
            type="button"
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30 mt-2"
          >
            <X className="w-5 h-5" />
            Annulla prenotazione
          </motion.button>
        )}

        {reservation.status === "completato" && !review && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenModal(reservation)}
            type="button"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/30 mt-2"
          >
            ⭐ Lascia una recensione
          </motion.button>
        )}

        {review && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-700/30 backdrop-blur-sm mt-2"
          >
            <p className="font-semibold text-amber-300 mb-2">Recensione già lasciata:</p>
            <p className="text-amber-200 font-bold mb-1">⭐ {review.rating} / 5</p>
            <p className="text-amber-100/80 text-sm">{review.comment}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

const ReservationPanoramics = ({
  reservations = [],
  setIsModalOpen,
  setSelectedReservation,
  reviews,
  onDelete,
}: ReservationPanoramicProps) => {
  const [filter, setFilter] = useState<"all" | ReservationStatus>("all")

  const filteredReservations = useMemo(
    () => reservations?.filter((res) => (filter === "all" ? true : res.status === filter)),
    [reservations, filter],
  )

  const handleOpenModal = (reservation: ReservationFull) => {
    setSelectedReservation(reservation)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-gradient-to-br from-black via-red-950/20 to-black rounded-2xl shadow-2xl p-8 border border-red-900/30 backdrop-blur-sm">
      <HeaderFilter filter={filter} setFilter={setFilter} />

      {!filteredReservations?.length ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="space-y-5">
          <AnimatePresence>
            {filteredReservations.map((reservation) => {
              const review = reviews.find((r) => r.reservation_id?.id === reservation.id)

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
