import styles from './_components/contacts.module.css'
import style from '@/app/(Customer)/homepage.module.css'
import Image from 'next/image'
import type { Metadata } from "next";
import { MapPin, Phone, Mail } from 'lucide-react'
import SocialSection from '@/components/Layout/SocialCard'
import FormContacts from '@/app/(Customer)/contact-us/_components/formContacts'
import TransitionOptions from '@/components/UI/TransitionOptions'

export const metadata: Metadata = {
  title: "Contatti | P-Max Hair Studio Napoli",
  description: "Contatta P-Max Hair Studio a Napoli. Indirizzo, telefono, email e modulo di contatto per prenotare il tuo appuntamento barber.",
  keywords: [
    "contatti barbiere Napoli",
    "indirizzo P-Max Hair Studio",
    "telefono barber Napoli",
    "prenotazioni barbiere",
    "email barber shop Napoli"
  ],
  openGraph: {
    title: "Contatti | P-Max Hair Studio",
    description: "Prenota il tuo appuntamento da P-Max Hair Studio, il barber shop di Napoli dedicato allo stile maschile.",
    url: "https://pmaxhairstudio.it/contatti",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhairstudio.it/og-contacts.jpg", // cambia con immagine opengraph adatta
        width: 1200,
        height: 630,
        alt: "Contatti P-Max Hair Studio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti | P-Max Hair Studio",
    description: "Contatta P-Max Hair Studio a Napoli per un appuntamento barber professionale.",
    images: ["https://pmaxhairstudio.it/og-contacts.jpg"],
    creator: "@pmaxhair",
  },
};


export default function Contacts() {
    return (
        <main className={`${styles.backgroundContatti}`}>
            <TransitionOptions>
                {/* title */}
                <section className={`min-h-[70vh] ${styles.gradientSection}`}>
                    <div className="max-w-screen flex flex-col items-center justify-center py-[8rem]">
                        <h2 className="text-center text-[3rem] md:text-[5rem] font-extralight text-red-600 tracking-widest uppercase">Contatti</h2>
                        {/* Icona forbici centrata */}
                        <div className={`${style.scissorsTitleRed}`}>
                            <Image
                                src="/assets/logos/iconSpazzola.png"
                                alt="forbici"
                                width={40}
                                height={24}
                                style={{ transform: 'rotate(35deg)' }}
                            />
                        </div>
                    </div>
                </section>

                {/* contacts */}
                <section className='min-h-screen grid grid-cols-2 bg-black/95 py-[3rem]'>
                    {/* address */}
                    <div className='col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
                        <div className='h-[5rem] flex flex-col items-center justify-start gap-3'>
                            <h2 className="text-red-600 text-[2.5rem] font-semibold mb-4">INDIRIZZO</h2>
                            <p className='text-[1.5rem] text-center font-light'>Così sai come e dove trovarci...</p>
                        </div>

                        <div className='h-3/4 w-full flex flex-col items-center justify-center gap-4'>
                            <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                                <MapPin className="w-7 h-7 text-red-500" />
                                <span className='text-[1.5rem] font-semibold'>
                                    Via Provinciale, 46 <br />
                                    80126, Pianura <br />
                                    Napoli (Na)</span>
                            </div>

                            <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                                <Phone className="w-7 h-7 text-red-500" />
                                <span className='text-[1.5rem] font-semibold'>(+39) 388-11-54-473</span>
                            </div>

                            <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                                <Mail className="w-7 h-7 text-red-500" />
                                <span className='text-[1.5rem] font-semibold'>massimopolverino364@gmail.com</span>
                            </div>
                        </div>
                        
                        <div className="w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl mx-auto">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6035.077445518296!2d14.168596675550608!3d40.86005022853972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0f3e35da50b1%3A0x8a8011844d90b69d!2sVia%20Provinciale%20Napoli%2C%2046%2C%2080126%20Napoli%20NA!5e0!3m2!1sit!2sit!4v1753363511554!5m2!1sit!2sit"
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* contacts form */}
                    <div className='col-span-2 lg:col-span-1 h-full w-full flex flex-col items-center justify-center'>
                        <div className='h-[5rem] flex flex-col items-center justify-start gap-3'>
                            <h2 className="text-red-600 text-[2.5rem] font-semibold mb-4">CONTATTACI</h2>
                            <p className='text-[1.5rem] text-center font-light'>Contattaci per prenotare un servizio</p>
                        </div>

                        <div className='h-[15rem] w-full flex flex-col items-center justify-center gap-4'>
                            <SocialSection />
                        </div>

                        <div className="w-full h-full max-w-md aspect-square rounded-xl shadow-xl mx-auto">
                            <p className='text-[1.5rem] text-center font-light my-[1rem]'>Mandaci un mail da qui...</p>
                            <FormContacts />
                        </div>
                    </div>

                </section>
            </TransitionOptions>
            {/* mailform */}


        </main >
    )
}