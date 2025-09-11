export type Profile = {
  id?: string
  name?: string
  surname?: string
  email?: string
  phone?: string
  role?: string
  reg_complete?: boolean
}

export type Reservation = {
  id: number
  barber_id: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  } | null
  logged_id?: {
    id: string
    name: string
    surname: string
    email: string
    phone: string
  } | null
  guest_datas?: string // ⚠️ viene salvato come stringa JSON
  services: string[]
  data: string
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

export type Reviews ={
  customer: string
  reservation_id: number
  rating: number
  comment: string
}

export type StaffNotes = {
  id : number
  author : {
    id : string
    name : string
    surname : string
    email : string
    phone : string
  }
  title : string
  content : string
  note_date : string
  time : string
  reference : string
  priority : string
}