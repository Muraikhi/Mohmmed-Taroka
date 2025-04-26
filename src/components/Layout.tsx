
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

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

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
        toggleLanguage={toggleLanguage}
      />
      <main>
        <Outlet />
      </main>
      <Footer language={language} />
    </div>
  );
}
