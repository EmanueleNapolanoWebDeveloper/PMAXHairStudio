import Link from "next/link";

export default function ServicesHome() {
    const services = [
        {
            title: "Taglio",
            desc: "Tagli moderni e classici per ogni stile.",
            img: "/images/taglio.jpg",
        },
        {
            title: "Barba",
            desc: "Rifinitura e cura della barba con tecniche professionali.",
            img: "/images/barba.jpg",
        },
        {
            title: "Styles",
            desc: "Consulenza e look personalizzati per il tuo stile unico.",
            img: "/images/styles.jpg",
        },
        {
            title: "Trimmer",
            desc: "Precisione e dettagli perfetti con strumenti di ultima generazione.",
            img: "/images/trimmer.jpg",
        },
    ];

    return (
        <section className="min-h-screen w-full py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            <div className="col-span-2 flex flex-col gap-2 items-center justify-center lg:col-span-4">
                <h2 className="text-center text-[2.5rem] font-semibold">SERVIZI</h2>

                {/* decorazione top */}
                <div className="flex justify-center mb-6">
                    <div className="flex gap-1">
                        <span className="text-yellow-500 text-xl">♦</span>
                        <span className="text-yellow-500 text-xl">♦</span>
                        <span className="text-yellow-500 text-xl">♦</span>
                    </div>
                </div>
            </div>

            {/* Cards */}
            {services.map((service, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md overflow-hidden 
                               transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                >
                    <div className="h-48 w-full overflow-hidden">
                        <img
                            src={service.img}
                            alt={service.title}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.desc}</p>
                    </div>
                </div>
            ))}

            {/* CTA */}
            <div className="col-span-2 lg:col-span-4 flex flex-col gap-2 items-center justify-center mt-8">
                <Link href="/services">
                    <button
                        type="button"
                        className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-lg 
                                   hover:bg-white hover:text-red-600 transition-colors duration-300 ease-in-out"
                    >
                        Scopri di più
                    </button>
                </Link>
            </div>
        </section>
    );
}
