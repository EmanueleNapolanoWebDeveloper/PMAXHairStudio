'use client'
import { useEffect, useState } from "react"
import { Clock, Calendar, X, Check } from "lucide-react"

type DayInfo = {
    date: string
    day: string
    shortDay: string
    isWeekend: boolean
    isHoliday: boolean
    open: string
    close: string
    isToday: boolean
    isOpen: boolean
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

function isCurrentlyOpen(open: string, close: string) {
    if (open === "Chiuso") return false

    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [openH, openM] = open.split(':').map(Number)
    const [closeH, closeM] = close.split(':').map(Number)
    const openTime = openH * 60 + openM
    const closeTime = closeH * 60 + closeM

    return currentTime >= openTime && currentTime <= closeTime
}

export default function ModernOpeningTable() {
    const [days, setDays] = useState<DayInfo[]>([])
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const now = new Date()
        const today = formatDateISO(now)
        const daysList: DayInfo[] = []

        for (let i = 0; i < 14; i++) {
            const current = new Date(now)
            current.setDate(now.getDate() + i)
            const iso = formatDateISO(current)
            const isHoliday = italianHolidays.includes(iso)
            const isWeekend = [0, 1].includes(current.getDay())
            const dayName = current.toLocaleDateString('it-IT', { weekday: 'long' })
            const shortDay = current.toLocaleDateString('it-IT', { weekday: 'short' })
            const dateString = current.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })
            const isToday = iso === today

            const openTime = isWeekend || isHoliday ? "Chiuso" : "08:30"
            const closeTime = isWeekend || isHoliday ? "" : "20:00"
            const isOpen = isToday && isCurrentlyOpen(openTime, closeTime)

            daysList.push({
                date: dateString,
                day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
                shortDay: shortDay.charAt(0).toUpperCase() + shortDay.slice(1),
                isWeekend,
                isHoliday,
                open: openTime,
                close: closeTime,
                isToday,
                isOpen
            })
        }
        setDays(daysList)
    }, [currentTime])

    const todayInfo = days.find(d => d.isToday)

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
            <div className="w-full max-w-md flex flex-col items-center space-y-8">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        Orari di Apertura
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Scopri quando siamo aperti
                    </p>
                </div>

                {/* Status Card - Solo per oggi */}
                {todayInfo && (
                    <div className={`w-full p-8 rounded-3xl border-2 shadow-2xl ${
                        todayInfo.open === "Chiuso"
                            ? 'bg-gradient-to-br from-red-900/40 to-red-900/20 border-red-500 shadow-red-500/20'
                            : todayInfo.isOpen
                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-white shadow-white/20'
                                : 'bg-gradient-to-br from-red-900/40 to-gray-900 border-red-500 shadow-red-500/20'
                    }`}>
                        <div className="flex flex-col items-center space-y-4">
                            <div className={`p-5 rounded-full border-3 shadow-lg ${
                                todayInfo.open === "Chiuso"
                                    ? 'bg-red-500/30 border-red-400 shadow-red-500/50'
                                    : todayInfo.isOpen
                                        ? 'bg-white/20 border-white shadow-white/50'
                                        : 'bg-red-500/30 border-red-400 shadow-red-500/50'
                            }`}>
                                {todayInfo.open === "Chiuso" ? (
                                    <X className="w-8 h-8 text-red-500" />
                                ) : todayInfo.isOpen ? (
                                    <Check className="w-8 h-8 text-white" />
                                ) : (
                                    <Clock className="w-8 h-8 text-red-500" />
                                )}
                            </div>
                            
                            <div className="text-center">
                                <h2 className="text-white font-bold text-2xl mb-3">
                                    {todayInfo.open === "Chiuso"
                                        ? "Oggi siamo chiusi"
                                        : todayInfo.isOpen
                                            ? "Ora siamo aperti"
                                            : "Ora siamo chiusi"}
                                </h2>
                                <div className="space-y-2">
                                    <p className="text-white font-semibold text-lg">
                                        {todayInfo.day}, {todayInfo.date}
                                    </p>
                                    {todayInfo.open !== "Chiuso" && (
                                        <p className="text-gray-200 text-lg">
                                            {todayInfo.open} - {todayInfo.close}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Calendar Section */}
                <div className="w-full space-y-6">
                    <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-6 h-6 text-red-500" />
                        <h3 className="text-white font-semibold text-xl">Prossimi 14 giorni</h3>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                        {days.map((day, idx) => (
                            <div
                                key={idx}
                                className={`w-full p-5 rounded-2xl border-2 shadow-lg ${
                                    day.isToday
                                        ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 border-red-400 shadow-red-500/30'
                                        : day.isHoliday
                                            ? 'bg-gradient-to-r from-red-900/30 to-red-900/20 border-red-600 shadow-red-500/20'
                                            : day.isWeekend
                                                ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-500 shadow-gray-500/20'
                                                : 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-400 shadow-gray-500/20'
                                }`}
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-center">
                                        <div className={`font-bold text-xl mb-1 ${
                                            day.isToday ? 'text-red-300' : 'text-white'
                                        }`}>
                                            {day.day}
                                        </div>
                                        <div className={`text-base font-medium ${
                                            day.isToday ? 'text-red-200' : 'text-gray-300'
                                        }`}>
                                            {day.date}
                                        </div>
                                        {day.isHoliday && (
                                            <div className="text-sm text-red-400 font-semibold mt-2 bg-red-500/20 px-3 py-1 rounded-full">
                                                Festivo
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        {day.open === "Chiuso" ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="p-2 bg-red-500/30 rounded-full">
                                                    <X className="w-5 h-5 text-red-400" />
                                                </div>
                                                <span className="text-red-400 font-semibold text-lg">Chiuso</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="text-white font-semibold text-lg">
                                                    {day.open} - {day.close}
                                                </div>
                                                {day.isToday && day.isOpen && (
                                                    <div className="text-white text-sm font-medium flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                                        Aperto ora
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #dc2626 transparent;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #dc2626;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ef4444;
                }
            `}</style>
        </div>
    )
}