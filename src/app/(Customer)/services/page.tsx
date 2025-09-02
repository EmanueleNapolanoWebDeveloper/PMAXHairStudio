import styles from './_components/servizi.module.css'
import type { Metadata } from "next";
import TransitionOptions from '@/src/components/UI/TransitionOptions'

export const metadata: Metadata = {
  title: "Servizi | P-Max Hair Studio Napoli",
  description: "Scopri i servizi di grooming di P-Max Hair Studio: taglio uomo, barba, trattamenti personalizzati a Napoli in un ambiente moderno e accogliente.",
  keywords: [
    "servizi barbiere Napoli",
    "taglio uomo Napoli",
    "barba curata",
    "trattamenti capelli Napoli",
    "barber shop P-Max",
    "P-Max Hair Studio"
  ],
  openGraph: {
    title: "Servizi | P-Max Hair Studio",
    description: "Esplora i nostri servizi di taglio, barba e trattamenti uomo in un ambiente dallo stile unico. P-Max Hair Studio a Napoli.",
    url: "https://pmaxhairstudio.it/servizi",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhairstudio.it/og-servizi.jpg", // <-- cambia se hai immagine diversa per OG
        width: 1200,
        height: 630,
        alt: "Servizi P-Max Hair Studio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi | P-Max Hair Studio",
    description: "Scopri i servizi di grooming maschile a Napoli da P-Max Hair Studio.",
    images: ["https://pmaxhairstudio.it/og-servizi.jpg"],
    creator: "@pmaxhair",
  },
};

export default function Services() {
    return (
        <main className={` ${styles.backgroundServizi} max-w-screen`}>
            <TransitionOptions>
                <section className={`h-screen ${styles.gradientSection} flex flex-col items-center justify-around  pt-[4rem]`}>
                    <h1 className="text-[5rem] md:text-[6rem] font-base text-red-800 tracking-wide uppercase text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                        Servizi
                    </h1>

                    <h3 className='text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-extralight text-center'>
                        Entra nel nostro spazio elegante e accogliente, dove il mix tra arredamento vintage e contemporaneo crea l’atmosfera perfetta per il tuo percorso di grooming. Curiamo ogni dettaglio, dal momento in cui varchi la soglia fino a quando esci con un look fresco e sicuro di te.
                    </h3>
                </section>

                {/* prices */}
              

            </TransitionOptions>
        </main>
    )
}