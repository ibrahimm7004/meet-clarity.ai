import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Chrome } from "lucide-react";
import DownloadModal from "./DownloadModal";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const slides = [
    {
      title: "Real-Time Clarity Answers",
      description: "Get instant responses to interview questions in 0.3 seconds",
      users: "20K+ users",
      color: "hsl(260, 70%, 70%)",
    },
    {
      title: "Smart Note-Taking",
      description: "Automatic transcription and intelligent organization",
      users: "15K+ active",
      color: "hsl(140, 60%, 65%)",
    },
    {
      title: "Follow-up Emails",
      description: "Clarity-generated professional follow-up messages",
      users: "10K+ sent",
      color: "hsl(30, 100%, 70%)",
    },
  ];

  // ---- Carousel ----
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ---- Interactive Canvas Glow ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const mouse = { x: -9999, y: -9999 };
    const grid: any[] = [];
    const cellSize = 200;

    const initGrid = () => {
      grid.length = 0;
      for (let x = 0; x < width; x += cellSize) {
        for (let y = 0; y < height; y += cellSize) {
          grid.push({ x, y, alpha: 0, fading: false, lastTouched: 0 });
        }
      }
    };

    const getCellAt = (x: number, y: number) =>
      grid.find(
        (c) => x >= c.x && x < c.x + cellSize && y >= c.y && y < c.y + cellSize
      );

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const cell = getCellAt(mouse.x, mouse.y);
      if (cell && cell.alpha === 0) {
        cell.alpha = 1;
        cell.lastTouched = Date.now();
        cell.fading = false;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Temporary debug tint to verify canvas visibility
      ctx.fillStyle = 'rgba(255,0,0,0.05)';
      ctx.fillRect(0, 0, width, height);
      const now = Date.now();

      for (const cell of grid) {
        // fade logic
        if (cell.alpha > 0 && !cell.fading && now - cell.lastTouched > 500) {
          cell.fading = true;
        }
        if (cell.fading) {
          cell.alpha -= 0.015; // slower decay for smoother blending
          if (cell.alpha <= 0) {
            cell.alpha = 0;
            cell.fading = false;
          }
        }

        // draw blobs
        if (cell.alpha > 0) {
          // Add subtle organic jitter for breathing effect
          const jitterX = (Math.random() - 0.5) * 2;
          const jitterY = (Math.random() - 0.5) * 2;
          const cx = cell.x + cellSize / 2 + jitterX;
          const cy = cell.y + cellSize / 2 + jitterY;
          
          const gradient = ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            cellSize * 0.9
          );
          // softer, lighter blue glow with smoother falloff
          gradient.addColorStop(0, `rgba(60,140,255,${cell.alpha * 0.25})`);
          gradient.addColorStop(0.5, `rgba(100,180,255,${cell.alpha * 0.15})`);
          gradient.addColorStop(1, `rgba(150,210,255,0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(cx, cy, cellSize * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    initGrid();
    draw();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ---- UI ----
  return (
    <section id="home" className="relative py-16 md:py-24 px-4 overflow-hidden bg-[#F8F9FB]">
      {/* Interactive glowing canvas */}
      <canvas
        ref={canvasRef}
        id="blobCanvas"
        className="pointer-events-none absolute inset-0 w-full h-full z-0 blur-[40px]"
      />

      {/* Subtle background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Hero content */}
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="leading-[1.1] tracking-tight mb-8">
          <span className="block font-bold text-[4.2rem] md:text-[5rem]">
            CHEAT ON EVERY
          </span>
          <span className="block font-bold text-[4.2rem] md:text-[5rem] mt-1">
            MEETING WITH
          </span>
          <span className="block mt-2 font-extrabold bg-gradient-to-r from-[#1E5AFF] to-[#00B3FF] bg-clip-text text-transparent text-[5rem] md:text-[6rem] drop-shadow-[0_2px_6px_rgba(30,90,255,0.2)]">
            CLARITY
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-[#444A52] leading-8 mb-10 max-w-3xl mx-auto">
          Crafting intelligent solutions that turn your wildest interview dreams
          into reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => setShowDownloadModal(true)}
            className="bg-[#1E5AFF] text-white hover:bg-[#0047D1] rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <Chrome className="w-5 h-5" />
            Download Extension
          </Button>
          <Button
            variant="outline"
            className="border border-[#1E5AFF] text-[#1E5AFF] hover:bg-[#E8F0FF] rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
          >
            Get started ✨
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[350px] md:h-[400px] mt-20 flex items-center justify-center">
        {slides.map((slide, index) => {
          const offset = (index - currentSlide + slides.length) % slides.length;
          const isActive = offset === 0;
          const isPrev = offset === slides.length - 1;
          const isNext = offset === 1;

          let transform = "translateX(0%) scale(0.8)";
          let zIndex = 1;
          let opacity = 0;

          if (isActive) {
            transform = "translateX(0%) scale(1)";
            zIndex = 3;
            opacity = 1;
          } else if (isPrev) {
            transform = "translateX(-25%) scale(0.85)";
            zIndex = 2;
            opacity = 0.5;
          } else if (isNext) {
            transform = "translateX(25%) scale(0.85)";
            zIndex = 2;
            opacity = 0.5;
          }

          return (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-out w-[90%] sm:w-[80%] md:w-[70%] h-[260px] sm:h-[300px] md:h-[360px] rounded-2xl shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${slide.color}, ${slide.color})`,
                transform,
                zIndex,
                opacity,
              }}
            >
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-sm shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold">{slide.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {slide.users}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-4">
                      {slide.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          +
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
                      </div>
                      <p className="text-xs text-foreground/60">
                        Join the community
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-foreground w-8"
                  : "bg-foreground/30"
              }`}
            />
          ))}
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
