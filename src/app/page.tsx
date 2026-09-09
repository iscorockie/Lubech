import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhoItsFor from "@/components/sections/WhoItsFor";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import Projects from "@/components/sections/Projects";
import WhyLubech from "@/components/sections/WhyLubech";
import Team from "@/components/sections/Team";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold">
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <WhoItsFor />
        <Process />
        <Technologies />
        <Projects />
        <WhyLubech />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
