import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExtensionSection from "@/components/ExtensionSection";
import EmailFollowUpSection from "@/components/EmailFollowUpSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <ExtensionSection />
        <EmailFollowUpSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
