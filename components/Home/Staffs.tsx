import Image from "next/image";
import styles from './homepage.module.css'


export default function Staffs() {
    return (
        <section className={`min-h-[80vh] max-w-screen p-5 ${styles.backgroundStaffsHome}`}>

            {/* Titolo */}
            <div className=" w-full flex flex-col items-center justify-center pb-6">
                <h2 className={`text-center text-[4rem] font-light text-red-800 `}>P-STAFF</h2>

                {/* Icona forbici centrata */}
                <div className={styles.scissorsTitle}>
                    <Image
                        src="/assets/logos/rasoio.png"
                        alt="forbici"
                        width={60}
                        height={24}
                        className=''
                        style={{ transform: 'rotate(0deg)' }}
                    />
                </div>
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
        </section>
    )
}