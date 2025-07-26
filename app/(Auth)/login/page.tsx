import { login, signup } from './actions'
import FormLogin from '@/components/auth/FormLogin'

export default function LoginPage() {
    return (
        <section className='h-screen flex flex-col items-center justify-center'>
            <FormLogin login={login} signup={signup}/>
        </section>

    )
}