'use client'
import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Scissors, CreditCard } from 'lucide-react'
import BarberChoise from './BarberChoise'
import ServicesChoise, { Service } from './ServicesChoise'
import DataChoise from './DataChoise'
import TimeChoise from './TimeChoise'
import SummaryReservation from './SummaryReservation'
import { createReservation, EmployeeProfile } from '../actions'
import { useAuth } from '@/src/app/store/AuthContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const STEPS = [
  { id: 1, title: 'Barbiere', icon: User, description: 'Scegli il tuo barbiere' },
  { id: 2, title: 'Servizi', icon: Scissors, description: 'Seleziona i servizi' },
  { id: 3, title: 'Data', icon: Calendar, description: 'Scegli la data' },
  { id: 4, title: 'Orario', icon: Clock, description: "Seleziona l'orario" },
  { id: 5, title: 'Riepilogo', icon: CreditCard, description: 'Conferma prenotazione' }
]

export default function ReservationForm({open} : {open : () => void}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [barber, setBarber] = useState<EmployeeProfile | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const { profile } = useAuth()
  const router = useRouter()

  const totalPrice = useMemo(
    () => services.reduce((acc, s) => acc + s.price, 0),
    [services]
  )
  const totalDuration = useMemo(
    () => services.reduce((acc, s) => acc + Number(s.time), 0),
    [services]
  )

  const toggleService = (service: Service) => {
    setServices(prev =>
      prev.some(s => s.title === service.title)
        ? prev.filter(s => s.title !== service.title)
        : [...prev, service]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!barber) return
    setIsSubmitting(true)
    setSubmitMessage('')
    try {
      const result = await createReservation({
        barber_id: barber.id,
        services,
        date,
        start_time: time
      })
      if (result.error) {
        setSubmitMessage('Errore durante la prenotazione. Riprova.')
        toast.error('Errore durante la prenotazione. Riprova.')
      } else {
        setSubmitMessage('Prenotazione creata con successo!')
        toast.success('Prenotazione creata con successo!')
        setBarber(null)
        setServices([])
        setDate('')
        setTime('')
        router.push('/')
      }
    } catch {
      setSubmitMessage('Errore durante la prenotazione. Riprova.')
      toast.error('Errore durante la prenotazione. Riprova.')
    } finally {
      setIsSubmitting(false)
      open(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!barber
      case 2: return services.length > 0
      case 3: return !!date
      case 4: return !!time
      case 5: return true
      default: return false
    }
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  const goToStep = (step: number) => {
    if (step <= currentStep || isStepCompleted(step - 1)) setCurrentStep(step)
  }
  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1: return !!barber
      case 2: return services.length > 0
      case 3: return !!date
      case 4: return !!time
      default: return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <BarberChoise barber={barber} onChange={setBarber} />
      case 2: return <ServicesChoise services={services} onToggle={toggleService} />
      case 3: return <DataChoise date={date} onChange={setDate} />
      case 4: return <TimeChoise time={time} onChange={setTime} />
      case 5:
        return (
          <SummaryReservation
            barber={barber}
            services={services}
            date={date}
            time={time}
            totalPrice={totalPrice}
          />
        )
      default: return null
    }
  }

  return (
    <div className="w-full max-w-lg md:max-w-3xl mx-auto max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-red-900 to-black px-4 py-4 md:px-6 md:py-6 border-b-4 border-red-600">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
            Prenota Appuntamento
          </h2>
          <div className="w-12 md:w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Progress bar */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep
            const isCompleted = isStepCompleted(step.id)
            const isAccessible = step.id <= currentStep || isCompleted
            return (
              <div key={step.id} className="flex flex-col items-center relative">
                {index < STEPS.length - 1 && (
                  <div className="absolute top-5 md:top-6 left-6 w-full h-0.5 bg-gray-600 -z-10"></div>
                )}
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!isAccessible}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${isCompleted
                    ? 'bg-red-600 border-red-600 text-white shadow-md'
                    : isActive
                      ? 'bg-white border-white text-black shadow-md'
                      : isAccessible
                        ? 'border-gray-400 text-gray-400 bg-black hover:border-red-400 hover:text-red-400'
                        : 'border-gray-700 text-gray-700 bg-black cursor-not-allowed'
                    }`}
                >
                  {isCompleted ? <Check size={16} /> : <step.icon size={16} />}
                </button>
                <span className={`text-[0.6rem] md:text-xs mt-2 font-medium text-center hidden md:block ${isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Progress line */}
        <div className="relative mb-1 md:mb-2">
          <div className="h-1 bg-gray-700 rounded-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6">
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg md:text-2xl font-bold text-black mb-2 flex items-center gap-2 md:gap-3">

            {STEPS[currentStep - 1].title}
          </h3>
          <p className="text-gray-600 text-sm md:text-lg ml-9 md:ml-11">
            {STEPS[currentStep - 1].description}
          </p>
        </div>

        <div className="min-h-[200px] md:min-h-[300px]">
          {renderStepContent()}
        </div>

        {submitMessage && (
          <div className={`p-3 md:p-4 rounded-xl text-center mb-4 md:mb-6 border-2 font-medium ${submitMessage.includes('successo')
            ? 'bg-red-50 text-red-800 border-red-200'
            : 'bg-gray-50 text-gray-800 border-gray-300'
            }`}>
            {submitMessage}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-4 md:px-8 md:py-6 flex  justify-between items-center gap-3 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${currentStep === 1
            ? "text-gray-400 border border-gray-200 cursor-not-allowed bg-gray-50"
            : "text-gray-700 border border-gray-300 bg-white hover:bg-gray-800 hover:text-white"
            }`}
        >
          <ChevronLeft size={14} strokeWidth={2} />
          Indietro
        </button>

        {currentStep < STEPS.length ? (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${!isStepValid()
                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                : "bg-red-600 text-white border border-red-600 hover:bg-red-700 shadow-sm"
              }`}
          >
            Avanti
            <ChevronRight size={14} strokeWidth={2} />
          </button>


        ) : (
          <div className="w-full md:w-auto">
            {profile ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full md:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-2 ${isSubmitting
                  ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                  : 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 shadow-lg'
                  }`}
              >
                {isSubmitting ? 'Prenotando...' : 'Conferma'}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full md:w-auto inline-block px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg border-2 border-black text-center"
              >
                Accedi per prenotare
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
