import Image from "next/image";
import styles from '@/app/(home)/(homepage)/homepage.module.css'


export default function Staffs() {
    return (
        <section className={`min-h-[80vh] max-w-screen p-5 ${styles.backgroundStaffsHome}`}>

            {/* Titolo */}
            <div className=" w-full flex flex-col items-center justify-around pb-6">
                <div className="flex flex-col items-center justify-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        STAFF
                    </h1>
                    <div className="flex items-center justify-center mb-6 gap-4">
                        {/* Linea sinistra */}
                        <div className="flex-1 w-64 h-px bg-gradient-to-r from-transparent to-black"></div>

                        {/* Spazio per l'icona che aggiungerai */}
                        <div className="w-20 h-17 rounded-full flex items-center justify-center relative">
                            {/* Placeholder - sostituisci con la tua icona */}
                            <Image
                                src={'/assets/logos/rasoio.png'}
                                fill
                                alt="P-Max Logo"
                                className="rotate-[-35deg]" />
                        </div>

                        {/* Linea destra */}
                        <div className="flex-1 w-64 h-px bg-gradient-to-l from-transparent to-black"></div>
                    </div>

                    <p className="text-[1.4rem] text-white max-w-4xl text-center mx-auto fontSubtitlesHome">
                        Passione, esperienza e attenzione ai dettagli: <br /> scopri chi si prenderà cura di te.
                    </p>
                </div>


                {/* staffs */}
                <div className="w-full flex flex-wrap items-center justify-center ">
                    <div className="h-[30rem] w-[18rem] backdrop-brightness-50 relative p-3 rounded-2xl">
                        <Image
                            src={"/assets/gallery/photos/fotoMassimoAI.png"}
                            alt="Massimo Polverino"
                            fill
                            className="rounded-2xl z-2" />

                        <div className="w-full h-[3rem] flex flex-col items-center justify-center gap-2 absolute z-3 bottom-5">
                            <p className="text-slate-400 text-[1.5rem]">Massimo Polverino</p>
                            <p className="text-slate-400 font-extralight text-[1.2rem]">Senior Barber</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}