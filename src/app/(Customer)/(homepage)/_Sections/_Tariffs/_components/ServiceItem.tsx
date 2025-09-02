import { createClient } from '@/src/utils/supabase/server';

// Componente per il singolo servizio
export default function ServiceItem({ service, categoryIndex, serviceIndex }: any) {
    return (
        <div
            key={`service-${categoryIndex}-${serviceIndex}-${service.name}`}
            className="group/item flex justify-between items-center py-4 
                       border-b border-gray-100 last:border-b-0
                       hover:bg-gray-50 rounded-lg px-3 -mx-3
                       transition-all duration-300"
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 
                                   group-hover/item:text-red-600 transition-colors">
                        {service.name}
                    </h3>
                    {service.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            €{service.originalPrice}
                        </span>
                    )}
                </div>
                
                {service.description && (
                    <p className="text-sm text-gray-500 mb-2">
                        {service.description}
                    </p>
                )}
                
                {service.duration && (
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {service.duration}
                        </span>
                    </div>
                )}
            </div>

            <div className="text-right ml-4">
                <div className="text-3xl font-bold text-red-600">
                    €{service.price}
                </div>
            </div>
        </div>
    );
}