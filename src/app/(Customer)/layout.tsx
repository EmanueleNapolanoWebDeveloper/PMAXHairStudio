import Footer from "@/src/components/Layout/Footer/Footer"
import Navbar from "@/src/components/Layout/Navbar/Navbar"
import WhatsAppCTA from "@/src/components/Layout/CTA"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />

        </main>

    )
}