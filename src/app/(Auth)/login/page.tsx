import LoginEmailPassword from "./_components/LoginEmailPass"
import LoginGoogle from "./_components/LoginGoogle"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden mt-[100px] py-3">
      {/* Black & White Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/80 to-white/80">
        {/* Floating orbs in grayscale */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-white/8 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/[0.18] backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 flex flex-col items-center gap-8 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-3xl" />

          {/* Header glow effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full blur-sm" />

          <div className="relative z-10 w-full flex flex-col items-center gap-8">
            {/* Welcome Text */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Benvenuto
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                Accedi al tuo account per continuare
              </p>
            </div>

            {/* Login Form */}
            <div className="w-full]">
              <LoginEmailPassword />
            </div>

            {/* Elegant Divider */}
            <div className="flex items-center w-full gap-4 my-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30" />
              <span className="text-sm text-gray-300 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                oppure
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30" />
            </div>

            {/* Google Login */}
            <div className="w-full transform transition-all duration-300 hover:scale-[1.02]">
              <LoginGoogle />
            </div>

            {/* Footer with enhanced styling */}
            <div className="text-center mt-6 pt-4 border-t border-white/10 w-full">
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Accedendo accetti i nostri{" "}
                <a
                  href="#"
                  className="text-blue-300 underline decoration-blue-300/50 underline-offset-2 hover:text-white hover:decoration-white/80 transition-all duration-300 font-medium"
                >
                  termini
                </a>
                {" "}e la{" "}
                <a
                  href="#"
                  className="text-blue-300 underline decoration-blue-300/50 underline-offset-2 hover:text-white hover:decoration-white/80 transition-all duration-300 font-medium"
                >
                  privacy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Subtle shadow beneath card */}
        <div className="absolute inset-0 top-4 bg-black/20 blur-2xl rounded-3xl -z-10" />
      </div>
    </div>
  );
}