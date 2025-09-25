'use client'

import Image from "next/image"

interface StaffMember {
    id: string | number
    name: string
    role: string
    image?: string
    experience: string
    specialties: string[]
    bio?: string
}

interface StaffCardProps {
    member: StaffMember
}

export default function StaffCard({ member }: StaffCardProps) {
    return (
        <div
            key={member.id}
            className="group relative bg-card rounded-lg overflow-hidden shadow-lg border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
            {/* Image Container */}
            <div className="relative h-80 overflow-hidden">
                <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover object-[10%_10%] transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Name and Role */}
                    <h3 className="text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                        {member.name}
                    </h3>
                    <p className="text-lg text-gray-300 mb-2 font-medium">{member.role}</p>

                    {/* Experience */}
                    <div className="flex items-center mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-sm text-gray-400">{member.experience} di esperienza</span>
                    </div>

                    {/* Specialties */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <div className="flex flex-wrap gap-1 mb-3">
                            {member.specialties.map((specialty, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                        {member.bio && <p className="text-sm text-gray-300 italic">{member.bio}</p>}
                    </div>
                </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    )
}
