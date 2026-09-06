import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RedesignedSections from "@/components/RedesignedSections";
import Footer from "@/components/Footer";

export default function FullRedesignPreview() {
  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <Navigation />
      <main>
        <HeroSection />
        <RedesignedSections />
      </main>
      <Footer />
    </div>
  );
}
