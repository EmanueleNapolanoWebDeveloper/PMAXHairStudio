"use client"

import Image from "next/image"
import { motion } from "framer-motion"

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
    <motion.div
      className="group relative h-full overflow-hidden rounded-2xl bg-black border border-red-900/30 hover:border-red-600/60 transition-all duration-500"
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-black/80 z-10 group-hover:from-red-900/40 transition-all duration-500"></div>

      {/* Image Container with parallax effect */}
      <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden bg-gray-900">
        <motion.div className="w-full h-full" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }}>
          <Image
            src={member.image || "/placeholder.svg?height=400&width=400&query=barber"}
            alt={member.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        ></motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-6 sm:p-7 md:p-8 flex flex-col h-full">
        {/* Name - Large and Bold */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {member.name}
          </h3>
        </motion.div>

        {/* Role - Accent color */}
        <motion.div
          className="mb-5 pb-5 border-b border-red-600/40"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-sm sm:text-base font-bold text-red-400 uppercase tracking-widest">{member.role}</p>
        </motion.div>

        {/* Experience Badge */}
        <motion.div
          className="mb-5 inline-flex items-center gap-2 px-4 py-2 bg-red-600/15 border border-red-600/40 rounded-full w-fit"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-semibold text-red-300">{member.experience}</span>
        </motion.div>

        {/* Bio */}
        {member.bio && (
          <motion.p
            className="text-xs sm:text-sm text-gray-400 leading-relaxed italic line-clamp-2 group-hover:text-gray-300 transition-colors duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {member.bio}
          </motion.p>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      ></motion.div>
    </motion.div>
  )
}
