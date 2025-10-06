import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Chrome, Check } from "lucide-react";
import DownloadModal from "./DownloadModal";

const ExtensionSection = () => {
  const [showModal, setShowModal] = useState(false);

  const features = [
    {
      icon: "⚡",
      title: "Instant Installation",
      description: "One-click install directly from Chrome Web Store"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "No data stored permanently, local-first approach"
    },
    {
      icon: "🎯",
      title: "Works Everywhere",
      description: "Compatible with Zoom, Google Meet, and Microsoft Teams"
    },
    {
      icon: "🚀",
      title: "Lightweight",
      description: "Minimal resource usage, won't slow down your calls"
    }
  ];

  const benefits = [
    "Real-time AI answers during interviews",
    "Automatic note-taking and organization",
    "Professional follow-up email generation",
    "Performance insights and scoring",
    "Always-on-top floating overlay",
    "Keyboard shortcuts for quick access"
  ];

  return (
    <section id="extension" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Chrome className="w-4 h-4" />
            Chrome Extension Available
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get Clarity on Every Browser
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Install the Clarity Chrome extension and bring AI-powered interview assistance 
            to all your video calls. Works seamlessly with Zoom, Google Meet, and Teams.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Why Choose the Extension?
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 bg-card rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Benefits & CTA */}
          <div className="bg-card rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Chrome className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Install Clarity Extension
              </h3>
              <p className="text-muted-foreground text-sm">
                Free for all Clarity users
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg font-semibold"
              onClick={() => setShowModal(true)}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Extension
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Compatible with Chrome, Brave, Edge, and other Chromium-based browsers
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "50K+", label: "Active Users" },
            { number: "500K+", label: "Interviews Assisted" },
            { number: "4.8★", label: "Average Rating" },
            { number: "100%", label: "Free to Use" }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default ExtensionSection;
