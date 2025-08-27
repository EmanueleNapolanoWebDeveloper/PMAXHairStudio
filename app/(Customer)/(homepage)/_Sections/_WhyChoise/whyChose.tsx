import Image from "next/image"

const choises = [
    {
        title: "Esperienza Professionale",
        image: "/professional-barber-tools.png",
    },
    {
        title: "Qualità Premium",
        image: "/luxury-barbershop-interior.png",
    },
    {
        title: "Servizio Personalizzato",
        image: "/custom-barber-service.png",
    },
    {
        title: "Tradizione Italiana",
        image: "/traditional-italian-barbershop.png",
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

            <div className="w-full flex flex-col items-center justify-center pb-8 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 text-[4rem] font-bold text-red-600 blur-sm opacity-30 uppercase tracking-wider">
                        Perchè Sceglierci?
                    </div>
                    <h2 className="relative text-center text-[4rem] font-bold text-white uppercase tracking-wider drop-shadow-2xl">
                        Perchè Sceglierci?
                    </h2>
                </div>

                <div className="relative mt-6">
                    <div className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-40 animate-pulse"></div>
                    <Image
                        src="/assets/logos/iconScissors_white.png"
                        alt="forbici"
                        width={50}
                        height={24}
                        className="relative z-10 drop-shadow-lg filter brightness-0 invert rotate-[65deg]"
                    />
                </div>
            </div>
            <div className="flex w-full items-center justify-around">
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


            <div className="text-center mt-16">
                <div className="bg-white p-8 rounded-2xl border border-black/20 max-w-2xl mx-auto shadow-lg">
                    <h3 className="text-2xl font-bold text-black mb-4">Vieni a Trovarci</h3>
                    <p className="text-gray-700 mb-6 text-pretty">
                        Scopri la differenza di un taglio fatto con passione e maestria
                    </p>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                        Prenota Ora
                    </button>
                </div>
            </div>
        </section>
    )
}
