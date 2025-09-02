'use client'
import { useState, useEffect } from 'react'
import styles from './ui.module.css'

type FlipProps = {
    texts: string[]
}

export default function FlipText({ texts }: FlipProps) {
    const [index, setIndex] = useState(0)
    const [animKey, setAnimKey] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length)
            setAnimKey(k => k + 1) // cambia la key per riavviare l’animazione
        }, 5000) // Cambia ogni 5 secondi

        return () => clearInterval(interval)
    }, [texts.length])

    return (
        <p className="text-white text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-light tracking-wide text-center px-4">
            <span key={animKey} className={`${styles.flipText} block`}>
                {texts[index]}
            </span>
        </p>
    )
}
