import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "pro";
  const billing = searchParams.get("billing") || "monthly";

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    pro: {
      name: "Pro",
      icon: Crown,
      price: { monthly: 24.99, annual: 250 },
      description: "Everything you need to ace interviews & succeed at work",
    },
  };

  const selectedPlan = plans[plan as keyof typeof plans] || plans.pro;
  const price = billing === "annual" ? selectedPlan.price.annual : selectedPlan.price.monthly;
  const savings = billing === "annual" ? (selectedPlan.price.monthly * 12 - selectedPlan.price.annual) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/#pricing")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selectedPlan.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{selectedPlan.name} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {billing === "annual" ? "Annual billing" : "Monthly billing"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${price}</p>
                    {billing === "annual" && (
                      <p className="text-xs text-muted-foreground">per year</p>
                    )}
                  </div>
                </div>

                {billing === "annual" && savings > 0 && (
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      You're saving ${savings.toFixed(2)} per year!
                    </p>
                  </div>
                )}

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${price}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features Included */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-foreground">What's included:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">7-Day Free Trial</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">Real-time Clarity answer search</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">Advanced interview analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">Unlimited interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">Priority support</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Payment Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    // Payment gateway integration will go here
                    alert("Payment gateway integration coming soon!");
                  }}
                >
                  Complete Payment
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing your purchase, you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </Card>

            {/* Security Notice */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground/70">
                🔒 Your payment information is secure and encrypted. We use industry-standard security measures to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

