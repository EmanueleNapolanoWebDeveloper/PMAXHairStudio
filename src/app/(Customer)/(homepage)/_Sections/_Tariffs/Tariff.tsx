import AdditionalInfo from "./_components/AddintionalInfo";
import ServiceCategory from "./_components/ServiceCategory";
import OpeningHours from "./_components/OpeningHours";
import { createClient } from "@/src/utils/supabase/server";
import { Link } from "lucide-react";
import CTA from "./_components/CTA";
import Image from "next/image";

export default async function Tariff() {
    // Funzione richiamo supabase
    const supabase = await createClient();

    // Fetch dei servizi
    const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

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
    const groupedServices = services.reduce((acc: any, service: any) => {
        if (!acc[service.category]) {
            acc[service.category] = {
                category: service.category,
                icon: service.icon || "⭐",
                popular: service.popular || false,
                items: []
            };
        }
        acc[service.category].items.push({
            name: service.title,
            price: service.price,
            duration: service.duration || service.time,
            description: service.description,
            originalPrice: service.originalPrice
        });
        return acc;
    }, {});

    // Converte l'oggetto in array e ordina i servizi per prezzo crescente
    const categoriesArray = Object.values(groupedServices).map((category: any) => ({
        ...category,
        items: category.items.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price))
    })) as any[];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6" id="tariff">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        LISTINO PREZZI
                    </h1>
                    <div className="flex items-center justify-center mb-6 gap-4">
                        {/* Linea sinistra */}
                        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>

                        {/* Spazio per l'icona che aggiungerai */}
                        <div className="w-20 h-24 flex items-center justify-center relative">
                            {/* Placeholder - sostituisci con la tua icona */}
                                <Image
                                    src={'/assets/logos/IconBeard.png'}
                                    fill
                                    alt="P-Max Logo" />
                        </div>

                        {/* Linea destra */}
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
                    <OpeningHours />
                    <AdditionalInfo />
                </div>

                <CTA />

            </div>
        </div>
    );
}