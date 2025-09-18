'use client'

import { useState } from "react";
import { X } from 'lucide-react'
import DataChoise from "@/src/app/(Customer)/reservation/_components/DataChoise";
import TimeChoice from "@/src/app/(Customer)/reservation/_components/TimeChoise";
import { useAuth } from "@/src/app/store/AuthContext";

type ModalEditProps = {
    setShowReschedule: (show: boolean) => void
    newDate: string
    setNewDate: (date: string) => void
    newTime: string
    setNewTime: (time: string) => void
    loading: boolean
    handleRescheduleConfirm: () => void
}

export default function ModalEditRes({ setShowReschedule, newDate, setNewDate, newTime, setNewTime, loading, handleRescheduleConfirm }: ModalEditProps) {

    const { user } = useAuth()


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900">Modifica Appuntamento</h4>
                    <button onClick={() => setShowReschedule(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <label className="flex flex-col gap-1 text-sm text-gray-700">
                    Data:
                    <DataChoise isStaff={false} date={newDate} onChange={setNewDate} resBarber={[]} barberId={user?.id} setIsWorkingDay={() => { }} />
                </label>

                <label className="flex flex-col gap-1 text-sm text-gray-700">
                    Ora:
                    <TimeChoice barber={user?.id} date={newDate} time={newTime} onChange={setNewTime} timeSlots={[]} isWorkingDay={false} />
                </label>

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => setShowReschedule(false)}
                        className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleRescheduleConfirm}
                        disabled={loading || !newDate || !newTime}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50"
                    >
                        {loading ? 'Caricamento...' : 'Conferma'}
                    </button>
                </div>
            </div>
        </div>
    )
}