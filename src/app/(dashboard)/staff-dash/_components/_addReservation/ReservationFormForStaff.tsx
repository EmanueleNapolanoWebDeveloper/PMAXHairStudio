import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Scissors, Save, X, Search, AlertCircle, Check, MapPin, CreditCard, Percent } from 'lucide-react';
import StaffFormReservation from './_components/StaffFormReservation';
import ReviewStaffReservation from './_components/ReviewStaffReservation';

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

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
  totalVisits: number;
}

interface ReservationFormData {
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  serviceId: string;
  barberId: string;
  notes: string;
  discountPercent: string; // Cambiato da number a string per gli input
  paymentMethod: 'cash' | 'card' | 'pending';
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ReservationFormForStaff() {
  const [formData, setFormData] = useState<ReservationFormData>({
    customerId: '',
    customerName: 'Piero',
    customerPhone: '3256984555',
    customerEmail: 'piero@piero.it',
    date: '',
    time: '',
    serviceId: '',
    barberId: '',
    notes: '',
    discountPercent: '0',
    paymentMethod: 'pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dati mock - in produzione verrebbero da API/Context
  const services: Service[] = [
    { id: '1', name: 'Taglio Classico', duration: 30, price: 25, description: 'Taglio tradizionale con forbici e rasoio' },
    { id: '2', name: 'Taglio + Barba', duration: 45, price: 35, description: 'Taglio completo con rifinitura barba' },
    { id: '3', name: 'Solo Barba', duration: 20, price: 15, description: 'Rifinitura e cura della barba' },
    { id: '4', name: 'Taglio + Styling', duration: 40, price: 30, description: 'Taglio con styling e prodotti' },
    { id: '5', name: 'Trattamento Completo', duration: 60, price: 45, description: 'Taglio, barba, shampoo e styling' },
    { id: '6', name: 'Taglio Bambino', duration: 25, price: 20, description: 'Taglio dedicato ai più piccoli' }
  ];

  const barbers: Barber[] = [
    { id: '1', name: 'Marco Rossi', specialties: ['Tagli classici', 'Barba'] },
    { id: '2', name: 'Giuseppe Bianchi', specialties: ['Styling moderno', 'Trattamenti'] },
    { id: '3', name: 'Antonio Verde', specialties: ['Tagli bambini', 'Fade'] }
  ];

  const customers: Customer[] = [
    { id: '1', name: 'Mario Rossi', phone: '+39 123 456 7890', email: 'mario.rossi@email.com', lastVisit: '2024-08-15', totalVisits: 12 },
    { id: '2', name: 'Luigi Verdi', phone: '+39 098 765 4321', email: 'luigi.verdi@email.com', lastVisit: '2024-08-20', totalVisits: 8 },
    { id: '3', name: 'Francesco Bianchi', phone: '+39 555 123 456', email: 'francesco.bianchi@email.com', lastVisit: '2024-08-10', totalVisits: 15 }
  ];

  const closedDays = ['2024-09-08', '2024-09-15']; // Domeniche esempio

  // Toast system
  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  // Validazione telefono italiano
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+39|0039|39)?[\s]?([0-9]{2,3}[\s]?[0-9]{6,7}|[0-9]{10,11})$/;
    return phoneRegex.test(phone);
  };

  // Validazione email
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email opzionale
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Carica slot disponibili quando cambia data o barbiere
  useEffect(() => {
    if (formData.date && formData.barberId) {
      setIsLoadingSlots(true);
      // Simula chiamata API per slot disponibili
      setTimeout(() => {
        const allSlots = [
          '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
          '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
          '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
        ];

        // Simula alcuni slot occupati
        const occupiedSlots = ['10:30', '15:00', '16:30'];
        const available = allSlots.filter(slot => !occupiedSlots.includes(slot));

        setAvailableSlots(available);
        setIsLoadingSlots(false);
      }, 800);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.date, formData.barberId]);

  // Filtra clienti per ricerca
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.phone.includes(customerSearch)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Gestione speciale per discountPercent
    if (name === 'discountPercent') {
      const numValue = Math.min(100, Math.max(0, Number(value) || 0));
      processedValue = numValue.toString();
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Rimuovi errore quando l'utente corregge
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email
    }));
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) newErrors.customerName = 'Nome obbligatorio';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Telefono obbligatorio';
    else if (!validatePhone(formData.customerPhone)) newErrors.customerPhone = 'Formato telefono non valido';
    if (formData.customerEmail && !validateEmail(formData.customerEmail)) newErrors.customerEmail = 'Formato email non valido';
    if (!formData.date) newErrors.date = 'Data obbligatoria';
    if (!formData.time) newErrors.time = 'Orario obbligatorio';
    if (!formData.serviceId) newErrors.serviceId = 'Servizio obbligatorio';
    if (!formData.barberId) newErrors.barberId = 'Barbiere obbligatorio';

    // Controlla se la data è in un giorno di chiusura
    if (formData.date && closedDays.includes(formData.date)) {
      newErrors.date = 'Il negozio è chiuso in questa data';
    }

    // Controlla se la data è nel passato
    const today = new Date().toISOString().split('T')[0];
    if (formData.date && formData.date < today) {
      newErrors.date = 'Non puoi prenotare nel passato';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      addToast('Correggi gli errori nel form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simula chiamata API
      await new Promise(resolve => setTimeout(resolve, 2000));

      addToast('Prenotazione creata con successo!', 'success');

      // Reset form
      setFormData({
        customerId: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        date: '',
        time: '',
        serviceId: '',
        barberId: '',
        notes: '',
        discountPercent: '0',
        paymentMethod: 'pending'
      });
      setCustomerSearch('');
      setAvailableSlots([]);
      setErrors({});
    } catch (error) {
      console.error('Errore nella creazione della prenotazione:', error);
      addToast('Errore nella creazione della prenotazione', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      customerId: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      date: '',
      time: '',
      serviceId: '',
      barberId: '',
      notes: '',
      discountPercent: '0',
      paymentMethod: 'pending'
    });
    setCustomerSearch('');
    setErrors({});
    setAvailableSlots([]);
  };

  // Trova oggetti selezionati per il riepilogo
  const selectedService = services.find(s => s.id === formData.serviceId);
  const selectedBarber = barbers.find(b => b.id === formData.barberId);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen ">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all transform ${toast.type === 'success' ? 'bg-green-500 text-white' :
              toast.type === 'error' ? 'bg-red-500 text-white' :
                'bg-blue-500 text-white'
              }`}
          >
            {toast.type === 'success' && <Check className="h-4 w-4" />}
            {toast.type === 'error' && <AlertCircle className="h-4 w-4" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full h-full">

        <div className="p-6 space-y-6">

          {/* Form prenotazione */}
          <StaffFormReservation
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            barbers={barbers}
            services={services}
            availableSlots={availableSlots}
            isLoadingSlots={isLoadingSlots}
          />

          {/* Riepilogo - mostra solo se ci sono dati sufficienti */}
          {(selectedService || selectedBarber || formData.time) && (
            <ReviewStaffReservation
              formData={formData}
              selectedService={selectedService}
              selectedBarber={selectedBarber}
              selectedDate={formData.date}
              selectedTime={formData.time}
            />
          )}

        </div>
      </div>
    </div>
  );
}