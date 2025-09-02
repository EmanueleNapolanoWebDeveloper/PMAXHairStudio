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
    customer_id: string
    barber_id: string
    date: string
    start_time: string
    end_time: string
    services : string[]
    status?: string
    total_price?: number
}

export type Service = {
  id: number
  title: string
  time: number // minuti come number
  price: number
  category: string
}