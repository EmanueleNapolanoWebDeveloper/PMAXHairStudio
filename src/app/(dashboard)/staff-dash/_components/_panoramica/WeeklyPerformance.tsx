import { Reservation } from '@/src/lib/types'

type WeeklyStatsInlineProps = {
    reservations: Reservation[]
}

export default function WeeklyStatsInline({ reservations }: WeeklyStatsInlineProps) {
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

    // Calcolo dei completati per giorno
    const statsMap: { day: string; date: string; completed: number }[] = []

    const tempMap: Record<string, { date: string; completed: number }> = {}

    reservations.forEach(res => {
        if (res.status !== 'completed') return

        const dateObj = new Date(res.date)
        const dayName = dayNames[dateObj.getDay()]
        const dateStr = dateObj.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })

        if (!tempMap[dayName]) tempMap[dayName] = { date: dateStr, completed: 0 }
        tempMap[dayName].completed += 1
    })

    Object.keys(tempMap).forEach(day => {
        statsMap.push({ day, date: tempMap[day].date, completed: tempMap[day].completed })
    })

    // Ordine Lun-Sab
    const order = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    const orderedStats = statsMap.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day))

    return (
        <div className="w-96 bg-white shadow rounded-lg p-3">
            <h2 className="text-base font-semibold text-gray-900 mb-2">PERFORMANCE SETTIMANALE</h2>
            <div className="flex justify-between">
                {orderedStats.map(stat => (
                    <div key={stat.day} className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-sm font-semibold text-gray-800">{stat.day}</span>
                        <span className="text-xs text-gray-500">{stat.date}</span>
                        <span className="text-lg font-bold text-gray-900">{stat.completed}</span>
                    </div>
                ))}
            </div>
        </div>

    )
}
