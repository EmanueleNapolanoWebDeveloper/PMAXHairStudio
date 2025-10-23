"use client"
import Image from "next/image"
import QuoteCard from "./_components/QuoteCard"
import Innovation from "./_components/Innovation"
import { motion } from "framer-motion"

export default function IntroHome() {
    return (
        <section className="min-h-screen bg-white py-20 px-4 relative overflow-hidden" id="chi-siamo">
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="text-5xl md:text-7xl font-black text-black mb-4 text-balance tracking-tight"
                        >
                            CHI <span className="text-red-600">SIAMO</span>
                        </motion.h1>
                        {/* Decorative razor */}
                        <div className="w-full flex items-center justify-center gap-5">
                            {/* Linea sinistra */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex-1 max-w-64 h-px bg-gradient-to-r from-transparent to-red-600 origin-right"
                            />

                            {/* Icona */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                                className="w-20 h-24 rounded-full flex items-center justify-center relative"
                            >
                                <motion.div
                                    className="w-15 h-24 rounded-full flex items-center justify-center relative"
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                                    whileHover={{ rotate: 360 }}
                                >
                                    <Image src={"/assets/logos/iconBeard.png"} fill alt="P-Max Logo" />
                                </motion.div>
                            </motion.div>

                            {/* Linea destra */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex-1 max-w-64 h-px bg-gradient-to-l from-transparent to-red-600 origin-left"
                            />
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-xl text-gray-700 mt-6 max-w-2xl mx-auto text-pretty"
                    >
                        Una storia di passione, tradizione e maestria che si tramanda da generazione in generazione.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Story & Services */}
                    <div className="space-y-8">
                        {/* Story Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl border border-black/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"
                                    >
                                        <div className="w-6 h-6 bg-white rounded-full"></div>
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-black">La Nostra Storia</h2>
                                </motion.div>

                                {[
                                    "Dal 2016, Massimo Polverino porta avanti con dedizione e talento l'arte del barbiere, un mestiere che affonda le sue radici nella tradizione di famiglia. Ciò che per molti è solo un lavoro, per noi è una vera e propria eredità: passione, cura del dettaglio e rispetto per un'arte che si tramanda di generazione in generazione.",
                                    "Ogni cliente che varca la soglia del nostro salone non trova soltanto un taglio di capelli o una rasatura, ma un'esperienza costruita su misura. Coniughiamo tecniche tradizionali e nuove tendenze, perché crediamo che lo stile migliore nasca dall'incontro tra radici e innovazione.",
                                    "Da oltre un decennio, il nome Polverino rappresenta affidabilità, eleganza e passione. Non sei solo un cliente: entri a far parte di una famiglia che da sempre mette al centro l'arte, la professionalità e il piacere di farti sentire al meglio.",
                                ].map((text, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                        className="text-lg text-black leading-relaxed text-pretty"
                                        dangerouslySetInnerHTML={{
                                            __html: text
                                                .replace(/Dal 2016/g, '<span class="text-red-600 font-bold">Dal 2016</span>')
                                                .replace(
                                                    /tecniche tradizionali/g,
                                                    '<span class="text-red-600 font-semibold">tecniche tradizionali</span>',
                                                )
                                                .replace(/Polverino/g, '<span class="text-red-600 font-semibold">Polverino</span>'),
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Services Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-black/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 90, 0] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"
                                >
                                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                                </motion.div>
                                La Nostra Arte
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "Taglio tradizionale con rasoio",
                                    "Cura della barba classica",
                                    "Styling contemporaneo",
                                    "Consulenza personalizzata",
                                ].map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        whileHover={{ x: 10, scale: 1.02 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/10 hover:border-red-600 transition-all duration-300 hover:shadow-sm group cursor-pointer"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                                            className="w-3 h-3 bg-red-600 rounded-full group-hover:bg-black transition-colors duration-300"
                                        />
                                        <span className="font-medium text-black group-hover:text-red-600 transition-colors duration-300">
                                            {service}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {[
                                { number: "20+", label: "Anni di Esperienza" },
                                { number: "∞", label: "Passione" },
                                { number: "100%", label: "Soddisfazione" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="text-center p-6 bg-white rounded-2xl border border-black/20 hover:border-red-600 transition-all duration-300 hover:shadow-md group flex flex-col gap-2 items-center justify-center cursor-pointer"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                                        className="text-3xl font-bold text-red-600 mb-2 group-hover:text-black transition-colors duration-300"
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-sm text-gray-600 uppercase tracking-wider font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Stats & Quote */}
                    <div className="space-y-8">
                        {/* Quote Card */}
                        <QuoteCard />

                        {/* Heritage Badge */}
                        <Innovation />
                    </div>
                </div>
            </div>
        </section>
    )
}
