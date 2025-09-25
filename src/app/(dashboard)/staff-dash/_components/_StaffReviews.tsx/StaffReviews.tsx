'use client'

import React, { useState } from 'react';
import { Star, Filter, Search } from 'lucide-react';
import { Reviews } from '@/src/lib/types';


// ⭐ Componente per le stelle
type StarRatingProps = {
    rating: number;
    size?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
    return (
        <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={`${i < rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                        } transition-colors`}
                />
            ))}
        </div>
    );
};


// 👤 Componente per l'avatar cliente
type CustomerAvatarProps = {
    customer: Reviews['customer'];
    reviewId: number | string;
};

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ customer, reviewId }) => {
    const getInitials = (name?: string, surname?: string) => {
        if (!name && !surname) return "??";
        return `${name?.charAt(0) || ""}${surname?.charAt(0) || ""}`.toUpperCase();
    };

    const colors = [
        "from-rose-500 to-pink-500",
        "from-blue-500 to-indigo-500",
        "from-emerald-500 to-green-500",
        "from-purple-500 to-violet-500",
        "from-orange-500 to-red-500",
        "from-cyan-500 to-blue-500",
        "from-indigo-500 to-purple-500",
        "from-teal-500 to-cyan-500",
    ];

    const getColor = (id: string | number) => {
        const index = Math.abs(
            (typeof id === "number" ? id : id.toString().charCodeAt(0)) % colors.length
        );
        return colors[index];
    };

    return (
        <div
            className={`
                w-12 h-12 
                bg-gradient-to-br ${getColor(reviewId)} 
                rounded-full flex items-center justify-center 
                text-white font-bold text-sm flex-shrink-0
                shadow-md ring-2 ring-white
            `}
        >
            {getInitials(customer.name, customer.surname)}
        </div>
    );
};


// 📝 Singola recensione
type ReviewCardProps = {
    review: Reviews;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <div className="flex gap-4">
                <CustomerAvatar customer={review.customer} reviewId={review.id} />

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div className="flex flex-col items-start gap-1">
                            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">
                                {review.customer.name} {review.customer.surname}
                            </h3>
                            <span className="text-sm text-gray-500 font-medium">
                                {review.created_at
                                    ? new Date(review.created_at).toLocaleDateString("it-IT", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                    : ""}
                            </span>
                        </div>
                        <StarRating rating={review.rating} size={14} />
                    </div>

                    {/* Contenuto */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-xl text-gray-900 leading-tight">
                            {review.customer?.name} {review.customer?.surname}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-base">
                            &quot;{review.comment}&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// 🎛️ Filtri
type ReviewFiltersProps = {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ selectedFilter, setSelectedFilter }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                    <Filter size={18} />
                    <span className="font-medium text-sm">Filtra per:</span>
                </div>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400 transition-colors"
                >
                    <option value="all">Tutte le stelle</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 stelle</option>
                    <option value="4">⭐⭐⭐⭐ 4 stelle</option>
                    <option value="3-">⭐⭐⭐ 3 stelle o meno</option>
                </select>
            </div>
        </div>
    );
};


// 📌 Header recensioni
type ReviewsHeaderProps = {
    averageRating: number;
    totalReviews: number;
};

const ReviewsHeader: React.FC<ReviewsHeaderProps> = ({ averageRating, totalReviews }) => {
    return (
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Recensioni Clienti
            </h2>
            <div className="flex items-center justify-center gap-4 mb-2">
                <StarRating rating={Math.round(averageRating)} size={24} />
                <span className="text-3xl font-bold text-gray-900">
                    {averageRating}
                </span>
            </div>
            <p className="text-gray-600 font-medium">
                Basato su {totalReviews} recensioni verificate
            </p>
        </div>
    );
};


// 🚫 Stato vuoto
const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Nessuna recensione trovata
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
                Prova a modificare i filtri o il termine di ricerca per trovare le recensioni che stai cercando.
            </p>
        </div>
    );
};


// 🔥 Componente principale
type ActivityReviewsProps = {
    allReviews: Reviews[];
};

const ActivityReviews: React.FC<ActivityReviewsProps> = ({ allReviews }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const localReviews = allReviews.map((review) => ({
        ...review,
        created_at: new Date(review.created_at).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
    }));

    const filteredReviews = localReviews.filter((review) => {
        const matchesFilter =
            selectedFilter === 'all' ||
            (selectedFilter === '5' && review.rating === 5) ||
            (selectedFilter === '4' && review.rating === 4) ||
            (selectedFilter === '3-' && review.rating <= 3);

        const matchesSearch =
            review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.customer.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const averageRating =
        localReviews.length > 0
            ? parseFloat(
                (localReviews.reduce((sum, review) => sum + review.rating, 0) / localReviews.length).toFixed(1)
            )
            : 0;

    const totalReviews = localReviews.length;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
            <ReviewsHeader
                averageRating={averageRating}
                totalReviews={totalReviews}
            />

            <ReviewFilters
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {filteredReviews.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-6">
                    {filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityReviews;
