
import { X , Save} from 'lucide-react';
import FormReferences from './FormReferences';
import { Profile } from '@/src/lib/types';

type FormAddNotesProps = {
    formData: any;
    handleInputChange: (field: string, value: any) => void;
    resetForm: () => void;
    editingNote: any;
    handleSubmit: () => void;
    staffs: Profile[]
}

export default function FormAddNotes({ formData, handleInputChange, resetForm, editingNote, handleSubmit, staffs } : FormAddNotesProps) {
    return (
        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {editingNote ? 'Modifica Nota' : 'Nuova Nota'}
                </h2>
                <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Titolo *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                            placeholder="Inserisci il titolo della nota"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contenuto *
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                        placeholder="Descrivi i dettagli della nota..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Orario
                        </label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => handleInputChange('time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                        />
                    </div>
                    <FormReferences staffs={staffs} reference={formData.reference} handleInputChange={handleInputChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priorità
                    </label>
                    <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                    >
                        <option value="bassa">Normale</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {editingNote ? 'Aggiorna' : 'Salva'}
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </div>

    )
}