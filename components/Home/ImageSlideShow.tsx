'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { testImages } from '@/lib/datas'

type SlideProps = {
    images : string[]
    time : number
}



export default function ImageSlideShow({images, time} : SlideProps) {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const length: number = testImages.length

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImage((prev) => (prev === length - 1 ? 0 : prev + 1))
        }, time)

        return () => clearTimeout(timer)
    }, [currentImage, length])

    return (
        
            <div className="relative w-full h-full overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentImage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === currentImage}
                        />
                    </div>
                ))}
            </div>

    )
}