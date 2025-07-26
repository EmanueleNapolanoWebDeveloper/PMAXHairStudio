'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"

export async function signUp(formData: FormData) {
    const supabase = await createClient();

    const credentials = {
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmpassword: formData.get('confirm-password') as string,
    }

    const { error, data } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            data: {
                name: credentials.name,
                surname: credentials.surname,
                phone: credentials.phone
            }
        }
    })


    if (error) {
        return {
            status: "error",
            message: error.message,
            user: null,
        };
    } else if (data?.user?.identities?.length === 0) {
        return {
            status: 'error',
            message: 'Utente già registrato!',
            user: null
        }
    }

    revalidatePath('/', 'layout')

    return {
        status: 'success',
        message: 'Registrazione completata',
        user: data.user
    }
}

export async function signIn(formData: FormData) {
    const supabase = await createClient();

        const credentials = {
            email : formData.get('email') as string,
            password : formData.get('password') as string
        }

    const { data , error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
        return {
            status : 'error',
            message : error?.message,
            user : null
        }
    }

    revalidatePath('/', 'layout')
    return {status: 'success' , user : data.user }

}