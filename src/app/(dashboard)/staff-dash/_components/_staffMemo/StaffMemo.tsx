'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAuth } from '@/src/app/store/AuthContext'
import { useStaffContext } from '@/src/app/store/StaffContext'
import React, { useState, useEffect } from 'react'
import { addNotes, deleteNote } from '@/src/lib/actions'
import FormAddNotes from './_components/FormAddNotes'
import toast from 'react-hot-toast'
import { createClient } from '@/src/utils/supabase/client'
import NotesList from './_components/NoteList'
import { RealtimeChannel } from '@supabase/supabase-js'
import { Plus } from 'lucide-react'
import { StaffNotes, StaffNotesForm } from '@/src/lib/types'

const StaffsNotes = () => {
    const { user, profile } = useAuth()
    const { staffNotes, employees } = useStaffContext()
    const queryClient = useQueryClient()
    const supabase = createClient()

    const today = new Date().toISOString().split('T')[0]

    const [showAddForm, setShowAddForm] = useState(false)
    const [editingNote, setEditingNote] = useState<StaffNotes | null>(null)
    const [filterDate, setFilterDate] = useState(today)
    const [formData, setFormData] = useState<StaffNotes | StaffNotesForm>({
        author: {
            id: user?.id ?? '',
            name: profile?.name ?? '',
            surname: profile?.surname ?? '',
            email: profile?.email ?? '',
            phone: profile?.phone ?? ''
        },
        title: '',
        content: '',
        note_date: today,
        time: '',
        reference: 'tutti',
        priority: 'bassa',
        created_at: new Date().toISOString(),
    })

    // Mutations
    const { mutate: createNote, isPending: isCreating } = useMutation({
        mutationFn: addNotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos', user?.id] })
            resetForm()
            toast.success('Nota aggiunta con successo!')
        },
        onError: (error) => {
            console.error('Errore creazione nota:', error)
            toast.error('Errore durante l\'aggiunta della nota.')
        },
    })

    const { mutate: deleteStaffNote } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos', user?.id] })
            toast.success('Nota eliminata con successo!')
        },
        onError: (error) => {
            console.error('Errore eliminazione nota:', error)
            toast.error('Errore durante l\'eliminazione della nota.')
        }
    })

    // Realtime
    useEffect(() => {
        if (!user?.id) return
        let channel: RealtimeChannel

        const setupRealtime = async () => {
            try {
                channel = supabase
                    .channel('staffnotes-changes')
                    .on(
                        'postgres_changes',
                        { event: '*', schema: 'public', table: 'staffnotes' },
                        (payload) => {
                            queryClient.invalidateQueries({ queryKey: ['memos', user.id] })
                            if (payload.eventType === 'INSERT' && payload.new?.author !== user.id) {
                                toast('Nuova nota aggiunta!', { icon: '📝' })
                            }
                            if (payload.eventType === 'DELETE' && payload.old?.author !== user.id) {
                                toast('Nota eliminata!', { icon: '🗑️' })
                            }
                        }
                    )
                    .subscribe()
            } catch (error) {
                console.error('❌ Errore setup realtime:', error)
            }
        }

        setupRealtime()
        return () => { if (channel) supabase.removeChannel(channel) }
    }, [user?.id, queryClient, supabase])

    const handleInputChange = (field: keyof StaffNotesForm, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Compila tutti i campi obbligatori')
            return
        }
        const newNote: StaffNotes = {
            author: {
                id: profile?.id || '',
                name: profile?.name || '',
                surname: profile?.surname || '',
                email: profile?.email || '',
                phone: profile?.phone || ''
            },
            title: formData.title,
            content: formData.content,
            note_date: formData.note_date,
            time: formData.time,
            reference: formData.reference,
            priority: formData.priority,
            created_at: new Date().toISOString()
        }

        createNote(newNote)
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare la nota?')) {
            deleteStaffNote(id)
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            note_date: today,
            time: '',
            reference: 'tutti',
            priority: 'bassa'
        })
        setShowAddForm(false)
        setEditingNote(null)
    }

    const handleEdit = (note: StaffNotes) => {
        setFormData({
            title: note.title,
            content: note.content,
            note_date: note.note_date,
            time: note.time,
            reference: note.reference,
            priority: note.priority
        })
        setEditingNote(note)
        setShowAddForm(true)
    }

    return (
        <div className="w-full mx-3 p-6 bg-white min-h-screen">
            <div className="mb-6">
                <p className="text-gray-600">Gestisci le comunicazioni interne e i promemoria</p>
            </div>

            {/* Filtri */}
            <div className="bg-white border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="flex gap-6">
                        <div className="min-w-0">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Filtra per data</label>
                            <div className="flex gap-3">
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
                                />
                                <button onClick={() => setFilterDate(today)} className="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium text-sm">Oggi</button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 text-white px-6 py-2.5 hover:bg-blue-700 flex items-center gap-2.5"
                    >
                        <Plus className="w-4 h-4" /> Nuova Nota
                    </button>
                </div>
            </div>

            {/* Form */}
            {showAddForm && (
                <FormAddNotes
                    formData={formData}
                    handleInputChange={handleInputChange}
                    resetForm={resetForm}
                    editingNote={editingNote}
                    handleSubmit={handleSubmit}
                    staffs={employees.data}
                />
            )}

            {/* Lista Note */}
            <NotesList
                memos={staffNotes.data}
                userID={user?.id || ''}
                filterDate={filterDate}
                isLoading={staffNotes.isLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default StaffsNotes
