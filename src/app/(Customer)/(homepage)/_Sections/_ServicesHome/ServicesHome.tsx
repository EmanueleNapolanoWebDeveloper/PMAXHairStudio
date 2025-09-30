"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
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

export default function ServicesHome() {
    const services = [
        {
            title: "Taglio",
            desc: "Tagli moderni e classici per ogni stile.",
            img: "/assets/gallery/taglio/taglio3.webp",
        },
        {
            title: "Barba",
            desc: "Rifinitura e cura della barba con tecniche professionali.",
            img: "/assets/gallery/homepage/barba.webp",
        },
        {
            title: "Styles",
            desc: "Consulenza e look personalizzati per il tuo stile unico.",
            img: "/assets/gallery/photos/fotosection4.jpg",
        },
        {
            title: "Consulenza",
            desc: "Un servizio personalizzato per guidarti nella scelta dello stile e del trattamento più adatto a te.",
            img: "/assets/gallery/homepage/fotosection2.jpg",
        },
    ]

    // Placeholder images per hair tattoo - sostituisci con le tue immagini reali
    const hairTattooImages = [
        "/assets/gallery/hair-tattoo/hairtattoo1.webp", // Sostituisci con i tuoi path
        "/assets/gallery/hair-tattoo/hairtattoo2.webp",
        "/assets/gallery/hair-tattoo/hairtattoo3.webp",
        "/assets/gallery/hair-tattoo/hairtattoo4.webp",
    ]

    return (
        <section
            className="relative min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-black py-24 px-6 overflow-hidden"
            id="servicehome"
        >
            {/* Header Section */}
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl mb-6">SERVIZI</h1>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <motion.div
                            className="flex-1 max-w-32 h-[2px] bg-gradient-to-r from-transparent to-red-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                        >
                            <Image src="/assets/logos/iconBaffi.png" alt="forbici" width={80} height={50} className="" />
                        </motion.div>
                        <motion.div
                            className="flex-1 max-w-32 h-[2px] bg-gradient-to-l from-transparent to-red-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        ></motion.div>
                    </div>

                    <motion.p
                        className="text-xl md:text-2xl font-medium text-gray-200 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Scopri i servizi esclusivi <span className="text-red-400 font-semibold">P-Max</span> e vivi
                        un&apos;esperienza di stile unica.
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden shadow-xl border border-red-700/30 hover:border-red-500/60"
                            variants={itemVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    fill
                                    src={service.img || "/placeholder.svg"}
                                    alt={service.title}
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">{service.desc}</p>
                                <Link href="/reservation">
                                    <span className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition-colors duration-300">
                                        Prenota
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Hair Tattoo Section */}
                <div className="relative">
                    {/* Decorative Line */}
                    <motion.div
                        className="flex items-center justify-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="flex-1 max-w-64 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-red-700"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        ></motion.div>
                        <div className="mx-8 w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
                        <motion.div
                            className="flex-1 max-w-64 h-[1px] bg-gradient-to-l from-transparent via-red-500 to-red-700"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        ></motion.div>
                    </motion.div>

                    {/* Hair Tattoo Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={headerVariants}
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl mb-8 relative">
                            HAIR TATTOO
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 border border-red-500 rotate-45 opacity-30"></div>
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-600 rotate-45"></div>
                        </h2>

                        <div className="max-w-4xl mx-auto">
                            <motion.p
                                className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                L&apos;arte del <span className="text-red-400 font-bold">Hair Tattoo</span> incontra la maestria del
                                barbiere.
                            </motion.p>
                            <motion.p
                                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Disegni personalizzati e pattern unici rasati nei capelli con precisione millimetrica. Un servizio
                                esclusivo che trasforma la tua chioma in una vera opera d&apos;arte, unendo tradizione e innovazione per
                                un look <span className="text-red-400 font-semibold">assolutamente unico</span>.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Hair Tattoo Gallery */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                    >
                        {hairTattooImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-gradient-to-b from-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl border border-red-700/20 hover:border-red-500/50"
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    rotate: 1,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    {/* Placeholder per le immagini */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-3 bg-red-600/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-sm font-medium">Hair Tattoo #{index + 1}</p>
                                        </div>
                                    </div>

                                    <Image
                                        fill
                                        src={image || "/placeholder.svg"}
                                        alt={`Hair Tattoo ${index + 1}`}
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Hair Tattoo CTA */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/reservation">
                            <motion.span
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-red-900/30 border border-red-600/50"
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                <span className="text-lg">Prenota il tuo Hair Tattoo</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
