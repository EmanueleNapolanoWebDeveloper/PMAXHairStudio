export default function WelcomeStaffSection() {
    return (
        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Buongiorno, Antonio! 👋</h3>
                    <p className="text-red-100">Oggi hai 6 appuntamenti programmati. Pronto per una grande giornata?</p>
                </div>
                <div className="hidden sm:block">
                    <div className="text-right">
                        <p className="text-sm text-red-200">Prossimo cliente</p>
                        <p className="text-lg font-semibold">Luigi Bianchi</p>
                        <p className="text-sm text-red-200">alle 10:00</p>
                    </div>
                </div>
            </div>
        </div>

    )
}