'use client'

import { useAuth } from "@/src/app/store/AuthContext"

type WelcomeStaffSectionProps = {
    todayAppointments: number | undefined
}



export default function WelcomeStaffSection({ todayAppointments }: WelcomeStaffSectionProps) {

    const { profile } = useAuth();



    return (
        <div className="bg-gradient-to-r from-red-600 to-black rounded-xl p-6 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">Buongiorno, {profile?.name} 👋</h3>
                    <p className="text-red-100 text-sm sm:text-base">
                        Oggi hai <span className="font-semibold">{todayAppointments}</span> appuntamenti programmati. Pronto per una grande giornata?
                    </p>
                </div>
            </div>
        </div>
    )
}
