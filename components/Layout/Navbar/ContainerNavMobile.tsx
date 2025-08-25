import LinkNavbarMobile from "./LinkNavbarMobile"
import styles from './navbar.module.css'
import UserSectionnavMobile from "./UserSectionnavMobile";
import { useAuth } from '@/app/store/AuthContext'

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
                w-[70vw] md:w-[30vw] h-screen backdrop-blur-lg
                bg-black text-white shadow-xl z-50 transition-transform duration-300 ease-in-out
                ${toggleMenu ? 'translate-x-0 block' : 'translate-x-full opacity-0 pointer-events-none'}
            `}
        >
            {/* UserSection con toggle menu, login/logout */}
            <UserSectionnavMobile 
                onClickMenu={onSelect} 
                user={user} 
                profile={profile}
                onLogout={signOut} 
            />

            {/* link Menu */}
            <LinkNavbarMobile onSelect={onSelect} />
        </div>
    )
}
