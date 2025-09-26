'use client'

import { useState } from "react"
import { useAuth } from "../../store/AuthContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import UserProfile from "./_components/UserProfile"
import FidelityCard from "./_components/FidelityCard"
import ReservationPanoramics from "./_components/ReservationPanoramics"
import ActionCard from "./_components/ActionCard"
import ReviewModal from "@/src/components/UI/ReviewModal"
import { User } from "lucide-react"

import { addReview, getUserReservations, fetchReviewById, deleteReservation } from "@/src/lib/actions"
import { Reviews, Reservation } from "@/src/lib/types"



interface SubmitReviewParams {
    rating: number
    comment: string
}

const Dashboard = () => {
    const { user, profile } = useAuth()
    const queryClient = useQueryClient()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

    // === Queries ===
    const { data: reservations = [], isLoading, isError } = useQuery<Reservation[]>({
        queryKey: ['reservations', user?.id],
        queryFn: async () => {
            const res = await getUserReservations(user!.id)
            return res || []
        },
        enabled: !!user?.id
    })

    const { data: userReviews = [] } = useQuery<Reviews[]>({
        queryKey: ['reviews', user?.id],
        queryFn: async () => {
            const res = await fetchReviewById(user!.id)
            return res || []          
        },
        enabled: !!user?.id
    })



    // === Mutations ===
    const { mutate: createReview } = useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] })
            handleCloseModal()
            toast.success('Recensione aggiunta con successo!')
        },
        onError: () => {
            toast.error("Errore durante l'aggiunta della recensione.")
        }
    })

    const { mutate: removeReservation } = useMutation({
        mutationFn: deleteReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] })
            toast.success('Appuntamento eliminato')
        },
        onError: () => {
            toast.error('Errore durante l\'eliminazione dell\'appuntamento')
        }
    })

    // === Handlers ===
    const handleOpenModal = (reservation: Reservation) => {
        setSelectedReservation(reservation)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedReservation(null)
        setIsModalOpen(false)
    }

    const handleDeleteReservation = (reservationId: number) => {
        removeReservation(reservationId)
    }

    const handleSubmitReview = ({ rating, comment }: SubmitReviewParams) => {
        if (!selectedReservation || !user) return

        createReview({ // id temporaneo, backend lo sostituirà
            customer: user?.id,
            reservation_id: {
                id: selectedReservation.id,
            },
            rating,
            comment,
            created_at: new Date().toISOString()
        } as Reviews)

    }

    // === Stats ===
    const stats = {
        total: reservations.length,
        pending: reservations.filter(r => r.status === 'prenotato').length,
        completed: reservations.filter(r => r.status === 'completato').length,
    }

    // === Render loading/error states ===
    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-black pt-24 pb-12 flex items-center justify-center">
                <p className="text-gray-300 text-lg">Caricamento profilo in corso...</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900/20 to-black">
                <p className="text-gray-300 text-lg">Caricamento prenotazioni...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900/20 to-black">
                <p className="text-red-400 text-lg">Errore nel caricamento delle prenotazioni</p>
            </div>
        )
    }

    // === Main render ===
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-black pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-3">
                        La mia Area Personale
                    </h1>
                    <p className="text-lg text-gray-300 font-medium">
                        Gestisci i tuoi appuntamenti e visualizza la cronologia delle prenotazioni
                    </p>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-1">
                        <UserProfile profile={profile} />
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-1 shadow-2xl border border-slate-700/50">
                            <FidelityCard completed={stats.completed} totalSlots={10} />
                        </div>

                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700/50">
                            <ReservationPanoramics
                                reservations={reservations}
                                reviews={userReviews}
                                onDelete={handleDeleteReservation}
                                setIsModalOpen={setIsModalOpen}
                                setSelectedReservation={setSelectedReservation}
                            />
                        </div>
                    </div>
                </section>

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

            <ReviewModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitReview}
            />
        </div>
    )
}

export default Dashboard
