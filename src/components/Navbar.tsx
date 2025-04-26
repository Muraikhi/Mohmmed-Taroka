
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  label: {
    en: string;
    ar: string;
  };
  href: string;
}

const navItems: NavItem[] = [
  {
    label: { en: "Home", ar: "الرئيسية" },
    href: "/",
  },
  {
    label: { en: "About", ar: "عني" },
    href: "/about",
  },
  {
    label: { en: "Projects", ar: "المشاريع" },
    href: "/projects",
  },
  {
    label: { en: "Game", ar: "اللعبة" },
    href: "/game",
  },
  {
    label: { en: "Contact", ar: "اتصل بي" },
    href: "/contact",
  },
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: "en" | "ar";
  toggleLanguage: () => void;
}

export default function Navbar({ 
  isDarkMode, 
  toggleDarkMode, 
  language, 
  toggleLanguage 
}: NavbarProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-md" 
          : "py-4 bg-transparent"
      )}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-purple-600 rounded-md rotate-45 transform-gpu animate-pulse"></div>
            <div className="absolute inset-1 bg-background rounded-md rotate-45 flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">M</span>
            </div>
          </div>
          <span className="font-bold text-xl">
            {language === "en" ? "Mohamed Taroqa" : "محمد طروقه"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-white bg-purple-600"
                      : "hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  )}
                >
                  {language === "en" ? item.label.en : item.label.ar}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle Language"
            >
              <Languages className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle Language"
          >
            <Languages className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn(
                "block h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
              )}></span>
              <span className={cn(
                "block h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "opacity-0" : "w-4"
              )}></span>
              <span className={cn(
                "block h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"
              )}></span>
            </div>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-x-0 top-[60px] p-4 bg-background/95 backdrop-blur-lg border-b border-border md:hidden transition-all duration-300 z-50 shadow-lg",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-3 rounded-md transition-colors text-center",
                  location.pathname === item.href
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/30"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === "en" ? item.label.en : item.label.ar}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
