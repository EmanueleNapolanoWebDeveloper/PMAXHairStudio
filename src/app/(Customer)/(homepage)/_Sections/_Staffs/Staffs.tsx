import StaffCard from "./_components/CardStaff"
import Image from "next/image"

interface StaffMember {
    id: number
    name: string
    role: string
    image: string
    experience: string
    specialties: string[]
    bio: string
}

const staffMembers: StaffMember[] = [
    {
        id: 1,
        name: "Massimo Polverino",
        role: "Master Barber",
        image: "/assets/gallery/photos/fotoMassimoAI.png",
        experience: "15+ anni",
        specialties: ["Taglio Classico", "Barba", "Baffi"],
        bio: "Maestro nell'arte della rasatura tradizionale",
    },
    {
        id: 2,
        name: "Antonio Rossi",
        role: "Senior Barber",
        image: "/professional-barber-with-beard-and-styled-hair.png",
        experience: "10+ anni",
        specialties: ["Fade", "Styling", "Trattamenti"],
        bio: "Esperto in tagli moderni e styling contemporaneo",
    },
    {
        id: 3,
        name: "Giuseppe Bianchi",
        role: "Barber Specialist",
        image: "/young-professional-barber-with-modern-haircut.png",
        experience: "8+ anni",
        specialties: ["Pompadour", "Undercut", "Beard Care"],
        bio: "Specialista in look vintage e cura della barba",
    },
]

export default function VintageStaffs() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-black via-red-900 to-red-950 py-20 px-4" id="staffHome">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl text-white tracking-wider mb-4">
                            STAFF
                        </h1>
                        <div className="w-24 h-1 bg-red-800 mx-auto rounded-full shadow-lg shadow-red-900/50"></div>
                    </div>

                    {/* Decorative razor */}
                    <div className="w-full flex items-center justify-center gap-5">
                        {/* Linea sinistra */}
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-white"></div>

                        {/* Spazio per l'icona che aggiungerai */}
                        <div className="w-20 h-24 rounded-full flex items-center justify-center relative">
                            {/* Placeholder - sostituisci con la tua icona */}
                            <Image
                                src={'/assets/logos/rasoio.png'}
                                fill
                                alt="P-Max Logo"
                                className="rotate-[-75deg]" />
                        </div>

                        {/* Linea destra */}
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-white"></div>
                    </div>


                    {/* Subtitle */}
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl text-gray-300 leading-relaxed mb-2">
                            <span className="italic">Passione, esperienza e attenzione ai dettagli:</span>
                        </p>
                        <p className="text-2xl font-bold text-red-400">
                            scopri chi si prenderà cura di te.
                        </p>
                    </div>
                </div>

                {/* Staff Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
                    {staffMembers.map((member) => (
                        <div key={member.id} className="transform hover:scale-105 transition-transform duration-300">
                            <StaffCard member={member} />
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    )
}