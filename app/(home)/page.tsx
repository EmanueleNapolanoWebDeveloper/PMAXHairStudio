import IntroHome from "@/app/(home)/_components/IntroHome";
import Partners from "@/app/(home)/_components/partners";
import ServicesHome from "@/app/(home)/_components/ServicesHome";
import Testimonials from "@/app/(home)/_components/testimonials";
import HeroSection from "@/app/(home)/about-us/_components/HeroSection";





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
