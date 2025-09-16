import Image from "next/image"
import QuoteCard from "./_components/QuoteCard"
import Innovation from "./_components/Innovation"
export default function AboutUs() {
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
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h1 className="text-5xl md:text-7xl font-black text-black mb-4 text-balance tracking-tight">
                            CHI <span className="text-red-600">SIAMO</span>
                        </h1>
                        {/* Decorative razor */}
                        <div className="w-full flex items-center justify-center gap-5">
                            {/* Linea sinistra */}
                            <div className="flex-1 max-w-64 h-px bg-gradient-to-r from-transparent to-red-600"></div>

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
                            <div className="flex-1 max-w-64 h-px bg-gradient-to-l from-transparent to-red-600"></div>
                        </div>          </div>
                    <p className="text-xl text-gray-700 mt-6 max-w-2xl mx-auto text-pretty">
                        Una storia di passione, tradizione e maestria che si tramanda da generazione in generazione.
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
                                    <span className="text-red-600 font-bold">Dal 2016</span>, Massimo Polverino porta avanti con dedizione e talento
                                    l’arte del barbiere, un mestiere che affonda le sue radici nella tradizione di famiglia. Ciò che per molti è solo
                                    un lavoro, per noi è una vera e propria eredità: passione, cura del dettaglio e rispetto per un’arte che si tramanda
                                    di generazione in generazione.
                                </p>

                                <p className="text-lg text-black leading-relaxed text-pretty">
                                    Ogni cliente che varca la soglia del nostro salone non trova soltanto un taglio di capelli o una rasatura,
                                    ma un’esperienza costruita su misura. Coniughiamo <span className="text-red-600 font-semibold">tecniche tradizionali</span>
                                    e nuove tendenze, perché crediamo che lo stile migliore nasca dall’incontro tra radici e innovazione.
                                </p>

                                <p className="text-lg text-black leading-relaxed text-pretty">
                                    Da oltre un decennio, il nome <span className="text-red-600 font-semibold">Polverino</span> rappresenta
                                    affidabilità, eleganza e passione. Non sei solo un cliente: entri a far parte di una famiglia che da sempre
                                    mette al centro l’arte, la professionalità e il piacere di farti sentire al meglio.
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
                                { number: "20+", label: "Anni di Esperienza" },
                                { number: "∞", label: "Passione" },
                                { number: "100%", label: "Soddisfazione" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-white rounded-2xl border border-black/20 hover:border-red-600 transition-all duration-300 hover:shadow-md group flex flex-col gap-2 items-center justify-center"
                                >
                                    <div className="text-3xl font-bold text-red-600 mb-2 group-hover:text-black transition-colors duration-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-600 uppercase tracking-wider font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

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
