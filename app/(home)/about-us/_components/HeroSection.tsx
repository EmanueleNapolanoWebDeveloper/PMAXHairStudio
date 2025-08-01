
import Image from "next/image"
import styles from './aboutus.module.css'
import { texts } from "@/lib/datas"
import FlipText from "@/components/UI/FlipText"
import Link from "next/link"

export default function HeroSection() {

    return (
        <section className="min-h-screen grid grid-cols-2 relative bg-black">

            {/* LEFT / MOBILE + TABLET + DESKTOP */}
            <div className="col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center min-h-[600px] text-white overflow-hidden ">

                {/* Background immagine SOLO MOBILE (fissa) */}
                <Image
                    src="/assets/gallery/photos/fotoMassimoAI.png"
                    alt="Massimo Polverino Senior Barber"
                    width={450}
                    height={450}
                    priority
                    className={`${styles.animateslideInRightToLeft} object-cover opacity-60 pointer-events-none select-none absolute z-0 block lg:hidden`}
                />

                <p
                    className={`${styles.animatefadeIn} 'opacity-0 translate-y-[10px]'} text-[2rem] md:text-[3rem] absolute bottom-4 right-0 z-20 text-white opacity-50 font-extrabold tracking-widest whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)] flex items-center flex-col justify-center lg:hidden`}
                >
                    Massimo Polverino <br />
                    <span className="font-light text-[1.5rem] text-center">Senior Barber/ Hair Stylist</span>
                </p>

                <div className="h-[50vh] w-full">

                    {/* Logo animato */}
                    <div className="h-[7rem] w-full flex items-center justify-center">
                        <Image
                            src="/assets/logos/P-MaxLogoNoBg.png"
                            alt="P-MAX HAIR STUDIO"
                            width={350}
                            height={350}
                            priority
                            className={`z-10 mt-10 lg:mb-4 transition-all duration-700 ease-out ${styles.animateslideInLeft} 'opacity-0 -translate-x-[50px]'
                                }`}
                        />
                    </div>

                    {/* Slogan animato */}
                    <div className="h-[10rem] w-full flex items-center justify-center">
                        <FlipText texts={texts} />
                    </div>

                    <div className="h-[7rem] w-full flex items-center justify-center relative">
                        <Link
                            href={'/contatti'}>
                            <button
                                type="button"
                                className="bg-red-600 text-white  font-semibold py-3 px-6 transition-colors duration-300
             hover:bg-white hover:text-red-600 hover:border-b-red-700">
                                CONTATTACI PER UN APPUNTAMENTO
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* RIGHT / TABLET- DESKTOP */}
            <div className="hidden lg:flex lg:col-span-1 relative items-center justify-center">

                <Image
                    src="/assets/gallery/photos/fotoMassimoAI.png"
                    alt="Massimo Polverino Senior Barber"
                    width={430}
                    height={550}
                    priority
                    className={`${styles.animateslideInRightToLeft} 'opacity-0 translate-x-[50px]'} absolute bottom-0 right-10 z-10`}
                />

                <p
                    className={`${styles.animatefadeIn} 'opacity-0 translate-y-[10px]'} text-[2rem] absolute bottom-4 right-30 z-20 text-white opacity-50 font-extrabold tracking-widest whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)] flex items-center flex-col justify-center`}
                >
                    Massimo Polverino <br />
                    <span className="font-light text-[1.5rem] text-center">Senior Barber/ Hair Stylist</span>
                </p>
            </div>
        </section>
    )
}
