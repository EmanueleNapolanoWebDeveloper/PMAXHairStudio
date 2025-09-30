"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const quotes = [
    {
        text: "Non tagliamo solo capelli, creiamo stile. Non facciamo solo la barba, coltiviamo fiducia.",
        author: "— Massimo Polverino, Master Barber",
    },
    {
        text: "La tradizione è il nostro punto di partenza, l'innovazione la nostra firma.",
        author: "— Team P-Max",
    },
    {
        text: "Ogni cliente è unico: la nostra missione è esaltare la tua personalità.",
        author: "— P-Max Barber Studio",
    },
    {
        text: "Un taglio ben fatto è il primo passo verso la sicurezza di sé.",
        author: "— P-Max Style",
    },
    {
        text: "Dal barbiere non si va solo per il look, ma per ritrovare sé stessi.",
        author: "— Filosofia P-Max",
    },
    {
        text: "Il nostro mestiere non è cambiare chi sei, ma valorizzare chi vuoi essere.",
        author: "— P-Max Barber Crew",
    },
    {
        text: "Ogni sforbiciata racconta una storia: la tua.",
        author: "— P-Max Experience",
    },
    {
        text: "La cura dei dettagli fa la differenza, dentro e fuori dal salone.",
        author: "— Team P-Max",
    },
    {
        text: "Non seguiamo la moda, la anticipiamo. Con classe.",
        author: "— P-Max Barber Studio",
    },
]

export default function QuoteCard() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-600 p-8 rounded-2xl border border-red-700 relative overflow-hidden"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
            />

            <div className="relative z-10">
                <motion.div
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-6xl text-white/60 font-serif mb-4 leading-none"
                >
                    &quot;
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={index}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="text-xl text-white leading-relaxed mb-6 text-pretty font-medium"
                    >
                        {quotes[index].text}
                    </motion.blockquote>
                </AnimatePresence>

                <motion.cite
                    key={`author-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white font-bold text-lg block"
                >
                    {quotes[index].author}
                </motion.cite>

                <motion.div
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    className="text-6xl text-white/60 font-serif text-right leading-none mt-4"
                >
                    &quot;
                </motion.div>
            </div>
        </motion.div>
    )
}
