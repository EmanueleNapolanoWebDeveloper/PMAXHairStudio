"use client"
import { Calendar, ChevronRight } from "lucide-react"

const formatDate = (date: Date) => {
  if (!date) return '';
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

type DateSelectorProps = {
  selectedDate: Date;
  setSelectedData: (date: Date) => void
}

export default function DateSelector({ selectedDate, setSelectedData }: DateSelectorProps) {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  return (
    <div className="mb-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
      {/* Header con data */}
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-5 h-5 text-red-400" />
        <h2 className="text-lg font-medium text-white">
          {formatDate(selectedDate)}
        </h2>
      </div>

      {/* Controlli */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Pulsanti Oggi/Domani */}
        <div className="flex gap-2 flex-1">
          <button
            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 transition-colors font-medium"
            onClick={() => setSelectedData(today)}
          >
            Oggi
          </button>
          <button
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg border border-red-500 transition-colors font-medium"
            onClick={() => setSelectedData(tomorrow)}
          >
            Domani
          </button>
        </div>

        {/* Date picker */}
        <input
          type="date"
          className="px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-medium sm:w-auto w-full"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedData(new Date(e.target.value))}
        />
      </div>
    </div>
  )
}