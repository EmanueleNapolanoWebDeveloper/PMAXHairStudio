import Footer from "@/components/Layout/Footer/Footer"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
            <Footer />
        </main>

    )
}