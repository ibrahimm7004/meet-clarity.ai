import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <Card className="p-8 space-y-6">
          <section>
            <p className="text-muted-foreground mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            <p className="mb-4">
              Welcome to Clarity. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By creating an account, downloading our browser extension, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Clarity provides AI-powered tools to help job seekers and employees capture and organize interview notes, generate professional follow-up emails, and receive intelligent insights. Our service includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Browser extension for capturing interview conversations and notes</li>
              <li>AI-powered email generation for professional follow-ups</li>
              <li>Intelligent analysis and categorization of interview content</li>
              <li>Usage tracking and subscription management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To use Clarity, you must create an account using Google Single Sign-On (SSO). You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring that your account information is accurate and up-to-date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Subscription Plans and Billing</h2>
            <p className="text-muted-foreground mb-4">
              Clarity offers multiple subscription tiers:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Free Plan:</strong> Limited usage with basic features</li>
              <li><strong>Pro Plan:</strong> Enhanced usage limits and advanced AI capabilities</li>
              <li><strong>Enterprise Plan:</strong> Custom solutions with unlimited usage and dedicated support</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Subscription fees are billed monthly or annually as selected. All fees are non-refundable except as required by law. We reserve the right to modify pricing with 30 days' notice to existing subscribers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Usage Limits and Fair Use</h2>
            <p className="text-muted-foreground">
              Each subscription plan includes specific usage limits for AI answers, email generation, and interview processing. Exceeding these limits may result in service throttling or suspension. We reserve the right to enforce fair use policies to ensure quality service for all users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use Policy</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use Clarity to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Record conversations without proper consent from all parties where required by law</li>
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Use our services to harass, abuse, or harm others</li>
              <li>Reverse engineer, decompile, or disassemble our software</li>
              <li>Resell or redistribute our services without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Recording Consent</h2>
            <p className="text-muted-foreground">
              You are solely responsible for obtaining all necessary consents and permissions before recording any conversations or interviews using Clarity. Recording laws vary by jurisdiction, and it is your responsibility to comply with all applicable laws. Clarity assumes no liability for your failure to obtain proper consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data and Privacy</h2>
            <p className="text-muted-foreground">
              Your use of Clarity is also governed by our Privacy Policy. We collect, process, and store data as described in our Privacy Policy. By using our services, you consent to such processing and warrant that all data you provide is accurate. We implement industry-standard security measures, but cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content, features, and functionality of Clarity, including but not limited to software, text, graphics, logos, and trademarks, are owned by Clarity or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground">
              You retain ownership of any content you create or upload. By using our AI services, you grant us a limited license to process your content solely to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. AI-Generated Content</h2>
            <p className="text-muted-foreground">
              Clarity uses artificial intelligence to generate emails, analyze content, and provide insights. While we strive for accuracy, AI-generated content may contain errors or inaccuracies. You are responsible for reviewing and verifying all AI-generated content before use. We make no warranties regarding the accuracy, reliability, or completeness of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              CLARITY IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLARITY AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF OUR SERVICES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify, defend, and hold harmless Clarity and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our services, violation of these Terms, or violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use Clarity will immediately cease. You may cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through our service. Your continued use of Clarity after changes constitute acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Clarity operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: legal@clarity.com<br />
              Address: [Company Address]
            </p>
          </section>

          <section className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              By using Clarity, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
