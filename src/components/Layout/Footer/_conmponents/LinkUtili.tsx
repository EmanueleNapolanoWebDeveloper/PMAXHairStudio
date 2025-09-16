import { MapPin, Phone, Mail, ExternalLink, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Servizi', href: '#serviceHome' },
    { label: 'Listino Prezzi', href: '#tariffHome' },
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
            </div>
        </div>
    )
}