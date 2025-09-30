export default function AdditionalInfo() {
    return (
        <div className="bg-card vintage-border p-8 scroll-reveal-right">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-accent">
                <div className="bg-accent p-4 rounded-sm">
                    <svg className="w-8 h-8 text-foreground text-red-900/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-3xl font-serif font-black text-black tracking-wide">INFORMAZIONI</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                    <span className="text-accent text-2xl font-black mt-1 text-red-800">✦</span>
                    <span className="text-gray-700 font-medium leading-relaxed">Prenotazione consigliata</span>
                </div>
                <div className="flex items-start gap-3 group">
                    <span className="text-accent text-2xl font-black mt-1 text-red-800">✦</span>
                    <span className="text-gray-700 font-medium leading-relaxed">Prezzi soggetti a variazioni</span>
                </div>
                <div className="flex items-start gap-3 group">
                    <span className="text-accent text-2xl font-black mt-1 text-red-800">✦</span>
                    <span className="text-gray-700 font-medium leading-relaxed">Pagamento: Contanti, Carta</span>
                </div>
                <div className="flex items-start gap-3 group">
                    <span className="text-accent text-2xl font-black mt-1 text-red-800">✦</span>
                    <span className="text-gray-700 font-medium leading-relaxed">Sconto fedeltà del 10% dopo 10 servizi</span>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-accent flex justify-center">
                <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
        </div>
    )
}