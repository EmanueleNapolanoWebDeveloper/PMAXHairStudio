import { Reservation } from '@/src/lib/types'

type WeeklyStatsInlineProps = {
  reservations: Reservation[]
}

export default function WeeklyStatsInline({ reservations }: WeeklyStatsInlineProps) {
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

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

  const order = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
  const orderedStats = statsMap.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day))

  // massimo completati (per scalare le barre)
  const maxCompleted = Math.max(...orderedStats.map(s => s.completed), 1)

  return (
    <div className="w-full bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Performance Settimanali</h2>

      <div className="flex items-end justify-between h-40 gap-4">
        {orderedStats.map(stat => (
          <div key={stat.day} className="flex flex-col items-center justify-end flex-1">
            {/* Barra verticale */}
            <div
              className="w-6 sm:w-8 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg transition-all"
              style={{ height: `${(stat.completed / maxCompleted) * 100}%` }}
            />
            {/* Valore */}
            <span className="mt-2 text-sm font-bold text-gray-900">{stat.completed}</span>
            {/* Giorno */}
            <span className="text-xs text-gray-500">{stat.day}</span>
          </div>
        ))}
      </div>

      {/* Totale settimanale */}
      <div className="mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-center">
        <p className="text-sm font-medium text-gray-700">
          Totale completati:{" "}
          <span className="text-indigo-600 font-bold">
            {orderedStats.reduce((acc, s) => acc + s.completed, 0)}
          </span>
        </p>
      </div>
    </div>
  )
}
