'use client'
import { Clock, User, Scissors, Calendar, Plus, Phone, MapPin, Car } from 'lucide-react';
import TopHeader from './_components/TopHeader';
import DateHeader from './_components/DateHeader';
import ReservationSlot from './_components/ReservationSlot';
import CardStats from './_components/CardStats';
import { getAppointments } from './action';
import { useAuth } from '@/app/store/AuthContext';
import { useEffect, useState } from 'react';
import TimeLine from './_components/TimeLine';
import { Profile } from '@/lib/types/homepage';

export type Appointments = {
    id: number;
    start_time: string;
    end_time: string;
    customer: {
        id: string;
        name: string;
        surname: string;
        phone: string;
    };
    services: string[];
    phone: string;
    price: number;
    status: string;
    barber_id: string;
    date : Date;
}


const BarberCalendar = () => {
    const [barber, setBarber] = useState<Profile | null>(null);
    const [appointments, setAppointments] = useState<Appointments[]>([]); // ✅ Tipizzazione corretta
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // ✅ Tipizzazione correttaù
    const [selectedDate, setSelectedDate] = useState(new Date())


    //   hook
    const { user, profile } = useAuth();

    useEffect(() => {
        setBarber(profile ?? null);
    }, [profile]);


    useEffect(() => {

        const fetchAppointment = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!user?.id) {
                    setAppointments([]); // 
                    return;
                }

                const appointmentsFetched: Appointments[] = await getAppointments(user.id);

                if (!appointmentsFetched || appointmentsFetched.length === 0) {
                    console.log('Non ci sono appuntamenti');
                    setAppointments([]);
                    return;
                }

                setAppointments(appointmentsFetched);

            } catch (err) {
                console.log('Errore nel caricamento degli appuntamenti:', err);
                setError(err instanceof Error ? err.message : 'Errore sconosciuto');
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        }


        fetchAppointment();
        // ✅ Rimuovi console.log qui (appointments sarà sempre vuoto al primo render)
    }, [user?.id]); // ✅ Safe navigation nella dipendenza





    // ✅ Gestione error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <Clock className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-lg font-medium">Ops! Qualcosa è andato storto</p>
                        <p className="text-sm text-gray-600 mt-1">{error}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Ricarica pagina
                    </button>
                </div>
            </div>
        );
    }

    function handleDateSelect (data : Date){
        setSelectedDate((prev) => data);
    }

    // Calcoli dopo il caricamento
    const totalEarnings = appointments
        .filter(apt => apt.status === 'confirmed')
        .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const nextAppointment = appointments.find(apt => apt.status === 'confirmed');


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <TopHeader barber={barber} />

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Date Header */}
                <DateHeader nextAppointment={nextAppointment} selectedDate={selectedDate} setSelectedData={handleDateSelect} />

                {/* Timeline */}
                <TimeLine appointment={appointments} date={selectedDate}/>

                    {/* Bottom Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CardStats appointments={appointments} icon={User} status={'confirmed'} />
                    <CardStats appointments={appointments} icon={Clock} status={'pending'} />
                    <CardStats appointments={appointments} icon={Calendar} status={'free'} />
                </div>
            </div>
        </div>
    );
};

export default BarberCalendar;