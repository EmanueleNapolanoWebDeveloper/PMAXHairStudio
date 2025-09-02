'use client'


import { Calendar, Euro } from "lucide-react"
export default function WeeklyPerformance({ weeklyStats }) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Performance Settimanale</h3>
            </div>
            <div className="p-4 sm:p-6">
                <div className="space-y-3">
                    {weeklyStats.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{day.appointments}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Euro className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-semibold text-red-600">€{day.earnings}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}