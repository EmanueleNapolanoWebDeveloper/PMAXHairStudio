"use client"

import StaffCard from "./_components/CardStaff"
import Image from "next/image"
import { motion } from "framer-motion"

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
        image: "/assets/gallery/photos/fotoMassimoAI.png",
        experience: "15+ anni",
        specialties: ["Taglio Classico", "Barba", "Baffi"],
        bio: "Maestro nell'arte della rasatura tradizionale",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

const headerVariants = {
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
        <section className="min-h-screen bg-gradient-to-b from-black via-red-900 to-red-950 py-20 px-4" id="staffHome">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                >
                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl text-white tracking-wider mb-4">STAFF</h1>
                        <motion.div
                            className="w-24 h-1 bg-red-800 mx-auto rounded-full shadow-lg shadow-red-900/50"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        ></motion.div>
                    </div>

                    {/* Decorative razor */}
                    <div className="w-full flex items-center justify-center gap-5">
                        {/* Linea sinistra */}
                        <motion.div
                            className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-white"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        ></motion.div>

                        {/* Spazio per l'icona che aggiungerai */}
                        <motion.div
                            className="w-20 h-24 rounded-full flex items-center justify-center relative"
                            initial={{ rotate: -75, scale: 0 }}
                            whileInView={{ rotate: -75, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                        >
                            {/* Placeholder - sostituisci con la tua icona */}
                            <Image src={"/assets/logos/rasoio.png"} fill alt="P-Max Logo" className="rotate-[-15deg]" />
                        </motion.div>

                        {/* Linea destra */}
                        <motion.div
                            className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-white"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        ></motion.div>
                    </div>

                    {/* Subtitle */}
                    <motion.div
                        className="max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <p className="text-xl text-gray-300 leading-relaxed mb-2">
                            <span className="italic">Passione, esperienza e attenzione ai dettagli:</span>
                        </p>
                        <p className="text-2xl font-bold text-red-400">scopri chi si prenderà cura di te.</p>
                    </motion.div>
                </motion.div>

                {/* Staff Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {staffMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            className="transform hover:scale-105 transition-transform duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StaffCard member={member} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
