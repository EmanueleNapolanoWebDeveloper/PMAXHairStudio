
'use client'
import LoginSMS from "./_components/LoginSms"
import LoginGoogle from "./_components/LoginGoogle"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Accedi</h1>
      <LoginSMS />
      <div className="text-gray-500">oppure</div>
      <LoginGoogle />
    </div>
  )
}
