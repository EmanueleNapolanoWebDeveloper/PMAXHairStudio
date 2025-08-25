"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/AuthContext";
import { getEmployeeReservation } from "./action";
import ReservationCard  from "./_components/reservationcard";
import { User, Scissors, CheckCircle, Clock, XCircle } from "lucide-react";

interface Appointment {
    id: number;
    date: string;        // YYYY-MM-DD
    start_time: string;  // HH:mm
    end_time: string;    // HH:mm
    customer_id: string;
    service: string;
    status: "confirmed" | "pending" | "in_progress" | "completed" | "denied";
}

export default function DailyCalendar({ employeeId, day }: { employeeId: string; day: string }) {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [tab, setTab] = useState<"morning" | "afternoon">("morning");

    const slotHeight = 32; // altezza di mezz'ora

    useEffect(() => {
        if (!user) {
            console.error("Utente non autenticato.");
            return;
        };

        const fetchAppointments = async () => {
            try {
                const data = await getEmployeeReservation(user.id);

                setAppointments(data || []);
            } catch (err) {
                console.error("Errore caricamento appuntamenti:", err);
            }
        };

        fetchAppointments();
    }, [user, day]);


    const getStatusStyles = (status: Appointment["status"]) => {
        switch (status) {
            case "confirmed": return { color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> };
            case "pending": return { color: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4" /> };
            case "in_progress": return { color: "bg-orange-100 text-orange-700", icon: <Clock className="w-4 h-4" /> };
            case "completed": return { color: "bg-blue-100 text-blue-700", icon: <CheckCircle className="w-4 h-4" /> };
            case "denied": return { color: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4" /> };
        }
    };

    // Funzione helper per creare array di mezz'ora
    const generateSlots = (start: number, end: number) => {
        const slots: string[] = [];
        for (let h = start; h <= end; h++) {
            slots.push(`${h.toString().padStart(2, '0')}:00`);
            slots.push(`${h.toString().padStart(2, '0')}:30`);
        }
        return slots;
    }

    const morningSlots = generateSlots(8, 14);   // 08:00 - 12:30
    const afternoonSlots = generateSlots(14, 20);// 13:00 - 20:30
    const displayedSlots = tab === "morning" ? morningSlots : afternoonSlots;

    return (
        <div className="overflow-x-auto">
            {/* Tab selezione */}
            <div className="flex gap-2 mb-4 border-b">
                <button
                    className={`px-4 py-2 ${tab === "morning" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
                    onClick={() => setTab("morning")}
                >
                    Mattina
                </button>
                <button
                    className={`px-4 py-2 ${tab === "afternoon" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
                    onClick={() => setTab("afternoon")}
                >
                    Pomeriggio
                </button>
            </div>

            <div className="flex gap-4 relative">
                {/* Colonna orari */}
                <div className="flex flex-col w-20 text-gray-600 text-sm">
                    {displayedSlots.map(slot => (
                        <div key={slot} className="h-16 border-t border-gray-200 flex items-start px-1">
                            {slot}
                        </div>
                    ))}
                </div>

                {/* Colonna appuntamenti */}
                <div className="flex-1 relative">
                    {appointments
                        .filter(a => a.date === day)
                        .filter(a => {
                            const hour = parseInt(a.start_time.split(":")[0]);
                            return tab === "morning" ? hour >= 8 && hour <= 14 : hour >= 14 && hour <= 20;
                        })
                        .map(a => (
                            <ReservationCard
                                key={a.id}
                                client={a.client}
                                service={a.service}
                                status={a.status}
                                start_time={a.start_time}
                                end_time={a.end_time}
                                slotHeight={slotHeight}
                                tab={tab}
                            />
                        ))}

                </div>
            </div>
        </div>
    );
}
