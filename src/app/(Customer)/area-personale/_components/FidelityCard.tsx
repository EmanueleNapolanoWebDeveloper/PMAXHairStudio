"use client"

import { Check, X, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useMemo } from "react"
import { motion } from "framer-motion"

interface FidelityCardProps {
  totalSlots?: number
  completed: number
  onActionClick?: () => void
}

type SlotState = "completed" | "empty"

const ActionCard = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    aria-label="Nuova prenotazione"
    className="w-full bg-gradient-to-br from-red-600 via-red-700 to-rose-700 hover:from-red-500 hover:via-red-600 hover:to-rose-600 rounded-2xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 p-8 text-white group border border-red-500/30 relative overflow-hidden"
  >
    {/* Animated background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent animate-pulse" />

    <div className="relative z-10 flex items-center gap-5">
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
        className="p-4 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all backdrop-blur-sm shadow-lg"
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.div>
      <div className="flex-1 text-left">
        <h3 className="text-2xl font-bold mb-1">Nuova Prenotazione</h3>
        <p className="text-red-100 text-sm leading-relaxed">Prenota il tuo prossimo appuntamento</p>
      </div>
    </div>
  </motion.button>
)

const FidelityCard = ({ totalSlots = 10, completed, onActionClick }: FidelityCardProps) => {
  const router = useRouter()

  const progressPercentage = useMemo(() => (completed / totalSlots) * 100, [completed, totalSlots])

  const slots = useMemo<SlotState[]>(() => {
    return Array.from({ length: totalSlots }, (_, i) => (i < completed ? "completed" : "empty"))
  }, [totalSlots, completed])

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-black via-red-950/30 to-black shadow-2xl p-8 rounded-2xl w-full max-w-md mx-auto border border-red-900/30 backdrop-blur-sm hover:shadow-red-500/20 transition-all duration-300 relative overflow-hidden"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-rose-600/5 animate-pulse" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} className="p-2 shadow-lg relative w-[90px] h-[50px]">
                <Image src="/assets/logos/P-MaxLogoNoBg.png" alt="Logo" fill />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent">
                Fidelity Card
              </h3>
            </div>
            <div className="text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-full border border-red-800/30">
              {completed}/{totalSlots}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-300">Progresso Prenotazioni</span>
              <motion.span
                key={progressPercentage}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-sm font-bold text-red-400"
              >
                {Math.round(progressPercentage)}%
              </motion.span>
            </div>
            <div
              className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-700/30"
              role="progressbar"
              aria-valuenow={completed}
              aria-valuemin={0}
              aria-valuemax={totalSlots}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full shadow-lg shadow-red-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {slots.map((slot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative flex items-center justify-center w-14 h-14 rounded-xl text-lg font-bold transition-all duration-300
                  ${slot === "completed"
                    ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-500/40 scale-105"
                    : "bg-gray-800/50 text-gray-600 hover:bg-gray-700/50 border border-gray-700/30"
                  }`}
              >
                {slot === "completed" ? <Check className="w-6 h-6" /> : <X className="w-5 h-5" />}
                {slot === "completed" && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 rounded-xl bg-red-400/20"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-800/50">
            <div className="text-gray-400">
              <p className="text-sm font-semibold">Prenotazioni completate</p>
              <p className="text-xs opacity-75">Prenota il prossimo!</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                {completed}
              </p>
              <p className="text-xs text-gray-500">su {totalSlots}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FidelityCard
