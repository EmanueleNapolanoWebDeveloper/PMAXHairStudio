'use client'

import { Reviews } from "@/src/lib/types"
import { Star, MessageCircle } from "lucide-react"

type RecentlyReviewsProps = {
    reviews: Reviews[]
}

export default function RecentlyReviews({ reviews }: RecentlyReviewsProps) {

    const safeReviews = reviews || []

    // Calcolo rating medio
    const averageRating =
        safeReviews?.length > 0
            ? (safeReviews.reduce((sum, client) => sum + (client.rating || 0), 0) / safeReviews.length).toFixed(1)
            : 0

    return (
        <div className="bg-white rounded-xl shadow-lg w-full overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Ultime Recensioni
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                        {averageRating}
                    </span>
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.round(Number(averageRating))
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">
                <div className="space-y-6">
                    {safeReviews.length === 0 && (
                        <p className="text-sm text-gray-500 text-center">
                            Nessuna recensione ricevuta
                        </p>
                    )}

                    {safeReviews.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between border-b last:border-0 pb-4"
                        >
                            {/* Cliente */}
                            <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-800">
                                    {client.customer?.name.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {client.customer.name} {client.customer.surname}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {client.customer?.phone} • {client.customer?.email}
                                    </p>

                                    {/* Stelle + Commento */}
                                    <div className="mt-2 flex flex-col gap-1">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < client.rating
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {client.comment && (
                                            <p className="text-sm text-gray-700 italic">
                                                “{client.comment}”
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pulsante azione */}
                            <button className="text-red-600 hover:text-red-700 mt-1">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}
