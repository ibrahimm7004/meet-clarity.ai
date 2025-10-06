import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Zap, 
  Crown,
  Shield
} from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: "Essential tools for interview preparation",
      badge: "Get Started",
      features: [
        "Automated note-taking during interviews/meetings",
        "Professional meeting summaries",
        "Basic interview performance insights",
        "Follow-up email summaries",
        "Email support",
        "5 interviews per month limit"
      ],
      notIncluded: [
        "Real-time AI answers",
        "Advanced interview analysis", 
        "Unlimited interviews",
        "Priority support"
      ]
    },
    {
      name: "Pro", 
      icon: Crown,
      price: { monthly: 24.99, annual: 250 },
      description: "Everything you need to ace interviews & succeed at work",
      badge: "Best Value",
      popular: true,
      features: [
        "Everything in Free Plan",
        "Real-time Clarity answer search (0.3s response)",
        "Advanced interview analysis & scoring", 
        "Acceptance probability prediction",
        "CV-interview compatibility analysis",
        "Meeting action items & timelines",
        "Advanced question bank (1000+ questions)",
        "Industry-specific optimization",
        "Post-job meeting summaries & task scheduling",
        "Automated work timeline management",
        "Follow-up email automation with action items",
        "Priority support",
        "Unlimited interviews"
      ],
      notIncluded: []
    }
  ];

  const savings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savedAmount = monthlyCost - annual;
    const percentage = Math.round((savedAmount / monthlyCost) * 100);
    return { amount: savedAmount, percentage };
  };

  return (
    <section id="pricing" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-3 md:mb-4 text-xs sm:text-sm">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground px-4">
            Choose Your Success Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Start with a 7-day free trial. No credit card required. 
            Cancel anytime with just one click. Continue with us after getting the job 
            for ongoing meeting management and task scheduling.
          </p>
          
          {/* Free Trial Highlight */}
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
            <span className="text-success font-medium">7-Day Free Trial • No Credit Card Required</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const annualSavings = savings(plan.price.monthly, plan.price.annual);
            
            return (
              <Card 
                key={index} 
                className={`p-4 sm:p-5 md:p-6 relative overflow-hidden ${
                  plan.popular 
                    ? 'border-2 border-primary bg-card glow-primary' 
                    : 'border-border bg-card/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    {plan.badge}
                  </div>
                )}
                
                <div className={`space-y-4 ${plan.popular ? 'pt-6' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-gradient-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <plan.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        {!plan.popular && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {plan.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center space-y-3">
                    {plan.name === "Free" ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold text-foreground">
                            Free
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Always free
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold text-foreground">
                            ${plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          or ${plan.price.annual}/year{" "}
                          <Badge variant="outline" className="text-xs text-success border-success/50">
                            Save {annualSavings.percentage}%
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-center text-sm">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.notIncluded.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <ul className="space-y-1">
                          {plan.notIncluded.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2 opacity-50">
                              <div className="w-4 h-4 border border-muted-foreground/30 rounded-full flex-shrink-0 mt-0.5"></div>
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Free Trial & CTA */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground text-center h-[20px]">
                      {plan.name !== "Free" ? "7-Day Free Trial" : " "}
                    </p>
                    <Button 
                      className="w-full"
                      size="lg"
                    >
                      {plan.name === "Free" ? "Download Now" : "Subscribe Now"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>30-day money-back guarantee • Cancel anytime</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 md:mb-8 px-4">Frequently Asked Questions</h3>
          <div className="grid gap-4 sm:gap-6">
            <Card className="p-4 sm:p-5 md:p-6">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">What happens after the free trial?</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your free trial gives you full access to all Pro features for 7 days. 
                You can cancel anytime during the trial with no charges.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Can I switch between plans?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! You can upgrade or downgrade your plan at any time. 
                Changes take effect immediately with prorated billing.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Is my interview data secure?</h4>
              <p className="text-muted-foreground text-sm">
                Absolutely. We use enterprise-grade encryption and never store 
                personal interview content. Your privacy is our top priority.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;