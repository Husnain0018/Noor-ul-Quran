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
        <div id="hero"><HeroSection /></div>
        <div id="quick-actions"><QuickActions /></div>
        <div id="core-tools"><CoreTools /></div>
        <div id="popular-searches"><PopularSearches /></div>
        <div id="quick-links"><QuickLinks /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
