'use client'

import ServicesChoice from "@/src/app/(Customer)/reservation/_components/ServicesChoise"
import DataChoise from "@/src/app/(Customer)/reservation/_components/DataChoise"
import TimeChoice from "@/src/app/(Customer)/reservation/_components/TimeChoise"
import { useStaffContext } from "@/src/app/store/StaffContext"
import { Reservation, ReservationFull, Service } from "@/src/lib/types"
import { X } from "lucide-react"
import { useState } from "react"
import { updateReservation } from "@/src/lib/actions"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

type ModalEditProps = {
    setShowReschedule: (show: boolean) => void
    reservation: ReservationFull
}

type ReservationUpdatePayload = {
    date?: string
    start_time?: string
    end_time?: string
    services?: string[]
    amount?: number
    barber_id?: string | null
    logged_id?: string | null
}

export default function ModalEditRes({ setShowReschedule, reservation }: ModalEditProps) {
    const { services, timeResBarber } = useStaffContext()
    const queryClient = useQueryClient()

    const [newDate, setNewDate] = useState(reservation.date)
    const [newTime, setNewTime] = useState(reservation.start_time)
    const [selectedServices, setSelectedServices] = useState<Service[]>(() => {
        if (!services.data) return []
        return reservation.services
            .map(title => services.data?.find(s => s.title === title))
            .filter((s): s is Service => !!s)
    })

    const [activeTab, setActiveTab] = useState<string>(() => {
        if (!services.data || services.data.length === 0) return "tutti"
        return services.data[0].category || "tutti"
    })

    // ✅ Mutation per aggiornare la reservation
    const mutation = useMutation({
        mutationFn: async (updatedData: Reservation) => {
            return await updateReservation(reservation.id, updatedData)
        },
        onSuccess: () => {
            toast.success("Appuntamento aggiornato con successo!")
            queryClient.invalidateQueries({ queryKey: ["reservations"] })
            setShowReschedule(false)
        },
        onError: (err) => {
            console.error("Errore update:", err)
            toast.error("Errore durante l'aggiornamento")
        },
    })

    const handleToggleService = (service: Service) => {
        setSelectedServices(prev =>
            prev.some(s => s.title === service.title)
                ? prev.filter(s => s.title !== service.title)
                : [...prev, service]
        )
    }

    const handleUpdate = () => {
        if (!newDate || !newTime || selectedServices.length === 0) return

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

        // --- COSTRUISCO DATI AGGIORNATI ---
        const updatedReservation: Reservation = {
            ...reservation,
            logged_id: reservation.logged_id?.id || null,
            barber_id: reservation.barber_id?.id || null,
            date: newDate,
            start_time: newTime,
            end_time: endTime,
            services: selectedServices.map(s => s.title),
            amount: selectedServices.reduce((acc, s) => acc + (s.price || 0), 0),
        }

        mutation.mutate(updatedReservation)
    }

    const guest = reservation.guest_datas ? JSON.parse(reservation.guest_datas) : ''

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[32rem] lg:w-[55rem] max-h-[90vh] overflow-y-auto flex flex-col gap-4 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900">Modifica Appuntamento</h4>
                    <button onClick={() => setShowReschedule(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Riepilogo prenotazione */}
                <div className="border p-4 rounded-xl bg-gray-50 shadow-sm space-y-3">
                    <h5 className="text-base font-semibold text-gray-800 mb-3">📋 Riepilogo Appuntamento</h5>
                    <div className="text-sm text-gray-700">
                        <span className="font-medium">👤 Cliente: </span>
                        {reservation?.logged_id
                            ? `${reservation.logged_id.name} ${reservation.logged_id.surname}`
                            : `${guest.name} ${guest.surname}`}
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">📞 </span>
                        {reservation.logged_id ? reservation.logged_id.phone : guest.phone}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-medium">🕒 Orario:</span>
                        <span>{reservation.start_time} - {reservation.end_time}</span>
                        {newTime !== reservation.start_time && (
                            <>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600 font-medium">{newTime} - {reservation.end_time}</span>
                            </>
                        )}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-medium">📅 Data:</span>
                        <span>{reservation.date}</span>
                        {newDate !== reservation.date && (
                            <>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600 font-medium">{newDate}</span>
                            </>
                        )}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-medium">💶 Totale:</span>
                        <span>{reservation.amount}€</span>
                        {selectedServices.reduce((acc, s) => acc + (s.price || 0), 0) !== reservation.amount && (
                            <>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600 font-medium">
                                    {selectedServices.reduce((acc, s) => acc + (s.price || 0), 0)}€
                                </span>
                            </>
                        )}
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">💈 Servizi: </span>
                        <span>{reservation.services.join(", ")}</span>
                        {selectedServices.length > 0 &&
                            JSON.stringify(selectedServices.map(s => s.title)) !== JSON.stringify(reservation.services) && (
                                <>
                                    <span className="text-gray-400"> → </span>
                                    <span className="text-green-600 font-medium">
                                        {selectedServices.map(s => s.title).join(", ")}
                                    </span>
                                </>
                            )}
                    </div>
                    {reservation.note && (
                        <div className="text-sm italic text-gray-500">
                            📝 {reservation.note}
                        </div>
                    )}
                </div>

                {/* Data */}
                <label className="flex flex-col gap-1 text-sm text-gray-700">
                    <DataChoise
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
                        timeSlots={timeResBarber.filter(slot => slot.date === newDate)}
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
                    allServices={services.data || []}
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
                        disabled={mutation.isPending || !newDate || !newTime || selectedServices.length === 0}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50"
                    >
                        {mutation.isPending ? "Caricamento..." : "Conferma"}
                    </button>
                </div>
            </div>
        </div>
    )
}
