"use client"

import StaffCard from "./_components/CardStaff"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"

interface StaffMember {
  id: number
  name: string
  role: string
  image: string
  experience: string
  specialties: string[]
  bio: string
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Massimo Polverino",
    role: "Master Barber",
    image: "/assets/gallery/photos/foto3.webp",
    experience: "15+ anni",
    specialties: [
      "Tagli di precisione",
      "Rasatura tradizionale all'italiana",
      "Cura della barba e dei baffi",
      "Consulenza d'immagine maschile",
      "Tagli classici e moderni",
    ],
    bio: "Fondatore e anima del salone, Massimo unisce tecnica, esperienza e passione per offrire un servizio sartoriale su misura. Ogni taglio è un'opera d'arte, frutto di anni di dedizione all'eccellenza barberistica.",
  },
  {
    id: 2,
    name: "Christian Perrotta",
    role: "Master Barber",
    image: "/assets/staffs/fotoCristian.jpg",
    experience: "7+ anni",
    specialties: [
      "Fade e sfumature moderne",
      "Rifiniture di precisione",
      "Trattamenti barba avanzati",
      "Cura dei dettagli",
      "Tagli contemporanei e stilizzati",
    ],
    bio: "Barbiere di grande talento e precisione, Christian combina tecnica moderna e stile personale per creare look sempre attuali. Attento ai dettagli e alle tendenze, trasforma ogni seduta in un'esperienza di stile e relax.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export default function VintageStaffs() {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black py-16 sm:py-20 px-4 sm:px-6"
      id="staffHome"
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white tracking-wider mb-4 font-bold">STAFF</h1>
            <motion.div
              className="w-16 sm:w-24 h-1 bg-red-600 mx-auto rounded-full shadow-lg shadow-red-900/50"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </div>

          {/* Decorative razor */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-5 mb-8">
            {/* Left line */}
            <motion.div
              className="flex-1 max-w-24 sm:max-w-32 h-px bg-gradient-to-r from-transparent to-white"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>

            {/* Razor icon */}
            <motion.div
              className="w-16 h-20 sm:w-20 sm:h-24 rounded-full flex items-center justify-center relative flex-shrink-0"
              initial={{ rotate: -75, scale: 0 }}
              whileInView={{ rotate: -75, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            >
              <Image src={"/assets/logos/rasoio.png"} fill alt="Razor" className="rotate-[-15deg]" />
            </motion.div>

            {/* Right line */}
            <motion.div
              className="flex-1 max-w-24 sm:max-w-32 h-px bg-gradient-to-l from-transparent to-white"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            className="max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-2">
              <span className="italic">Passione, esperienza e attenzione ai dettagli:</span>
            </p>
            <p className="text-lg sm:text-2xl font-bold text-red-400">scopri chi si prenderà cura di te.</p>
          </motion.div>
        </motion.div>

        {/* Staff Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {staffMembers.map((member) => (
            <motion.div key={member.id} variants={itemVariants} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <StaffCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
