export default function SummaryReservation() {
    return (
        <div className="bg-gray-100 rounded-lg p-4 text-black">
            <h3 className="font-bold mb-2">Riepilogo</h3>
            <p>
                <strong>Barbiere:</strong> {barber || 'Nessuno'}
            </p>
            <p>
                <strong>Servizi:</strong> {services.length > 0 ? services.join(', ') : 'Nessuno'}
            </p>
            <p>
                <strong>Data:</strong> {date || 'Non selezionata'}
            </p>
            <p>
                <strong>Orario:</strong> {time || 'Non selezionato'}
            </p>
        </div>
    )
}