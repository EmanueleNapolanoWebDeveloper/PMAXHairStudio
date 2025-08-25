import IntroHome from "@/app/(home)/(homepage)/_Sections/_IntroHome/IntroHome";
import Partners from "@/app/(home)/(homepage)/_Sections/_Partners/partners";
import ServicesHome from "@/app/(home)/(homepage)/_Sections/_ServicesHome/ServicesHome";
import Testimonials from "@/app/(home)/(homepage)/_Sections/_Reviews/testimonials";
import HeroSection from "@/app/(home)/(homepage)/_Sections/_HeroSection/HeroSection";





export default function Home() {
  return (
    <main className="pt-[4rem] bg-black">
      {/* hero section */}
      <HeroSection />

      {/* intro */}
      <IntroHome />

      {/* partner */}
      <Partners />

      {/* servizi */}
      <ServicesHome />

      {/* testimonials */}
      <Testimonials />
    </main>

  );
}
