import IntroHome from "@/src/app/(Customer)/(homepage)/_Sections/_IntroHome/IntroHome";
import Partners from "@/src/app/(Customer)/(homepage)/_Sections/_Partners/partners";
import ServicesHome from "@/src/app/(Customer)/(homepage)/_Sections/_ServicesHome/ServicesHome";
import Testimonials from "@/src/app/(Customer)/(homepage)/_Sections/_Reviews/testimonials";
import HeroSection from "@/src/app/(Customer)/(homepage)/_Sections/_HeroSection/HeroSection";
import Tariff from "./_Sections/_Tariffs/Tariff";
import Staffs from "./_Sections/_Staffs/Staffs";
import Divider from "./_Sections/_PmaxDivider/Divider";
import Saloon from "./_Sections/_Saloon/Saloon";
import WhyChoose from "./_Sections/_WhyChoise/whyChose";
import '../../globals.css'


export default function Home() {
  return (
    <main className="pt-[4rem] bg-black" id="homeBackground">
      {/* hero section */}
      <HeroSection />

      {/* intro */}
      <IntroHome />

      {/* saloon */}
      <Saloon />

      {/* perchè sceglierciGF */}
      <WhyChoose />

      {/* divider */}
      <Divider />

      {/* Staffs */}
      <Staffs />

      {/* servizi */}
      <ServicesHome />

      <Divider />

      {/* partner */}
      <Partners />

      {/* prezziario */}
      <Tariff />

      {/* testimonials */}
      <Testimonials />
    </main>

  );
}
