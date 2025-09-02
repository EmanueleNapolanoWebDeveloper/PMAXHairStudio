'use client'

type CardStatsType = {
    appointments: {
        id: number;
        time: string;
        endTime: string;
        client: string;
        service: string;
        phone: string;
        price: number;
        status: string;
        avatar: string;
    },
    icon: string,
    status: string
}

export default function CardStats({ appointments, icon, status }: CardStatsType) {

    const Icon = icon;

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {appointments.filter(a => a.status === status).length}
                    </p>
                    <p className="text-gray-600">Clienti Oggi</p>
                </div>
            </div>
        </div>
    )
}