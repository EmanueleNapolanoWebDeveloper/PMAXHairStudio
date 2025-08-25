import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import Image from "next/image";
import { testImages } from "@/lib/datas";
import Link from "next/link";

export default function ImageShow() {
    return (
        <div className="w-full min-h-screen grid grid-cols-12 grid-rows-2 px-0">
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <CardHeader className="absolute z-10 bottom-1 flex-col items-start!">
                    <p className="text-[3.3rem] text-red-900/70 uppercase font-bold">Passione</p>
                </CardHeader>
                <Image
                    fill
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={testImages[9]}
                />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start!">
                    <p className="text-[3.3rem] text-slate-900/70 uppercase font-bold">Esperienza</p>
                </CardHeader>
                <Image
                    fill
                    alt="Card background"
                    className="z-0 w-full h-full object-cover "
                    src={testImages[7]} />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <CardHeader className="absolute z-10 bottom-1 flex-col items-start!">
                    <p className="text-[3rem] text-red-900/70 uppercase font-bold">Cura dei dettagli</p>
                </CardHeader>
                <Image
                    fill
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={testImages[6]} />
            </Card>
            <Card isFooterBlurred className="w-full h-full col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 bottom-15 flex-col items-start">
                    <p className="text-tiny text-white/70 uppercase font-bold text-[2.6rem]">Stile</p>
                </CardHeader>
                <Image
                    fill
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={testImages[3]} />
                <CardFooter className="absolute bg-white/70 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Vuoi una consulenza?</p>
                        <p className="text-black text-tiny">Contattaci!</p>
                    </div>
                    <Link href="/contact-us">
                        <button
                            type="button"
                            className="p-3 bg-red-900/70 text-white rounded-md 
             hover:bg-black active:bg-black 
             transition-colors duration-300 ease-in-out"
                        >
                            Contatti
                        </button>
                    </Link>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-full col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-[2.7rem] text-slate-900/70 uppercase font-bold">fiducia</p>
                </CardHeader>
                <Image
                    fill
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src={testImages[2]} />
                <CardFooter className="absolute bg-black/90 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Prenota da Qui </p>
                            <p className="text-tiny text-white/60">Il relax parte da qui</p>
                        </div>
                    </div>
                    <Link href="/reservation">
                        <button
                            type="button"
                            className="p-3 bg-red-900 text-white rounded-md 
             hover:bg-black active:bg-black 
             transition-colors duration-300 ease-in-out"
                        >
                            PRENOTA
                        </button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
