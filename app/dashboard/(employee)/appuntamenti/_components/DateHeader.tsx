"use client"

import { Calendar, ChevronRight } from "lucide-react"

const formatDate = (date: Date) => {
  if(!date) return '';
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
    <div className="mb-6 p-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Calendar className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white capitalize text-balance">{formatDate(selectedDate)}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              className="group px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 font-medium flex items-center gap-2"
              onClick={() =>setSelectedData(today)}
            >
              Oggi
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              className="group px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl border border-red-500 hover:border-red-400 transition-all duration-200 font-medium flex items-center gap-2 shadow-lg shadow-red-600/20"
              onClick={() =>setSelectedData(tomorrow)}
            >
              Domani
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <div className="relative">
            <input
              type="date"
              className="px-4 py-2.5 bg-gray-800 text-gray-200 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium min-w-[140px]"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedData(new Date(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
