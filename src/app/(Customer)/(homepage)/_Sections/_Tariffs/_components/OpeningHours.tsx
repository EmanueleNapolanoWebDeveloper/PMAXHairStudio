export default function OpeningHours() {
    return (
        <div className="bg-card vintage-border p-8 scroll-reveal-left">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-accent">
                <div className="bg-accent p-4 rounded-sm">
                    <svg className="w-8 h-8 text-foreground text-red-900/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-3xl font-serif font-black text-black tracking-wide">ORARI</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-serif font-bold text-lg text-black">Martedì - Venerdì</span>
                    <span className="text-red-600 font-black text-xl">08:30 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-serif font-bold text-lg text-black">Sabato</span>
                    <span className="text-red-600 font-black text-xl">08:30 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                    <span className="font-serif font-bold text-lg text-black">Domenica - Lunedì</span>
                    <span className="text-gray-700 font-bold text-lg line-through">Chiuso</span>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-accent flex justify-center">
                <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
        </div>
    )
}