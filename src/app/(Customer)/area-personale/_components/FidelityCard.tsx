"use client"

import { Check, X, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useMemo } from "react"

interface FidelityCardProps {
  totalSlots?: number
  completed: number
  onActionClick?: () => void
}

type SlotState = "completed" | "empty"

const ActionCard = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="Nuova prenotazione"
    className="w-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group border border-red-500/30"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all">
        <Plus className="w-8 h-8 text-black" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-xl font-semibold mb-1">Nuova Prenotazione</h3>
        <p className="text-red-100 text-sm leading-relaxed">Prenota il tuo prossimo appuntamento</p>
      </div>
    </div>
  </button>
)

const FidelityCard = ({ totalSlots = 10, completed, onActionClick }: FidelityCardProps) => {
  const router = useRouter()

  const progressPercentage = useMemo(() => (completed / totalSlots) * 100, [completed, totalSlots])

  const slots = useMemo<SlotState[]>(() => {
    return Array.from({ length: totalSlots }, (_, i) => (i < completed ? "completed" : "empty"))
  }, [totalSlots, completed])

  return (
    <div className="space-y-6">
      <ActionCard onClick={onActionClick ?? (() => router.push('/reservation'))} />

      <div className="bg-gradient-to-br from-black via-red-950/20 to-black/60 shadow-2xl p-8 rounded-2xl w-full max-w-md mx-auto border border-red-900/30 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 shadow-lg relative w-[90px] h-[50px]">
              <Image src="/assets/logos/P-MaxLogoNoBg.png" alt="Logo" fill />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Fidelity Card
            </h3>
          </div>
          <div className="text-sm font-medium text-slate-400">
            {completed}/{totalSlots}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300">Progresso Prenotazioni</span>
            <span className="text-sm font-bold text-red-400">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={totalSlots}>
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-red-500/30"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Slots Grid */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={`relative flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold transition-all duration-300
                ${slot === "completed"
                  ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-slate-700 text-slate-500 hover:bg-slate-600"
                }`}
            >
              {slot === "completed" ? <Check className="w-5 h-5" /> : <X className="w-4 h-4" />}
              {slot === "completed" && <div className="absolute inset-0 rounded-xl bg-red-400/20 animate-pulse" />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="text-slate-400">
            <p className="text-sm">Prenotazioni completate</p>
            <p className="text-xs opacity-75">Prenota il prossimo!</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{completed}</p>
            <p className="text-xs text-slate-500">su {totalSlots}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FidelityCard
