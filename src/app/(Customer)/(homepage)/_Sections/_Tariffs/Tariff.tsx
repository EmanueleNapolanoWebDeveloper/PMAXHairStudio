'use client'

import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/src/lib/actions";
import { Service } from "@/src/lib/types";
import AdditionalInfo from "./_components/AddintionalInfo";
import ServiceCategory from "./_components/ServiceCategory";
import OpeningHours from "./_components/OpeningHours";
import CTA from "./_components/CTA";
import Image from "next/image";
import LegendTarrif from "./_components/Legends";



type Category = {
    category: string;
    icon: string;
    popular: boolean;
    items: Service[];
};

export default function Tariff() {
    // Fetch dei servizi
    const { data: services, error, isLoading } = useQuery<Service[], Error>({
        queryKey: ["services"],
        queryFn: getServices,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Caricamento servizi...</p>
            </div>
        );
    }

    if (error) {
        console.error("Error fetching services:", error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Errore nel caricamento
                    </h2>
                    <p className="text-gray-600">
                        Non è stato possibile caricare i servizi. Riprova più tardi.
                    </p>
                </div>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nessun servizio disponibile
                    </h2>
                    <p className="text-gray-600">
                        I servizi non sono ancora stati configurati.
                    </p>
                </div>
            </div>
        );
    }

    // Raggruppa i servizi per categoria
    const groupedServices: Record<string, Category> = services.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = {
                category: service.category,
                icon: service.icon || "⭐",
                popular: service.popular || false,
                items: []
            };
        }
        acc[service.category].items.push({
            id: service.id,
            title: service.title,
            price: service.price,
            duration: service.duration || service.time,
            time: service.time,
            category: service.category,
            description: service.description,
            icon: service.icon,
            popular: service.popular,
        });
        return acc;
    }, {} as Record<string, Category>);

    // Converte in array e ordina per prezzo
    const categoriesArray: Category[] = Object.values(groupedServices).map(category => ({
        ...category,
        items: category.items.sort((a, b) => a.price - b.price)
    }));

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6" id="tariffHome">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">LISTINO PREZZI</h1>
                    <div className="flex items-center justify-center mb-6 gap-4">
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
                        <div className="w-20 h-24 flex items-center justify-center relative">
                            <Image src="/assets/logos/IconBeard.png" fill alt="P-Max Logo" />
                        </div>
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto fontSubtitlesHome">
                        Prezzi chiari e servizi professionali: la tua esperienza inizia da qui.
                    </p>
                </div>

                {/* Grid delle categorie */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {categoriesArray.map((category, categoryIndex) => (
                        <ServiceCategory
                            key={`category-${categoryIndex}-${category.category}`}
                            category={category}
                            categoryIndex={categoryIndex}
                        />
                    ))}
                </div>

                {/* Info aggiuntive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LegendTarrif />
                    <OpeningHours />
                    <AdditionalInfo />
                </div>

                <CTA />
            </div>
        </div>
    );
}
