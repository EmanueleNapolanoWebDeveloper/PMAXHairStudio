"use client"

import Image from "next/image"
import { motion, easeOut } from "framer-motion"

type GalleryImage = {
    title: string
    path: string
}

const images: GalleryImage[] = [
    {
        title: "Saloon",
        path: "/assets/saloon/pmaxputeca.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon1.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon2.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon3.webp",
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
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easeOut, // ✅ funzione invece che stringa
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
            ease: easeOut, // ✅ funzione invece che stringa
        },
    },
}

export default function Saloon() {
    return (
        <section
            className="min-h-screen w-full flex flex-col items-center justify-around bg-white px-4 py-3"
            id="saloonHome"
        >
            <motion.div
                className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center pb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={headerVariants}
            >
                <h2 className="text-center text-4xl md:text-6xl font-bold text-black uppercase mb-4 tracking-wide">
                    P-MAX <span className="text-red-600">Saloon</span>
                </h2>

                {/* Decorative razor */}
                <div className="w-full flex items-center justify-center gap-5">
                    {/* Linea sinistra */}
                    <motion.div
                        className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-red-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
                    ></motion.div>

                    {/* Icona centrale */}
                    <motion.div
                        className="w-15 h-24 rounded-full flex items-center justify-center relative"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                        whileHover={{ rotate: 360 }}
                    >
                        <Image src={"/assets/logos/iconGira.png"} fill alt="P-Max Logo" />
                    </motion.div>

                    {/* Linea destra */}
                    <motion.div
                        className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-red-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
                    ></motion.div>
                </div>
            </motion.div>

            <motion.div
                className="flex flex-col items-center justify-center max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            >
                <p className="text-lg md:text-xl font-light text-center text-gray-800 leading-relaxed">
                    Ogni dettaglio del nostro salone racconta chi siamo. <br />
                    Dalla poltrona al rasoio, dall&apos;arredamento urbano al tocco old school,
                    <span className="text-red-600 font-medium">
                        {" "}ogni angolo è pensato per farti sentire a casa, ma con stile.
                    </span>
                </p>
            </motion.div>

            <div className="w-full max-w-6xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="group relative w-full h-80 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                                transition: { duration: 0.3, ease: easeOut },
                            }}
                        >
                            <Image
                                src={image.path || "/placeholder.svg"}
                                alt={image.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
