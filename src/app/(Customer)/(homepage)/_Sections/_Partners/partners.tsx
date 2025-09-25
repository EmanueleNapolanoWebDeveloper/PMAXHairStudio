import Image from "next/image"
import { partners } from '@/src/lib/datas'

export default function Partners() {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-black via-gray-900 to-white/80 py-20 px-4 overflow-hidden" id="partnersHome">
      {/* Elegant background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-800/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ef4444 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl text-white tracking-wider mb-4 drop-shadow-2xl">
              PARTNERS
            </h1>
            <div className="w-24 h-1 bg-red-800 mx-auto rounded-full shadow-lg shadow-red-900/50"></div>
          </div>
          {/* Decorative brush icon */}
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center shadow-xl shadow-red-900/30 border border-red-700/50">
              <Image
                src="/assets/logos/IconSpazzola.png"
                width={28}
                height={28}
                alt="Spazzola"
                className="rotate-40 filter brightness-0 invert"
              />
            </div>
          </div>
          {/* Subtitle */}
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-red-400">
              Servizi professionali per il tuo stile perfetto
            </p>
          </div>
        </div>
        {/* Partners Grid */}
        <div className="flex flex-wrap items-center justify-around w-full gap-8 mx-auto mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800/80 to-gray-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-red-800/20 hover:border-red-700/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 group w-[12rem]"
            >
              <div className="relative w-full h-24 flex items-center justify-center">
                <Image
                  src={partner.path}
                  alt={partner.title}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Partner name if available */}
              {partner.title && (
                <div className="text-center mt-4">
                  <p className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors duration-200">
                    {partner.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}