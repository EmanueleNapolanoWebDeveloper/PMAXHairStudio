import React, { useState } from 'react';
import { Star, User, ThumbsUp, Filter, Search } from 'lucide-react';

const ActivityReviews = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Dati di esempio per le recensioni
    const reviews = [
        {
            id: 1,
            name: "Marco Rossi",
            rating: 5,
            date: "15 Marzo 2024",
            title: "Esperienza fantastica!",
            comment: "Servizio impeccabile, prodotto di alta qualità. Consiglio vivamente a tutti. Il team è stato molto professionale e attento ai dettagli.",
            helpful: 12,
            avatar: "MR"
        },
        {
            id: 2,
            name: "Giulia Bianchi",
            rating: 4,
            date: "12 Marzo 2024",
            title: "Molto soddisfatta",
            comment: "Ottimo rapporto qualità-prezzo. Consegna puntuale e prodotto conforme alle aspettative. Unico neo: l'imballaggio potrebbe essere migliorato.",
            helpful: 8,
            avatar: "GB"
        },
        {
            id: 3,
            name: "Alessandro Verdi",
            rating: 5,
            date: "10 Marzo 2024",
            title: "Superato le aspettative",
            comment: "Non è la prima volta che acquisto qui e come sempre sono rimasto pienamente soddisfatto. Qualità eccellente e assistenza clienti top.",
            helpful: 15,
            avatar: "AV"
        },
        {
            id: 4,
            name: "Francesca Neri",
            rating: 3,
            date: "8 Marzo 2024",
            title: "Nella media",
            comment: "Prodotto discreto, nulla di eccezionale. Il prezzo è giusto ma mi aspettavo qualcosa in più. Spedizione veloce comunque.",
            helpful: 3,
            avatar: "FN"
        },
        {
            id: 5,
            name: "Luca Ferrari",
            rating: 5,
            date: "5 Marzo 2024",
            title: "Consigliatissimo!",
            comment: "Qualità premium, servizio clienti eccellente. Hanno risolto subito un piccolo problema che avevo. Tornerò sicuramente per altri acquisti.",
            helpful: 20,
            avatar: "LF"
        },
        {
            id: 6,
            name: "Elena Romano",
            rating: 4,
            date: "2 Marzo 2024",
            title: "Buona esperienza",
            comment: "Prodotto arrivato nei tempi previsti e in ottime condizioni. Il design è molto carino e la qualità buona. Prezzo leggermente alto ma ne vale la pena.",
            helpful: 6,
            avatar: "ER"
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={`${i < rating ? 'fill-red-500 text-red-500' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const filteredReviews = reviews.filter(review => {
        const matchesFilter = selectedFilter === 'all' ||
            (selectedFilter === '5' && review.rating === 5) ||
            (selectedFilter === '4' && review.rating === 4) ||
            (selectedFilter === '3-' && review.rating <= 3);

        const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    const totalReviews = reviews.length;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recensioni Clienti</h2>
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {renderStars(Math.round(averageRating))}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
                        <span className="text-gray-600">({totalReviews} recensioni)</span>
                    </div>
                </div>

                {/* Filtri e ricerca */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-600" />
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="all">Tutte le stelle</option>
                            <option value="5">5 stelle</option>
                            <option value="4">4 stelle</option>
                            <option value="3-">3 stelle o meno</option>
                        </select>
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cerca nelle recensioni..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Lista recensioni */}
            <div className="space-y-6">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {review.avatar}
                            </div>

                            <div className="flex-1">
                                {/* Header della recensione */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{review.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Titolo e commento */}
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">{review.title}</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                        <ThumbsUp size={16} />
                                        <span className="text-sm">Utile ({review.helpful})</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Messaggio se non ci sono risultati */}
            {filteredReviews.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna recensione trovata</h3>
                    <p className="text-gray-600">Prova a modificare i filtri o il termine di ricerca.</p>
                </div>
            )}
        </div>
    );
};

export default ActivityReviews;