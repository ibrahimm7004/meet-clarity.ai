import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExtensionSection from "@/components/ExtensionSection";
import EmailFollowUpSection from "@/components/EmailFollowUpSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity based on scroll position
  // Stage 1: Starts fading at 600px (when button appears), subtle fade to 40% at 1200px
  // Stage 2: Continues to full white (100%) at 2500px
  const fadeStart = 600;
  const fadeMid = 1200;
  const fadeEnd = 2500;
  
  let opacity = 0;
  if (scrollY >= fadeStart && scrollY <= fadeMid) {
    // Stage 1: Subtle fade from 0% to 40%
    opacity = ((scrollY - fadeStart) / (fadeMid - fadeStart)) * 0.4;
  } else if (scrollY > fadeMid && scrollY <= fadeEnd) {
    // Stage 2: Continue from 40% to 100%
    opacity = 0.4 + ((scrollY - fadeMid) / (fadeEnd - fadeMid)) * 0.6;
  } else if (scrollY > fadeEnd) {
    // Fully white
    opacity = 1;
  }

  return (
    <div className="min-h-screen relative">
      {/* Subtle white overlay that fades in on scroll */}
      <div 
        className="fixed inset-0 bg-white pointer-events-none z-0 transition-opacity duration-500 ease-out"
        style={{ opacity }}
      />
      <div className="relative z-10">
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
    </div>
  );
};

export default Index;
