"use client"
import type { Service } from "@/src/lib/types"

type ServiceItemsProps = {
    service: Service
    categoryIndex: number
    serviceIndex: number
}

export default function ServiceItem({ service, categoryIndex, serviceIndex }: ServiceItemsProps) {
    return (
        <div
            key={`service-${categoryIndex}-${serviceIndex}-${service.title}`}
            className="group/item flex justify-between items-center py-5 px-4
                       border-b-2 border-foreground/10 last:border-b-0
                       hover:bg-accent/5 transition-all duration-300
                       relative"
        >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent opacity-0 group-hover/item:opacity-100 transition-opacity" />

            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h3
                        className="font-serif font-bold text-xl text-black
                                   group-hover/item:text-black/80 transition-colors tracking-wide"
                    >
                        {service.title}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent max-w-[100px]" />
                </div>
                {service.description && (
                    <p className="text-sm text-gray-700 mb-2 italic">
                        {service.description}
                    </p>
                )}
                {service.duration && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-6 h-6 text-accent text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="font-medium text-black">{service.duration}</span>
                    </div>
                )}
            </div>

            <div className="text-right ml-6">
                <div className="relative">
                    <div className="text-4xl font-serif font-black text-red-600 text-vintage">
                        €{service.price}
                    </div>
                    <div className="h-1 w-full bg-red-600 mt-1 rounded-full" />
                </div>
            </div>
        </div>
    )
}