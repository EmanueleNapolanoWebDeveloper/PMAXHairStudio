import { Check, Clock, CreditCard, User, Scissors, Calendar } from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface Barber {
  id: string;
  name: string;
  specialties: string[];
}

interface FormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  serviceId: string;
  barberId: string;
  discountPercent: string;
  paymentMethod: string;
  notes: string;
}

interface Props {
  formData: FormData;
  selectedService?: Service;
  selectedBarber?: Barber;
  selectedDate: string;
  selectedTime: string;
}

const calculateEndTime = (startTime: string, duration: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMins = totalMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getPaymentMethodLabel = (method: string): string => {
  switch (method) {
    case 'cash': return 'Contanti';
    case 'card': return 'Carta';
    case 'pending': return 'In sospeso';
    default: return method;
  }
};

export default function ReviewStaffReservation({ 
  formData, 
  selectedService, 
  selectedBarber, 
  selectedDate, 
  selectedTime 
}: Props) {
  const discountPercent = Number(formData.discountPercent) || 0;
  const finalPrice = selectedService 
    ? selectedService.price * (1 - discountPercent / 100) 
    : 0;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Check className="h-5 w-5 text-yellow-600" />
        Riepilogo Prenotazione
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Cliente */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 mb-2">
            <User className="h-4 w-4" />
            <span className="font-medium">Cliente</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{formData.customerName}</p>
          <p className="text-sm text-gray-600">{formData.customerPhone}</p>
          {formData.customerEmail && (
            <p className="text-xs text-gray-500">{formData.customerEmail}</p>
          )}
        </div>

        {/* Data e Orario */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Data & Orario</span>
          </div>
          {selectedDate && (
            <p className="text-sm text-gray-600 mb-1">{formatDate(selectedDate)}</p>
          )}
          {selectedTime && selectedService && (
            <>
              <p className="text-sm font-semibold text-gray-800">
                {selectedTime} - {calculateEndTime(selectedTime, selectedService.duration)}
              </p>
              <p className="text-xs text-gray-500">Durata: {selectedService.duration} min</p>
            </>
          )}
        </div>

        {/* Servizio */}
        {selectedService && (
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <Scissors className="h-4 w-4" />
              <span className="font-medium">Servizio</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedService.name}</p>
            <p className="text-xs text-gray-500">{selectedService.description}</p>
          </div>
        )}

        {/* Barbiere */}
        {selectedBarber && (
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <User className="h-4 w-4" />
              <span className="font-medium">Barbiere</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedBarber.name}</p>
            <p className="text-xs text-gray-500">{selectedBarber.specialties.join(', ')}</p>
          </div>
        )}

        {/* Prezzo */}
        {selectedService && (
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">Prezzo</span>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Base:</span>
                <span>€{selectedService.price.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Sconto {discountPercent}%:</span>
                  <span>-€{(selectedService.price * discountPercent / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-1 mt-1">
                <span>Totale:</span>
                <span>€{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pagamento */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 mb-2">
            <CreditCard className="h-4 w-4" />
            <span className="font-medium">Pagamento</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {getPaymentMethodLabel(formData.paymentMethod)}
          </p>
          {formData.paymentMethod === 'pending' && (
            <p className="text-xs text-amber-600">Da pagare all'arrivo</p>
          )}
        </div>
      </div>

      {/* Note */}
      {formData.notes && (
        <div className="bg-white p-4 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2">Note aggiuntive:</h5>
          <p className="text-sm text-gray-600">{formData.notes}</p>
        </div>
      )}
    </div>
  );
}