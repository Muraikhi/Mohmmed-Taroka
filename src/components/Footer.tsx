
import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  Mail,
  Phone
} from "lucide-react";

interface FooterProps {
  language: "en" | "ar";
}

export default function Footer({ language }: FooterProps) {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "Github" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const navLinks = {
    en: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Game", href: "/game" },
      { label: "Contact", href: "/contact" },
    ],
    ar: [
      { label: "الرئيسية", href: "/" },
      { label: "عني", href: "/about" },
      { label: "المشاريع", href: "/projects" },
      { label: "اللعبة", href: "/game" },
      { label: "اتصل بي", href: "/contact" },
    ]
  };

  return (
    <footer 
      className="bg-purple-50 dark:bg-purple-900/20 border-t border-purple-100 dark:border-purple-800/50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-purple-600 rounded-md rotate-45"></div>
                <div className="absolute inset-0.5 bg-background rounded-md rotate-45 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">M</span>
                </div>
              </div>
              <span className="font-bold text-lg">
                {language === "en" ? "Mohamed Taroqa" : "محمد طروقه"}
              </span>
            </Link>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Frontend Developer, Graphic Designer, and Video Editor crafting beautiful digital experiences."
                : "مطور واجهة أمامية، مصمم جرافيك، ومونتير فيديو يصنع تجارب رقمية جميلة."}
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">
              {language === "en" ? "Quick Links" : "روابط سريعة"}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks[language].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">
              {language === "en" ? "Contact" : "اتصل بي"}
            </h3>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:contact@mohamedtaroqa.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors"
              >
                <Mail size={18} />
                <span>contact@mohamedtaroqa.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors"
              >
                <Phone size={18} />
                <span>+123 456 7890</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-100 dark:border-purple-800/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            {language === "en" 
              ? `© ${year} Mohamed Taroqa. All Rights Reserved.`
              : `© ${year} محمد طروقه. جميع الحقوق محفوظة.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
