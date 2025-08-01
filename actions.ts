'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


// REGISTER E SIGNUP
export async function signup(formData: FormData) {

    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function registerUser(email: string, password: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'http://localhost:3000/complete_registration',
        }
    })

    return { error }
}


// COMPLETE REGITATION

export async function CompleteRegistration({ user, name, surname, phone }: {
    user: { id: string, email: string },
    name: string,
    surname: string,
    phone: string
}) {
    try {
        const supabase = await createClient()
        const result = await supabase.from('public_users').upsert({
            auth_user_id: user.id,
            name,
            surname,
            email: user.email,
            phone,
        }, { onConflict: ['auth_user_id'] })

        console.log("Supabase upsert result:", result)
        // result = { data, error }

        return { error: result.error || null }
    } catch (err: any) {
        console.error("Errore in CompleteRegistration:", err)
        return { error: new Error('Errore nella query al database') }
    }
}


//  GET USER SESSION


export async function getUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return null
  }

  return data.user
}
