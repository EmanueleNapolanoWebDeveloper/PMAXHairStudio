import Footer from "@/src/components/Layout/Footer/Footer"
import Navbar from "@/src/components/Layout/Navbar/Navbar"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}