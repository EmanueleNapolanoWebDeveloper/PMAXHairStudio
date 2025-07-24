import style from '../../components/Servizi/servizi.module.css'
import styles from '../Home/homepage.module.css'
import Image from 'next/image'
import ImageSlideShow from '../Home/ImageSlideShow'
import { services } from '@/lib/datas'

type TraitmentProps = {
    images: string[],
    title: string,
    description: string,
    isPair: boolean
}



function Traitment({ images, title, description, isPair }: TraitmentProps) {
    return (
        isPair ? (
            <div className="w-[95vw] min-h-[50vh] grid grid-cols-5 gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-red-800/15">

                {/* Image a sinistra */}
                <div className="col-span-5 md:col-span-2 relative h-[20rem] flex items-center justify-center rounded-md overflow-hidden shadow-lg ">
                    <ImageSlideShow images={images} time={2000} />
                </div>

                {/* Testo a destra */}
                <div className="col-span-5 md:col-span-3 flex flex-col items-end justify-center space-y-4 text-right">
                    <h2 className="text-[3rem] font-bold text-red-700 tracking-wide">{title}</h2>
                    <p className="text-xl md:text-2xl lg:text-[1.5rem] text-white max-w-xl">{description}</p>
                </div>
            </div>
        ) : (
            <div className="w-[95vw] min-h-[50vh]  grid grid-cols-5 gap-4 p-6 border border-gray-300 rounded-lg shadow-md backdrop-brightness-50 ">

                {/* Testo a sinistra */}
                <div className="col-span-5 md:col-span-3 flex flex-col items-start justify-center space-y-4 text-left">
                    <h2 className="text-[3rem] font-bold text-red-700 tracking-wide">{title}</h2>
                    <p className="text-xl md:text-2xl lg:text-[1.5rem] text-slate-100 max-w-xl">{description}</p>
                </div>

                {/* Image a destra */}
                <div className="col-span-5 md:col-span-2 relative h-[20rem] flex items-center justify-center rounded-md overflow-hidden shadow-lg">
                    <ImageSlideShow images={images} time={2000} />
                </div>
            </div>
        )
    );
}


export default function ServicesSection() {
    return (
        <section className={` ${style.gradientPrice} min-h-screen flex flex-col items-center justify-center gap-3 py-[3rem]`}>

            {/* title */}
            <div className="w-screen flex flex-col items-center justify-center">
                <h2 className="text-center text-[4rem] font-light text-red-600">I Nostri Trattamenti</h2>
                {/* Icona forbici centrata */}
                <div className={`${styles.scissorsTitleRed} p-5`}>
                    <Image
                        src="/assets/logos/iconScissors_white.png"
                        alt="forbici"
                        width={40}
                        height={24}
                        style={{ transform: 'rotate(75deg)' }}
                    />
                </div>
            </div>

            {/* container Trattamenti */}
            {services.map((service, index) => {
                const isPari = index % 2 === 0
                return (
                    <Traitment key={index} images={service.images} title={service.title} description={service.description} isPair={isPari} />
                )
            })}


        </section>
    )
}