import Link from 'next/link';
import WhatAppIcon from '@/public/assets/logos/iconWhatApp.svg'
import Image from 'next/image';

export default function WhatsAppCTA() {
  return (
    <Link
      href="https://wa.me/393881154473"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-99"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 h-[4rem] w-[4rem] rounded-full shadow-lg flex items-center gap-2 transition-transform transform hover:scale-110 ">
        <Image
        src={WhatAppIcon}
        alt='WA'
        width={65} 
        height={25}/>
      </div>
    </Link>
  );
}
