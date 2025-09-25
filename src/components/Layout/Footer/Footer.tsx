'use client'
import LogoPM from '@/public/assets/logos/P-MaxLogoNoBg.png'
import OpeningHours from './_conmponents/TabellaOrari'
import SocialSection from './_conmponents/SocialCard'
import Copyright from './_conmponents/Copiright'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LinkUtils from './_conmponents/LinkUtili'
import Contacts from './_conmponents/Contacts'

export default function Footer() {
    const contactPath = usePathname()
    
    return (
        <footer className={`relative bg-black border-t border-red-500/20 overflow-hidden ${contactPath === "/contatti" && 'hidden'}`} id='footerHome'>
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-red-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-red-600/15 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-red-400/8 to-red-600/8 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-white/5 to-red-500/10 rounded-full blur-xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(220,38,38,0.03)_50%,transparent_75%)] bg-[size:60px_60px]"></div>
            </div>

            {/* Header Section */}
            <div className="relative text-center py-16 px-6">
                <div className="relative inline-block w-[25rem] h-[15rem]">
                    <Image 
                    src={LogoPM} 
                    alt="P-Max Logo" 
                    fill 
                    className="w-40 h-40" />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
                </div>
                <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                    Il tuo salone di bellezza di fiducia nel cuore di Napoli
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6">
                <Contacts />
                <OpeningHours />
                <LinkUtils />
                <SocialSection />
                <div className="border-t border-gradient-to-r from-transparent via-red-500/30 to-transparent mb-8"></div>
            </div>
            <Copyright />
        </footer>
    )
}