import { Geist, Geist_Mono, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppCTA from "@/components/CTA";
import Script from "next/script";

// Font
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair-display", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });

// ✅ Metadata corretto per App Router
export const metadata = {
  title: "P-Max Hair Studio | Taglio & Stile per Uomo a Napoli",
  description: "Scopri l'eccellenza del grooming maschile da P-Max Hair Studio. Tagli di capelli, barba, trattamenti e stile personalizzato a Napoli.",
  keywords: ["barbiere Napoli", "P-Max Hair Studio", "barber shop", "taglio uomo", "barba", "parrucchiere uomo Napoli", "taglio sfumato", "stile capelli"],
  authors: [{ name: "P-Max Hair Studio", url: "https://pmaxhairstudio.it" }],
  creator: "P-Max Hair Studio",
  publisher: "P-Max Hair Studio",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "P-Max Hair Studio | Barber Shop a Napoli",
    description: "Barbiere professionale a Napoli: tagli moderni, barba curata, stile impeccabile. Prenota ora il tuo appuntamento da P-Max Hair Studio.",
    url: "https://pmaxhairstudio.it",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhairstudio.it/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "P-Max Hair Studio - Barber Napoli",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P-Max Hair Studio | Barber Shop a Napoli",
    description: "Scopri lo stile e l'arte del grooming maschile a Napoli. Prenota da P-Max Hair Studio.",
    images: ["https://pmaxhairstudio.it/og-image.jpg"],
    creator: "@pmaxhair",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ✅ Layout corretto con script iubenda caricati in modo conforme
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <head>
        {/* Script Iubenda */}
        <Script
          id="iubenda-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {
                siteId: 4175108,
                cookiePolicyId: 97126684,
                lang: "it",
                storage: { useSiteId: true }
              };
            `,
          }}
        />
        <Script
          id="iubenda-autoblocking"
          strategy="beforeInteractive"
          src="https://cs.iubenda.com/autoblocking/4175108.js"
        />
        <Script
          id="iubenda-loader"
          strategy="beforeInteractive"
          src="https://cdn.iubenda.com/cs/iubenda_cs.js"
          charSet="UTF-8"
        />
        {/* ⬆️ Fine snippet Iubenda */}
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${oswald.variable} antialiased overflow-x-hidden`}
      >


        {/* Contenuto del sito */}
        <Navbar />
        {children}
        <Footer />
        <Toaster position="bottom-center" reverseOrder={false} />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
