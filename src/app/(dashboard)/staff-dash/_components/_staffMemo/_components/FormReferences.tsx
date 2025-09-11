'use client'

import { Profile } from "@/src/lib/types"
import React from "react"

type FormReferencesProps = {
    staffs: Profile[]
    reference: string
    handleInputChange: (field: string, value: string) => void
}

function FormReferences({ staffs, reference, handleInputChange }: FormReferencesProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referenza</label>
            <select
                value={reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
                <option value="tutti">Tutti</option>
                {staffs?.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name} {s.surname}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.memo(FormReferences)
