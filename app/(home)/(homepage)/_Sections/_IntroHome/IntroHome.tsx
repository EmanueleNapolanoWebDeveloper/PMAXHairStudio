import styles from '../../homepage.module.css'
import Link from "next/link"
import Welcome from "./_components/Welcome"
import ImageShow from './_components/ImageShow'


export default function IntroHome() {
    return (
        <section className="min-h-screen grid grid-cols-2 bg-white">

            {/* Images section */}
            <div className="col-span-2 lg:col-span-1 flex flex-wrap h-full">
                <ImageShow />
            </div>

            {/* Text section */}
            <div className="col-span-2 lg:col-span-1 h-screen flex items-center justify-center">
                <div className="w-[90%] h-full flex flex-col items-center justify-around">

                    <Welcome />

                    <p className="text-[1.5rem] font-light text-black w-full text-start fontSubtitlesHome">
                        P-Max è un barbershop unico nel suo genere, situato nel cuore di Pianura, a Napoli, dove stile, precisione e cura dei dettagli si incontrano per offrire un’esperienza di bellezza su misura.
                    </p>

                    <div className="flex flex-col gap-2 text-start text-[1.2rem] text-black">
                        <p>
                            Il punto di riferimento per l’uomo che vuole distinguersi. <br />
                            Da P-Max non offriamo solo un semplice taglio, ma un&apos;esperienza pensata su misura per te: un ambiente moderno e accogliente, strumenti professionali e mani esperte al tuo servizio. <br />
                            Che tu voglia uno stile classico, un fade moderno o una barba perfettamente scolpita, troverai attenzione al dettaglio, passione per il mestiere e una cura autentica per il tuo look.
                        </p>
                    </div>

                    <div className="w-full h-[5rem] flex items-center justify-center">
                        <Link href="/about-us">
                            <button className="w-full lg:w-auto bg-red-600 text-white border-none px-6 py-3 font-bold text-[1.2rem] hover:bg-black hover:text-white transition-colors active:bg-black active:text-white">
                                Scopri di più
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
