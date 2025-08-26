'use client'

import Image from "next/image"
import styles from '@/app/(Customer)/homepage.module.css'


export default function History() {
    return (
        <section className="min-h-screen bg-black max-w-screen grid grid-cols-2">
            <div className=" w-full col-span-2 flex flex-col items-center justify-center pb-6">
                {/* Titolo */}
                <h2 className="text-center text-[4rem] font-extralight text-red-800 uppercase">P-Max History</h2>

                {/* Icona forbici centrata */}
                <div className={styles.scissorsTitle}>
                    <Image
                        src="/assets/logos/iconScissors_white.png"
                        alt="forbici"
                        width={40}
                        height={24}
                        style={{ transform: 'rotate(75deg)' }}
                    />
                </div>

            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center gap-3">
                <p className="max-w-3xl mx-auto text-white px-6 md:px-12 py-8 text-base md:text-lg leading-relaxed tracking-wide font-sans">
                    Da <span className="text-red-600 font-extrabold">P-Max Hair Studio</span> non vieni solo per un taglio: entri per esprimere chi sei.
                    Ogni dettaglio è pensato per valorizzare il tuo stile unico e autentico.

                    <br /><br />

                    A guidarci c’è <span className="font-bold text-red-600">Massimo Polverino</span>, barber con oltre dieci anni di esperienza e figlio di una famiglia di barbieri.
                    Dal <span className="font-extrabold text-red-600">2010</span> porta avanti una tradizione di passione e precisione, unendo tecnica e creatività.

                    <br /><br />

                    Il nostro salone è uno spazio vivo, dove lo spirito della <span className="underline decoration-red-600 decoration-2">strada</span> incontra la cura sartoriale del dettaglio.
                    Ogni taglio è fatto su misura per te, con attenzione e rispetto per la tua personalità.

                    <br /><br />

                    <span className="italic font-semibold text-red-600">P-Max Hair Studio</span> è più di un salone: è un luogo dove nascono connessioni e si parla la lingua dello stile e della qualità.

                    <br /><br />

                    La nostra missione? <br />
                    <span className="font-extrabold text-white tracking-wider">Farti uscire con la testa alta, con un taglio che parla per te, ancor prima che tu dica una parola.</span>
                </p>

            </div>

            <div className="col-span-2 lg:col-span-1 w-full flex flex-col items-center justify-center gap-3 rounded-3xl">
                <Image
                    src={'/assets/gallery/photos/puteca.png'}
                    alt="Negozio P-Max"
                    width={550}
                    height={550}
                    className="rounded-3xl"
                />

            </div>

        </section>
    )
}