import HeroLeft from "./_components/HeroLeft"
import styles from '@/app/(Customer)/homepage.module.css'
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative bg-black">
      {/* LEFT SIDE */}
      <HeroLeft />

      {/* RIGHT SIDE - Desktop only */}
      <div className="hidden lg:flex lg:col-span-1 relative items-end justify-end p-10">
        <Image
          src="/assets/gallery/photos/fotoMassimoAI.png"
          alt="Massimo Polverino"
          width={430}
          height={550}
          priority
          className={styles.animateslideInRightToLeft}
        />

        <p
          className={`${styles.animatefadeIn} absolute bottom-4 right-10 text-white opacity-50 font-extrabold tracking-widest whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]`}
        >
          Massimo Polverino <br />
          <span className="font-light text-[1.5rem]">
            Senior Barber / Hair Stylist
          </span>
        </p>
      </div>
    </section>
  )
}
