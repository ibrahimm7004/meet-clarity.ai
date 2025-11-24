import { useState } from "react";
import { Button } from "@/components/ui/button";
import DownloadModal from "./DownloadModal";

const HeroSection = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Content */}
        <div className="text-center space-y-6 md:space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 
              style={{ fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif" }}
              className="text-center text-[56px] leading-[102%] font-medium tracking-[-1px] text-foreground lg:text-[80px]"
            >
              <span className="block h-[57px] overflow-hidden lg:h-[76px]">
                <span className="inline-block" style={{ transform: 'none' }}>CHEAT</span>{' '}
                <span className="inline-block" style={{ transform: 'none' }}>ON</span>{' '}
                <span className="inline-block" style={{ transform: 'none' }}>EVERY</span>
              </span>
              <span className="block h-[70px] overflow-hidden lg:h-[94px]">
                <span className="inline-block" style={{ transform: 'none' }}>MEETING</span>{' '}
                <span className="inline-block" style={{ transform: 'none' }}>WITH</span>
              </span>
              <span className="block h-[70px] overflow-hidden lg:h-[94px]">
                <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ transform: 'none' }}>
                  CLARITY
                </span>
              </span>
            </h1>
            
            {/* Divider */}
            <div className="w-24 h-px bg-border mx-auto"></div>

            {/* Subheading */}
            <p className="text-center leading-[140%] font-medium tracking-[-0.02em] text-foreground lg:text-[19px]">
              Get accurate notes, live transcripts, and<br />
              follow-up emails at the end of every meeting.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center pt-4">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="purple-gradient-button rounded-[10px] flex items-center gap-[6px] w-fit text-white font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden"
            >
              <span style={{ opacity: 1, transform: 'none' }} className="relative z-30">Get Extension</span>
              <span className="absolute top-0 left-0 z-10 h-full w-full blur-[1px] rounded-[10px] pointer-events-none opacity-30"></span>
              <span className="blurred-border absolute -top-px -left-px z-10 h-full w-full rounded-[10px] pointer-events-none"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </section>
  );
};

export default HeroSection;
