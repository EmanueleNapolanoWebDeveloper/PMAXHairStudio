import Image from "next/image"
import styles from '@/app/(Customer)/homepage.module.css'
import { partners } from '@/lib/datas'




export default function Partners() {
  return (
    <section className={`min-h-[30vh] max-w-screen bg-white flex flex-col gap-4 py-5 ${styles.backgroundPartnerssHome}`}>
      {/* title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          PARTNERS
        </h1>
        <div className="flex items-center justify-center mb-6 gap-4">
          {/* Linea sinistra */}
          <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-red-600"></div>

          {/* Spazio per l'icona che aggiungerai */}
          <div className="w-20 h-24 rounded-full flex items-center justify-center relative">
            {/* Placeholder - sostituisci con la tua icona */}
            <Image
              src={'/assets/logos/IconSpazzola.png'}
              fill
              alt="P-Max Logo"
              className="rotate-40" />
          </div>

          {/* Linea destra */}
          <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-red-600"></div>
        </div>
        <p className="text-[2rem] text-gray-600 max-w-2xl mx-auto fontSubtitlesHome">
          Servizi professionali per il tuo stile perfetto
        </p>
      </div>


      <div className="flex flex-wrap h-full max-w-screen items-center justify-evenly">
        {partners.map((partner, index) => {
          return (
            <div key={index} className="relative w-[11rem] h-[9rem]">
              <Image
                src={partner.path}
                alt={partner.title}
                fill />
            </div>

          )
        })}
      </div>
    </section>
  )
}