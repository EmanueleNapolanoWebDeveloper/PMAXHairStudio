// Componente per gli orari
export default function OpeningHours() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Orari di Apertura</h3>
            </div>
            
            <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-black/70">Martedì - Venerdì</span>
                    <span className="text-red-600 font-semibold">08:30 - 20:00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-black/70">Sabato</span>
                    <span className="text-red-600 font-semibold">08:30 - 21:00</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="font-medium text-black/70">Domenica - Lunedì</span>
                    <span className="text-gray-400">Chiuso</span>
                </div>
            </div>
        </div>
    );
}