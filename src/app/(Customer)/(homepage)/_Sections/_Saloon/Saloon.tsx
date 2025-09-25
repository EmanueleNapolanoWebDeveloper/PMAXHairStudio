import Image from "next/image"

const images: GalleryImage[] = [
    {
        title: "Saloon",
        path: "/assets/saloon/pmaxputeca.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon1.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon2.webp",
    },
    {
        title: "Saloon",
        path: "/assets/saloon/saloon3.webp",
    },
]

type GalleryImage = {
    title: string
    path: string
}

export default function Saloon() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-around bg-white px-4 py-3" id="saloonHome">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center pb-12">
                <h2 className="text-center text-4xl md:text-6xl font-bold text-black uppercase mb-4 tracking-wide">
                    P-MAX <span className="text-red-600">Saloon</span>
                </h2>

                {/* Decorative razor */}
                <div className="w-full flex items-center justify-center gap-5">
                    {/* Linea sinistra */}
                    <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-red-600"></div>

                    {/* Spazio per l'icona che aggiungerai */}
                    <div className="w-15 h-24 rounded-full flex items-center justify-center relative">
                        {/* Placeholder - sostituisci con la tua icona */}
                        <Image
                            src={'/assets/logos/iconGira.png'}
                            fill
                            alt="P-Max Logo"
                            className="" />
                    </div>

                    {/* Linea destra */}
                    <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-red-600"></div>
                </div>

            </div>

            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto mb-16">
                <p className="text-lg md:text-xl font-light text-center text-gray-800 leading-relaxed">
                    Ogni dettaglio del nostro salone racconta chi siamo. <br />
                    Dalla poltrona al rasoio, dall&apos;arredamento urbano al tocco old school,
                    <span className="text-red-600 font-medium">
                        {" "}
                        ogni angolo è pensato per farti sentire a casa, ma con stile.
                    </span>
                </p>
            </div>

            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="group relative w-full h-80 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <Image
                                src={image.path || "/placeholder.svg"}
                                alt={image.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}
