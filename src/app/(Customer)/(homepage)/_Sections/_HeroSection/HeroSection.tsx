import HeroLeft from "./_components/HeroLeft"
import styles from '@/src/app/(Customer)/homepage.module.css'
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative bg-black/30">
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

      {/* INFO */}
      <div className="col-span-2 min-h-[3rem] bg-red-900/70 text-white w-full flex items-center justify-center gap-5">
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm sm:text-base">Via Provinciale, 46, Napoli</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-sm sm:text-base">388 115 4473</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm sm:text-base">Mar-Sab 08:30-20:00</span>
          </div>
        </div>
      </div>


    </section>
  )
}
