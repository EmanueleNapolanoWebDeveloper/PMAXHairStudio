import { MapPin, Phone, Mail, ExternalLink, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
    { label: 'Chi Siamo', href: '/chi-siamo' },
    { label: 'Servizi', href: '/servizi' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contatti', href: '/contatti' },
]

export default function LinkUtils() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
            <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">
                        Link Utili
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Naviga velocemente nel nostro sito
                    </p>
                </div>

                {/* Quick Links Container */}
                <div className="w-full flex flex-col space-y-4">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 p-2 bg-red-500/20 border border-red-500 rounded-lg">
                                <ArrowRight className="w-6 h-6 text-red-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="flex-1">
                                <span className="text-gray-300 font-medium hover:text-white transition-colors">
                                    {link.label}
                                </span>
                            </div>
                            <div>
                                <ExternalLink className="w-4 h-4 text-red-500" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Work With Us Section */}
                <div className="w-full space-y-4">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Unisciti al Team</h3>
                        <p className="text-gray-400 text-sm">Lavora con noi e cresci professionalmente</p>
                    </div>
                    
                    <Link
                        href="/lavora-con-noi"
                        className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 backdrop-blur-sm border-2 border-red-500/30 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="flex-shrink-0 p-2 bg-white/20 border border-white/30 rounded-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-white mb-1">Carriera</div>
                            <span className="text-white/90 font-medium">
                                Lavora con noi
                            </span>
                        </div>
                        <div>
                            <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Call to Action */}
                <div className="text-center p-6 bg-gray-900 backdrop-blur-sm border-2 border-gray-600 rounded-xl w-full shadow-lg">
                    <p className="text-gray-300 text-sm mb-3">
                        🔗 Esplora tutte le sezioni del nostro sito
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400 text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Navigazione facile e veloce</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}