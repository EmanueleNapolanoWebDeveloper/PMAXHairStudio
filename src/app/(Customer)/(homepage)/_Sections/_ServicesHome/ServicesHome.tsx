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
            img: "/assets/gallery/photos/fotosection4.jpg",
        },
        {
            title: "Consulenza",
            desc: "Un servizio personalizzato per guidarti nella scelta dello stile e del trattamento più adatto a te.",
            img: "/assets/gallery/homepage/fotosection2.jpg",
        },
    ];

    // Placeholder images per hair tattoo - sostituisci con le tue immagini reali
    const hairTattooImages = [
        "/assets/gallery/hair-tattoo/hairtattoo1.webp", // Sostituisci con i tuoi path
        "/assets/gallery/hair-tattoo/hairtattoo2.webp",
        "/assets/gallery/hair-tattoo/hairtattoo3.webp",
        "/assets/gallery/hair-tattoo/hairtattoo4.webp",
    ];

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-black py-24 px-6 overflow-hidden" id="servicehome">

            {/* Header Section */}
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl mb-6">
                        SERVIZI
                    </h1>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="flex-1 max-w-32 h-[2px] bg-gradient-to-r from-transparent to-red-500"></div>
                        <Image
                            src="/assets/logos/iconBaffi.png"
                            alt="forbici"
                            width={80}
                            height={50}
                            className=""
                        />
                        <div className="flex-1 max-w-32 h-[2px] bg-gradient-to-l from-transparent to-red-500"></div>
                    </div>

                    <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-2xl mx-auto">
                        Scopri i servizi esclusivi <span className="text-red-400 font-semibold">P-Max</span> e vivi un&apos;esperienza di stile unica.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-32">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden shadow-xl border border-red-700/30 hover:border-red-500/60 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    fill
                                    src={service.img}
                                    alt={service.title}
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    {service.desc}
                                </p>
                                <Link href="/reservation">
                                    <span className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition-colors duration-300">
                                        Prenota
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hair Tattoo Section */}
                <div className="relative">
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center mb-16">
                        <div className="flex-1 max-w-64 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-red-700"></div>
                        <div className="mx-8 w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
                        <div className="flex-1 max-w-64 h-[1px] bg-gradient-to-l from-transparent via-red-500 to-red-700"></div>
                    </div>

                    {/* Hair Tattoo Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl mb-8 relative">
                            HAIR TATTOO
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 border border-red-500 rotate-45 opacity-30"></div>
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-600 rotate-45"></div>
                        </h2>

                        <div className="max-w-4xl mx-auto">
                            <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                                L&apos;arte del <span className="text-red-400 font-bold">Hair Tattoo</span> incontra la maestria del barbiere.
                            </p>
                            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Disegni personalizzati e pattern unici rasati nei capelli con precisione millimetrica.
                                Un servizio esclusivo che trasforma la tua chioma in una vera opera d&apos;arte,
                                unendo tradizione e innovazione per un look <span className="text-red-400 font-semibold">assolutamente unico</span>.
                            </p>
                        </div>
                    </div>

                    {/* Hair Tattoo Gallery */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                        {hairTattooImages.map((image, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-b from-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl border border-red-700/20 hover:border-red-500/50 transform hover:-translate-y-2 hover:rotate-1 transition-all duration-500"
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    {/* Placeholder per le immagini */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-3 bg-red-600/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-sm font-medium">Hair Tattoo #{index + 1}</p>
                                        </div>
                                    </div>

                                    <Image
                                        fill
                                        src={image}
                                        alt={`Hair Tattoo ${index + 1}`}
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />


                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>


                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hair Tattoo CTA */}
                    <div className="text-center">
                        <Link href="/reservation">
                            <span className="inline-flex items-center gap-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-red-900/30 border border-red-600/50">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span className="text-lg">Prenota il tuo Hair Tattoo</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}