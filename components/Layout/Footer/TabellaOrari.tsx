'use client'

import { useEffect, useState } from "react"

type DayInfo = {
    date: string
    day: string
    isWeekend: boolean
    isHoliday: boolean
    open: string
    close: string
}

// Lista dei festivi italiani nel formato YYYY-MM-DD
const italianHolidays = [
    "2025-01-01", // Capodanno
    "2025-01-06", // Epifania
    "2025-04-20", // Pasqua
    "2025-04-21", // Pasquetta
    "2025-04-25", // Festa della Liberazione
    "2025-05-01", // Festa dei Lavoratori
    "2025-06-02", // Festa della Repubblica
    "2025-08-15", // Ferragosto
    "2025-11-01", // Ognissanti
    "2025-12-08", // Immacolata
    "2025-12-25", // Natale
    "2025-12-26", // Santo Stefano
]

function formatDateISO(date: Date) {
    return date.toISOString().split('T')[0]
}

export default function OpeningTable() {
    const [days, setDays] = useState<DayInfo[]>([])

    useEffect(() => {
        const now = new Date()
        const daysList: DayInfo[] = []

        for (let i = 0; i < 365; i++) {
            const current = new Date(now)
            current.setDate(now.getDate() + i)

            const iso = formatDateISO(current)
            const isHoliday = italianHolidays.includes(iso)
            const isWeekend = [0, 1].includes(current.getDay()) // domenica o sabato

            const dayName = current.toLocaleDateString('it-IT', { weekday: 'long' })
            const dateString = current.toLocaleDateString('it-IT')

            daysList.push({
                date: dateString,
                day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
                isWeekend,
                isHoliday,
                open: isWeekend || isHoliday ? "Chiuso" : "08:30",
                close: isWeekend || isHoliday ? "" : "20:00",
            })
        }

        setDays(daysList)
    }, [])

    return (
        <div className="w-full mt-5 p-4">
            <table className="w-full text-center border border-gray-300">
                {/* intestazione fissa */}
                <thead className="bg-gray-800 text-white w-full table table-fixed">
                    <tr>
                        <th className="py-2 px-4 border w-1/4">Giorno</th>
                        <th className="py-2 px-4 border w-1/4">Data</th>
                        <th className="py-2 px-4 border w-1/4">Apertura</th>
                        <th className="py-2 px-4 border w-1/4">Chiusura</th>
                    </tr>
                </thead>

                {/* corpo scrollabile */}
                <tbody
                    className="block max-h-[12rem] overflow-y-scroll"
                    style={{ display: "block" }}
                >
                    {days.map((d, idx) => (
                        <tr
                            key={idx}
                            className={`text-sm border border-gray-300 w-full table table-fixed ${d.isHoliday
                                    ? "bg-red-100 text-red-600 font-semibold"
                                    : d.isWeekend
                                        ? "bg-gray-100 text-gray-400"
                                        : ""
                                }`}
                            style={{ width: "100%", tableLayout: "fixed", display: "table" }}
                        >
                            <td className="py-2 px-4 border w-1/4">{d.day}</td>
                            <td className="py-2 px-4 border w-1/4">{d.date}</td>
                            <td className="py-2 px-4 border w-1/4">{d.open}</td>
                            <td className="py-2 px-4 border w-1/4">{d.close}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
