"use client"
import Link from "next/link"

export default function Innovation() {
    return (
        <div className="bg-white p-8 rounded-2xl border border-black/20 text-center shadow-xl">
            {/* Icona / Cerchio */}
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
            </div>

            {/* Titolo */}
            <h4 className="text-2xl font-extrabold text-black mb-4 tracking-tight">
                Tradizione & Innovazione
            </h4>

            {/* Testo principale */}
            <p className="text-gray-700 leading-relaxed mb-6">
                Dove l&apos;arte antica incontra le tendenze moderne.
                <br /><br />
                Oggi <span className="font-semibold text-red-600">P-Max</span> si è
                evoluto adottando un sistema digitale avanzato: prenotazioni online,
                gestione smart del calendario e strumenti innovativi per offrire ai clienti
                un’esperienza semplice, veloce e al passo coi tempi.
            </p>

            {/* Vantaggi Login */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 text-left shadow-sm">
                <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                    Accedi al tuo profilo e ottieni vantaggi esclusivi:
                </h5>
                <ul className="space-y-2 text-gray-700 text-base">
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 text-lg">✨</span>
                        <span>Usa la tua <strong>Fidelity Card digitale</strong> e accumula punti</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 text-lg">⭐</span>
                        <span>Lascia recensioni e condividi la tua esperienza con la community</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 text-lg">📅</span>
                        <span>Monitora facilmente le tue <strong>prenotazioni</strong></span>
                    </li>
                </ul>
            </div>

            {/* Info su modalità di accesso */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 text-left shadow-sm">
                <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                    Come accedere
                </h5>
                <p className="text-gray-700 mb-2">
                    Puoi accedere in due modi semplici e sicuri:
                </p>
                <ul className="space-y-2 text-gray-700 text-base">
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 text-lg">🌐</span>
                        <span><strong>Accesso tramite Google</strong>: utilizza il tuo account Google per entrare velocemente senza bisogno di creare nuove credenziali.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 text-lg">📩</span>
                        <span><strong>Email &amp; Password</strong>: registrati con la tua email e scegli una password personale.
                            Dopo la registrazione riceverai un’email di conferma: clicca sul link per attivare il tuo account e iniziare subito ad accedere ai servizi.</span>
                    </li>
                </ul>
            </div>

            {/* Bottone Login */}
            <Link
                href="/login"
                className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-semibold text-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300"
            >
                Accedi Ora
            </Link>
        </div>
    )
}
