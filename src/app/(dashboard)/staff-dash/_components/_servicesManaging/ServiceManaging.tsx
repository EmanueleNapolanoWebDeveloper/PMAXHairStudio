'use client'
import { useState } from 'react'
import { useStaffContext } from '@/src/app/store/StaffContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addService, editService, deleteService } from '@/src/lib/actions'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Service } from '@/src/lib/types'

export default function ServiceManaging() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [formData, setFormData] = useState<Partial<Service>>({
        title: '',
        description: '',
        time: 0,
        price: 0,
        category: ''
    })

    const { services } = useStaffContext()

    const queryClient = useQueryClient()

    const addServiceMutation = useMutation({
        mutationFn: addService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            toast.success('Servizio aggiunto con successo!')
            handleCloseModal()
        },
        onError: (err) => {
            console.log('Errore nell\'aggiunta del servizio:', err)
        }
    })

    const editServiceMutation = useMutation({
        mutationFn: editService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            toast.success('Servizio aggiornato con successo!')
            handleCloseModal()
        },
        onError: (err) => {
            console.log('Errore nell\'aggiornamento del servizio:', err)
            toast.error('Si sono verificati degli errori durante l\'aggiornamento del servizio')
        }
    })


    const filteredServices =
        services?.data ?
            services?.data.filter(service =>
                service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.category?.toLowerCase().includes(searchTerm.toLowerCase()))
            :
            []


    const handleOpenModal = (service: Service | null = null) => {
        if (service) {
            setEditingService(service)
            setFormData({
                title: service.title,
                description: service.description || '',
                time: service.time || 0,
                price: service.price || 0,
                category: service.category || ''
            })
        } else {
            setEditingService(null)
            setFormData({
                title: '',
                description: '',
                time: 0,
                price: 0,
                category: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingService(null)
        setFormData({
            title: '',
            description: '',
            time: 0,
            price: 0,
            category: ''
        })
    }

    const handleSubmit = () => {
        if (!formData.title || formData.title.trim() === '') {
            toast.error('Il nome del servizio è obbligatorio');
            return;
        }

        if (!formData.category || formData.category.trim() === '') {
            toast.error('La categoria è obbligatoria');
            return;
        }

        if (!formData.description || formData.description.trim() === '') {
            toast.error('La descrizione è obbligatoria');
            return;
        }

        if (!formData.time || formData.time <= 0) {
            toast.error('La durata deve essere maggiore di 0');
            return;
        }

        if (!formData.price || formData.price < 0) {
            toast.error('Il prezzo deve essere maggiore o uguale a 0');
            return;
        }

        if (editingService) {
            editServiceMutation.mutate({
                id: editingService.id,
                title: formData.title!,
                description: formData.description || '',
                time: formData.time || 0,
                price: formData.price || 0,
                category: formData.category || ''
            })
        } else {
            addServiceMutation.mutate({
                title: formData.title!,
                description: formData.description || '',
                time: formData.time || 0,
                price: formData.price || 0,
                category: formData.category || ''
            })
        }


        handleCloseModal()
    }


    const handleDelete = (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare questo servizio?')) {
            deleteService(id)
            toast.success('Servizio eliminato con successo!')
        }
    }

    if (services.isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center p-6">
                <p className="text-gray-600 text-lg">Caricamento servizi...</p>
            </div>
        )
    }

    if (services.isError) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-600 text-lg mb-2">Errore nel caricamento dei servizi</p>
                {services.error && <p className="text-gray-600 text-sm">{services.error.message}</p>}
            </div>
        )
    }

    return (
        <div className="w-full mx-3 p-6 bg-white min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestione Servizi</h1>
                <p className="text-gray-600">Gestisci i servizi offerti dal tuo staff</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cerca servizi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-black-700 transition-colors text-white"
                >
                    <Plus className="w-5 h-5" />
                    Nuovo Servizio
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
                                    {service.category && (
                                        <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {service.category}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(service)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id!)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            {service.description && (
                                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                            )}
                            <div className="flex justify-between items-center text-sm">
                                {service.duration && (
                                    <span className="text-gray-600">⏱️ {service.duration} min</span>
                                )}
                                {service.price && (
                                    <span className="font-semibold text-gray-800">€{service.price}</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        {searchTerm ? 'Nessun servizio trovato' : 'Nessun servizio disponibile. Aggiungi il primo servizio!'}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingService ? 'Modifica Servizio' : 'Nuovo Servizio'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Nome Servizio *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                    placeholder="es. Taglio Uomo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Categoria
                                </label>
                                <select
                                    name="category"
                                    id=""
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value=''>-Scegli categoria-</option>
                                    <option value="Taglio">Taglio</option>
                                    <option value="Barba">Barba</option>
                                    <option value="Colore">Colore</option>
                                    <option value="Trattamento">Trattamento</option>
                                    <option value="Estetica">Estetica</option>
                                    <option value="Pack">Pack</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Descrizione
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                    placeholder="Descrivi il servizio..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">
                                        Durata (min)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.time || ''}
                                        onChange={(e) => setFormData({ ...formData, time: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                        placeholder="30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">
                                        Prezzo (€)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.50"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                        placeholder="25.00"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingService ? 'Salva' : 'Crea'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
