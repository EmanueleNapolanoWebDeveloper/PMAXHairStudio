'use client'

import ServicesChoice from "@/src/app/(Customer)/reservation/_components/ServicesChoise"
import DataChoise from "@/src/app/(Customer)/reservation/_components/DataChoise"
import TimeChoice from "@/src/app/(Customer)/reservation/_components/TimeChoise"
import { useStaffContext } from "@/src/app/store/StaffContext"
import { Reservation, Service } from "@/src/lib/types"
import { X } from "lucide-react"
import { useState } from "react"
import { updateReservation } from "@/src/lib/actions"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

type ModalEditProps = {
    setShowReschedule: (show: boolean) => void
    reservation: Reservation
}

export default function ModalEditRes({ setShowReschedule, reservation }: ModalEditProps) {
    const { services: allServices, timeResBarber } = useStaffContext()
    const queryClient = useQueryClient()

    const [loading, setLoading] = useState(false)
    const [newDate, setNewDate] = useState(reservation.date)
    const [newTime, setNewTime] = useState(reservation.start_time)
    const [selectedServices, setSelectedServices] = useState<Service[]>(
        reservation.services
            .map(s => allServices.find(as => as.title === s) as Service)
            .filter(Boolean)
    )
    const [activeTab, setActiveTab] = useState(allServices[0]?.category || "")

    const handleToggleService = (service: Service) => {
        setSelectedServices(prev =>
            prev.some(s => s.title === service.title)
                ? prev.filter(s => s.title !== service.title)
                : [...prev, service]
        )
    }

    const handleUpdate = async () => {
        if (!newDate || !newTime || selectedServices.length === 0) return

        setLoading(true)
        try {
            // --- CALCOLO END TIME ---
            const totalDuration = selectedServices.reduce((acc, s) => acc + (s.time || 0), 0)

            const timeToMinutes = (time: string) => {
                const [h, m] = time.split(":").map(Number)
                return h * 60 + m
            }

            const minutesToTime = (minutes: number) => {
                const h = Math.floor(minutes / 60)
                const m = minutes % 60
                return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
            }

            const endMinutes = timeToMinutes(newTime) + totalDuration
            const endTime = minutesToTime(endMinutes)

            // --- AGGIORNA RESERVATION ---
            await updateReservation(reservation.id, {
                date: newDate,
                start_time: newTime,
                end_time: endTime,
                services: selectedServices.map(s => s.title),
                amount: selectedServices.reduce((acc, s) => acc + (s.price || 0), 0)
            })

            // 🔄 Refresha i dati
            await queryClient.invalidateQueries({ queryKey: ["reservations"] })

            toast.success("Appuntamento aggiornato con successo!")
            setShowReschedule(false)
        } catch (err: any) {
            console.error("Errore update:", err)
            toast.error(err.message || "Errore durante l'aggiornamento")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[32rem] max-h-[90vh] overflow-y-auto flex flex-col gap-4 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900">Modifica Appuntamento</h4>
                    <button onClick={() => setShowReschedule(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Riepilogo prenotazione */}
                <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="font-medium text-gray-900">
                        {reservation?.logged_id ? (
                            <p>👤 Cliente : {reservation?.logged_id?.name} {reservation.logged_id?.surname}</p>
                        ) : (
                            <p>👤 Cliente : {reservation?.guest_datas?.name} {reservation.guest_datas?.surname}</p>
                        )}
                    </p>
                    <p className="text-sm text-gray-600">
                        📞 {reservation.logged_id ? reservation.logged_id.phone : reservation.guest_datas?.phone}
                    </p>
                    <p className="text-sm text-gray-600">💶 Totale: {reservation.amount}€</p>
                    {reservation.note && (
                        <p className="text-sm italic text-gray-500">📝 {reservation.note}</p>
                    )}
                </div>

                {/* Data */}
                <label className="flex flex-col gap-1 text-sm text-gray-700">
                    <DataChoise
                        isStaff={true}
                        date={newDate}
                        onChange={setNewDate}
                        resBarber={[]}
                        barberId={reservation.barber_id}
                        setIsWorkingDay={() => { }}
                        setTimeResBarber={() => { }}
                    />
                </label>

                {/* Ora */}
                <label className="flex flex-col gap-1 text-sm text-gray-700">
                    Ora:
                    <TimeChoice
                        barber={reservation.barber_id}
                        date={newDate}
                        time={newTime}
                        onChange={setNewTime}
                        timeSlots={timeResBarber}
                        isWorkingDay={true}
                    />
                </label>

                {/* Servizi */}
                <ServicesChoice
                    services={selectedServices}
                    onToggle={handleToggleService}
                    loading={false}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    allServices={allServices}
                />

                {/* Footer */}
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => setShowReschedule(false)}
                        className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading || !newDate || !newTime || selectedServices.length === 0}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50"
                    >
                        {loading ? "Caricamento..." : "Conferma"}
                    </button>
                </div>
            </div>
        </div>
    )
}
