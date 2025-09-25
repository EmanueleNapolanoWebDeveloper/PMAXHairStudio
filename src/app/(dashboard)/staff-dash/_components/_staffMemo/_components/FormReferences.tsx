import React from 'react'
import { Profile, StaffNotesForm } from '@/src/lib/types'

type FormReferencesProps = {
    staffs: Profile[]
    reference: StaffNotesForm['reference']
    handleInputChange: (field: keyof StaffNotesForm, value: string | number) => void
}

export default function FormReferences({ staffs, reference, handleInputChange }: FormReferencesProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referenza</label>
            <select value={reference} onChange={(e) => handleInputChange('reference', e.target.value)} className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black">
                <option value="tutti">Tutti</option>
                {staffs?.map(s => <option key={s.id} value={s.id}>{s.name} {s.surname}</option>)}
            </select>
        </div>
    )
}
