import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  Headphones,
  Shield,
  Lock,
  FileCheck,
  Database,
  ChevronDown
} from "lucide-react";
import clarityLogo from "/favicon.png";

const Enterprise = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const useCases = [
    {
      icon: Briefcase,
      title: "Sales calls",
      description: "Win more deals by handling objections confidently and answering any product question in the moment.",
      color: "hsl(260, 70%, 70%)"
    },
    {
      icon: Users,
      title: "Recruiting",
      description: "Hire faster with clearer signals — verify claims in real time and understand exactly what candidates say.",
      color: "hsl(140, 60%, 65%)"
    },
    {
      icon: MessageSquare,
      title: "Consulting",
      description: "Earn trust on the first call — give confident answers and lock next steps without hunting through docs.",
      color: "hsl(30, 100%, 70%)"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Resolve faster and lift CSAT by being fed in real-time exactly how to handle every situation.",
      color: "hsl(200, 80%, 60%)"
    }
  ];

  const dashboardFeatures = [
    {
      title: "AI meeting summaries",
      description: "Every meeting neatly summarized — no effort needed.",
      image: "https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdashboard-1.cb0cfb17.png&w=3840&q=100"
    },
    {
      title: "Usage analytics",
      description: "See when and how reps are using Clarity effectively across calls.",
      image: "https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdashboard-2.c70de35b.png&w=3840&q=100"
    },
    {
      title: "AI meeting coaching",
      description: "Identify moments where Clarity could've helped but wasn't used.",
      image: "https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdashboard-3.d5bb8264.png&w=3840&q=100"
    },
    {
      title: "Cross-call AI chat",
      description: "Clarity answers questions across all your meetings using saved context.",
      image: "https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdashboard-4.e7ed4c1f.png&w=3840&q=100"
    }
  ];

  const features = [
    {
      title: "Company knowledge base",
      description: "Centralize prompts and documents reps can access instantly.",
      image: "grid"
    },
    {
      title: "Team-level settings & permissions",
      description: "Organize users into teams with custom prompts and controls for tailored use.",
      image: "settings"
    },
    {
      title: "AI meeting analytics",
      description: "View detailed AI meeting analytics to identify top reps and areas for improvement.",
      image: "chart"
    }
  ];

  const securityCompliance = [
    {
      icon: Shield,
      title: "ISO 27001 certified",
      description: "International standard for information security management."
    },
    {
      icon: FileCheck,
      title: "SOC 2 Type I & II compliant",
      description: "Proven long-term data security through independent audits."
    },
    {
      icon: Lock,
      title: "GDPR compliance",
      description: "Working to align with EU data protection requirements."
    },
    {
      icon: Database,
      title: "CCPA compliance",
      description: "Working to meet California's privacy protection standards."
    }
  ];

  const technicalSecurity = [
    {
      title: "Data encryption at rest and in transit",
      description: "Encryption protects data stored and transferred."
    },
    {
      title: "Dedicated workspace isolation",
      description: "Organizations are isolated for team data security."
    }
  ];

  const faqs = [
    {
      question: "Why real-time vs. a regular AI notetaker?",
      answer: "Clarity provides instant answers during your meeting, not after. Get the information you need exactly when you need it to keep conversations flowing naturally."
    },
    {
      question: "Who can use Clarity for enterprise?",
      answer: "Any organization with teams conducting interviews, sales calls, or customer meetings can benefit from Clarity's real-time AI assistance."
    },
    {
      question: "Does Clarity train on my data?",
      answer: "No, we never train our models on your proprietary data. Your information remains private and secure."
    },
    {
      question: "Can I try it for free before starting?",
      answer: "Yes! Contact our sales team to schedule a personalized demo and trial period for your organization."
    },
    {
      question: "What languages and apps are supported?",
      answer: "Clarity supports multiple languages and integrates seamlessly with Zoom, Google Meet, Microsoft Teams, and other popular meeting platforms."
    },
    {
      question: "What onboarding is provided with Clarity for enterprise?",
      answer: "We provide comprehensive onboarding including setup assistance, team training, and ongoing support to ensure successful adoption."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">ENTERPRISE</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Imagine everyone knew as much<br />about your company as you.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Put all your company's knowledge at every rep's fingertips with AI-powered answers and objection handling in any conversation.
            </p>
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Talk to sales
            </Button>
          </div>

          {/* Browser mockup with tagline */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-muted/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-background/50 rounded-lg px-4 py-2 text-sm text-muted-foreground">
                  clarity.app
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-xl p-12 text-center">
                <p className="text-2xl font-semibold text-foreground/80">
                  Handle every objection the way your best rep does.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: useCase.color }}
                  >
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            {/* Image Preview */}
            <div className="rounded-2xl aspect-video flex items-center justify-center overflow-hidden bg-muted/50">
              {dashboardFeatures[activeTab].image ? (
                <img
                  src={dashboardFeatures[activeTab].image}
                  srcSet={`${dashboardFeatures[activeTab].image.replace('w=3840', 'w=1920')} 1x, ${dashboardFeatures[activeTab].image} 2x`}
                  alt={dashboardFeatures[activeTab].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-lg font-semibold text-muted-foreground">Dashboard Preview</p>
                </div>
              )}
            </div>
            
            {/* Options List */}
            <div>
              <div className="space-y-4">
                {dashboardFeatures.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className="w-full text-left group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Line/Button indicator */}
                      <div
                        className={`h-1 flex-shrink-0 rounded-full transition-all ${
                          activeTab === index
                            ? 'bg-primary w-12'
                            : 'bg-muted w-8 group-hover:w-10'
                        }`}
                      />
                      {/* Content */}
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-1 transition-colors ${
                            activeTab === index
                              ? 'text-foreground'
                              : 'text-muted-foreground group-hover:text-foreground/80'
                          }`}
                        >
                          {feature.title}
                        </h3>
                        {activeTab === index && (
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything about your company
            </h2>
            <p className="text-xl text-muted-foreground">
              Delivered exactly when you need it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="pointer-events-none aspect-[320/306] rounded-[16px] bg-[radial-gradient(92.09%_126.39%_at_50%_100%,#DDE2EE_58.91%,#BBC5DD_100%)] p-[15px] md:aspect-[316/302] md:rounded-[22px] md:p-5 lg:aspect-[426/406] lg:rounded-[18px] lg:p-3 xl:rounded-[24px] xl:p-6 flex items-center justify-center overflow-hidden">
                  {feature.image === "grid" ? (
                    <img
                      loading="lazy"
                      width="378"
                      height="358"
                      decoding="async"
                      className="rounded-[9px] md:rounded-[11px] lg:rounded-[9px] w-full h-full object-cover"
                      srcSet="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-1.0cf09c8d.jpg&w=384&q=100 1x, https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-1.0cf09c8d.jpg&w=828&q=100 2x"
                      src="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-1.0cf09c8d.jpg&w=828&q=100"
                      alt="Company knowledge base"
                      style={{ color: 'transparent' }}
                    />
                  ) : feature.image === "settings" ? (
                    <img
                      loading="lazy"
                      width="378"
                      height="358"
                      decoding="async"
                      className="rounded-[9px] md:rounded-[11px] lg:rounded-[9px] w-full h-full object-cover"
                      srcSet="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-2.0adb91d9.jpg&w=384&q=100 1x, https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-2.0adb91d9.jpg&w=828&q=100 2x"
                      src="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-2.0adb91d9.jpg&w=828&q=100"
                      alt="Team-level settings & permissions"
                      style={{ color: 'transparent' }}
                    />
                  ) : feature.image === "chart" ? (
                    <img
                      loading="lazy"
                      width="378"
                      height="358"
                      decoding="async"
                      className="rounded-[9px] md:rounded-[11px] lg:rounded-[9px] w-full h-full object-cover"
                      srcSet="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-3.81927191.jpg&w=384&q=100 1x, https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-3.81927191.jpg&w=828&q=100 2x"
                      src="https://cluely.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-3.81927191.jpg&w=828&q=100"
                      alt="AI meeting analytics"
                      style={{ color: 'transparent' }}
                    />
                  ) : (
                    <p className="text-sm font-semibold text-muted-foreground">{feature.image}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Your data is safe with Clarity,<br />all the time
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {securityCompliance.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Technical Security Measures</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalSecurity.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-muted-foreground animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meeting AI that helps during the call, not after.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Try Clarity on your next meeting today.
          </p>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg">
            Talk to sales
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
