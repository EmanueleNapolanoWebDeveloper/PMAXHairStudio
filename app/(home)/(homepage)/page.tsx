import IntroHome from "@/app/(home)/(homepage)/_Sections/_IntroHome/IntroHome";
import Partners from "@/app/(home)/(homepage)/_Sections/_Partners/partners";
import ServicesHome from "@/app/(home)/(homepage)/_Sections/_ServicesHome/ServicesHome";
import Testimonials from "@/app/(home)/(homepage)/_Sections/_Reviews/testimonials";
import HeroSection from "@/app/(home)/(homepage)/_Sections/_HeroSection/HeroSection";
import Tariffs from "./_Sections/_Tariffs/Tariffs";
import Tariff from "./_Sections/_Tariffs/Tariff";
import Staffs from "./_Sections/_Staffs/Staffs";
import Divider from "./_Sections/_PmaxDivider/Divider";





export default function Home() {
  return (
    <main className="pt-[4rem] bg-black">
      {/* hero section */}
      <HeroSection />

      {/* intro */}
      <IntroHome />     

      {/* divider */}
      <Divider />

      {/* Staffs */}
      <Staffs />

      {/* servizi */}
      <ServicesHome />

       {/* partner */}
      <Partners />

      {/* prezziario */}
      <Tariff />    
      
      {/* testimonials */}
      <Testimonials />
    </main>

  );
}
