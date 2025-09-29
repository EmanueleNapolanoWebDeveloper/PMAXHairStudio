'use client'

import React, { useState } from 'react'
import { Users, UserCheck, Edit3 } from 'lucide-react'
import { StaffNotes } from '@/src/lib/types'
import NoteSlot from './NoteSlot'

type NotesListProps = {
  memos: StaffNotes[]
  isLoading: boolean
  userID: string
  filterDate?: string
  handleEdit: (note: StaffNotes) => void
  handleDelete: (id: number) => void
}

const NotesList = ({ memos, isLoading, userID, filterDate, handleEdit, handleDelete }: NotesListProps) => {
  const [activeTab, setActiveTab] = useState<'tutti' | 'per-me'>('tutti')

  const filteredNotes = memos?.filter(note => {
    const matchesDate = filterDate || note.note_date === filterDate
    if (activeTab === 'tutti') return matchesDate && note.reference === 'tutti'
    return matchesDate && note.reference === userID
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  console.log('filteredNotes', filteredNotes);
  

  const allNotesCount = memos?.filter(n => (filterDate || n.note_date === filterDate) && n.reference === 'tutti').length
  const myNotesCount = memos?.filter(n => (filterDate || n.note_date === filterDate) && n.reference === userID).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'border-l-red-500 bg-red-50'
      case 'media': return 'border-l-orange-500 bg-yellow-50'
      case 'bassa': return 'border-l-yellow-500 bg-yellow-50'
      default: return 'border-l-blue-500 bg-blue-50'
    }
  }

  return (
    <>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('tutti')} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'tutti' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Users className="w-4 h-4" /> Tutti ({allNotesCount})
            </button>
            <button onClick={() => setActiveTab('per-me')} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'per-me' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <UserCheck className="w-4 h-4" /> Per Me ({myNotesCount})
            </button>
          </nav>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Caricamento note...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Edit3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">{activeTab === 'per-me' ? 'Nessuna nota per te' : 'Nessuna nota trovata'}</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div key={note.title} className={`border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${getPriorityColor(note.priority)}`}>
              <NoteSlot note={note} handleEdit={handleEdit} handleDelete={handleDelete} formatDate={date => new Date(date).toLocaleDateString('it-IT')} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default NotesList
