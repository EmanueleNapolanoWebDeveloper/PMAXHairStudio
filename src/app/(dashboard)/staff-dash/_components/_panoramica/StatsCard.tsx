
'use client'

type StatsCardType = {
    stat: any,
    Icon: any,
    index: any
}
export default function StatsCard({ stat, Icon, index }: StatsCardType) {

    return (
        <>
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-red-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                </div>
            </div>
        </>
    )
}