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
        <section className="min-h-screen w-full gap-6 bg-black/70">
            <div className="w-full py-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white/80 mb-4">
                        SERVIZI
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="flex gap-1">
                            <span className="text-red-500 text-2xl">♦</span>
                            <span className="text-red-500 text-2xl">♦</span>
                            <span className="text-red-500 text-2xl">♦</span>
                        </div>
                    </div>
                    <p className="text-[3rem] text-white/70 max-w-2xl mx-auto fontSubtitlesHome">
                        Scopri i servizi offerti da P-Max
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 
                                       rounded-3xl overflow-hidden cursor-pointer
                                       transform transition-all duration-700 ease-out
                                       hover:-translate-y-4 hover:rotate-1 hover:scale-105
                                       shadow-2xl shadow-red-900/30 hover:shadow-red-600/50
                                       border border-red-800/30 hover:border-red-600/60
                                       before:absolute before:inset-0 before:bg-gradient-to-t 
                                       before:from-red-600/20 before:via-transparent before:to-red-400/10
                                       before:opacity-0 before:transition-opacity before:duration-500
                                       hover:before:opacity-100"
                        >
                            {/* Effetti luminosi */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br 
                                            from-red-500/30 via-orange-500/20 to-red-700/30 
                                            rounded-full blur-3xl opacity-0 group-hover:opacity-100
                                            group-active:opacity-100 group-active:animate-pulse
                                            transition-all duration-1000 group-hover:animate-pulse"></div>
                            
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr 
                                            from-red-400/20 via-red-600/15 to-transparent 
                                            rounded-full blur-2xl opacity-0 group-hover:opacity-100
                                            group-active:opacity-100 group-active:scale-110
                                            transition-all duration-1200 delay-200"></div>

                            {/* Container immagine */}
                            <div className="relative h-64 w-full overflow-hidden">
                                {/* Overlay gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-red-800/20 to-transparent z-10"></div>
                                
                                <Image
                                fill
                                    src={service.img}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-all duration-700 ease-out
                                               group-hover:scale-110 filter sepia-[0.3] contrast-110
                                               group-hover:sepia-[0.5] group-hover:hue-rotate-[350deg]"
                                />
                                
                                {/* Icona servizio */}
                                <div className="absolute top-4 right-4 bg-red-600/80 backdrop-blur-sm 
                                                rounded-full p-3 transform scale-0 group-hover:scale-100 
                                                group-active:scale-110 group-active:bg-red-500/30
                                                transition-transform duration-500 delay-300 z-20">
                                    <svg className="w-5 h-5 text-white group-active:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                              d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                
                                {/* Badge numero */}
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 
                                                text-white rounded-full w-10 h-10 flex items-center justify-center
                                                font-bold text-sm transform -translate-x-12 opacity-0 
                                                group-hover:translate-x-0 group-hover:opacity-100 
                                                group-active:translate-x-0 group-active:opacity-100
                                                group-active:scale-110 group-active:rotate-12
                                                transition-all duration-500 delay-100 z-20">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                
                                {/* Linee decorative animate */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                                                from-transparent via-red-500 to-transparent
                                                transform scaleX-0 group-hover:scaleX-100 
                                                group-active:scaleX-100 group-active:h-2
                                                transition-all duration-700 delay-400 z-20"></div>
                            </div>
                            
                            {/* Contenuto card */}
                            <div className="relative p-6 bg-gradient-to-b from-gray-900/95 to-red-950/95">
                                {/* Decorazione top */}
                                <div className="absolute -top-2 left-6 right-6 h-0.5 bg-gradient-to-r 
                                                from-red-600 via-red-500 to-red-600 transform scaleX-0 
                                                group-hover:scaleX-100 transition-transform duration-500 delay-200"></div>
                                
                                <div className="pt-2">
                                    <h3 className="text-2xl font-bold text-white mb-3 
                                                   transform transition-all duration-300 
                                                   group-hover:text-red-400 group-hover:scale-105
                                                   group-active:text-red-300 group-active:scale-110
                                                   relative">
                                        {service.title}
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500
                                                        group-hover:w-full group-active:w-full group-active:h-1
                                                        transition-all duration-500 delay-300"></div>
                                    </h3>
                                    
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4
                                                  transform transition-all duration-500 delay-75
                                                  group-hover:text-gray-200">
                                        {service.desc}
                                    </p>
                                    
                                    {/* Action area */}
                                    <Link href={'/reservation'} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center justify-between opacity-0 
                                                    group-hover:opacity-100 group-active:opacity-100
                                                    transform translate-y-4 
                                                    group-hover:translate-y-0 group-active:translate-y-0 
                                                    group-active:scale-105
                                                    transition-all duration-500 delay-400">
                                        <span className="text-red-400 font-semibold text-sm flex items-center gap-1
                                                         group-active:text-red-300">
                                            <svg className="w-4 h-4 group-active:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Prenota
                                        </span>
                                        
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse 
                                                            group-active:bg-red-300 group-active:animate-bounce"></div>
                                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-75
                                                            group-active:bg-red-400 group-active:animate-bounce group-active:delay-100"></div>
                                            <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse delay-150
                                                            group-active:bg-red-500 group-active:animate-bounce group-active:delay-200"></div>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                                
                                {/* Pattern decorativo bottom */}
                                <div className="absolute bottom-2 left-6 right-6 flex justify-center gap-2 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
                                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                                    <div className="w-8 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Bordo luminoso animato */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
                                            group-hover:border-red-500/50 group-active:border-red-400/80
                                            transition-all duration-500
                                            group-hover:shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]
                                            group-active:shadow-[inset_0_0_30px_rgba(239,68,68,0.2)]"></div>
                            
                            {/* Particelle animate */}
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full
                                            opacity-0 group-hover:opacity-100 group-active:opacity-100 
                                            transform -translate-x-1/2 -translate-y-1/2
                                            group-hover:animate-ping group-active:animate-bounce
                                            group-active:w-2 group-active:h-2 group-active:bg-red-300
                                            transition-all duration-300 delay-600"></div>
                        </div>
                    ))}
                </div>
                
                {/* CTA Section */}
                <div className="text-center mt-16">
                    <Link href="/services">
                        <button className="group relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 
                                         text-white px-12 py-5 rounded-2xl text-lg font-bold
                                         transform transition-all duration-300 hover:-translate-y-2
                                         hover:shadow-2xl hover:shadow-red-600/40 hover:scale-105
                                         active:scale-95 overflow-hidden
                                         before:absolute before:inset-0 before:bg-gradient-to-r 
                                         before:from-red-500 before:to-red-800 before:opacity-0 
                                         before:transition-opacity before:duration-300
                                         hover:before:opacity-100">
                            <span className="relative z-10 flex items-center gap-3">
                                <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Esplora tutti i servizi
                                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            
                            {/* Effetto shimmer */}
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r 
                                            from-transparent via-white/20 to-transparent skew-x-12
                                            group-hover:left-full transition-all duration-700"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}