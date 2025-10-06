import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Chrome } from "lucide-react";
import DownloadModal from "./DownloadModal";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const slides = [
    {
      title: "Real-Time Clarity Answers",
      description: "Get instant responses to interview questions in 0.3 seconds",
      users: "20K+ users",
      color: "hsl(260, 70%, 70%)"
    },
    {
      title: "Smart Note-Taking",
      description: "Automatic transcription and intelligent organization",
      users: "15K+ active",
      color: "hsl(140, 60%, 65%)"
    },
    {
      title: "Follow-up Emails",
      description: "Clarity-generated professional follow-up messages",
      users: "10K+ sent",
      color: "hsl(30, 100%, 70%)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "180px 180px, 180px 180px",
          backgroundPosition: "center",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(30,90,255,0.18), transparent)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(0,179,255,0.18), transparent)" }} />

      <div className="container mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-14 md:mb-20 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 text-foreground leading-tight tracking-tight">
            <span className="block animate-fade-up" style={{ animationDelay: '0ms' }}>CHEAT ON EVERY MEETING</span>
            <br />
            <span className="animate-fade-up" style={{ animationDelay: '120ms' }}>
              WITH <span className="bg-gradient-to-r from-[#1E5AFF] to-[#00B3FF] bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">CLARITY</span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#444A52] leading-8 mb-8 md:mb-10 max-w-3xl mx-auto px-4 animate-fade-up" style={{ animationDelay: '220ms' }}>
            Crafting intelligent solutions that turn your wildest interview dreams into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowDownloadModal(true)}
              className="bg-[#1E5AFF] text-white hover:bg-[#0047D1] rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            >
              <Chrome className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
              Download Extension
            </Button>
            <Button 
              variant="outline"
              className="border border-[#1E5AFF] text-[#1E5AFF] bg-transparent hover:bg-[#E8F0FF] rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
            >
              Get started ✨
            </Button>
          </div>
        </div>

        {/* Animated Carousel - 3D Effect - Smaller size */}
        <div className="relative w-full max-w-4xl mx-auto h-[280px] sm:h-[320px] md:h-[380px] flex items-center justify-center">{/* Mobile optimized heights */}
          {/* Background Slides */}
          {slides.map((slide, index) => {
            const offset = (index - currentSlide + slides.length) % slides.length;
            const isActive = offset === 0;
            const isPrev = offset === slides.length - 1;
            const isNext = offset === 1;
            
            let transform = "translateX(0%) translateY(0%) scale(0.8) rotate(0deg)";
            let zIndex = 1;
            let opacity = 0;

            if (isActive) {
              transform = "translateX(0%) translateY(0%) scale(1) rotate(0deg)";
              zIndex = 3;
              opacity = 1;
            } else if (isPrev) {
              transform = "translateX(-25%) translateY(5%) scale(0.85) rotate(-3deg)";
              zIndex = 2;
              opacity = 0.5;
            } else if (isNext) {
              transform = "translateX(25%) translateY(5%) scale(0.85) rotate(3deg)";
              zIndex = 2;
              opacity = 0.5;
            }

            return (
              <div
                key={index}
                className="absolute w-[90%] sm:w-[85%] md:w-[70%] h-[240px] sm:h-[280px] md:h-[340px] rounded-2xl md:rounded-[2.5rem] shadow-2xl transition-all duration-700 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${slide.color}, ${slide.color})`,
                  transform,
                  zIndex,
                  opacity,
                }}
              >
                {/* Card Content - Only visible on active slide */}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 max-w-sm shadow-lg">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">{slide.title}</h3>
                        <span className="text-xs text-muted-foreground">{slide.users}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/80 mb-3 sm:mb-4">
                        {slide.description}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            +
                          </div>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white" />
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
                        </div>
                        <p className="text-xs text-foreground/60">Join the community</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-foreground w-8" : "bg-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Download Modal */}
      <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
    </section>
  );
};

export default HeroSection;
