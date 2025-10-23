export default function LegendTarrif() {
    return (
        <div className="md:col-span-2">
            {/* Blocco Lunghezza Taglio Capelli */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Legenda Lunghezza Taglio Capelli</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Capelli Corti */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/hair-short.jpg"
                                alt="Capelli corti"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Capelli Corti</h3>
                        <p className="text-sm text-gray-600">Lunghezza fino a 5 cm. Tagli classici come buzz cut, crew cut, o fade.</p>
                    </div>

                    {/* Capelli Medi */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/hair-medium.jpg"
                                alt="Capelli medi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Capelli Medi</h3>
                        <p className="text-sm text-gray-600">Lunghezza da 5 a 15 cm. Stili versatili che richiedono più tempo di lavorazione.</p>
                    </div>

                    {/* Capelli Lunghi */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/hair-long.jpg"
                                alt="Capelli lunghi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Capelli Lunghi</h3>
                        <p className="text-sm text-gray-600">Lunghezza oltre 15 cm. Richiedono maggiore attenzione e tempo per il taglio.</p>
                    </div>
                </div>
            </div>

            {/* Blocco Lunghezza Barba */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Legenda Lunghezza Barba</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Barba Rasata */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/beard-shaved.jpg"
                                alt="Barba rasata"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Rasata</h3>
                        <p className="text-sm text-gray-600">Rasatura completa o effetto "ombra delle 5".</p>
                    </div>

                    {/* Barba Corta */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/beard-short.jpg"
                                alt="Barba corta"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Barba Corta</h3>
                        <p className="text-sm text-gray-600">Lunghezza 1-2 cm. Ben definita e curata.</p>
                    </div>

                    {/* Barba Media */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/beard-medium.jpg"
                                alt="Barba media"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Barba Media</h3>
                        <p className="text-sm text-gray-600">Lunghezza 2-5 cm. Richiede modellatura e rifinitura.</p>
                    </div>

                    {/* Barba Lunga */}
                    <div className="flex flex-col">
                        <div className="h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                                src="/assets/beard-long.jpg"
                                alt="Barba lunga"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Barba Lunga</h3>
                        <p className="text-sm text-gray-600">Oltre 5 cm. Necessita di cura approfondita e styling.</p>
                    </div>
                </div>
            </div>

            {/* Nota informativa */}
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-gray-700">
                    <span className="font-bold">Nota:</span> Le tariffe variano in base alla lunghezza e alla complessità del servizio.
                    Consulta il listino prezzi per maggiori dettagli.
                </p>
            </div>
        </div>
    )
}