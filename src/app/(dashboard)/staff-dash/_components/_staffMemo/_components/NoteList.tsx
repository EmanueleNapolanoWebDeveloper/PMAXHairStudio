'use client'

import React, { useState } from 'react'
import { Edit3, Users, UserCheck } from 'lucide-react'
import { StaffNotes } from '@/src/lib/types'
import NoteSlot from './NoteSlot'
import { User } from '@supabase/supabase-js'

type NotesListProps = {
    memos: StaffNotes[]
    isLoading: boolean
    user: User
    filterDate?: string
    reference?: string
    handleEdit: (note: StaffNotes) => void
    handleDelete: (id: string | number) => void
}

const NotesList = ({
    memos,
    isLoading,
    user,
    filterDate,
    reference = 'tutti',
    handleEdit,
    handleDelete
}: NotesListProps) => {
    // Stato del tab attivo
    const [activeTab, setActiveTab] = useState<'tutti' | 'per-me'>('tutti')

    // Funzione per il colore della priorità
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'alta': return 'border-l-red-500 bg-red-50'
            case 'media': return 'border-l-orange-500 bg-yellow-50'
            case 'bassa': return 'border-l-yellow-500 bg-yellow-50'
            default: return 'border-l-blue-500 bg-blue-50'
        }
    }

    // Filtra le note in base alla data, al reference e al tab attivo
    const getFilteredNotes = () => {
        return memos
            .filter(note => {
                const matchesDate = !filterDate || note.note_date === filterDate

                if (activeTab === 'tutti') {
                    // Tab "Tutti": solo note con reference = 'tutti'
                    return matchesDate && (note.reference === 'tutti')
                } else {
                    // Tab "Per me": solo note con reference = user.id
                    return matchesDate && (note.reference === user.id)
                }
            })
            .sort((a, b) => {
                const dateA = new Date(a.created_at || a.createdAt || 0)
                const dateB = new Date(b.created_at || b.createdAt || 0)
                return dateB.getTime() - dateA.getTime()
            })
    }

    const filteredNotes = getFilteredNotes()

    // Conteggio note per i badges
    const allNotesCount = memos.filter(note => {
        const matchesDate = !filterDate || note.note_date === filterDate
        return matchesDate && note.reference === 'tutti'
    }).length

    const myNotesCount = memos.filter(note => {
        const matchesDate = !filterDate || note.note_date === filterDate
        return matchesDate && note.reference === user?.id
    }).length

    const formatDate = (dateString: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('it-IT')
    }

    return (
        <>
            {/* Tab Navigation */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('tutti')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${activeTab === 'tutti'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Tutti
                            {allNotesCount > 0 && (
                                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${activeTab === 'tutti'
                                    ? 'text-blue-800 bg-blue-100'
                                    : 'text-gray-600 bg-gray-100'
                                    }`}>
                                    {allNotesCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('per-me')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${activeTab === 'per-me'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <UserCheck className="w-4 h-4" />
                            Per Me
                            {myNotesCount > 0 && (
                                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${activeTab === 'per-me'
                                    ? 'text-blue-800 bg-blue-100'
                                    : 'text-gray-600 bg-gray-100'
                                    }`}>
                                    {myNotesCount}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Caricamento note...</p>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Edit3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                            {activeTab === 'per-me'
                                ? 'Nessuna nota per te'
                                : 'Nessuna nota trovata'
                            }
                        </p>
                        <p className="text-sm">
                            {activeTab === 'per-me'
                                ? 'Non ci sono note destinate a te'
                                : 'Aggiungi la prima nota per iniziare'
                            }
                        </p>
                    </div>
                ) : (
                    filteredNotes.map((note, index) => (
                        <div
                            key={note.id}
                            className={`border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${getPriorityColor(note.priority)}`}
                            style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                        >
                            <NoteSlot
                                note={note}
                                handleEdit={() => handleEdit(note)}
                                handleDelete={() => handleDelete(note.id)}
                                formatDate={formatDate}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Animazione fadeIn */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}

export default NotesList