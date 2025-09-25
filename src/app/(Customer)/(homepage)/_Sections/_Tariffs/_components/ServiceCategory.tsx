import ServiceItem from "./ServiceItem";
import { Service } from "@/src/lib/types";



type Category = {
    category: string;
    icon?: string;
    popular: boolean;
    items: Service[];
};

type ServiceCategoryProps = {
    category: Category;
    categoryIndex: number;
};

export default function ServiceCategory({ category, categoryIndex }: ServiceCategoryProps) {
    const gradients = [
        'from-red-950 via-red-800 to-red-600',
        'from-zinc-950 via-gray-800 to-zinc-600',
        'from-cyan-950 via-cyan-800 to-cyan-600',
        'from-emerald-950 via-emerald-800 to-emerald-600',
        'from-amber-600/90 via-yellow-800/70 to-yellow-950/50 backdrop-blur-lg',
        'from-amber-600/80 via-orange-800/70 to-red-950/60 backdrop-blur-lg',
    ];

    const selectedGradient = gradients[categoryIndex % gradients.length];

    return (
        <div
            className={`group relative bg-white shadow-lg overflow-hidden
                 transform transition-all duration-500 hover:-translate-y-2
                 ${category.popular ? 'ring-2 ring-yellow-400 shadow-yellow-100' : ''}
                 hover:shadow-2xl border border-gray-100`}
        >
            {category.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500
                          text-white px-6 py-2 rounded-full text-sm font-bold
                          shadow-lg animate-pulse">
                        PIÙ RICHIESTO
                    </div>
                </div>
            )}

            <div className={`bg-gradient-to-r ${category.popular ? 'from-yellow-500 to-orange-600' : selectedGradient} text-white`}>
                <div className="flex items-center justify-start">
                    <h2 className="text-[3rem] p-0 m-0 font-black drop-shadow-lg tracking-wide uppercase">{category.category}</h2>
                </div>
            </div>

            <div className="p-6">
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
                    <p className="text-gray-500 text-center py-4">
                        Nessun servizio disponibile in questa categoria
                    </p>
                )}
            </div>
        </div>
    );
}
