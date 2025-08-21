export type ServicesChoiceProps = {
  services: string[]
  onToggle: (service: string) => void
  availableServices: string[]
}

export default function ServicesChoice({ services, onToggle, availableServices }: ServicesChoiceProps) {
  return (
    <div className="max-w-md mx-auto">
      <label className="block text-black font-semibold mb-3 text-lg">
        Servizi disponibili
      </label>

      <div className="grid grid-cols-2 gap-3">
        {availableServices.map((service,index) => {
          const isActive = services.includes(service)

          return (
            <button
              key={index}
              type="button"
              onClick={() => onToggle(service)}
              className={`p-3 rounded-xl border font-medium transition ${
                isActive
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {service.title}
            </button>
          )
        })}
      </div>

      {services.length > 0 && (
        <p className="mt-4 text-sm text-gray-700">
          Hai scelto:{' '}
          <span className="font-semibold">
            {services.join(', ')}
          </span>
        </p>
      )}
    </div>
  )
}
