import ImageSlideShow from "@/components/Home/ImageSlideShow";
import IntroHome from "@/components/Home/IntroHome";
import Partners from "@/components/Home/partners";
import ServicesHome from "@/components/Home/ServicesHome";
import Testimonials from "@/components/Home/testimonials";
import Staffs from "@/components/Home/Staffs";
import HeroSection from "@/components/About-us/HeroSection";





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
