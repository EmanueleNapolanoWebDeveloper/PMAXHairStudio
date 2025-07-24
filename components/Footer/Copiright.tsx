'use client'

export default function Copyright() {
  const currentYear: number = new Date().getFullYear()

  return (
    <section className="col-span-3 h-[3rem] bg-slate-800 flex items-center justify-center gap-2 text-sm text-gray-300 ">
      <p className="text-[0.6rem]">&copy; {currentYear} P-MAX Hair-Studio di Polverino Massimo</p>
      <span>|</span>
      <p className="text-[0.6rem]">P.IVA: 08717761210</p>
      <span>|</span>
      <p className="text-[0.6rem]">Powered by : EN_WebDeveloper </p>
    </section>
  )
}
