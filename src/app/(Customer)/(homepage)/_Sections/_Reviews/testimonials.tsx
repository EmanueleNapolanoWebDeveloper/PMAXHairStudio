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
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const review = recensioni[current]

    // funzione che genera le stelle
    const renderStars = (rating: number) => {
        return (
            <div className="flex justify-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                    <span
                        key={i}
                        className={i < rating ? "text-yellow-400 text-lg" : "text-gray-500 text-lg"}
                    >
                        ★
                    </span>
                ))}
            </div>
        )
    }

    return (
        <section className={`relative bg-cover bg-center bg-no-repeat py-20 px-6 text-center text-white ${styles.backgroundTestimonialsHome}`} id='reviewsHome'>
            <h2 className="text-center text-[2.5rem] font-light">DICONO DI NOI</h2>

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

                            {/* qui stelle */}
                            {renderStars(review.rating)}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
