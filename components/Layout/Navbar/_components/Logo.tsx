import Image from "next/image"
import LogoPM from '@/public/assets/logos/P-MaxLogoNoBg.png'


export default function Logo(){
    return (
        <div className="relative w-[8rem] h-[5rem]">
            <Image
                src={LogoPM} //Logo
                fill
                alt="P-Max Logo"
            />
        </div>
    )
}