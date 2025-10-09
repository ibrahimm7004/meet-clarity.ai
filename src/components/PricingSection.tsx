import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown,
  Shield
} from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      icon: () => <span className="text-primary font-bold">F</span>,
      price: { monthly: 0, annual: 0 },
      description: "Practice and try Clarity without automation.",
      badge: "Get Started",
      features: [
        "Automated note-taking during interviews/meetings",
        "Professional meeting summaries",
        "Basic interview performance insights",
        "Follow-up email summaries",
        "Email support",
        "5 interviews per month limit",
      ],
      notIncluded: [
        "Real-time AI answers",
        "Advanced interview analysis",
        "Unlimited interviews",
        "Priority support",
      ],
      footnote: "No credit card required.",
    },
    {
      name: "Pro",
      icon: Crown,
      price: { monthly: 24.99, annual: 250 },
      description: "Everything you need to ace interviews & succeed at work.",
      badge: "Best Value",
      popular: true,
      features: [
        "Everything in Free Plan",
        "Real-time Clarity answers (0.3s response)",
        "Advanced interview analysis & scoring",
        "Acceptance probability prediction",
        "CV-interview compatibility analysis",
        "Meeting action items & timelines",
        "Advanced question bank (1000+ questions)",
        "Industry-specific optimization",
        "Follow-up email automation with action items",
        "Priority support",
        "Unlimited interviews",
      ],
      notIncluded: [],
      footnote: "Cancel anytime.",
    },
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
            Start free and upgrade when you’re ready. No trial. No surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const annualSavings = savings(plan.price.monthly, plan.price.annual);

            return (
              <Card 
                key={index} 
                className={`p-4 sm:p-5 md:p-6 relative overflow-hidden flex flex-col ${
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

                <div className={`space-y-4 ${plan.popular ? 'pt-6' : ''} flex-1 flex flex-col`}>
                  {/* Plan Header */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`${plan.popular ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} w-10 h-10 rounded-lg flex items-center justify-center`}>
                        {typeof plan.icon === 'function' ? plan.icon() : <plan.icon className="w-5 h-5" />}
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
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center space-y-3">
                    {plan.name === "Free" ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold text-foreground">Free</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Always free</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold text-foreground">${plan.price.monthly}</span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          or ${plan.price.annual}/year <Badge variant="outline" className="text-xs">Save {annualSavings.percentage}%</Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-center text-sm">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <ul className="space-y-1">
                          {plan.notIncluded.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start space-x-2 opacity-60">
                              <div className="w-4 h-4 border border-muted-foreground/30 rounded-full flex-shrink-0 mt-0.5"></div>
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Spacer to push CTA to bottom */}
                  <div className="flex-1" />

                  {/* CTA Row */}
                  <div className="space-y-2 pt-2">
                    <Button className="w-full" size="lg">
                      {plan.name === "Free" ? "Download Now" : "Subscribe Now"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {plan.footnote}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Guarantee */}
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
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Is there a free trial?</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                No. Start on Free and upgrade to Pro whenever you’re ready.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Can I switch between plans?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Is my interview data secure?</h4>
              <p className="text-muted-foreground text-sm">
                Absolutely. We use enterprise-grade encryption and never store personal interview content. Your privacy is our top priority.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;