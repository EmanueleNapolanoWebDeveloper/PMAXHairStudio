'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/src/app/store/AuthContext'
import React, { useState, useEffect } from 'react'
import { addNotes, fetchAllMemos, getEmployees, deleteNote } from '@/src/lib/actions'
import { Calendar, Clock, User, Plus, X, Edit3, Trash2, Save } from 'lucide-react'
import FormAddNotes from './_components/FormAddNotes'
import NoteSlot from './_components/NoteSlot'
import toast from 'react-hot-toast'
import { createClient } from '@/src/utils/supabase/client'
import NotesList from './_components/NoteList'

const StaffNotes = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const supabase = createClient()

    const today = new Date().toISOString().split('T')[0]

    const [showAddForm, setShowAddForm] = useState(false)
    const [editingNote, setEditingNote] = useState(null)
    const [filterDate, setFilterDate] = useState(today)
    const [reference, setReference] = useState('tutti')
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: '',
        time: '',
        reference: 'tutti',
        priority: 'bassa'
    })

    // Fetch Memos
    const { data: memos = [], isLoading, refetch } = useQuery({
        queryKey: ['memos', user?.id],
        queryFn: () => fetchAllMemos(user?.id),
        enabled: !!user?.id,
        refetchInterval: 5000, // Refetch ogni 5 secondi come fallback
    })

    // Create Note Mutation
    const { mutate: createNote, isPending: isCreating } = useMutation({
        mutationFn: addNotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos', user?.id] })
            resetForm()
            setShowAddForm(false)
            toast.success('Nota aggiunta con successo!')
        },
        onError: (error) => {
            console.error('Errore creazione nota:', error)
            toast.error('Errore durante l\'aggiunta della nota.')
        },
    })

    // Delete Note Mutation
    const { mutate: deleteStaffNote, isPending: isDeleting } = useMutation({
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

    // Fetch Staff
    const { data: staffs = [] } = useQuery({
        queryKey: ['staff', user?.id],
        queryFn: getEmployees,
        enabled: !!user?.id,
    })

    // REALTIME SETUP
    useEffect(() => {
        if (!user?.id) return

        let channel;

        const setupRealtime = async () => {
            try {
                console.log('🔄 Configurazione realtime per user:', user.id)

                channel = supabase
                    .channel('staffnotes-changes')
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'staffnotes'
                        },
                        (payload) => {
                            console.log('📡 Realtime event:', payload)

                            // Ricarica i dati quando c'è un cambiamento
                            queryClient.invalidateQueries({
                                queryKey: ['memos', user.id]
                            })

                            // Mostra notifica se necessario
                            if (payload.eventType === 'INSERT' && payload.new?.author !== user.id) {
                                toast('Nuova nota aggiunta!', { icon: '📝' })
                            }
                            if (payload.eventType === 'DELETE' && payload.old?.author !== user.id) {
                                toast('Nota eliminata!', { icon: '🗑️' })
                            }
                        }
                    )
                    .subscribe((status) => {
                        console.log('🔗 Realtime status:', status)
                        if (status === 'SUBSCRIBED') {
                            console.log('✅ Realtime attivo!')
                        }
                    })

            } catch (error) {
                console.error('❌ Errore setup realtime:', error)
            }
        }

        setupRealtime()

        return () => {
            if (channel) {
                console.log('🧹 Cleanup realtime')
                supabase.removeChannel(channel)
            }
        }
    }, [user?.id, queryClient, supabase])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Compila tutti i campi obbligatori')
            return
        }

        createNote({
            ...formData,
            author: user?.id,
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Sei sicuro di voler eliminare la nota?')) {
            deleteStaffNote(id)
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            date: '',
            time: '',
            reference: 'tutti',
            priority: 'bassa',
        })
        setShowAddForm(false)
        setEditingNote(null)
    }

    const handleEdit = (note) => {
        setFormData(note)
        setEditingNote(note)
        setShowAddForm(true)
    }

    const filteredNotes = memos.filter(note => {
        const matchesDate = !filterDate || note.note_date === filterDate
        const matchesType = reference === 'tutti' || note.reference === reference
        return matchesDate && matchesType
    })



    const formatDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('it-IT')
    }

    // Manual refresh function
    const handleRefresh = () => {
        refetch()
        toast.success('Dati aggiornati!')
    }

    return (
        <div className="w-full mx-3 p-6 bg-white min-h-screen">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-600">Gestisci le comunicazioni interne e i promemoria</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        )}
                        Aggiorna
                    </button>
                </div>
            </div>

            {/* Filtri */}
            <div className="bg-white border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="flex gap-6">
                        <div className="min-w-0">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Filtra per data
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
                                />
                                <button
                                    onClick={() => setFilterDate(new Date().toISOString().split('T')[0])}
                                    className="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium text-sm"
                                >
                                    Oggi
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 text-white px-6 py-2.5 hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                        disabled={isCreating}
                    >
                        {isCreating ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                        Nuova Nota
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
                    staffs={staffs}
                />
            )}

            {/* Lista Note */}
            <NotesList
                memos={filteredNotes}
                user={user}
                isLoading={isLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                formatDate={formatDate}
            />


        </div>
    )
}

export default StaffNotes