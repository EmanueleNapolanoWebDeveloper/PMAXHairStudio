// Componente per le informazioni
export default function AdditionalInfo() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Informazioni</h3>
            </div>
            
            <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Prenotazione consigliata</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Prezzi soggetti a variazioni</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Pagamento: Contanti, Carta</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Sconto fedeltà del 10% dopo 10 servizi</span>
                </div>
            </div>
        </div>
    );
}