'use client'

import styles from '@/src/app/(Customer)/homepage.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { recensioni } from '@/src/lib/datas'
import { useState, useEffect } from 'react'

export default function Testimonials() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % recensioni.length)
        }, 5000) // cambia recensione ogni 5s
        return () => clearInterval(interval)
    }, [])

    const review = recensioni[current]

    return (
        <section className={`relative bg-cover bg-center bg-no-repeat py-20 px-6 text-center text-white ${styles.backgroundTestimonialsHome}`}>
            <h2 className="text-center text-[2.5rem] font-light">TESTIMONIALS</h2>

            {/* decorazione top */}
            <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                    <span className="text-yellow-500 text-xl">♦</span>
                    <span className="text-yellow-500 text-xl">♦</span>
                    <span className="text-yellow-500 text-xl">♦</span>
                </div>
            </div>

            {/* virgolette e testo */}
            <div className="max-w-3xl mx-auto relative min-h-[200px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="text-5xl text-red-500 absolute -left-6 -top-2">“</div>

                        <p className="text-xl leading-relaxed italic font-light">
                            {review.message}
                        </p>

                        <div className="text-5xl text-red-500 absolute -right-6 bottom-0">”</div>

                        <div className="mt-10">
                            <h4 className="text-red-500 text-2xl font-bold">{review.user}</h4>
                            <p className="text-sm text-gray-300">{review.from}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
