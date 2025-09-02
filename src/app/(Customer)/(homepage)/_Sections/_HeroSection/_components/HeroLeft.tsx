import Image from "next/image"
import HeroUserSection from "./HeroUserSection"
import styles from "@/src/app/(Customer)/homepage.module.css"
import ReservationModal from "@/src/components/Layout/ReservationModal"

export default function HeroLeft() {
  return (
    <div className="col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center min-h-[600px] text-white overflow-hidden">
      
      {/* Mobile Image */}
      <Image
        src="/assets/gallery/photos/fotoMassimoAI.png"
        alt="Massimo Polverino - Senior Barber"
        width={450}
        height={450}
        className={`${styles.animateslideInRightToLeft} object-cover opacity-60 pointer-events-none select-none absolute z-0 block lg:hidden`}
      />

      {/* Mobile Name & Role */}
      <p
        className={`${styles.animatefadeIn} text-[2rem] md:text-[3rem] absolute bottom-4 right-0 z-20 text-white opacity-50 font-extrabold tracking-widest whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)] lg:hidden`}
      >
        Massimo Polverino <br />
        <span className="font-light text-[1.5rem]">Senior Barber / Hair Stylist</span>
      </p>

      {/* Logo & User Section */}
      <div className="h-[50vh] w-full flex flex-col items-center justify-center">
        <div className="h-[7rem] w-full flex items-center justify-center">
          <Image
            src="/assets/logos/P-MaxLogoNoBg.png"
            alt="Logo P-MAX HAIR STUDIO"
            width={350}
            height={350}
            className={`z-10 mt-10 lg:mb-4 transition-all duration-700 ease-out ${styles.animateslideInLeft}`}
          />
        </div>

        <div className="w-full flex justify-center mt-4">
          <HeroUserSection />
        </div>
      </div>
    </div>
  )
}
