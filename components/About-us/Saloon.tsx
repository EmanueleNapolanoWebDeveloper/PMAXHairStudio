import Image from "next/image"
import styles from '../../components/Home/homepage.module.css'

const images : GalleryImage[] = [
    {
        title: "Saloon",
        path: '/assets/saloon/pmaxputeca.webp'
    },
    {
        title: "Saloon",
        path: '/assets/saloon/saloon1.webp'
    },
    {
        title: "Saloon",
        path: '/assets/saloon/saloon2.webp'
    },
    {
        title: "Saloon",
        path: '/assets/saloon/saloon3.webp'
    }
]

type GalleryImage = {
  title: string
  path: string
}

export default function Saloon() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-around bg-red-800/30 backdrop-blur-md border border-red-800/20 rounded-lg py-3">
            
            <div className=" w-full h-auto p-3 flex flex-col items-center justify-center pb-6">
                {/* Titolo */}
                <h2 className="text-center text-[4rem] font-extralight text-white uppercase">P-MAX Saloon</h2>

                {/* Icona forbici centrata */}
                <div className={styles.scissorsTitle}>
                    <Image
                        src="/assets/logos/iconGira.png"
                        alt="forbici"
                        width={35}
                        height={20}
                        style={{ transform: 'rotate(0deg)' }}
                    />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-[1.5rem] md:text-[2rem] font-light text-center">
                    Ogni dettaglio del nostro salone racconta chi siamo. <br />
                    Dalla poltrona al rasoio, dall’arredamento urbano al tocco old school, ogni angolo è pensato per farti sentire a casa, ma con stile.
                </p>
            </div>

            <div className="col-span-2 h-auto w-full flex flex-wrap gap-4 py-4 items-center justify-around">
                {images.map((image,index) => {
                    return (
                    <div key={index} className="relative w-[17rem] h-[22rem]">
                        <Image
                            src={image.path}
                            alt={image.title}
                            fill
                            className="rounded-2xl" />
                    </div>
                    )
                })}
            </div>

        </section>

    )
}