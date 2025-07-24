'use client'

import Image from "next/image"
import { useState, useEffect } from 'react'
import ImageSlideShow from "./ImageSlideShow"
import styles from './homepage.module.css'
import { testImages } from '@/lib/datas'

type slideShowProps = {
    images: string[],
    time: number,
}


function SlideShow({ images, time }: slideShowProps) {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const length: number = images.length

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImage((prev) => (prev === length - 1 ? 0 : prev + 1))
        }, time)

        return () => clearTimeout(timer)
    }, [currentImage, length])


    return (
        <div className="relative w-full h-full overflow-hidden">
            {testImages.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentImage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === currentImage}
                        className="rounded-2xl"
                    />
                </div>
            ))}
        </div>
    )
}

export default function IntroHome() {
    return (
        <section className={`min-h-screen grid grid-cols-2 p-3 ${styles.backgroundIntroHome}`}>

            <div className="h-[12rem] col-span-2 flex flex-col items-center justify-center">
                <h2 className="text-center text-[3rem] md:text-[5rem] font-extralight text-red-600 tracking-widest">BENVENUTI</h2>
                {/* Icona forbici centrata */}
                <div className={`${styles.scissorsTitleRed}`}>
                    <Image
                        src="/assets/logos/iconBaffi.png"
                        alt="forbici"
                        width={120}
                        height={50}
                        style={{ transform: 'rotate(0deg)' }}
                    />
                </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 items-center mb-10 lg:items-start justify-center text-center px-4">
                <h3 className="text-[2.5rem] font-bold text-red-600">
                    Ti diamo il benvenuto in P-Max Hair Studio
                </h3>

                <h4 className="text-[2rem] font-semibold text-white">
                    Specialista in trattamenti benefici per barba e capelli
                </h4>

                <div className="flex flex-col gap-2 text-center lg:text-start text-[1.2rem]">
                    <p>Il punto di riferimento per l’uomo che vuole distinguersi.</p>
                    <p> Da P-Max non offriamo solo un semplice taglio, ma un'esperienza pensata su misura per te: un ambiente moderno e accogliente, strumenti professionali e mani esperte al tuo servizio.</p>
                    <p>Che tu voglia uno stile classico, un fade moderno o una barba perfettamente scolpita, troverai attenzione al dettaglio, passione per il mestiere e una cura autentica per il tuo look.</p>
                </div>
            </div>

            <div className="col-span-2 lg:col-span-1 items-center justify-center flex flex-wrap gap-1">

                <div className="flex flex-col gap-1 items-center justify-center">
                    <div className=" h-[20rem] w-[20rem]">
                        <SlideShow images={testImages} time={2500} />
                    </div>

                    <div className=" h-[15rem] w-[20rem] ">
                        <SlideShow images={testImages} time={3500} />
                    </div>
                </div>

                <div className="hidden md:flex flex-col gap-1 items-center justify-center ">
                    <div className=" h-[15rem] w-[20rem] ">
                        <SlideShow images={testImages} time={5000} />
                    </div>

                    <div className=" h-[20rem] w-[20rem] ">
                        <SlideShow images={testImages} time={6500} />
                    </div>
                </div>


            </div>

            {/* <div className="col-span-2 min-h-[60vh] lg:hidden grid grid-cols-2 gap-3 my-[1.5rem] p-5">
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                    <ImageSlideShow />
                </div>
                <div className="col-span-1 hidden md:flex ">
                    <ImageSlideShow />
                </div>
            </div> */}
        </section>
    )
}