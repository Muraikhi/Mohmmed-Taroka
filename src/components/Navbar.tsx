import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages, User, Menu, Settings, Home, Code, Gamepad, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

interface NavItem {
  label: {
    en: string;
    ar: string;
  };
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    label: { en: "Home", ar: "الرئيسية" },
    href: "/",
    icon: Home,
  },
  {
    label: { en: "About", ar: "عني" },
    href: "/about",
    icon: User,
  },
  {
    label: { en: "Projects", ar: "المشاريع" },
    href: "/projects",
    icon: Code,
  },
  {
    label: { en: "Game", ar: "اللعبة" },
    href: "/game",
    icon: Gamepad,
  },
  {
    label: { en: "Contact", ar: "اتصل بي" },
    href: "/contact",
    icon: Phone,
  },
  {
    label: { en: "Admin", ar: "المسؤول" },
    href: "/admin",
    icon: Settings,
  }
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
  
  // Get site settings for logo from localStorage if available
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : {
      logo: { text: "Mohamed Taroqa", image: "" },
      theme: { primary: "#9333ea", secondary: "#a855f7", accent: "#c084fc" }
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSettingsChange = () => {
      const saved = localStorage.getItem('siteSettings');
      if (saved) {
        setSiteSettings(JSON.parse(saved));
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleSettingsChange);
    
    // Check for settings changes periodically
    const interval = setInterval(() => {
      const saved = localStorage.getItem('siteSettings');
      if (saved) {
        const newSettings = JSON.parse(saved);
        if (JSON.stringify(newSettings) !== JSON.stringify(siteSettings)) {
          setSiteSettings(newSettings);
        }
      }
    }, 1000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleSettingsChange);
      clearInterval(interval);
    };
  }, [siteSettings]);

  // Get primary color from site settings or use default
  const primaryColor = siteSettings?.theme?.primary || "#9333ea";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-md" 
          : "py-4 bg-transparent"
      )}
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{
        "--navbar-primary": primaryColor
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {siteSettings?.logo?.image ? (
            <div className="h-10 w-10 relative overflow-hidden rounded-md">
              <img 
                src={siteSettings.logo.image} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="relative w-10 h-10">
              <div 
                className="absolute inset-0 rounded-md rotate-45 transform-gpu animate-pulse"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div className="absolute inset-1 bg-background rounded-md rotate-45 flex items-center justify-center">
                <span style={{ color: primaryColor }} className="font-bold text-xl">M</span>
              </div>
            </div>
          )}
          <span className="font-bold text-xl">
            {siteSettings?.logo?.text || (language === "en" ? "Mohamed Taroqa" : "محمد طروقه")}
          </span>
        </Link>

        {/* Desktop Navigation - Now using NavigationMenu with custom active styles */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link 
                    to={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "flex items-center gap-1.5",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground" 
                        : "data-[active]:bg-transparent data-[state=open]:bg-transparent"
                    )}
                    style={location.pathname === item.href 
                      ? { backgroundColor: primaryColor } 
                      : {}}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {language === "en" ? item.label.en : item.label.ar}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
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
        </div>

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

        {/* Mobile Menu - Enhanced with icons */}
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
                  "px-4 py-3 rounded-md transition-colors flex items-center gap-2",
                  location.pathname === item.href
                    ? "bg-primary text-white"
                    : "hover:bg-primary/10"
                )}
                style={location.pathname === item.href ? { backgroundColor: primaryColor } : {}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {language === "en" ? item.label.en : item.label.ar}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
