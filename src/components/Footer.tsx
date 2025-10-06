import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border/50 py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">Clarity</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/70 mb-4 md:mb-6 max-w-md">
              Clarity-powered interview assistant that helps you ace every interview and land your dream job.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-sm sm:text-base text-foreground/60 hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm sm:text-base text-foreground/60 hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm sm:text-base text-foreground/60 hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4 text-foreground text-sm sm:text-base">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4 text-foreground text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-foreground/60">
          <p className="text-xs sm:text-sm">&copy; 2024 Clarity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
