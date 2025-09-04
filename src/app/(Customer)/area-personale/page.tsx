import UserProfile from "./_components/UserProfile"
import FidelityCard from "./_components/FidelityCard"
import ReservationPanoramics from "./_components/ReservationPanoramics"
import ActionCard from "./_components/ActionCard"
import Link from "next/link"
import { getUserReservations } from "@/src/lib/actions"
import { createClient } from "@/src/utils/supabase/server"
import { redirect } from "next/navigation"
import { User } from "lucide-react"

const Dashboard = async () => {
    const supabase = await createClient()
    
    // Ottieni l'utente corrente dal server
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (!user || authError) {
        redirect('/login')
    }

    // Ottieni il profilo dell'utente
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-black pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-12 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-3">
                            Dashboard Personale
                        </h1>
                        <p className="text-lg text-gray-300 font-medium">
                            Caricamento profilo in corso...
                        </p>
                    </header>
                </div>
            </div>
        )
    }

    const reservations = await getUserReservations(user.id);

    // Calcola le statistiche dai dati
    const stats = {
        total: reservations.length,
        pending: reservations.filter(r => r.status === 'pending').length,
        completed: reservations.filter(r => r.status === 'completed').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-black pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-12 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-3">
                        Dashboard Personale
                    </h1>
                    <p className="text-lg text-gray-300 font-medium">
                        Gestisci i tuoi appuntamenti e visualizza la cronologia delle prenotazioni
                    </p>
                </header>

                {/* Top Section: Profile + Stats */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* User Profile */}
                    <div className="lg:col-span-1">
                        <UserProfile profile={profile} />
                    </div>

                    {/* Stats + ReservationPanoramics */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Fidelity Card */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-1 shadow-2xl border border-slate-700/50">
                            <FidelityCard completed={stats.completed} totalSlots={10} />
                        </div>

                        {/* Reservation List */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700/50">
                            <ReservationPanoramics reservations={reservations} />
                        </div>
                    </div>
                </section>

                {/* Bottom Section: Action Cards + Support */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {!profile.reg_complete && (
                            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-amber-700/30 hover:border-amber-600/50 transition-all duration-300">
                                <ActionCard
                                    title="Completa il Profilo"
                                    description="Aggiungi le informazioni mancanti per un'esperienza personalizzata"
                                    buttonText="Completa Ora"
                                    icon={User}
                                    gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                                />
                            </div>
                        )}
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Dashboard