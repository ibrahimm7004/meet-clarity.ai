import { MessageSquare, Mail, Brain, FileText } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Real-time Clarity Answers & Smart Note-Taking */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Real-time Clarity Answers */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Real-time Clarity answers
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-6 md:mb-8">
              During every interview, Clarity listens and provides instant, relevant answers in 0.3 seconds.
            </p>
            
            <div className="bg-gradient-to-br from-purple-100/80 to-blue-100/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 min-h-[350px] sm:h-[400px] flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-md shadow-xl">
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium text-foreground/50">Interviewer Question</span>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      "Can you explain your approach to solving complex technical problems?"
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium text-primary">Clarity Suggested Answer</span>
                  </div>
                  <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      "I follow a structured approach: First, I break down the problem into smaller components. 
                      Then I analyze each part systematically, considering edge cases and potential solutions..."
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-xs text-foreground/50">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Active</span>
                  </div>
                  <span>Response time: 0.3s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Note-Taking */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Smart note-taking
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-6 md:mb-8">
              Automatic transcription and intelligent organization during interviews and meetings.
            </p>
            
            <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 min-h-[350px] sm:h-[400px] flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-md shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Interview Transcript</h3>
                  <span className="text-xs text-foreground/50">Live</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-600 mb-1">Technical Discussion</p>
                    <p className="text-sm text-foreground/70">
                      Discussed system architecture and scalability approaches
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-600 mb-1">Key Points</p>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• Microservices architecture preferred</li>
                      <li>• Focus on database optimization</li>
                      <li>• Cloud infrastructure experience</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-600 mb-1">Action Items</p>
                    <p className="text-sm text-foreground/70">
                      Follow up with portfolio examples
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up Email */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Follow-up email
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-6 md:mb-8">
              After every interview, Clarity generates a professional follow-up email and notes based on the conversation.
            </p>
            
            <div className="bg-gradient-to-br from-orange-100/80 to-amber-100/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 min-h-[350px] sm:h-[400px] flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-md shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Generated Follow-up</h3>
                </div>

                <div className="space-y-3">
                  <div className="border-b pb-3">
                    <p className="text-xs text-foreground/50 mb-1">Subject</p>
                    <p className="text-sm font-medium text-foreground">
                      Thank you - Senior Developer Position Interview
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-xs font-medium text-primary mb-2">Email Preview</p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Dear [Interviewer],
                      <br/><br/>
                      Thank you for taking the time to discuss the Senior Developer position. 
                      I enjoyed learning about your team's approach to scalable architecture...
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <FileText className="w-4 h-4" />
                    <span>Includes meeting notes & key discussion points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Performance insights
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-6 md:mb-8">
              Clarity-powered analysis of your interview performance with detailed metrics and improvement suggestions.
            </p>
            
            <div className="bg-gradient-to-br from-pink-100/80 to-purple-100/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 min-h-[350px] sm:h-[400px] flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-md shadow-xl">
                <h3 className="font-bold text-foreground mb-3 md:mb-4 text-sm sm:text-base">Interview Performance</h3>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground/70">Technical Knowledge</span>
                      <span className="font-semibold text-foreground">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-purple-500" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground/70">Communication</span>
                      <span className="font-semibold text-foreground">88%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-purple-500" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground/70">Problem Solving</span>
                      <span className="font-semibold text-foreground">95%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-purple-500" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <p className="text-xs font-medium text-green-700 mb-1">Success Probability</p>
                    <p className="text-2xl font-bold text-green-600">87%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
