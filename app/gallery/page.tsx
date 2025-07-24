import TransitionOptions from '@/components/UI/TransitionOptions'
import { galleries } from '@/lib/datas'
import Image from 'next/image'
import styles from '../../components/Home/homepage.module.css'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "P-Gallery | P-Max Hair Studio",
  description: "Guarda la galleria fotografica di P-Max Hair Studio. Scopri il nostro stile e le nostre creazioni.",
  keywords: [
    "galleria fotografica barbiere",
    "foto P-Max Hair Studio",
    "barber gallery Napoli",
    "acconciature barber shop"
  ],
  openGraph: {
    title: "P-Gallery | P-Max Hair Studio",
    description: "Visualizza le immagini del barber shop P-Max Hair Studio a Napoli.",
    url: "https://pmaxhair.it/gallery",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhair.it/og-gallery.jpg",
        width: 1200,
        height: 630,
        alt: "P-Max Hair Studio Gallery",
      }
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P-Gallery | P-Max Hair Studio",
    description: "Guarda la galleria fotografica di P-Max Hair Studio, il barber shop di Napoli.",
    images: ["https://pmaxhair.it/og-gallery.jpg"],
    creator: "@pmaxhair",
  },
}


export default function Gallery() {
    return (
        <TransitionOptions>

            <section className='min-h-screen flex flex-wrap gap-3 py-[7rem]'>

                <div className="w-screen flex flex-col items-center justify-center">
                    <h2 className="text-center text-[3rem] md:text-[5rem] font-extralight text-red-600 tracking-widest uppercase">P-GALLERY</h2>
                    {/* Icona forbici centrata */}
                    <div className={`${styles.scissorsTitleRed}`}>
                        <Image
                            src="/assets/logos/iconSpazzola.png"
                            alt="forbici"
                            width={60}
                            height={30}
                            style={{ transform: 'rotate(35deg)' }}
                        />
                    </div>
                </div>
                {galleries.map((photo, index) => {
                    return (
                        <Image
                            key={index}
                            src={photo}
                            width={200}
                            height={200}
                            alt={`Photo ${index}`} />
                    )
                })}
            </section>
        </TransitionOptions>
    )
}