import LinkNavbarMobile from "./LinkNavbarMobile"
import styles from './navbar.module.css'
// icons
import { X } from 'lucide-react'

type containerNavMobile = {
    onSelect: () => void;
    toggleMenu: boolean
}


export default function ContainerNavMobile({ onSelect, toggleMenu }: containerNavMobile) {
    return (
        <>
            <div
                className=
                {`
                    ${styles.containerNavbarMobile}
                        w-[70vw]
                        md:w-[30vw]
                        h-screen
                       backdrop-blur-lg
                         bg-black text-white shadow-xl z-50 transition-transform duration-300 ease-in-out
                        ${toggleMenu ? 'translate-x-0 block' : 'translate-x-full opacity-0 pointer-events-none'}
                        `}>


                {/* close button */}
                <div className="flex w-full h-[50px] bg-black justify-start  items-center pl-4 pt-2">
                    <button
                        onClick={onSelect}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30  transition-colors duration-300 ease-in-out text-white hover:text-slate-900 focus:outline-none focus:ring-2     focus:ring-slate-800 shadow-lg"
                        aria-controls="container-navbar-mobile"
                        aria-label="Toggle menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* link Menu */}
                <LinkNavbarMobile onSelect={onSelect} />
            </div >
        </>

    )
}