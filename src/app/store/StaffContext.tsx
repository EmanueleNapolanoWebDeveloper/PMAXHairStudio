'use client'

import { createContext, useContext, ReactNode, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./AuthContext"
import { createClient } from "@/src/utils/supabase/client"
import {
    getStaffIDAppointments,
    fetchAllProfiles,
    getEmployees,
    getServices,
    fetchAllReviews,
    fetchReviewsForStaffID,
    fetchAllMemos
} from "@/src/lib/actions"
import { Reservation, Profile, Service, Reviews, StaffNotes, ReservationFull } from "@/src/lib/types"
import { TimeSlot } from "../(Customer)/reservation/page"
import { RealtimeChannel } from "@supabase/supabase-js"

type QueryState<T> = {
    data: T
    isLoading: boolean
    isError: boolean
    error: Error | null
}

type StaffContextValue = {
    reservations: QueryState<ReservationFull[]>
    allReviews: QueryState<Reviews[]>
    staffReviews: QueryState<Reviews[]>
    barberRes: QueryState<ReservationFull[]>
    timeResBarber: TimeSlot[]
    customers: QueryState<Profile[]>
    employees: QueryState<Profile[]>
    services: QueryState<Service[]>
    staffNotes: QueryState<StaffNotes[]>
    barber: Profile | undefined
    refreshReservations: () => void
}

const StaffContext = createContext<StaffContextValue | undefined>(undefined)

export const StaffProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    // ------------------ Appuntamenti ------------------
    const { data: reservations = [], isLoading: reservationsIsLoading, isError: reservationsIsError, error: reservationsError } = useQuery({
        queryKey: ['reservations', user?.id],
        queryFn: () => user?.id ? getStaffIDAppointments(user.id) : [],
        enabled: !!user?.id
    })

    // ------------------ Recensioni ------------------
    const { data: allReviews = [], isLoading: allReviewsIsLoading, isError: allReviewsIsError, error: allReviewsError } = useQuery({
        queryKey: ['reviews'],
        queryFn: fetchAllReviews,
    })

    const { data: staffReviews = [], isLoading: staffReviewsIsLoading, isError: staffReviewsIsError, error: staffReviewsError } = useQuery({
        queryKey: ['staff-reviews', user?.id],
        queryFn: () => fetchReviewsForStaffID(user!.id),
        enabled: !!user?.id
    })

    // ------------------ Clienti ------------------
    const { data: customers = [], isLoading: customersIsLoading, isError: customersIsError, error: customersError } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchAllProfiles
    })

    // ------------------ Staff ------------------
    const { data: employees = [], isLoading: employeesIsLoading, isError: employeesIsError, error: employeesError } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees
    })

    // ------------------ Servizi ------------------
    const { data: services = [], isLoading: servicesIsLoading, isError: servicesIsError, error: servicesError } = useQuery({
        queryKey: ['services'],
        queryFn: getServices
    })

    // ------------------ Note dello staff ------------------
    const { data: staffNotes = [], isLoading: staffNotesIsLoading, isError: staffNotesIsError, error: staffNotesError } = useQuery({
        queryKey: ['staff-notes', user?.id],
        queryFn: () => fetchAllMemos(user!.id),
        enabled: !!user?.id
    })

    // ------------------ Normalizzazione prenotazioni ------------------
    const normalizedReservations: ReservationFull[] = reservations.map(r => ({
        ...r,
        barber_id: Array.isArray(r.barber_id) ? r.barber_id[0] : r.barber_id,
        logged_id: Array.isArray(r.logged_id) ? r.logged_id[0] : r.logged_id
    }))

    const normalizeReviews: Reviews[] = allReviews.map(r => ({
        ...r,
        customer: Array.isArray(r.customer) ? r.customer[0] : r.customer,
        appuntamenti: Array.isArray(r.reservation_id) ? r.reservation_id[0] : r.reservation_id
    }))

    const normalizedStaffNotes: StaffNotes[] = staffNotes.map(n => ({
        ...n,
        author: Array.isArray(n.author) ? n.author[0] : n.author,
    }))

    // Barber loggato
    const barber = employees.find(emp => emp.id === user?.id)

    // Filtra le prenotazioni del barber
    const barberReservations = normalizedReservations.filter(r => {
        if (!r.barber_id) return false
        if (typeof r.barber_id === 'string') return r.barber_id === user?.id
        return r.barber_id.id === user?.id
    })

    // Slot temporali
    const timeSlots: TimeSlot[] = barberReservations.map(r => ({
        date: r.date,
        start_time: r.start_time,
        end_time: r.end_time
    }))

    // ------------------ Realtime Supabase ------------------
    useEffect(() => {
        if (!user?.id) return;

        const supabase = createClient();

        let reservationsChannel: RealtimeChannel;
        let memosChannel: RealtimeChannel;

        const subscribe = async () => {
            // ----------------- Appuntamenti -----------------
            reservationsChannel = supabase
                .channel('all_reservations_channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'appuntamenti' },
                    () => {
                        queryClient.invalidateQueries({ queryKey: ['reservations'] });
                        queryClient.refetchQueries({ queryKey: ['reservations', user.id] });
                    }
                );
            await reservationsChannel.subscribe();

            // ----------------- Memo dello staff -----------------
            memosChannel = supabase
                .channel('staffnotes_channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'staffnotes' },
                    (payload) => {
                        queryClient.invalidateQueries({ queryKey: ['staff-notes', user.id] });
                        queryClient.refetchQueries({ queryKey: ['staff-notes', user.id] });
                    }
                );
            await memosChannel.subscribe();
        };

        subscribe();

        return () => {
            if (reservationsChannel) reservationsChannel.unsubscribe();
            if (memosChannel) memosChannel.unsubscribe();
        };
    }, [user?.id, queryClient]);


    return (
        <StaffContext.Provider value={{
            reservations: { data: normalizedReservations, isLoading: reservationsIsLoading, isError: reservationsIsError, error: reservationsError },
            allReviews: { data: normalizeReviews, isLoading: allReviewsIsLoading, isError: allReviewsIsError, error: allReviewsError },
            staffReviews: { data: normalizeReviews, isLoading: staffReviewsIsLoading, isError: staffReviewsIsError, error: staffReviewsError },
            barberRes: { data: barberReservations, isLoading: reservationsIsLoading, isError: reservationsIsError, error: reservationsError },
            timeResBarber: timeSlots,
            customers: { data: customers, isLoading: customersIsLoading, isError: customersIsError, error: customersError },
            employees: { data: employees, isLoading: employeesIsLoading, isError: employeesIsError, error: employeesError },
            services: { data: services, isLoading: servicesIsLoading, isError: servicesIsError, error: servicesError },
            staffNotes: { data: normalizedStaffNotes, isLoading: staffNotesIsLoading, isError: staffNotesIsError, error: staffNotesError },
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
