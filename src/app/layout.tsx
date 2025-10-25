import { Playfair_Display, Oswald, Exo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { AuthProvider } from "./store/AuthContext";
import ReactQueryProvider from "./store/QueryProvider";


// Font
const playfairDisplay = Playfair_Display({ variable: "--font-playfair-display", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const exo = Exo({ variable: "--font-exo", subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const cormorantGaramond = Cormorant_Garamond({ variable: "--font-cormorant-garamond", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
// ✅ Metadata corretto per App Router
export const metadata = {
  title: "P-Max Hair Studio | Barbiere Professionale a Napoli - Taglio Uomo & Barba",
  description: "🔥 Barbiere professionale a Napoli specializzato in tagli moderni, rasatura tradizionale e trattamenti barba. Prenota ora il tuo taglio sfumato da P-Max Hair Studio!",
  keywords: [
    // Location-specific (Pianura e zone limitrofe)
    "barbiere Pianura",
    "barbiere Pianura Napoli",
    "P-Max Hair Studio Pianura",
    "barber shop Pianura",
    "parrucchiere uomo Pianura",
    "taglio uomo Pianura",
    "barbiere 80126",
    "barbiere zona Pianura",
    "hair studio Pianura",

    // Zone limitrofe (alta rilevanza geografica)
    "barbiere Soccavo",
    "barbiere Fuorigrotta",
    "barbiere Bagnoli",
    "barbiere Agnano",
    "parrucchiere uomo Soccavo",
    "taglio uomo Fuorigrotta",
    "barber shop Bagnoli",
    "barbiere zona ovest Napoli",
    "barbiere Campi Flegrei",

    // Collegamenti trasporti (per chi viaggia)
    "barbiere circumflegrea",
    "barbiere stazione Pianura",
    "barbiere via Montagna Spaccata",
    "barbiere tangenziale Napoli",
    "barbiere uscita Fuorigrotta",

    // Napoli generale
    "barbiere Napoli",
    "P-Max Hair Studio",
    "barber shop Napoli",
    "taglio uomo Napoli",
    "rasatura barba Napoli",
    "parrucchiere uomo Napoli",
    "barbiere professionale Napoli",
    "hair studio Napoli",

    // Servizi specifici
    "taglio sfumato",
    "taglio moderno uomo",
    "barba curata",
    "rasatura tradizionale",
    "grooming maschile",
    "taglio fade",
    "barbiere con barba",
    "taglio capelli uomo",
    "rifinitura barba",
    "taglio professionale",

    // Quartieri giovani / target demografico
    "barbiere per giovani Pianura",
    "taglio trendy Pianura",
    "barbiere moderno Pianura",
    "hair studio giovani",

    // Servizi online/booking
    "prenotazione barbiere online",
    "prenota taglio Pianura",
    "barbiere prenotazione online Napoli",
    "book barbiere Pianura",

    // Long-tail keywords locali
    "miglior barbiere Pianura",
    "barbiere economico Pianura",
    "barbiere vicino a me Pianura",
    "dove tagliare capelli Pianura",
    "barbiere aperto domenica Pianura",
    "barbiere Pianura recensioni",

    // Municipalità IX (Pianura + Soccavo)
    "barbiere nona municipalità",
    "barbiere municipalità 9 Napoli",

    // Zone specifiche limitrofe per intercettare traffico
    "barbiere Quarto",
    "barbiere Pozzuoli vicino",
    "barbiere Vomero collegato",
    "barbiere periferia ovest Napoli",

    // Tipo di establishment  
    "salone uomo Pianura",
    "men grooming Pianura",
    "gentleman club Pianura",
    "traditional barber Pianura",

    // Competitive keywords
    "barbiere professionale 80126",
    "taglio capelli 80126",
    "P-Max Hair Studio Napoli",
    "barbiere di fiducia Pianura",
    "barbiere storico Pianura"
  ],
  authors: [{ name: "P-Max Hair Studio", url: "https://pmaxhairstudio.it" }],
  creator: "P-Max Hair Studio - Barbiere Napoli",
  publisher: "P-Max Hair Studio",

  // Ottimizzazione per i motori di ricerca 2025
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph ottimizzato
  openGraph: {
    title: "P-Max Hair Studio | Il Miglior Barbiere a Napoli 🔥",
    description: "Scopri l'arte del grooming maschile da P-Max Hair Studio: tagli moderni, barba perfetta, stile impeccabile. Il barbiere di fiducia a Napoli dal 2020.",
    url: "https://pmaxhairstudio.it",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhairstudio.it/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "P-Max Hair Studio - Barbiere Professionale Napoli - Taglio Uomo",
      },
      {
        url: "https://pmaxhairstudio.it/og-logo.png",
        width: 800,
        height: 600,
        alt: "Logo P-Max Hair Studio Napoli",
      },
    ],
    locale: "it_IT",
    type: "website",
  },

  // Twitter Card ottimizzata
  twitter: {
    card: "summary_large_image",
    title: "P-Max Hair Studio | Barbiere #1 a Napoli",
    description: "🎯 Taglio perfetto, barba impeccabile, stile unico. Prenota il tuo appuntamento dal miglior barbiere di Napoli!",
    images: ["https://pmaxhairstudio.it/twitter-image.jpg"],
    creator: "@pmaxhair",
    site: "@pmaxhair",
  },

  // Favicon e icone ottimizzate
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },

  // Meta aggiuntivi per SEO locale
  other: {
    // Schema.org per Local Business
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["HairSalon", "LocalBusiness", "BeautySalon"],
      "name": "P-Max Hair Studio",
      "description": "Barbiere professionale a Napoli specializzato in tagli moderni, rasatura tradizionale e trattamenti barba premium",
      "url": "https://pmaxhairstudio.it",
      "telephone": "+39-338-1154473",
      "email": "pmaxhairstudio@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Provinciale, 46",
        "addressLocality": "Napoli",
        "addressRegion": "Campania",
        "postalCode": "80126",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.860518",
        "longitude": "14.171176"
      },
      "openingHours": [
        "Mo-Sa 09:00-19:00"
      ],
      "priceRange": "€€",
      "servedCuisine": null,
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Barbiere",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Taglio Uomo",
              "description": "Taglio moderno e personalizzato"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Rasatura Barba",
              "description": "Rasatura tradizionale con lame calde"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8", // Inserisci rating reale
        "reviewCount": "127" // Inserisci numero recensioni reali
      },
      "sameAs": [
        "https://www.facebook.com/pmaxhairstudio",
        "https://www.instagram.com/pmaxhairstudio",
        "https://www.google.com/maps/place/P-Max+Hair+Studio"
      ]
    }),

    // Meta per local SEO
    "geo.region": "IT-CA",
    "geo.placename": "Napoli",
    "geo.position": "40.860518;14.171176", // Inserisci coordinate GPS
    "ICBM": "40.860518, 14.171176",


    // Meta per performance 
    "theme-color": "#000000",
    "color-scheme": "light dark",

    // Canonical
    "canonical": "https://pmaxhairstudio.it",

    // Hreflang per SEO internazionale (opzionale)
    "alternate": {
      "it": "https://pmaxhairstudio.it",
    }
  },

  // Metadata per Next.js 14+
  metadataBase: new URL("https://pmaxhairstudio.it"),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
    },
  },

  // Categoria del sito
  category: "Beauty & Personal Care",

  // Informazioni di classificazione
  classification: "Hair Salon, Barber Shop, Men's Grooming",

  // Formato della data
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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

        {/* google tag */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FRLCJ027JZ" />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FRLCJ027JZ');
    `
          }}
        />

        <Script
          id="iubenda-loader"
          strategy="beforeInteractive"
          src="https://cdn.iubenda.com/cs/iubenda_cs.js"
          charSet="UTF-8"
        />
        {/* ⬆️ Fine snippet Iubenda */}
      </head>

      {/* CONTENUTO */}

      {/* TANSTACKQUERY */}
      <ReactQueryProvider>

        {/* CONTEXT API */}
        <AuthProvider>

          {/* main */}
          <body
            suppressHydrationWarning
            className={` ${playfairDisplay.variable} ${oswald.variable} ${exo.variable} ${cormorantGaramond.variable} antialiased overflow-x-hidden`}
          >
            {/* Contenuto del sito */}
            {children}
            <Toaster position="bottom-center" reverseOrder={false} />
          </body>


        </AuthProvider>


      </ReactQueryProvider>
    </html>
  );
}
