import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickActions from "@/components/QuickActions";
import CoreTools from "@/components/CoreTools";
import PopularSearches from "@/components/PopularSearches";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <QuickActions />
        <CoreTools />
        <PopularSearches />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
