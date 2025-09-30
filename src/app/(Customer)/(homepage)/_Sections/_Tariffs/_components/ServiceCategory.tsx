import ServiceItem from "./ServiceItem"
import type { Service } from "@/src/lib/types"

type Category = {
    category: string
    icon?: string
    popular: boolean
    items: Service[]
}

type ServiceCategoryProps = {
    category: Category
    categoryIndex: number
}

export default function ServiceCategory({ category, categoryIndex }: ServiceCategoryProps) {

    
    // Array di gradienti dark per le diverse categorie
    const gradients = [
        // Rosso Scuro
        {
            gradient: "bg-gradient-to-br from-red-950 via-red-900 to-black",
            ring: "ring-red-600",
            shadow: "shadow-red-600/30",
            glow: "shadow-[0_0_50px_rgba(220,38,38,0.5)]"
        },
        // Oro Scuro
        {
            gradient: "bg-gradient-to-br from-yellow-950 via-yellow-900 to-amber-950",
            ring: "ring-yellow-600",
            shadow: "shadow-yellow-600/30",
            glow: "shadow-[0_0_50px_rgba(202,138,4,0.5)]"
        },
        // Nero Profondo
        {
            gradient: "bg-gradient-to-br from-slate-950 via-slate-900 to-black",
            ring: "ring-slate-600",
            shadow: "shadow-slate-600/30",
            glow: "shadow-[0_0_50px_rgba(71,85,105,0.5)]"
        },
        // Rosso Intenso
        {
            gradient: "bg-gradient-to-br from-red-900 via-red-800 to-slate-900",
            ring: "ring-red-500",
            shadow: "shadow-red-500/30",
            glow: "shadow-[0_0_50px_rgba(239,68,68,0.5)]"
        },
        // Nero Grafite
        {
            gradient: "bg-gradient-to-br from-gray-950 via-gray-900 to-black",
            ring: "ring-gray-600",
            shadow: "shadow-gray-600/30",
            glow: "shadow-[0_0_50px_rgba(75,85,99,0.5)]"
        },
        // Oro Ambrato
        {
            gradient: "bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-950",
            ring: "ring-amber-600",
            shadow: "shadow-amber-600/30",
            glow: "shadow-[0_0_50px_rgba(217,119,6,0.5)]"
        },
        // Rosso Cremisi
        {
            gradient: "bg-gradient-to-br from-rose-950 via-rose-900 to-black",
            ring: "ring-rose-600",
            shadow: "shadow-rose-600/30",
            glow: "shadow-[0_0_50px_rgba(225,29,72,0.5)]"
        },
        // Oro Bronzo
        {
            gradient: "bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950",
            ring: "ring-amber-700",
            shadow: "shadow-amber-700/30",
            glow: "shadow-[0_0_50px_rgba(180,83,9,0.5)]"
        },
        // Nero Carbone
        {
            gradient: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-black",
            ring: "ring-zinc-600",
            shadow: "shadow-zinc-600/30",
            glow: "shadow-[0_0_50px_rgba(82,82,91,0.5)]"
        },
    ]

    const colorScheme = gradients[categoryIndex % gradients.length]

    return (
        <div
            className={`group relative bg-card vintage-border overflow-hidden
                 transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]
                 ${category.popular ? `ring-4 ${colorScheme.ring} shadow-2xl ${colorScheme.shadow} ${colorScheme.glow}` : "shadow-xl"}
                 scroll-reveal`}
            style={{ transitionDelay: `${categoryIndex * 100}ms` }}
        >
            <div className={`relative ${colorScheme.gradient} text-white py-6 px-8 overflow-hidden`}>
                {/* Effetto overlay scuro */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Decorative corner flourishes */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/40 z-10" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/40 z-10" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/40 z-10" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/40 z-10" />

                {/* Effetto luce animato */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>

                <div className="relative z-10 flex items-center justify-center gap-4">
                    <div className="flex-1 h-px bg-white/40 max-w-[60px]" />
                    <h2 className="text-5xl font-serif font-black tracking-wider uppercase text-center drop-shadow-lg">
                        {category.category}
                    </h2>
                    <div className="flex-1 h-px bg-white/40 max-w-[60px]" />
                </div>
            </div>

            <div className="p-8 bg-card flex flex-col gap-3">
                {category.items && category.items.length > 0 ? (
                    category.items.map((service: Service, serviceIndex: number) => (
                        <ServiceItem
                            key={`service-${categoryIndex}-${serviceIndex}`}
                            service={service}
                            categoryIndex={categoryIndex}
                            serviceIndex={serviceIndex}
                        />
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8 italic">
                        Nessun servizio disponibile in questa categoria
                    </p>
                )}
            </div>
        </div>
    )
}