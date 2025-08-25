import Footer from "@/components/Layout/Footer/Footer"
import Navbar from "@/components/Layout/Navbar/Navbar"
import WhatsAppCTA from "@/components/Layout/CTA"

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

            <WhatsAppCTA />
        </main>

    )
}