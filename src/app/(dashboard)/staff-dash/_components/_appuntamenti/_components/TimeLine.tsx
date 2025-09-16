'use client'
import { Reservation } from "@/src/lib/types"
import { useEffect, useState } from 'react'
import { Calendar } from "lucide-react";
import ReservationSlot from "./ReservationSlot";

type TimeLineType = {
    appointment: Reservation[];
    date: Date;
}

export default function TimeLine({ appointment, date }: TimeLineType) {
    const [datingAppointments, setDatingAppointments] = useState<Reservation[]>([]);

    useEffect(() => {
        if (!date) return;

        const filteredAppointments = appointment
            .filter((a: Reservation) => {
                const aptDate = new Date(a.date);
                return aptDate.toISOString().split("T")[0] === date.toISOString().split("T")[0];
            })
            .sort((a, b) => a.start_time.localeCompare(b.start_time)); // ordina per orario

        setDatingAppointments(filteredAppointments);
    }, [appointment, date]);

    return (
        <div className="space-y-0">
            {datingAppointments.length > 0 ? (
                datingAppointments.map((appointment, index) => (
                    <div key={index} className="flex">
                        <ReservationSlot
                            appointment={appointment}
                            appointmentsLength={datingAppointments.length} // ✅ Riferimento variabile corretto
                        />
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Nessun appuntamento per oggi</p>
                    <p className="text-gray-400 text-sm mt-2">Gli appuntamenti appariranno qui quando saranno prenotati</p>
                </div>
            )}
        </div>
    )
}