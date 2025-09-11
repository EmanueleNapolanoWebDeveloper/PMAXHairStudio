'use server'

import { Profile, Reservation, Reviews, Service } from "@/src/lib/types"
import { createClient } from "@/src/utils/supabase/client"
import { create } from "domain"


// -----_-------> USER 
export async function getUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.log('Errore nel fetch User:', error);
        return null;
    }

    return data
}


// COMPLETE REGISTRATION

type CompleteRegistrationProps = {
    userID: string
    data: Profile
}

// Function
export async function CompleteRegistration({ userID, data }: CompleteRegistrationProps) {

    // check profilo già esistente

    try {
        const supabase = await createClient()

        const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id,phone,email')
            .or(`email.eq.${data.email?.toLowerCase().trim()},phone.eq.${data.phone?.replace(/\s/g, '')}`)
            .neq('id', userID) // Esclude il profilo corrente

        if (checkError) {
            console.error('Errore controllo duplicati:', checkError)
            return { error: 'Errore durante la verifica dei dati' }
        }

        if (existingProfile && existingProfile.length > 0) {
            const duplicateEmail = existingProfile.find(p => p.email === data.email?.toLowerCase().trim())
            const duplicatePhone = existingProfile.find(p => p.phone === data.phone?.replace(/\s/g, ''))

            if (duplicateEmail && duplicatePhone) {
                return { error: 'duplicate: Email e telefono già registrati' }
            } else if (duplicateEmail) {
                return { error: 'duplicate email: Questa email è già registrata' }
            } else if (duplicatePhone) {
                return { error: 'duplicate phone: Questo numero di telefono è già registrato' }
            }
        }

        // Se ok continua a inserire profile
        const { name, surname, email, phone } = data

        const { error } = await supabase.from('profiles').insert({
            id: userID,
            name,
            surname,
            email,
            phone,
            role: 'customer',
            reg_complete: true
        })

        if (error) {
            console.error("Errore nella registrazione:", error)
            return { error: error.message }
        }

        return { success: true }

    } catch (error: any) {
        console.error("Errore nella registrazione:", error)
        return { error: error.message || 'Errore durante la registrazione' }
    }
}

// FETCH ALL PROFILES// ✅ Versione function declaration
export async function fetchProfile(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()

    if (error) throw error
    return data
}

export async function fetchAllProfiles() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
    if (error) return []
    return data
}

// ---------------> EMPLOYEE
export async function getEmployees(): Promise<Profile[]> {
    const supabase = await createClient()
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("role", "employee")
        if (error) return []
        return data
    } catch (err) {
        console.error("Errore in getEmployees:", err)
        return []
    }

}

//----------------> SERVICES

export async function getServices(): Promise<Service[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("title", { ascending: true })
    if (error) return []
    return data || []
}


// ---------------->  RESERVATIONS

// tutte le res
export async function getAllReservations(): Promise<Reservation[]> {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from("appuntamenti")
            .select("*")
            .order("data", { ascending: true })

        if (error) {
            throw new Error(error.message)
        }

        return data ?? [] // mai undefined
    } catch (err) {
        console.error("Errore in getAllReservations:", err)
        return []
    }
}


// tutte le res dello staff selezionato
export async function getStaffIDAppointments(barber_id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("appuntamenti")
        .select(`
            id,
            barber_id(id, name, surname, phone, email),
            data,
            start_time,
            end_time,
            logged_id(id, name, surname, phone, email),
            services,
            status,
            note,
            amount,
            created_at,
            guest_datas
            `)
        .eq("barber_id", barber_id)
        .order("data", { ascending: true });

    if (error) {
        console.log("Errore caricamento appuntamenti:", error);
        return []
    }

    return data

}

export async function createReservation({
    logged_id,
    barber_id,
    date, // 🔥 RINOMINATO da 'data' a 'date' per evitare conflitti
    start_time,
    services,
    note = '',
    isGuest,
    guest_datas
}: {
    logged_id: Profile['id'],
    barber_id: Profile['id'],
    date: string, // 🔥 Aggiornato tipo
    start_time: string,
    services: Service[],
    note?: string,
    isGuest?: boolean,
    guest_datas?: {
        name: Profile['name'] | null,
        surname: Profile['surname'] | null,
        phone: Profile['phone'] | null,
        email: Profile['email'] | null
    }
}) {
    const supabase = await createClient();

    // Se è guest ma non ci sono dati guest, errore
    if (isGuest && !guest_datas) {
        throw new Error("Dati ospite mancanti");
    }

    // Validazione dati guest
    if (isGuest && guest_datas) {
        if (!guest_datas.name?.trim()) throw new Error("Nome ospite obbligatorio");
        if (!guest_datas.surname?.trim()) throw new Error("Cognome ospite obbligatorio");
        if (!guest_datas.phone?.trim()) throw new Error("Telefono ospite obbligatorio");

        // Validazione email se fornita
        if (guest_datas.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest_datas.email)) {
            throw new Error("Formato email non valido");
        }

        // Validazione telefono
        const phoneDigits = guest_datas.phone.replace(/\s/g, '');
        if (!/^\d{10,}$/.test(phoneDigits)) {
            throw new Error("Il numero di telefono deve contenere almeno 10 cifre");
        }
    }

    // Validazione servizi
    if (!services || services.length === 0) {
        throw new Error("Almeno un servizio deve essere selezionato");
    }

    // Validazione data e ora
    if (!date || !start_time) {
        throw new Error("Data e ora sono obbligatori");
    }

    // Controllo che la data non sia nel passato
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error("Non puoi prenotare per una data passata");
    }

    const totalPrice = services.reduce((acc, s) => acc + (s.price || 0), 0);
    const totalDuration = services.reduce((acc, s) => acc + (s.time || 0), 0);

    // Funzione helper per generare intervalli di tempo a step di 30 minuti
    const generateTimeSlots = (start: string, totalMinutes: number, step = 30) => {
        const [h, m] = start.split(":").map(Number);
        const slots: string[] = [];
        let minutes = h * 60 + m;
        const endMinutes = minutes + totalMinutes;

        while (minutes < endMinutes) {
            const hour = Math.floor(minutes / 60);
            const minute = minutes % 60;
            slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
            minutes += step;
        }
        return slots;
    };

    const durationArray = generateTimeSlots(start_time, totalDuration, 30);

    // Calcolo orario di fine
    const lastSlot = durationArray[durationArray.length - 1];
    const [lastHour, lastMinute] = lastSlot.split(":").map(Number);
    const endTotalMinutes = lastHour * 60 + lastMinute + 30;
    const endHour = Math.floor(endTotalMinutes / 60);
    const endMinute = endTotalMinutes % 60;
    const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;

    // --- Controllo sovrapposizioni ---
    const { data: existingReservations, error: fetchError } = await supabase
        .from("appuntamenti")
        .select("start_time, end_time")
        .eq("barber_id", barber_id)
        .eq("data", date); // 🔥 Aggiornato da 'data' a 'date'

    if (fetchError) {
        console.error("Errore fetch prenotazioni:", fetchError);
        throw new Error("Errore nel recupero delle prenotazioni esistenti");
    }

    if (existingReservations && existingReservations.length > 0) {
        const hasOverlap = existingReservations.some((r: any) => {
            const existingDuration = (parseInt(r.end_time.split(":")[0]) * 60 + parseInt(r.end_time.split(":")[1])) -
                (parseInt(r.start_time.split(":")[0]) * 60 + parseInt(r.start_time.split(":")[1]));
            const existingSlots = generateTimeSlots(r.start_time, existingDuration);
            return durationArray.some(slot => existingSlots.includes(slot));
        });

        if (hasOverlap) {
            throw new Error("Il servizio si sovrappone con una prenotazione esistente. Riprova con un altro orario.");
        }
    }

    // --- Preparazione dati per inserimento ---
    const insertData = {
        // 🔥 LOGICA PRINCIPALE: logged_id vs guest_datas
        logged_id: isGuest ? null : logged_id || null,
        guest_datas: isGuest ? {
            name: guest_datas!.name.trim(),
            surname: guest_datas!.surname.trim(),
            phone: guest_datas!.phone.replace(/\s/g, ''), // Rimuovi spazi dal telefono
            email: guest_datas!.email?.trim() || '',
        } : null,

        // Dati comuni
        barber_id,
        data: date, // 🔥 Aggiornato da 'data' a 'date'
        start_time,
        end_time: endTime,
        services: services.map(s => s.title),
        amount: totalPrice,
        note: note.trim(),
        status: 'prenotato'
    };

    // --- Inserimento prenotazione ---
    // 🔥 CORREZIONE PRINCIPALE: rinominato 'data' in 'reservationData'
    const { data: reservationData, error: insertError } = await supabase
        .from("appuntamenti")
        .insert([insertData])
        .select();

    if (insertError) {
        console.error("Errore inserimento prenotazione:", insertError);
        throw new Error(`Errore durante la creazione della prenotazione: ${insertError.message}`);
    }

    if (!reservationData || reservationData.length === 0) {
        throw new Error("Prenotazione creata ma nessun dato restituito");
    }

    return reservationData[0]; // Restituisce la prima (e unica) prenotazione creata
}



//  prendi le res del customer loggato
export async function getUserReservations(id: string) {

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('appuntamenti')
        .select('*, barber_id(*), logged_id(*)')
        .eq('logged_id', id)

    if (error) {
        console.log(error)
    }

    return (data)
}

// delet res da logged customer
export async function deleteReservation(id: string) {

    console.log('id ricevuto:', id);


    const supabase = await createClient()

    const { error } = await supabase
        .from('appuntamenti')
        .delete()
        .eq('id', id)
        .select()

    if (error) {
        console.log(error)
        return
    }

    return
}

// update res da prenotato a in_corso

export async function updateReservationStatus(
    reservationId: string,
    newStatus: string = "completato"
): Promise<void> {
    if (!reservationId) throw new Error("reservationId è richiesto");

    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("appuntamenti")
            .update({ status: newStatus })
            .eq("id", reservationId)
            .select(); // opzionale: restituisce l'oggetto aggiornato

        if (error) throw error;

        console.log(`Prenotazione ${reservationId} aggiornata a status "${newStatus}"`, data);
    } catch (err: any) {
        console.error("Errore updateReservationStatus:", err.message || err);
        throw new Error(`Impossibile aggiornare lo status: ${err.message || err}`);
    }
}


// ------------------> REVIEWS



export async function addReview({ customer, reservation_id, rating, comment }: Reviews) {
    const supabase = await createClient()

    console.log('dati entrati', customer, reservation_id, rating, comment);


    try {
        const { data, error } = await supabase
            .from('reviews')
            .insert({
                customer,
                reservation_id,
                rating,
                comment
            })
            .select()

        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile inserire la recensione: ${error.message || error}`)
    }
}

export async function fetchAllReviews() {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase.from('reviews')
            .select(`
             id,            
            customer(
            id,
            name,
            surname,
            phone,
            email),
            appuntamenti : reservation_id(
                id,
                data,
                barber_id,
                logged_id,
                start_time,
                end_time,
                services,
                status,
                note,
                amount,
                created_at
            ),
            rating,
            comment,
            created_at
            `)

        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }
}


export async function fetchReviewsFromReservation(reservationId: string) {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase.from('reviews').select().eq('reservation_id', reservationId)

        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }
}

export async function fetchReviewsForStaffID(staffId: string) {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
             id,            
            customer(
            id,
            name,
            surname,
            phone,
            email),
            appuntamenti : reservation_id(
                id,
                data,
                barber_id,
                logged_id,
                start_time,
                end_time,
                services,
                status,
                note,
                amount,
                created_at
            ),
            rating,
            comment
            `)
            .eq('appuntamenti.barber_id', staffId)


        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }

}



// -------------> STAFF NOTES

type Notes = {
    author: Profile['id'],
    title: string,
    content: string,
    date: string,
    time: string,
    reference: string,
    priority: 'bassa' | 'media' | 'alta'
}

export async function addNotes({ author, title, content, date, time, reference, priority }: Notes) {

    console.log('dati entrati', author, title, content, date, time, reference, priority);

    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from('staffnotes')
            .insert({
                author,
                title,
                content,
                note_date: date,
                time,
                reference,
                priority
            })
            .select()

        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }

}

export async function fetchAllMemos(id: string) {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from('staffnotes')
            .select(`
            id,
            author(
                id,
                name,
                surname
            ),
            title,
            content,
            note_date,
            time,
            reference,
            priority`
            )
            .or(`reference.eq.${'tutti'},reference.eq.${id}`)

        if (error) throw error

        return data
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }
}

export async function deleteNote(id: number) {
    const supabase = await createClient()


    try {
        const { error } = await supabase.from('staffnotes').delete().eq('id', id)

        if (error) throw error

        console.log('Nota eliminata con successo');

        return
    } catch (error: any) {
        console.log(error)
        throw new Error(`Impossibile ottenere le recensioni: ${error.message || error}`)
    }

}



