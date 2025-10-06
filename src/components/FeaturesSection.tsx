import { useState, useEffect } from "react";
import { Play, Pause, Volume2, Maximize2, CheckSquare, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(7);
  const [isSpeaking1, setIsSpeaking1] = useState(false);
  const [isSpeaking2, setIsSpeaking2] = useState(true);
  const [currentAction, setCurrentAction] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => (prev < 45 ? prev + 1 : 0));
        
        // Alternate speaking between participants
        if (currentTime % 3 === 0) {
          setIsSpeaking1((prev) => !prev);
          setIsSpeaking2((prev) => !prev);
        }
        
        // Cycle through actions
        if (currentTime % 5 === 0) {
          setCurrentAction((prev) => (prev + 1) % 4);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentTime]);

  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground animate-fade-in">
            See Clarity in Action
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto animate-fade-in px-4">
            Clarity works seamlessly during your Zoom, Teams, or Google Meet interviews
          </p>
        </div>

        {/* Realistic Zoom Meeting Demo */}
        <div className="max-w-6xl mx-auto">
          {/* Zoom Window */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Zoom Title Bar */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-white text-sm font-medium">Zoom Meeting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Recording
                </div>
              </div>
            </div>

            {/* Zoom Meeting Content */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 aspect-video p-4 md:p-6">
              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-full">
                {/* Interviewer Video */}
                <div className={`relative bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl overflow-hidden border-2 transition-all duration-300 ${isSpeaking1 ? 'border-green-400 shadow-lg shadow-green-400/30' : 'border-gray-700'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto mb-3 flex items-center justify-center text-2xl md:text-3xl font-bold text-white transition-transform duration-200 ${isSpeaking1 ? 'scale-110' : 'scale-100'}`}>
                        RL
                      </div>
                      {isSpeaking1 && (
                        <div className="flex gap-1 justify-center mt-2">
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                          <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <p className="text-white text-sm font-medium">Roy Lee (Host)</p>
                  </div>
                  {isSpeaking1 && (
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5">
                      <Volume2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Your Video */}
                <div className={`relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl overflow-hidden border-2 transition-all duration-300 ${isSpeaking2 ? 'border-green-400 shadow-lg shadow-green-400/30' : 'border-gray-700'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto mb-3 flex items-center justify-center text-2xl md:text-3xl font-bold text-white transition-transform duration-200 ${isSpeaking2 ? 'scale-110' : 'scale-100'}`}>
                        NS
                      </div>
                      {isSpeaking2 && (
                        <div className="flex gap-1 justify-center mt-2">
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                          <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <p className="text-white text-sm font-medium">Neel Shanmugam (You)</p>
                  </div>
                  {isSpeaking2 && (
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5">
                      <Volume2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Clarity Window - Translucent Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-20 animate-fade-in">
                <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
                  {/* Clarity Window Header */}
                  <div className="bg-white/30 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-white/40">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">Clarity</span>
                      <div className="flex items-center gap-1 ml-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-foreground/70 text-xs">Active</span>
                      </div>
                    </div>
                    <button className="text-foreground/60 hover:text-foreground transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clarity Content - Pure Answer */}
                  <div className="p-5 bg-white/30 backdrop-blur-xl">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase tracking-wide">Suggested Answer</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed mb-3">
                          "I optimized database queries by implementing proper indexing and query optimization strategies. 
                          This reduced load times by 60% and improved overall system performance."
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          "I used EXPLAIN ANALYZE to identify slow queries, added composite indexes on frequently 
                          queried columns, and implemented connection pooling to reduce overhead."
                        </p>
                      </div>
                    </div>

                    {/* Active Indicator */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/60">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-foreground/60">Listening</span>
                      </div>
                      <span className="text-xs text-foreground/50">Response time: 0.3s</span>
                    </div>
                  </div>
                </div>

                {/* Keyboard Hint */}
                <div className="mt-3 flex justify-center">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <p className="text-white text-xs">⌘+Shift+C to hide</p>
                  </div>
                </div>
              </div>

              {/* Zoom Controls Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-3 md:gap-4 shadow-lg">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <div className="h-6 w-px bg-white/20" />
                <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                  <span className="text-white text-xs md:text-sm font-medium">End</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Features Below */}
          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Always on Top</h3>
              <p className="text-sm text-foreground/70">
                Clarity floats above all applications, ready when you need it
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Instant Access</h3>
              <p className="text-sm text-foreground/70">
                Show or hide with a simple keyboard shortcut
              </p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Zero Distraction</h3>
              <p className="text-sm text-foreground/70">
                Translucent design keeps your focus on the conversation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
