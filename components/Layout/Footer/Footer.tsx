'use client'

import { MapPin, Phone, Mail } from 'lucide-react'
import OpeningHours from './TabellaOrari'
import SocialSection from '../SocialCard'
import Copyright from './Copiright'
import { usePathname } from 'next/navigation'

export default function Footer() {

    const contactPath = usePathname()

    return (
        <footer className={`max-w-screen min-h-[50vh] bg-black grid grid-cols-3 gap-4 border-t-3 border-t-red-800 py-3 ${contactPath === "/contatti" && 'hidden'}`}>

            {/* contact */}
            <section className="col-span-3 lg:col-span-1 flex flex-col items-center justify-start gap-4">
                <div className='h-[10rem] flex flex-col items-center justify-start gap-3'>
                    <h2 className="text-red-600 text-[2.5rem] font-semibold mb-4">Contatti</h2>
                    <p className='text-[1.5rem] text-center font-light'>Così sai come e dove trovarci...</p>
                </div>

                <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
                    <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                        <MapPin className="w-7 h-7 text-red-500" />
                        <span className='text-[1.5rem] font-semibold'>
                            Via Provinciale, 46 <br />
                            80126, Pianura <br />
                            Napoli (Na)</span>
                    </div>

                    <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                        <Phone className="w-7 h-7 text-red-500" />
                        <span className='text-[1.5rem] font-semibold'>(+39) 388-11-54-473</span>
                    </div>

                    <div className="w-full flex items-center justify-center gap-3 text-gray-300">
                        <Mail className="w-7 h-7 text-red-500" />
                        <span className='text-[1.5rem] font-semibold'>massimopolverino364@gmail.com</span>
                    </div>
                </div>

            </section>

            {/* social */}
            <section className="col-span-3 lg:col-span-1 flex flex-col items-center justify-start gap-4">
                <div className='h-[10rem] flex flex-col items-center justify-start gap-3'>
                    <h2 className="text-red-600 text-[2.5rem] font-semibold mb-4">Social</h2>
                    <p className='text-[1.5rem] text-center font-light'>Seguici per non perderti mai i nuovi aggiornamenti...</p>
                </div>


                <div className='h-full w-full flex items-center justify-center'>
                    <SocialSection />
                </div>
            </section>

            {/* hours */}
            <section className="col-span-3 lg:col-span-1 flex flex-col gap-3 items-center justify-around">
                <div className='h-[10rem] flex flex-col items-center justify-start gap-3'>
                    <h2 className="text-red-600 text-[2.5rem] font-semibold mb-4">Calendario</h2>
                    <p className='text-[1.5rem] text-center font-light'>Scrolla il calendario per conoscere giorni e orari di apertura...</p>
                </div>
                <OpeningHours />
            </section>

            {/* copyright */}
            <Copyright />

        </footer>
    )
}