import Image from "next/image"
import styles from '@/src/app/(Customer)/homepage.module.css'
import { partners } from '@/src/lib/datas'

export default function Partners() {
  return (
    <section className="min-h-[60vh] bg-gradient-to-b from-white/70 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-wider mb-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-5xl mx-auto mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-red-800/20 hover:border-red-700/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 group"
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

        {/* Bottom decorative element */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gray-600"></div>
            <div className="w-3 h-3 bg-red-800 rounded-full shadow-lg shadow-red-900/50"></div>
            <div className="w-8 h-px bg-gray-500"></div>
            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            <div className="w-16 h-px bg-gray-600"></div>
          </div>
        </div>
      </div>
    </section>
  )
}