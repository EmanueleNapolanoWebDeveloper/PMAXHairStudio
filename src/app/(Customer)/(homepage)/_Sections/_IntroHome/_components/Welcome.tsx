"use client"
import { motion } from "framer-motion"

export default function Welcome() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-7xl md:text-8xl font-black text-white tracking-wider mb-4"
            >
              CHI SIAMO
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-red-800 mx-auto rounded-full shadow-lg shadow-red-900/50"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Story */}
          <div className="space-y-6">
            {/* Vintage Welcome Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-start w-full drop-shadow-lg">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-red-400 font-light block mb-2"
                >
                  La Storia di
                </motion.span>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="text-red-600 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 text-6xl"
                >
                  P
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white font-light text-5xl"
                >
                  -MAX
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl block mt-2"
                >
                  Hair Studio
                </motion.span>
              </h2>

              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 mt-6 origin-left"
              >
                <div className="w-16 h-px bg-red-600"></div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
                <div className="w-8 h-px bg-red-400"></div>
              </motion.div>
            </motion.div>

            {/* Story Text */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                <span className="text-red-400 font-semibold text-xl">Dal 1985</span>, la nostra passione per l&apos;arte
                del barbiere si tramanda di generazione in generazione. Quello che è iniziato come un piccolo negozio di
                quartiere è diventato un punto di riferimento per chi cerca{" "}
                <span className="text-white font-semibold">stile, tradizione e innovazione</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                Ogni taglio racconta una storia, ogni cliente è parte della nostra famiglia. Utilizziamo{" "}
                <span className="text-red-400 font-semibold">tecniche tradizionali</span> unite alle più moderne
                tendenze per offrirti un&apos;esperienza unica e personalizzata.
              </motion.p>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { number: "40+", label: "Anni di Esperienza" },
                { number: "∞", label: "Passione" },
                { number: "100%", label: "Soddisfazione" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-red-800/20 hover:border-red-600/50 transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                    className="text-3xl font-bold text-red-400 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="space-y-8">
            {/* Vintage Quote Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-red-900/20 to-red-800/10 p-8 rounded-2xl border border-red-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl text-red-600 font-serif mb-4"
              >
                &quot;
              </motion.div>
              <blockquote className="text-xl text-gray-200 italic leading-relaxed mb-4">
                Non tagliamo solo capelli, creiamo stile. Non facciamo solo la barba, coltiviamo fiducia.
              </blockquote>
              <cite className="text-red-400 font-semibold">— Massimo Polverino, Master Barber</cite>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="text-6xl text-red-600 font-serif text-right"
              >
                &quot;
              </motion.div>
            </motion.div>

            {/* Services Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-4">La Nostra Arte</h3>

              <div className="space-y-3">
                {[
                  "Taglio tradizionale con rasoio",
                  "Cura della barba classica",
                  "Styling contemporaneo",
                  "Consulenza personalizzata",
                ].map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-gray-300 cursor-pointer"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                      className="w-2 h-2 bg-red-600 rounded-full"
                    />
                    <span className="font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vintage Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-32 h-32 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center border-4 border-red-600/30 shadow-2xl shadow-red-900/50"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="text-center"
                  >
                    <div className="text-white text-xs font-bold uppercase tracking-wider">Est.</div>
                    <div className="text-white text-2xl font-black">1985</div>
                    <div className="text-red-200 text-xs uppercase tracking-wider">Tradizione</div>
                  </motion.div>
                </motion.div>

                {/* Decorative elements around badge */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [rotation, rotation + 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-70px)`,
                    }}
                    className="w-4 h-4 bg-red-600"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gray-600"></div>
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-3 h-3 bg-red-800 rounded-full shadow-lg shadow-red-900/50"
            />
            <div className="w-8 h-px bg-gray-500"></div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="w-2 h-2 bg-red-700 rounded-full"
            />
            <div className="w-16 h-px bg-gray-600"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
