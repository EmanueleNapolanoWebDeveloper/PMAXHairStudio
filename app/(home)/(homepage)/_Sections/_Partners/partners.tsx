import Image from "next/image"
import styles from '../../homepage.module.css'
import { partners } from '@/lib/datas'




export default function Partners() {
  return (
    <section className={`min-h-[30vh] max-w-screen bg-white flex flex-col gap-4 py-5 ${styles.backgroundPartnerssHome}`}>
      {/* title */}
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-center text-[3rem] md:text-[5rem] font-extralight text-red-600 tracking-widest uppercase">Partners</h2>
        {/* Icona forbici centrata */}
        <div className={`${styles.scissorsTitleRed}`}>
          <Image
            src="/assets/logos/iconSpazzola.png"
            alt="forbici"
            width={40}
            height={24}
            style={{ transform: 'rotate(35deg)' }}
          />
        </div>
      </div>


      <div className="flex flex-wrap h-full max-w-screen items-center justify-evenly">
        {partners.map((partner, index) => {
          return (
            <div key={index} className="relative w-[11rem] h-[9rem]">
              <Image
                src={partner.path}
                alt={partner.title}
                fill />
            </div>

          )
        })}
      </div>
    </section>
  )
}