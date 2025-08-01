import Image from 'next/image'
import styles from './homepage.module.css'
import Link from 'next/link'


const services = [
    {
        "title": "Taglio",
        "image": "/assets/services/taglio.webp",
        "description": " Stile, precisione e cura in ogni dettaglio. Il taglio perfetto per valorizzare il tuo look e la tua personalità."
    },
    {
        "title": "Barba",
        "image": "/assets/services/barba.webp",
        "description": " Stile, precisione e cura in ogni dettaglio. Il taglio perfetto per valorizzare il tuo look e la tua personalità."
    },
    {
        "title": "Stile",
        "image": "/assets/services/stile.webp",
        "description": " Stile, precisione e cura in ogni dettaglio. Il taglio perfetto per valorizzare il tuo look e la tua personalità."
    },
    {
        "title": "Colore",
        "image": "/assets/services/colore.webp",
        "description": " Stile, precisione e cura in ogni dettaglio. Il taglio perfetto per valorizzare il tuo look e la tua personalità."
    }
]


export default function ServicesHome() {

    return (
        <section className={`min-h-screen  overflow-y-scroll lg:overflow-hidden flex flex-col items-center justify-around py-5 ${styles.backgroundServicesHome}`}>
            <div className=" w-full flex flex-col items-center justify-center pb-6">
                {/* Titolo */}
                <h2 className="text-center text-[4rem] md:text-[5rem] font-extralight text-red-600 tracking-widest uppercase">Servizi</h2>

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



            <div className="flex flex-wrap items-center justify-around gap-4 p-5">

                {/* card */}
                {services.map((service, index) => {
                    return (

                        <div
                        key={index}
                            className={`w-[20rem] min-h-[26rem] flex flex-col items-center justify-around relative backdrop-blur-sm ${styles.cardHoverEffect}`}>


                            {/* title */}
                            <div className="h-[3.5rem] flex items-center justify-center">
                                <h3 className="text-center text-[2rem] font-light uppercase">{service.title}</h3>
                            </div>

                            {/* image */}
                            <div className="h-[12rem] flex items-center justify-center">
                                <div className="relative rounded-full h-[12rem] w-[12rem]">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover rounded-full" />
                                </div>
                            </div>

                            {/* descriptiion */}
                            <div className="h-auto w-full p-4 break-words flex items-center justify-center">
                                <p className="text-center text-[1.3rem]">{service.description}</p>
                            </div>
                            <div className='h-[3.5rem] bg-red-900 w-full p-2 flex items-center justify-center'>
                                <Link href={"/servizi"} key={index}>
                                    <button type='button'>
                                        Scopri di più
                                    </button>
                                </Link>
                            </div>
                        </div>

                    )
                })}

            </div>
        </section>
    )

}