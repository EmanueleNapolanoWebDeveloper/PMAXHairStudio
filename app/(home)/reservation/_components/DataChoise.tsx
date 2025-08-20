export type DataChoiseType = {
    date: string,
    onChange: (date: string) => void
}

export default function DataChoise({date , onChange}: DataChoiseType) {

    return (
        <div>
            <label className="block text-black font-semibold mb-2">
                Data
            </label>
            <input
                type="date"
                value={date}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg p-2 text-black"
                required
            />
        </div>
    )
}