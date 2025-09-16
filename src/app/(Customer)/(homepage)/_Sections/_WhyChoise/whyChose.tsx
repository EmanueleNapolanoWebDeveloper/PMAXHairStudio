import Image from "next/image"
import Link from "next/link"

const choises = [
    {
        title: "Esperienza Professionale",
        image: "/assets/gallery/gallery/foto17.webp",
    },
    {
        title: "Qualità Premium",
        image: "/assets/backgrounds/prodottiPremium.webp",
    },
    {
        title: "Servizio Personalizzato",
        image: "/assets/backgrounds/servizioPersonalizzato.webp",
    },
    {
        title: "Passione Autentica",
        image: "/assets/gallery/photos/fotosection1.jpg",
    },
]

export default function WhyChoose() {
    return (
        <section className="min-h-[30vh] w-full bg-black flex flex-col items-center justify-around gap-8 p-6 relative overflow-hidden">

            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%)
            `,
                        backgroundSize: "100px 100px",
                    }}
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center pb-14 relative z-10">
                {/* Titolo */}
                <div className="relative">
                    <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-[0.2em] drop-shadow-2xl">
                        Perchè Sceglierci?
                    </h2>
                </div>

                {/* Divider con forbici */}
                <div className="relative mt-10 flex items-center gap-8 w-full max-w-2xl mx-auto">
                    {/* Linea sinistra */}
                    <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent to-red-600"></div>

                    {/* Icona forbici */}
                    <Image
                        src="/assets/logos/iconScissors_white.png"
                        alt="forbici"
                        width={50}
                        height={40}
                        className="z-10 drop-shadow-xl filter brightness-0 invert rotate-[55deg] transition-transform duration-500 hover:rotate-[75deg] hover:scale-110"
                    />

                    {/* Linea destra */}
                    <div className="flex-1 h-[1.5px] bg-gradient-to-r from-red-600 to-transparent"></div>
                </div>
            </div>


            <div className="flex flex-wrap gap-5 w-full items-center justify-around">
                {choises.map((choise, index) => (
                    <div key={index} className="flex flex-col items-center justify-around gap-6 relative z-10 group">
                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm"></div>

                            <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] relative shadow-2xl hover:scale-105 transition-all duration-500 rounded-full border-4 border-red-600 group-hover:border-white bg-black overflow-hidden">
                                <Image
                                    src={choise.image || "/placeholder.svg"}
                                    alt={choise.title}
                                    fill
                                    className="object-cover rounded-full transition-all duration-500 opacity-70 group-hover:opacity-90"
                                />

                                <div className="absolute top-3 left-3 w-6 h-6 border-l-3 border-t-3 border-white opacity-60"></div>
                                <div className="absolute top-3 right-3 w-6 h-6 border-r-3 border-t-3 border-white opacity-60"></div>
                                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-3 border-b-3 border-white opacity-60"></div>
                                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-3 border-b-3 border-white opacity-60"></div>

                                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"></div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <p className="text-white text-[1.5rem] font-semibold tracking-wide text-center drop-shadow-lg group-hover:text-red-400 transition-colors duration-300 relative">
                                {choise.title}
                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500"></span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>


            <div className="text-center mt-20">
                <div className="bg-white p-10 rounded-3xl border border-black/10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                    {/* Decorazione di sfondo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

                    {/* Titolo */}
                    <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight">
                        Vieni a Trovarci
                    </h3>

                    {/* Sottotitolo */}
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                        Scopri la differenza di un taglio realizzato con <span className="text-red-600 font-semibold">passione</span> e <span className="text-red-600 font-semibold">maestria</span>.
                    </p>

                    {/* Bottone */}
                    <Link href="/reservation">
                        <button
                            type="button"
                            className="relative inline-block px-10 py-4 rounded-full font-semibold text-lg text-white bg-red-600 shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-2xl hover:scale-105"
                        >
                            Prenota Ora
                        </button>
                    </Link>
                </div>
            </div>

        </section>
    )
}
