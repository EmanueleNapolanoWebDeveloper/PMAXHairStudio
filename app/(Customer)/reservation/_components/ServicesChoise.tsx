'use client'
import { useState, useEffect } from 'react'
import { getServices } from '../actions'

export type Service = {
  id: number
  title: string
  time: number // minuti come number
  price: number
  category: string
}

export type ServicesChoiceProps = {
  services: Service[]
  onToggle: (service: Service) => void
}

export default function ServicesChoice({ services, onToggle }: ServicesChoiceProps) {
  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    getServices()
      .then((data: Service[]) => {
        setAvailableServices(data)
        if (data.length > 0) setActiveTab(data[0].category)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Caricamento servizi...</p>

  const categories = Array.from(new Set(availableServices.map(s => s.category)))
  const filteredServices = availableServices.filter(s => s.category === activeTab)

  return (
    <div className="w-full mx-auto">
      <label className="block text-black font-semibold mb-3 text-lg">
        Servizi disponibili
      </label>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b">
        {categories.map(cat => (
          <button
          type= "button"
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-2 font-semibold transition ${
              activeTab === cat ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'
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
          Hai scelto: <span className="font-semibold">{services.map(s => s.title).join(', ')}</span>
        </p>
      )}
    </div>
  )
}
