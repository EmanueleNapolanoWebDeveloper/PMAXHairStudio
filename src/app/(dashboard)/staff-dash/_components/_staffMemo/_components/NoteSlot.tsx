import { StaffNotes } from '@/src/lib/types'
import { Edit3, Trash2, User, Calendar, Clock } from 'lucide-react'

type NoteSlotProps = {
    note: StaffNotes
    handleEdit: (note: StaffNotes) => void
    handleDelete: (id: number) => void
    formatDate: (date: string) => string
}

export default function NoteSlot({ note, handleEdit, handleDelete, formatDate }: NoteSlotProps) {
    return (
        <>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800 text-lg">{note.title}</h3>
                    {note.priority === 'alta' && <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">URGENTE</span>}
                    {note.priority === 'media' && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">IMPORTANTE</span>}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(note)} className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-md transition-colors" title="Modifica nota">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(note.id!)} className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-md transition-colors" title="Elimina nota">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{note.content}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{note.author?.name} {note.author?.surname}</span>
                </div>
                {note.note_date && (
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(note.note_date)}</span>
                    </div>
                )}
                {note.time && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{note.time}</span>
                    </div>
                )}
                {note.priority && (
                    <div className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">{note.priority}</div>
                )}
            </div>
        </>
    )
}
