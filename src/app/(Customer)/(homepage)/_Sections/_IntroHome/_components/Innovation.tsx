"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Innovation() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl border border-black/20 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
            {/* Icona / Cerchio */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white rounded-full"
                />
            </motion.div>

            {/* Titolo */}
            <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-extrabold text-black mb-4 tracking-tight"
            >
                Tradizione & Innovazione
            </motion.h4>

            {/* Testo principale */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-700 leading-relaxed mb-6"
            >
                Dove l&apos;arte antica incontra le tendenze moderne.
                <br />
                <br />
                Oggi <span className="font-semibold text-red-600">P-Max</span> si è evoluto adottando un sistema digitale
                avanzato: prenotazioni online, gestione smart del calendario e strumenti innovativi per offrire ai clienti
                un'esperienza semplice, veloce e al passo coi tempi.
            </motion.p>

            {/* Vantaggi Login */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300"
            >
                <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                    Accedi al tuo profilo e ottieni vantaggi esclusivi:
                </h5>
                <ul className="space-y-2 text-gray-700 text-base">
                    {[
                        { icon: "✨", text: "Usa la tua ", bold: "Fidelity Card digitale", rest: " e accumula punti" },
                        { icon: "⭐", text: "Lascia recensioni e condividi la tua esperienza con la community" },
                        { icon: "📅", text: "Monitora facilmente le tue ", bold: "prenotazioni" },
                    ].map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-2"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                                className="text-red-600 text-lg"
                            >
                                {item.icon}
                            </motion.span>
                            <span>
                                {item.text}
                                {item.bold && <strong>{item.bold}</strong>}
                                {item.rest}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Info su modalità di accesso */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300"
            >
                <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">Come accedere</h5>
                <p className="text-gray-700 mb-2">Puoi accedere in due modi semplici e sicuri:</p>
                <ul className="space-y-2 text-gray-700 text-base">
                    {[
                        {
                            icon: "🌐",
                            text: "Accesso tramite Google",
                            desc: ": utilizza il tuo account Google per entrare velocemente senza bisogno di creare nuove credenziali.",
                        },
                        {
                            icon: "📩",
                            text: "Email & Password",
                            desc: ": registrati con la tua email e scegli una password personale. Dopo la registrazione riceverai un'email di conferma: clicca sul link per attivare il tuo account e iniziare subito ad accedere ai servizi.",
                        },
                    ].map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                            className="flex items-start gap-2"
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                                className="text-red-600 text-lg"
                            >
                                {item.icon}
                            </motion.span>
                            <span>
                                <strong>{item.text}</strong>
                                {item.desc}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Bottone Login */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <Link
                    href="/login"
                    className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-semibold text-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    Accedi Ora
                </Link>
            </motion.div>
        </motion.div>
    )
}
