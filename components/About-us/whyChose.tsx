import Image from "next/image"
import style from './aboutus.module.css'
import styles from '../../components/Home/homepage.module.css'
import { choises } from "@/lib/datas"






export default function WhyChoose() {
    return (
        <section className={` ${style.backgroundWhyChoiseAbout} min-h-[30vh] w-full bg-white flex flex-wrap items-center justify-around gap-6 p-4`}>

            <div className=" w-full flex flex-col items-center justify-center pb-6">
                {/* Titolo */}
                <h2 className="text-center text-[4rem] font-extralight text-red-800 uppercase">Perchè Sceglierci?</h2>

                {/* Icona forbici centrata */}
                <div className={styles.scissorsTitle}>
                    <Image
                        src="/assets/logos/iconBeard.png"
                        alt="forbici"
                        width={60}
                        height={24}
                        style={{ transform: 'rotate(0deg)' }}
                    />
                </div>

            </div>

            {choises.map((choise, index) => (
                <div key={index} className="flex flex-col items-center justify-around gap-5">
                    <div                        
                        className={`${style.hexagon} w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] relative shadow-lg hover:scale-105 transition-transform duration-300 rounded-full`}
                    >
                        <Image
                            src={choise.image} // usa immagini diverse per test
                            alt={choise.title}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <p className="text-white text-[1.5rem]">{choise.title}</p>
                    </div>

                </div>
            ))
            }
        </section >
    )
}