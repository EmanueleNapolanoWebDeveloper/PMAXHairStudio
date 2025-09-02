import { NextRequest, NextResponse } from 'next/server'
import { CompleteRegistration } from '@/src/app/(Auth)/complete-registration/action'
import { use } from 'react'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log('Body ricevuto:', body)

        const { user, name, surname, phone, email } = body

        if (!user || !user.id || !name || !surname || !phone || !email) {
            console.log('Dati mancanti nel body',body)
            return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
        }

        const result = await CompleteRegistration({ user, name, surname , email: user?.email || email, phone: user?.phone || phone })

        console.log('Result da CompleteRegistration:', result)

        // Nel tuo route.ts
        if (result.error) {
            console.error("Errore Supabase:", result.error)
            const message = result.error?.message || JSON.stringify(result.error) || 'Errore interno al server'
            return NextResponse.json({ error: message }, { status: 500 })
        }


        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err: any) {
        console.error("Errore generico nel route handler:", err)
        return NextResponse.json({ error: 'Errore interno al server' }, { status: 500 })
    }
}
