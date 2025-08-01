import { createClient } from "@/utils/supabase/client"

export default function LoginGoogle() {

    async function handleClick() {

        const supabase = await createClient()

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback?next=/complete_registration',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })

        if (error) {
            console.error('Errore durante il login con Google:', error.message)
        }
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 w-full mt-4 py-2 px-4 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200 text-gray-700 bg-white"
        >
            <span className="text-black">Accedi con Google</span>
        </button>
    )
}