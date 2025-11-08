import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, X } from "lucide-react";
import clarityLogo from "/favicon.png";
import { useState, useEffect } from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cluely shows button after scrolling more significantly - adjust threshold as needed
      setScrolled(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src={clarityLogo} alt="Clarity Logo" className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-lg md:text-xl font-semibold text-foreground">Clarity</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#pricing"
              className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-foreground focus:underline"
            >
              Pricing
            </a>
            <Link 
              to="/enterprise"
              className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-foreground focus:underline"
            >
              Enterprise
            </Link>
            <a 
              href="#contact"
              className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-foreground focus:underline"
            >
              Careers
            </a>
            <a 
              href="#contact"
              className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-foreground focus:underline"
            >
              Blog
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
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
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`purple-gradient-button rounded-[10px] items-center gap-[6px] w-fit text-white font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative hidden overflow-hidden ${scrolled ? 'sm:flex' : ''}`}
              >
                <span style={{ opacity: 1, transform: 'none' }} className="relative z-30">Get the desktop app</span>
                <span className="absolute top-0 left-0 z-10 h-full w-full blur-[1px] rounded-[10px] pointer-events-none opacity-30"></span>
                <span className="blurred-border absolute -top-px -left-px z-10 h-full w-full rounded-[10px] pointer-events-none"></span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
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
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-3">
            <a 
              href="#pricing"
              className="block text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Link 
              to="/enterprise"
              className="block text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enterprise
            </Link>
            <a 
              href="#contact"
              className="block text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </a>
            <a 
              href="#contact"
              className="block text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  // Navigate to download or open modal
                }}
                className="w-full purple-gradient-button rounded-[10px] flex items-center justify-center gap-[6px] text-white font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden mt-2"
              >
                <span style={{ opacity: 1, transform: 'none' }} className="relative z-30">Get the desktop app</span>
                <span className="absolute top-0 left-0 z-10 h-full w-full blur-[1px] rounded-[10px] pointer-events-none opacity-30"></span>
                <span className="blurred-border absolute -top-px -left-px z-10 h-full w-full rounded-[10px] pointer-events-none"></span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
