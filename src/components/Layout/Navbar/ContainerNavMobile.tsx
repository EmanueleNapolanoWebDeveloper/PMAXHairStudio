import LinkNavbarMobile from "./LinkNavbarMobile"
import styles from './navbar.module.css'
import UserSectionnavMobile from "./UserSectionnavMobile";
import { useAuth } from '@/src/app/store/AuthContext'

type ContainerNavMobileProps = {
    onSelect: () => void
    toggleMenu: boolean
}

export default function ContainerNavMobile({ onSelect, toggleMenu }: ContainerNavMobileProps) {
    const { user, profile , signOut } = useAuth() // context già disponibile
    
    return (
        <div
            className={`
                ${styles.containerNavbarMobile}
                fixed top-0 right-0 w-[70vw] md:w-[30vw] h-screen z-50
                bg-gradient-to-br from-black via-gray-900 to-black
                backdrop-blur-xl border-l border-red-500/20
                shadow-2xl shadow-black/50
                transition-all duration-300 ease-in-out
                ${toggleMenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
            `}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-red-600/15 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col">
                {/* Header Gradient Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                
                {/* UserSection */}
                <div className="relative">
                    <UserSectionnavMobile
                        onClickMenu={onSelect}
                        user={user}
                        profile={profile}
                        onLogout={signOut}
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex-1 relative">
                    <LinkNavbarMobile onSelect={onSelect} />
                </div>

                {/* Bottom Gradient Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </div>

            {/* Side Accent Line */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-red-500/50 via-red-400/30 to-red-500/50"></div>
        </div>
    )
}