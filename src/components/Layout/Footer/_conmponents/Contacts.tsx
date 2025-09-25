import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

export default function Contacts() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
            <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">
                        Contatti
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Così sai come e dove trovarci
                    </p>
                </div>

                {/* Contact Cards Container */}
                <div className="w-full flex flex-col space-y-4">
                    {/* Indirizzo */}
                    <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border-2 border-white/20 shadow-lg">
                        <div className="flex-shrink-0 p-2 bg-red-500/20 border border-red-500 rounded-lg">
                            <MapPin className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="text-gray-300 flex-1">
                            <div className="font-semibold text-white mb-1">Indirizzo</div>
                            <div className="font-medium">Via Provinciale, 46</div>
                            <div className="text-sm opacity-75">80126, Pianura</div>
                            <div className="text-sm opacity-75">Napoli (Na)</div>
                        </div>
                    </div>

                    {/* Telefono */}
                    <a
                        href="tel:+393881154473"
                        className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border-2 border-white/20 shadow-lg"
                    >
                        <div className="flex-shrink-0 p-2 bg-red-500/20 border border-red-500 rounded-lg">
                            <Phone className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-white mb-1">Telefono</div>
                            <span className="text-gray-300 font-medium">
                                (+39) 388-11-54-473
                            </span>
                        </div>
                        <div>
                            <ExternalLink className="w-4 h-4 text-red-500" />
                        </div>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:pmaxhairstudio@gmail.com"
                        className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border-2 border-white/20 shadow-lg"
                    >
                        <div className="flex-shrink-0 p-2 bg-red-500/20 border border-red-500 rounded-lg">
                            <Mail className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-white mb-1">Email</div>
                            <span className="text-gray-300 font-medium">
                                pmaxhairstudio@gmail.com
                            </span>
                        </div>
                        <div>
                            <ExternalLink className="w-4 h-4 text-red-500" />
                        </div>
                    </a>
                </div>

                {/* Map Section */}
                <div className="w-full space-y-4">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Dove Siamo</h3>
                        <p className="text-gray-400 text-sm">Clicca sulla mappa per aprire le indicazioni</p>
                    </div>

                    <div className="relative">
                        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-white/30">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6035.077445518296!2d14.168596675550608!3d40.86005022853972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0f3e35da50b1%3A0x8a8011844d90b69d!2sVia%20Provinciale%20Napoli%2C%2046%2C%2080126%20Napoli%20NA!5e0!3m2!1sit!2sit!4v1753363511554!5m2!1sit!2sit"
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                title="Mappa P.Max Hair Studio"
                            />
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center p-6 bg-gray-900 backdrop-blur-sm border-2 border-gray-600 rounded-xl w-full shadow-lg">
                    <p className="text-gray-300 text-sm mb-3">
                        🌟 Vieni a trovarci nel nostro salone
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400 text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Siamo qui per te</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}