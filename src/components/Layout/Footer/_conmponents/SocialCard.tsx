import Link from 'next/link'
import Image from 'next/image'
import InstagramLogo from '@/public/assets/logos/iconInstagram.svg'
import WhatAppIcon from '@/public/assets/logos/iconWhatApp.svg'
import { Users, MessageSquare } from 'lucide-react'

const SocialSection = () => {
  const socialMedia = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/pmaxhairstudio',
      icon: (
        <svg fill="white" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325V22.68c0 .732.593 1.325 1.325 1.325H12.82v-9.845H9.692v-3.843h3.128V7.691c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.762v2.31h3.587l-.467 3.843h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.405 0 22.675 0z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/pmaxhairstudio/',
      icon: <Image src={InstagramLogo} alt="Instagram" className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen  flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-md flex flex-col space-y-8">
        
        {/* Sezione Social Media */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              <h3 className="text-3xl font-bold text-white">Social Media</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Seguici per vedere i nostri lavori e le novità
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            {socialMedia.map((social, index) => (
              <Link 
                key={index} 
                href={social.href}
                target={social.name !== 'Email' ? "_blank" : "_self"}
                className="group"
              >
                <div className="relative p-4 rounded-xl backdrop-blur-sm border-2 border-white/20 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-500/20 border border-red-500 rounded-lg">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold">
                        {social.name}
                      </span>
                    </div>
                    <div className="text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divisore */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        </div>

        {/* Sezione WhatsApp */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-white">Contatto Diretto</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Scrivici su WhatsApp per prenotazioni e info
            </p>
          </div>
          
          <Link 
            href="https://wa.me/393881154473"
            target="_blank"
            className="group block"
          >
            <div className="relative p-6 rounded-xl backdrop-blur-sm border-2 border-white/30 bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-full">
                    <Image src={WhatAppIcon} alt="WhatsApp" className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">WhatsApp</div>
                    <div className="text-gray-300 text-sm">+39 388 11 54 473</div>
                  </div>
                </div>
                <div className="text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              
              {/* Badge "Risposta veloce" */}
              <div className="absolute -top-2 -right-2">
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-red-400">
                  Risposta veloce
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Call to action finale */}
        <div className="text-center p-4 bg-gray-900 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg">
          <p className="text-gray-300 text-sm">
            💫 Non perdere mai i nostri aggiornamenti
          </p>
        </div>
      </div>
    </div>
  )
}

export default SocialSection