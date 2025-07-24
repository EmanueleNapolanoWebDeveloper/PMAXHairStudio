'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import InstagramLogo from '@/public/assets/logos/iconInstagram.svg'
import MailIcon from '@/public/assets/logos/iconMail.png'
import WhatAppIcon from '@/public/assets/logos/iconWhatApp.svg'


const SocialSection = () => {
  return (
    <div className="flex justify-center mt-10">
      {/* SVG clip path per squircle */}
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <div className="flex gap-x-4 p-2 bg-black/30 rounded-xl backdrop-blur-lg border border-white/10 shadow-xl">
        {/* Facebook */}
        <Link href="https://www.facebook.com/pmaxhairstudio" target="_blank">
          <div
            style={{ clipPath: 'url(#squircleClip)' }}
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-lg border border-blue-400/50 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
          >
            <svg
              fill="white"
              viewBox="0 0 24 24"
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325V22.68c0 .732.593 1.325 1.325 1.325H12.82v-9.845H9.692v-3.843h3.128V7.691c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.762v2.31h3.587l-.467 3.843h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.405 0 22.675 0z" />
            </svg>
          </div>
        </Link>

        {/* Instagram */}
        <Link href="https://www.instagram.com/pmaxhairstudio/" target="_blank">
          <div
            style={{ clipPath: 'url(#squircleClip)' }}
            className="w-14 h-14 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center shadow-lg border border-pink-400/50 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Image
              src={InstagramLogo}
              alt="Instagram" />
          </div>
        </Link>

        {/* mail */}
        <Link href="/contatti">
          <div
            style={{ clipPath: 'url(#squircleClip)' }}
            className="w-14 h-14 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center shadow-lg border border-gray-700/50 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Image
              src={MailIcon}
              alt="Mail" />
          </div>
        </Link>

        {/* WhatsApp */}
        <Link href="https://wa.me/393881154473" target="_blank">
          <div
            style={{ clipPath: 'url(#squircleClip)' }}
            className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg border border-green-500/50 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Image
              src={WhatAppIcon}
              alt="WhatsApp" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SocialSection
