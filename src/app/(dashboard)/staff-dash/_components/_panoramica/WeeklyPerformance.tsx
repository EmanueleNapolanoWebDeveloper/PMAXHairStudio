import { Reservation, ReservationFull } from '@/src/lib/types'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps } from 'recharts'

type WeeklyStatsInlineProps = {
  reservations: ReservationFull[]
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{`${label}`}</p>
        <p className="text-indigo-600">
          <span className="font-medium">Completati: </span>
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default function WeeklyStatsInline({ reservations }: WeeklyStatsInlineProps) {
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
  const fullDayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

  // Crea la mappa temporanea per aggregare i dati
  const tempMap: Record<string, { date: string; completed: number; fullName: string }> = {}

  reservations.forEach(res => {
    if (res.status !== 'completato') return
    const dateObj = new Date(res.date)
    const dayName = dayNames[dateObj.getDay()]
    const fullName = fullDayNames[dateObj.getDay()]
    const dateStr = dateObj.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })

    if (!tempMap[dayName]) {
      tempMap[dayName] = { date: dateStr, completed: 0, fullName }
    }
    tempMap[dayName].completed += 1
  })

  // Crea array ordinato per il grafico (tutti i giorni della settimana)
  const order = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
  const chartData = order.map(day => ({
    day,
    fullName: fullDayNames[dayNames.indexOf(day)],
    completed: tempMap[day]?.completed || 0,
    date: tempMap[day]?.date || ''
  }))

  // Solo giorni con dati per le stats inline
  const statsWithData = chartData.filter(stat => stat.completed > 0)
  const maxCompleted = Math.max(...chartData.map(s => s.completed), 1)
  const totalCompleted = chartData.reduce((acc, s) => acc + s.completed, 0)

  return (
    <div className="w-full bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">📊 Performance Settimanali</h2>

      {/* Grafico Area */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              fill="url(#completedGradient)"
              strokeWidth={3}
              dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats inline (solo giorni con dati) */}
      {statsWithData.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Dettaglio giornaliero</h3>
          <div className="flex items-end justify-between h-24 gap-2">
            {statsWithData.map(stat => (
              <div key={stat.day} className="flex flex-col items-center justify-end flex-1">
                {/* Barra verticale */}
                <div
                  className="w-4 sm:w-6 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg transition-all"
                  style={{ height: `${(stat.completed / maxCompleted) * 100}%` }}
                />
                {/* Valore */}
                <span className="mt-1 text-xs font-bold text-gray-900">{stat.completed}</span>
                {/* Giorno */}
                <span className="text-xs text-gray-500">{stat.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Totale settimanale */}
      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Totale completati questa settimana
            </p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {totalCompleted}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Media giornaliera</p>
            <p className="text-lg font-semibold text-gray-700">
              {(totalCompleted / 7).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}