"use client"

import { Calendar, User, Phone, Mail, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

type UserProfileProps = {
  profile: {
    id?: string
    name?: string
    surname?: string
    email?: string
    phone?: string
    role?: "customer" | "employee" | "admin"
    reg_complete?: boolean
    is_Admin?: boolean
    created_at?: string
  }
}

const UserProfile = ({ profile }: UserProfileProps) => {
  const getRoleColor = (role: UserProfileProps["profile"]["role"]) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30"
      case "employee":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30"
      case "customer":
        return "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-800/50 text-gray-300 border-gray-700"
    }
  }

  const getRoleText = (role: UserProfileProps["profile"]["role"]) => {
    switch (role) {
      case "customer":
        return "Cliente"
      case "employee":
        return "Dipendente"
      case "admin":
        return "Amministratore"
      default:
        return role
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-black via-red-950/30 to-black rounded-2xl shadow-2xl p-8 border border-red-900/30 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-rose-600/5 animate-pulse" />

      <div className="relative z-10">
        {/* Header with avatar */}
        <div className="flex items-center gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-rose-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent animate-pulse" />
            <User className="w-12 h-12 text-white relative z-10" />
          </motion.div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-rose-300 bg-clip-text text-transparent mb-3">
              {profile.name} {profile.surname}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm ${getRoleColor(profile.role)}`}
              >
                {getRoleText(profile.role)}
              </span>
              {!profile.reg_complete && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm"
                >
                  Profilo incompleto
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950/30 to-black/30 rounded-xl border border-red-900/20 backdrop-blur-sm hover:border-red-700/40 transition-all"
          >
            <div className="p-3 bg-gradient-to-br from-red-600/20 to-rose-600/20 rounded-lg shadow-lg">
              <Mail className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-400 mb-1">Email</p>
              <p className="text-white font-semibold">{profile.email}</p>
            </div>
          </motion.div>

          {profile.phone && (
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950/30 to-black/30 rounded-xl border border-red-900/20 backdrop-blur-sm hover:border-red-700/40 transition-all"
            >
              <div className="p-3 bg-gradient-to-br from-red-600/20 to-rose-600/20 rounded-lg shadow-lg">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-400 mb-1">Telefono</p>
                <p className="text-white font-semibold">{profile.phone}</p>
              </div>
            </motion.div>
          )}

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950/30 to-black/30 rounded-xl border border-red-900/20 backdrop-blur-sm hover:border-red-700/40 transition-all"
          >
            <div className="p-3 bg-gradient-to-br from-red-600/20 to-rose-600/20 rounded-lg shadow-lg">
              <Calendar className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-400 mb-1">Membro dal</p>
              <p className="text-white font-semibold">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Data non disponibile"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Warning for incomplete profile */}
        {!profile.reg_complete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-5 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-300 mb-1">Completa il tuo profilo</p>
                <p className="text-sm text-amber-200/80">
                  Aggiungi le informazioni mancanti per accedere a tutte le funzionalità disponibili.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default UserProfile
