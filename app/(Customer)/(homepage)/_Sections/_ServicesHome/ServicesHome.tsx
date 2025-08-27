import Image from "next/image";
import Link from "next/link";

export default function ServicesHome() {
    const services = [
        {
            title: "Taglio",
            desc: "Tagli moderni e classici per ogni stile.",
            img: "/assets/gallery/taglio/taglio4.webp",
        },
        {
            title: "Barba",
            desc: "Rifinitura e cura della barba con tecniche professionali.",
            img: "/assets/gallery/homepage/barba.webp",
        },
        {
            title: "Styles",
            desc: "Consulenza e look personalizzati per il tuo stile unico.",
            img: "/assets/gallery/homepage/styleServiceHome.webp",
        },
        {
            title: "Consulenza",
            desc: "Un servizio personalizzato per guidarti nella scelta dello stile e del trattamento più adatto a te.",
            img: "/assets/gallery/homepage/fotosection2.jpg",
        },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-b bg-red-900 py-20 px-4">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-7xl md:text-8xl font-black text-white tracking-wider mb-4">
                            SERVIZI
                        </h1>
                    </div>

                    {/* Decorative razor */}
                    <div className="w-full flex items-center justify-center gap-5">
                        {/* Linea sinistra */}
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-black"></div>

                        {/* Spazio per l'icona che aggiungerai */}
                        <div className="w-20 h-24 rounded-full flex items-center justify-center relative">
                            {/* Placeholder - sostituisci con la tua icona */}
                            <Image
                                src={'/assets/logos/iconScissors_white.png'}
                                fill
                                alt="P-Max Logo"
                                className="" />
                        </div>

                        {/* Linea destra */}
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-white"></div>
                    </div>

                    {/* Subtitle */}
                    <div className="max-w-2xl mx-auto">
                        <p className="text-2xl font-bold text-black/80">
                            Scopri i servizi offerti da P-Max
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-red-800/20 hover:border-red-700/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    fill
                                    src={service.img}
                                    alt={service.title}
                                    className="object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>

                                {/* Service Number */}
                                <div className="absolute top-4 left-4 bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-3 hover:text-red-400 transition-colors duration-200">
                                    {service.title}
                                </h3>

                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    {service.desc}
                                </p>

                                {/* Action Link */}
                                <Link href={'/reservation'} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center justify-between text-red-400 hover:text-red-300 transition-colors duration-200">
                                        <span className="font-semibold text-sm flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Prenota
                                        </span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link href="/services">
                        <button className="bg-gradient-to-r from-black to-slate-800 text-white px-10 py-4 rounded-xl text-lg font-bold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-red-800/40 border border-red-700/50">
                            <span className="flex items-center gap-3">
                                Esplora tutti i servizi
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                    </Link>
                </div>

                {/* Bottom decorative element */}
                <div className="flex justify-center mt-16">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-px bg-white"></div>
                        <div className="w-3 h-3 bg-black rounded-full shadow-lg shadow-red-900/50"></div>
                        <div className="w-16 h-px bg-white"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-16 h-px bg-white"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}