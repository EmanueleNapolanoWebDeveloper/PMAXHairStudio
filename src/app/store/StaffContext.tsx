'use client'
import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./AuthContext"
import { createClient } from "@/src/utils/supabase/client"
import { getStaffIDAppointments, fetchAllProfiles, getEmployees, getServices, fetchAllReviews, fetchReviewsForStaffID } from "@/src/lib/actions"
import { Reservation, Profile, Service, Reviews } from "@/src/lib/types"

type StaffContextValue = {
    reservations: Reservation[]
    allReviews: Reviews[]
    staffReviews: Reviews[]
    barberRes: Reservation[]
    timeResBarber: Reservation[]
    customers: Profile[]
    employees: Profile[]
    services: Service[]
    barber: Profile | undefined
    refreshReservations: () => void
}

const StaffContext = createContext<StaffContextValue | undefined>(undefined)

export const StaffProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    // Tutte le query
    const { data: reservations = [] } = useQuery({
        queryKey: ['reservations', user?.id],
        queryFn: () => user?.id ? getStaffIDAppointments(user.id) : [],
        enabled: !!user?.id
    })

    const { data: allReviews, isLoading: allReviewsIsLoading, isError: allReviewsIsError, error: allReviewsError } = useQuery({
        queryKey: ['reviews', user?.id],
        queryFn: () => fetchAllReviews(),
    })

    const { data: staffReviews, isLoading: staffReviewsIsLoading, isError: staffReviewsIsError, error: staffReviewsError } = useQuery({
        queryKey: ['staff-reviews', user?.id],
        queryFn: () => fetchReviewsForStaffID(user?.id),
        enabled: !!user?.id
    })

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchAllProfiles,
    })

    const { data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees
    })

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: getServices
    })

    // Barber loggato
    const barber = employees.find(emp => emp.id === user?.id)

    // Filtra le prenotazioni del barber
    const barberRes = reservations.filter(r =>
        typeof r.barber_id === 'string'
            ? r.barber_id === user?.id
            : r.barber_id.id === user?.id
    )




    // Genera slot temporali
    const timeResBarber = barberRes.map(r => ({
        date: r.date,
        start_time: r.start_time,
        end_time: r.end_time
    }))

    console.log('timeResBarber:', timeResBarber);

    // Realtime Supabase per aggiornamenti
    useEffect(() => {
        if (!user?.id) return
        const supabase = createClient()
        const channel = supabase
            .channel('all_reservations_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appuntamenti' }, () => {
                queryClient.invalidateQueries({ queryKey: ['reservations'] })
                queryClient.refetchQueries({ queryKey: ['reservations', user.id] })
            })
            .subscribe()
        return () => channel.unsubscribe()
    }, [user?.id, queryClient])

    return (
        <StaffContext.Provider value={{
            reservations,
            allReviews,
            staffReviews,
            barberRes,
            timeResBarber,
            customers,
            employees,
            services,
            barber,
            refreshReservations: () => queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] })
        }}>
            {children}
        </StaffContext.Provider>
    )
}

export const useStaffContext = () => {
    const context = useContext(StaffContext)
    if (!context) throw new Error("useStaff deve essere usato dentro un StaffProvider")
    return context
}
