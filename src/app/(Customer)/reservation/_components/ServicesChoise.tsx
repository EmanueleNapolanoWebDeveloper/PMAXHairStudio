'use client'
import { Service } from '@/lib/types/homepage'

export type ServicesChoiceProps = {
  services: Service[];
  onToggle: (service: Service) => void;
  loading: boolean;
  setActiveTab: (tab: string) => void;
  allServices: Service[];
  activeTab: string;
}

export default function ServicesChoice({ 
  services, 
  onToggle, 
  loading, 
  setActiveTab, 
  activeTab, 
  allServices 
}: ServicesChoiceProps) {

  if (loading) {
    return (
      <div className="w-full mx-auto animate-pulse">
        <label className="block text-black font-semibold mb-3 text-lg">
          Servizi disponibili
        </label>

        {/* Skeleton Tabs */}
        <div className="flex gap-3 mb-4 border-b">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-6 w-20 bg-gradient-to-r from-white via-red-200 to-white rounded"
            ></div>
          ))}
        </div>

        {/* Skeleton bottoni servizi */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-white via-red-200 to-white"
            ></div>
          ))}
        </div>

        {/* Testo caricamento */}
        <p className="mt-6 text-center text-red-600 font-semibold animate-pulse">
          Stiamo caricando i dati ...
        </p>
      </div>
    )
  }

  const categories = Array.from(new Set(allServices.map(s => s.category)))
  const filteredServices = allServices.filter(s => s.category === activeTab)

  return (
    <div className="w-full mx-auto">
      <label className="block text-black font-semibold mb-3 text-lg">
        Servizi disponibili
      </label>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b">
        {categories.map(cat => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-2 font-semibold transition ${
              activeTab === cat
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Servizi filtrati */}
      <div className="grid grid-cols-2 gap-3">
        {filteredServices.map(service => {
          const isActive = services.some(s => s.title === service.title)
          return (
            <button
              key={service.title}
              type="button"
              onClick={() => onToggle(service)}
              className={`p-3 rounded-xl border font-medium transition ${
                isActive
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {service.title} ({service.price}€)
            </button>
          )
        })}
      </div>

      {services.length > 0 && (
        <p className="mt-4 text-base text-gray-700">
          Hai scelto:{' '}
          <span className="font-semibold">
            {services.map(s => s.title).join(', ')}
          </span>
        </p>
      )}
    </div>
  )
}
