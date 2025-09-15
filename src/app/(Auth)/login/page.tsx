
import LoginEmailPassword from "./_components/LoginEmailPass"
import LoginGoogle from "./_components/LoginGoogle"

export default function LoginPage() {


  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">

        {/* Login SMS */}
        <LoginEmailPassword />

        {/* Divisore */}
        <div className="flex items-center w-full gap-4">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-sm text-gray-300">oppure</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Login Google */}
        <LoginGoogle />

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-4">
          Accedendo accetti i nostri <a href="#" className="underline hover:text-white transition">termini</a> e la <a href="#" className="underline hover:text-white transition">privacy</a>.
        </p>
      </div>
    </div>
  );
}

