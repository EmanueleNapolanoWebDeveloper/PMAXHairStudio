"use client"

import { User, Scissors, Phone, Info, X } from "lucide-react"
import type { ReservationFull } from "@/src/lib/types"
import { useState } from "react"
import ModalEditRes from "./ModalEditRes"

type ClientInfoType = {
    reservation: ReservationFull
    client: {
        name: string
        surname: string
        phone: string
        email: string
    }
    services: string[]
    note: string
    price: number
    status: string
    onDelete: () => void
    onReschedule: (newDate: string, newTime: string) => void
}

export default function ClientInfo({
    reservation,
    client,
    services,
    note,
    price,
    status,
    onDelete,
    onReschedule,
}: ClientInfoType) {
    const [loading, setLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showReschedule, setShowReschedule] = useState(false)
    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("")

    if (!client) return null

    const handleDelete = async () => {
        setLoading(true)
        await onDelete()
        setLoading(false)
        setShowConfirm(false)
    }

    const handleRescheduleConfirm = async () => {
        if (!newDate || !newTime) return
        setLoading(true)
        await onReschedule(newDate, newTime)
        setLoading(false)
        setShowReschedule(false)
    }

    return (
        <div className="group relative w-full bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/60 overflow-hidden transition-all duration-300">
            {/* Decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-rose-500" />

            <div className="p-6 md:p-8 flex flex-col gap-6">
                {/* Header: Cliente */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-gray-200/80">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                            <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-md">
                                <User className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                {client.name} {client.surname}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Phone className="w-4 h-4 text-gray-500" strokeWidth={2} />
                                <span className="text-sm font-medium text-gray-600">{client.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body: Servizi + Note */}
                <div className="flex flex-col gap-4">
                    {/* Servizi */}
                    <div className="flex items-start gap-3 p-4 bg-red-50/50 rounded-xl border border-red-100/50 transition-colors hover:bg-red-50">
                        <div className="p-2.5 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg shadow-sm mt-0.5">
                            <Scissors className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Servizi</p>
                            <p className="text-base font-semibold text-gray-900 leading-relaxed">{services.join(" • ")}</p>
                        </div>
                    </div>

                    {/* Note */}
                    {note && (
                        <div className="flex items-start gap-3 bg-gradient-to-br from-emerald-50 to-green-50/50 border border-emerald-200/60 px-4 py-3.5 rounded-xl shadow-sm transition-all hover:shadow-md">
                            <div className="p-1.5 bg-emerald-500 rounded-lg mt-0.5">
                                <Info className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Nota</p>
                                <span className="text-sm font-medium text-emerald-900 leading-relaxed">{note}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer: Prezzo + Azioni */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5 border-t border-gray-200/80">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">€{price}</span>
                        <span className="text-sm font-medium text-gray-500">totale</span>
                    </div>

                    {status === "prenotato" && (
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            {/* Pulsante Modifica */}
                            <button
                                onClick={() => setShowReschedule(true)}
                                disabled={loading}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                            >
                                {loading ? "Caricamento..." : "Modifica"}
                            </button>

                            {/* Pulsante Rifiuta */}
                            <button
                                onClick={() => setShowConfirm(true)}
                                disabled={loading}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                            >
                                {loading ? "Eliminando..." : "Rifiuta"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modale di conferma Rifiuto */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-red-100 rounded-xl">
                                    <X className="w-6 h-6 text-red-600" strokeWidth={2.5} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">Conferma Rifiuto</h4>
                            </div>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed pl-14">
                            Sei sicuro di voler rifiutare questa prenotazione? Questa azione non può essere annullata.
                        </p>

                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all active:scale-95"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95"
                            >
                                {loading ? "Eliminando..." : "Conferma Rifiuto"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modale Sposta Appuntamento */}
            {showReschedule && (
                <ModalEditRes
                    setShowReschedule={setShowReschedule}
                    reservation={reservation}
                    loading={loading}
                    handleRescheduleConfirm={handleRescheduleConfirm}
                />
            )}
        </div>
    )
}
