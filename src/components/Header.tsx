import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import clarityLogo from "/favicon.png";

import { useEffect, useState } from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              <a 
                href="#features"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Features
              </a>
              <a 
                href="#extension"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Extension
              </a>
              <a 
                href="#pricing"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Pricing
              </a>
              <Link 
                to="/enterprise"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Enterprise
              </Link>
              <a 
                href="#contact"
                className="text-foreground hover:text-foreground transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-black text-white rounded-full px-5 py-2 transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(30,90,255,0.15)]"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-black text-white rounded-full px-4 text-sm transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(30,90,255,0.15)]"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
