import Image from "next/image"
export default function AboutUs() {
    return (
        <section className="min-h-screen bg-white py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h1 className="text-5xl md:text-7xl font-black text-black mb-4 text-balance tracking-tight">
                            CHI <span className="text-red-600">SIAMO</span>
                        </h1>
                        {/* Decorative razor */}
                        <div className="w-full flex items-center justify-center gap-5">
                            {/* Linea sinistra */}
                            <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-red-600"></div>

                            {/* Spazio per l'icona che aggiungerai */}
                            <div className="w-20 h-24 rounded-full flex items-center justify-center relative">
                                {/* Placeholder - sostituisci con la tua icona */}
                                <Image
                                    src={'/assets/logos/iconBeard.png'}
                                    fill
                                    alt="P-Max Logo"
                                    className="" />
                            </div>

                            {/* Linea destra */}
                            <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-red-600"></div>
                        </div>          </div>
                    <p className="text-xl text-gray-700 mt-6 max-w-2xl mx-auto text-pretty">
                        Una storia di passione, tradizione e maestria che si tramanda dal 1985
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Story & Services */}
                    <div className="space-y-8">
                        {/* Story Card */}
                        <div className="bg-white p-8 rounded-2xl border border-black/20 shadow-lg">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-black">La Nostra Storia</h2>
                                </div>

                                <p className="text-lg text-black leading-relaxed text-pretty">
                                    <span className="text-red-600 font-bold">Dal 1985</span>, la nostra passione per l'arte del barbiere
                                    si tramanda di generazione in generazione. Quello che è iniziato come un piccolo negozio di quartiere
                                    è diventato un punto di riferimento per chi cerca{" "}
                                    <span className="text-red-600 font-semibold">stile, tradizione e innovazione</span>.
                                </p>

                                <p className="text-lg text-black leading-relaxed text-pretty">
                                    Ogni taglio racconta una storia, ogni cliente è parte della nostra famiglia. Utilizziamo{" "}
                                    <span className="text-red-600 font-semibold">tecniche tradizionali</span> unite alle più moderne
                                    tendenze per offrirti un'esperienza unica e personalizzata.
                                </p>
                            </div>
                        </div>

                        {/* Services Card */}
                        <div className="bg-white p-8 rounded-2xl border border-black/20 shadow-lg">
                            <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                                </div>
                                La Nostra Arte
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "Taglio tradizionale con rasoio",
                                    "Cura della barba classica",
                                    "Styling contemporaneo",
                                    "Consulenza personalizzata",
                                ].map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/10 hover:border-red-600 transition-all duration-300 hover:shadow-sm group"
                                    >
                                        <div className="w-3 h-3 bg-red-600 rounded-full group-hover:bg-black transition-colors duration-300"></div>
                                        <span className="font-medium text-black group-hover:text-red-600 transition-colors duration-300">
                                            {service}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Quote */}
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { number: "40+", label: "Anni di Esperienza" },
                                { number: "∞", label: "Passione" },
                                { number: "100%", label: "Soddisfazione" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-white rounded-2xl border border-black/20 hover:border-red-600 transition-all duration-300 hover:shadow-md group"
                                >
                                    <div className="text-3xl font-bold text-red-600 mb-2 group-hover:text-black transition-colors duration-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-600 uppercase tracking-wider font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quote Card */}
                        <div className="bg-red-600 p-8 rounded-2xl border border-red-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="text-6xl text-white/60 font-serif mb-4 leading-none">"</div>
                                <blockquote className="text-xl text-white leading-relaxed mb-6 text-pretty font-medium">
                                    Non tagliamo solo capelli, creiamo stile. Non facciamo solo la barba, coltiviamo fiducia.
                                </blockquote>
                                <cite className="text-white font-bold text-lg">— Massimo Polverino, Master Barber</cite>
                                <div className="text-6xl text-white/60 font-serif text-right leading-none mt-4">"</div>
                            </div>
                        </div>

                        {/* Heritage Badge */}
                        <div className="bg-white p-6 rounded-2xl border border-black/20 text-center shadow-lg">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                            </div>
                            <h4 className="text-xl font-bold text-black mb-2">Tradizione & Innovazione</h4>
                            <p className="text-gray-700 leading-relaxed">Dove l'arte antica incontra le tendenze moderne</p>
                        </div>
                    </div>
                </div>



                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-px bg-black/20"></div>
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <div className="w-8 h-px bg-black"></div>
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <div className="w-16 h-px bg-black/20"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
