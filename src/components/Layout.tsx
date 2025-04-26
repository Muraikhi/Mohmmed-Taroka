
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      return savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  const [language, setLanguage] = useState<"en" | "ar">(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = window.localStorage.getItem("language");
      return (savedLanguage as "en" | "ar") || "en";
    }
    return "en";
  });

  const [siteSettings, setSiteSettings] = useState<any>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Listen for changes in localStorage (from admin panel)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const settings = localStorage.getItem('siteSettings');
        if (settings) {
          setSiteSettings(JSON.parse(settings));
          
          // Apply theme colors from admin settings
          if (JSON.parse(settings).theme) {
            const { theme } = JSON.parse(settings);
            document.documentElement.style.setProperty('--primary', theme.primary);
            document.documentElement.style.setProperty('--secondary', theme.secondary);
            document.documentElement.style.setProperty('--accent', theme.accent);
          }
        }
      } catch (error) {
        console.error("Error parsing site settings:", error);
      }
    };
    
    // Load initial settings
    handleStorageChange();
    
    // Listen for changes
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for directly updating without page refresh
    window.addEventListener('siteSettingsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('siteSettingsUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <div className={language === "ar" ? "rtl" : "ltr"}>
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Navbar 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        siteSettings={siteSettings}
      />
      <main>
        <Outlet />
      </main>
      <Footer language={language} />
    </div>
  );
}
