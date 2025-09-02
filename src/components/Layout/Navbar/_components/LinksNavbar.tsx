import Link from "next/link"

type LinkNavbarProps = {
  path: string
  label: string
  active: boolean
}

export default function LinksNavbar({ path, label, active }: LinkNavbarProps) {
  const underlineClass = active
    ? "w-full"
    : "w-0 group-hover:w-full"

  return (
    <Link
      href={path}
      className="relative md:text-xs lg:text-base xl:text-lg font-semibold px-4 py-2 transition-all duration-300 group text-white"
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-[#8B0000] drop-shadow-[0_0_8px_rgba(139,0,0,0.8)] transition-all duration-300 ${underlineClass}`}
      />
    </Link>
  )
}
