import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Target, 
  Sparkles,
  MessageSquare,
  FileText,
  BarChart3,
  Calendar
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Answer Generation",
      description: "Our AI processes interview questions in milliseconds, providing contextually relevant answers based on your CV and the job requirements."
    },
    {
      icon: Brain,
      title: "Advanced Natural Language Processing",
      description: "Using cutting-edge AI models trained on thousands of successful interviews to understand context, tone, and provide human-like responses."
    },
    {
      icon: FileText,
      title: "Smart Note-Taking & Summaries",
      description: "Automatically captures key points, creates structured meeting summaries, and identifies action items without missing important details."
    },
    {
      icon: BarChart3,
      title: "Performance Analysis & Prediction",
      description: "Analyzes your interview performance, communication style, and CV compatibility to predict acceptance probability with 85% accuracy."
    },
    {
      icon: MessageSquare,
      title: "Intelligent Question Suggestions",
      description: "Recommends strategic questions to ask interviewers based on the company, role, and conversation flow to demonstrate engagement."
    },
    {
      icon: Calendar,
      title: "Post-Interview Task Management",
      description: "For current employees, creates organized task schedules from meeting discussions and tracks project timelines automatically."
    }
  ];

  const benefits = [
    {
      title: "For Job Seekers",
      points: [
        "Overcome interview anxiety with AI-powered confidence",
        "Never struggle with difficult questions again",
        "Increase job offer probability by up to 73%",
        "Get professional feedback on your performance"
      ]
    },
    {
      title: "For Current Employees", 
      points: [
        "Stay organized with automatic meeting summaries",
        "Never miss important action items or deadlines",
        "Improve workplace communication and efficiency",
        "Focus on work while AI handles administrative tasks"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              About Our AI Technology
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              How <span className="text-primary">Clarity</span> Transforms Your Career
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Discover the advanced AI technology that's helping thousands of professionals 
              excel in interviews and meetings, powered by state-of-the-art machine learning models.
            </p>
          </div>
        </section>

        {/* AI Technology Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our AI Model Explained</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Clarity combines multiple AI technologies to create the most comprehensive interview assistant available.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-card/50 border-border hover:bg-card/80 transition-colors">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Who Benefits from Clarity?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI technology serves professionals at every stage of their career journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-8 bg-muted/10 border-border">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      {index === 0 ? (
                        <Target className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Users className="w-5 h-5 text-primary-foreground" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {benefit.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <Card className="p-8 text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Privacy & Security First</h2>
              <p className="text-muted-foreground mb-6">
                Your interview data is processed with enterprise-grade security. We never store personal 
                conversation content and all data is encrypted end-to-end. Your privacy is our commitment.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold">End-to-End Encryption</div>
                  <div className="text-muted-foreground">All data encrypted in transit and at rest</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">No Data Storage</div>
                  <div className="text-muted-foreground">Personal conversations are never permanently stored</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">SOC 2 Compliant</div>
                  <div className="text-muted-foreground">Meeting highest industry security standards</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Transform Your <span className="text-primary">Career?</span>
              </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using Clarity to excel 
              in their interviews and advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg">
                View Pricing Plans
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;