export type Profile = {
  id?: string
  name: string
  surname?: string
  email?: string
  phone?: string
  role?: 'customer' | 'employee' | 'admin'
  reg_complete?: boolean
  is_Admin?: boolean
  created_at?: string
}

export type Reservation = {
  id: number,
  barber_id: string |null,
  logged_id?: string | null
  guest_datas?: string // ⚠️ viene salvato come stringa JSON
  services: string[]
  date: string
  start_time: string
  end_time: string
  amount: number
  note?: string
  status: "prenotato" | "completato" | "in_corso" | "confermato" | "annullato"
  created_at: string
}

export type ReservationFull = {
  id: number
  barber_id: { id: string; name: string; surname: string; email: string; phone: string } | null
  logged_id?: { id: string; name: string; surname: string; email: string; phone: string } | null
  guest_datas?: string
  services: string[]
  date: string
  start_time: string
  end_time: string
  amount: number
  note?: string
  status: "prenotato" | "completato" | "in_corso" | "confermato" | "annullato"
  created_at: string
}

export type Service = {
  id?: number
  title: string
  time: number // minuti come number
  price: number
  category: string
  description: string
  duration?: number
  icon?: string
  popular?: boolean
}
export type Category = {
  category: string;
  icon: string;
  popular: boolean;
  items: Service[];
};

export type GuestType = {
  name: string
  surname: string
  phone: string
  email: string
}

export type Reviews = {
  id: number;
  customer: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  reservation_id: {
    id: number,
    barber_id: {
      id: string
      name: string
      surname: string
      email: string
      phone: string
    }  | null,
    logged_id?: {
      id: string
      name: string
      surname: string
      email: string
      phone: string
    } | string | null
    guest_datas?: string // ⚠️ viene salvato come stringa JSON
    services: string[]
    date: string
    start_time: string
    end_time: string
    amount: number
    note?: string
    status: "prenotato" | "completato" | "in_corso" | "confermato" | "annullato"
    created_at: string
  };
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  created_at: string;
}

export type StaffNotes = {
  id?: number
  author: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  },
  title: string
  content: string
  note_date: string
  time: string
  reference: string
  priority: 'bassa' | 'media' | 'alta'
  created_at: string
}

// Tipo per il form (non richiede id, author, created_at)
export type StaffNotesForm = Omit<StaffNotes, 'id' | 'author' | 'created_at'>