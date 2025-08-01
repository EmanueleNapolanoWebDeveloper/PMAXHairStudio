import { NextRequest, NextResponse } from 'next/server'
import { CompleteRegistration } from '@/app/(Auth)/complete_registration/action'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log('Body ricevuto:', body)

        const { user, name, surname, phone } = body

        if (!user || !user.id || !user.email || !name || !surname || !phone) {
            console.log('Dati mancanti nel body')
            return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
        }

        const result = await CompleteRegistration({ user, name, surname, phone })

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
