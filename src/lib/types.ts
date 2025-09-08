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
  id: string
  logged_id?: {
    id: string
    name: string
    surname: string
    phone: string
    email: string
  }
  guest_datas?:{
    name: string
    surname: string
    phone: string
    email: string
  }
  barber_id: {
    id: string
    name: string
    surname: string
    phone: string
  }
  data: string
  start_time: string
  end_time: string
  services?: Service[]
  status?: string
  amount?: number
  note?: string
  discount?: number
  paid?: boolean
  payment_meth?: string
  isGuest?: boolean
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