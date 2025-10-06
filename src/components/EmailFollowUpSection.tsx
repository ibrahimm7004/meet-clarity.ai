import { Mail, Clock, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const EmailFollowUpSection = () => {
  return (
    <section id="email-followup" className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground animate-fade-in">
            Get Better After Every Interview
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto animate-fade-in px-4">
            After every call, Clarity sends you personalized feedback on what went well, what you missed, and how to improve for next time.
          </p>
        </div>

        {/* Email Mockup */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-border/50">
            {/* Email Header */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Clarity AI</p>
                    <p className="text-sm text-foreground/60">insights@clarity.ai</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground/60 flex items-center gap-1 justify-end">
                    <Clock className="w-4 h-4" />
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground/70">
                  <span className="font-medium">To:</span> you@example.com
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  Your Interview Performance Report - Senior Frontend Developer at TechCorp
                </h3>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 bg-white dark:bg-card">
              {/* Greeting */}
              <div>
                <p className="text-foreground/80 leading-relaxed">
                  Hi there! 👋
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  Great job on your interview! Here's your personalized performance breakdown and actionable insights to help you improve.
                </p>
              </div>

              {/* Performance Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="font-bold text-green-900 dark:text-green-100">Strong Points</p>
                  </div>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">8</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <p className="font-bold text-orange-900 dark:text-orange-100">Missed Opportunities</p>
                  </div>
                  <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">4</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <p className="font-bold text-blue-900 dark:text-blue-100">Overall Score</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">85/100</p>
                </div>
              </div>

              {/* What Went Well */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="text-xl font-bold text-foreground">What Went Well</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>You provided a clear and structured answer about React performance optimization using memo and useMemo hooks.</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Your explanation of state management patterns showed deep understanding of Redux and Context API trade-offs.</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Great use of the STAR method when discussing your previous project at StartupXYZ.</span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <h4 className="text-xl font-bold text-foreground">Missed Opportunities</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-orange-50/50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800/50">
                    <p className="font-semibold text-foreground mb-2">
                      💡 You could have mentioned your experience with TypeScript
                    </p>
                    <p className="text-sm text-foreground/70 mb-2">
                      When asked about type safety, you focused only on PropTypes. The interviewer seemed interested in hearing about TypeScript since it's in the job description.
                    </p>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Suggestion: "I also have extensive experience with TypeScript, which provides compile-time type checking and better IDE support compared to PropTypes."
                    </p>
                  </div>
                  
                  <div className="bg-orange-50/50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800/50">
                    <p className="font-semibold text-foreground mb-2">
                      💡 Your answer about CSS-in-JS was brief
                    </p>
                    <p className="text-sm text-foreground/70 mb-2">
                      You mentioned styled-components but didn't elaborate on the benefits. This was a good opportunity to showcase your understanding.
                    </p>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Suggestion: Discuss scoped styles, dynamic theming, and the trade-offs with traditional CSS approaches.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold text-foreground">Next Steps</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Research TechCorp's Tech Stack</p>
                      <p className="text-sm text-foreground/70 mt-1">They use Next.js heavily - prepare examples of SSR/SSG projects you've worked on.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Prepare Follow-up Questions</p>
                      <p className="text-sm text-foreground/70 mt-1">Ask about their deployment process and how they handle A/B testing at scale.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Send Thank You Email</p>
                      <p className="text-sm text-foreground/70 mt-1">Reference your discussion about micro-frontends and express enthusiasm about their architecture.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-foreground/80 leading-relaxed">
                  You're on the right track! With these improvements, you'll be even more prepared for your next round.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  Keep crushing it! 🚀
                </p>
                <p className="text-foreground/60 mt-4">
                  — Your Clarity AI Coach
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                  View Full Analysis
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmailFollowUpSection;
