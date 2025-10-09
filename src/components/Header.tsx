import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import clarityLogo from "/favicon.png";

import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signUpHref = "/auth?mode=signup";

  return (
    <header className="sticky top-4 z-50 px-4">
      <div
        className={`container mx-auto transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`rounded-xl border transition-all duration-300 backdrop-blur-[7px] ${
            scrolled
              ? "border-[var(--color-border)]"
              : "border-[var(--color-border)]"
          }`}
          style={{
            background: "rgba(255,255,255,0.40)",
            boxShadow: scrolled
              ? "0 12px 32px rgba(0,0,0,0.13)"
              : "0 10px 28px rgba(0,0,0,0.12)",
          }}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={clarityLogo} alt="Clarity Logo" className="h-8 w-8" />
              <Link to="/" className="hidden sm:block text-sm font-semibold text-foreground">
                Clarity
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Home
              </Link>
              <a 
                href="#pricing"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Pricing
              </a>
              <a 
                href="#contact"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => navigate(signUpHref)}
                className="rounded-full px-5 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                aria-label="Create account"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-3">
              <a 
                href="#pricing"
                className="text-foreground text-sm"
              >
                Pricing
              </a>
              <a 
                href="#contact"
                className="text-foreground text-sm"
              >
                Contact
              </a>
              <Button 
                onClick={() => navigate(signUpHref)}
                className="rounded-full px-4 text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                aria-label="Create account"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
