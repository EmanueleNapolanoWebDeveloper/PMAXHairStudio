export type Profile = {
  id?: string
  name?: string
  surname?: string
  email?: string
  phone?: string
  role?: string
  reg_complete?: boolean
  is_Admin?: boolean
}

export type Reservation = {
  id: number
  barber_id: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  } | string | null
  logged_id?: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  } | null
  guest_datas?: {
    name: string
    surname: string
    phone: string
    email: string
  } // ⚠️ viene salvato come stringa JSON
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
  id: number
  title: string
  time: number // minuti come number
  price: number
  category: string
}

export type GuestType = {
  name: string
  surname: string
  phone: string
  email: string
}

export type Reviews = {
  id: number;
  customer: Profile;
  appuntamenti: Reservation;
  rating: 1 | 2 | 3 | 4 | 5; 
  comment: string;
  created_at: string;
}

export type StaffNotes = {
  id: number
  author: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  }
  title: string
  content: string
  note_date: string
  time: string
  reference: string
  priority: string
  created_at: string
}