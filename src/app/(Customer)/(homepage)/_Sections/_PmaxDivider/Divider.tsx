'use client'
import Image from "next/image";

export default function Divider() {
    return (
        <div className="w-full bg-black h-[5rem] relative overflow-hidden">
            {/* Container per l'animazione infinita */}
            <div className="absolute inset-0 flex items-center">
                {/* Prima sequenza di loghi */}
                <div className="flex items-center gap-8 animate-scroll-right">
                    {Array.from({ length: 80 }, (_, index) => (
                        <Image
                            key={`logo-1-${index}`}
                            src="/assets/logos/P-MaxLogo.jpg"
                            alt="P-Max Logo"
                            width={140}
                            height={150}
                            className="flex-shrink-0 opacity-90"
                        />
                    ))}
                </div>
                            
            </div>

            <style jsx>{`
                @keyframes scroll-right {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(0%);
                    }
                }
                
                .animate-scroll-right {
                    animation: scroll-right 150s linear infinite;
                }
            `}</style>
        </div>
    );
}