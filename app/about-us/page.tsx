import History from "@/components/About-us/History";
import Saloon from "@/components/About-us/Saloon";
import WhyChoose from "@/components/About-us/whyChose";
import Staffs from "@/components/Home/Staffs";
import type { Metadata } from "next";
import TransitionOptions from "@/components/UI/TransitionOptions";

export const metadata: Metadata = {
  title: "Chi Siamo | P-Max Hair Studio Napoli",
  description: "Scopri la storia, il team e la filosofia di P-Max Hair Studio. Un barber shop a Napoli dedicato allo stile maschile con passione e professionalità.",
  keywords: [
    "barbiere Napoli",
    "team P-Max Hair Studio",
    "chi siamo",
    "barber shop napoli",
    "salone da uomo napoli",
    "barba e capelli napoli"
  ],
  openGraph: {
    title: "Chi Siamo | P-Max Hair Studio",
    description: "Conosci il nostro staff, la nostra storia e la filosofia P-Max. Lo stile maschile incontra la professionalità a Napoli.",
    url: "https://pmaxhairstudio.it/about-us",
    siteName: "P-Max Hair Studio",
    images: [
      {
        url: "https://pmaxhairstudio.it/og-about.jpg", // cambia se hai immagine diversa per OG
        width: 1200,
        height: 630,
        alt: "Chi Siamo - P-Max Hair Studio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | P-Max Hair Studio",
    description: "Scopri il team e la storia di P-Max Hair Studio, barber shop professionale a Napoli.",
    images: ["https://pmaxhairstudio.it/og-about.jpg"],
    creator: "@pmaxhair",
  },
};




export default function AboutUs() {
    return (

        <main className="pt-[7rem] bg-black">
            {/* header */}
            <TransitionOptions>
                <History />
            </TransitionOptions>

            {/* speciality */}
            <TransitionOptions>
                <WhyChoose />
            </TransitionOptions>

            {/* staff */}
            <TransitionOptions>
                <Staffs />
            </TransitionOptions>

            {/* saloon */}
            <TransitionOptions>
                <Saloon />
            </TransitionOptions>

        </main>
    )
}