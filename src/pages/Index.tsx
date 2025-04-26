import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
}

interface SiteSettings {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo: {
    text: string;
    image: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  about: {
    content: string;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

interface HomeImage {
  id: string;
  url: string;
  title?: string;
}

const defaultSiteSettings: SiteSettings = {
  theme: {
    primary: "#9333ea",
    secondary: "#a855f7",
    accent: "#c084fc",
  },
  logo: {
    text: "Mohamed Taroqa",
    image: "",
  },
  hero: {
    title: "Creative Developer",
    subtitle: "Frontend Developer, Graphic Designer, and Video Editor creating stunning digital experiences with attention to detail.",
    image: ""
  },
  about: {
    content: "As a Frontend Developer, Graphic Designer, and Video Editor, I bring a unique blend of technical and creative skills to every project.",
    image: ""
  },
  contact: {
    email: "contact@example.com",
    phone: "+1234567890",
    address: "123 Tech Street, Web City"
  }
};

const Index = () => {
  const location = useLocation();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";
  const isMobile = useIsMobile();
  
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSiteSettings;
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  
  const [homeImages, setHomeImages] = useState<HomeImage[]>(() => {
    const savedImages = localStorage.getItem('homeImages');
    return savedImages ? JSON.parse(savedImages) : [];
  });
  
  const skills = [
    { name: language === "en" ? "Frontend Development" : "تطوير الواجهة الأمامية", percentage: 90 },
    { name: language === "en" ? "Graphic Design" : "تصميم الجرافيك", percentage: 85 },
    { name: language === "en" ? "Video Editing" : "تحرير الفيديو", percentage: 80 },
    { name: language === "en" ? "UI/UX Design" : "تصميم واجهة المستخدم", percentage: 75 }
  ];
  
  useEffect(() => {
    const handleSettingsChange = () => {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
      
      const savedImages = localStorage.getItem('homeImages');
      if (savedImages) {
        setHomeImages(JSON.parse(savedImages));
      }
    };
    
    window.addEventListener('storage', handleSettingsChange);
    
    const interval = setInterval(() => {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        const newSettings = JSON.parse(savedSettings);
        if (JSON.stringify(newSettings) !== JSON.stringify(settings)) {
          setSettings(newSettings);
        }
      }
      
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        const newProjects = JSON.parse(savedProjects);
        if (JSON.stringify(newProjects) !== JSON.stringify(projects)) {
          setProjects(newProjects);
        }
      }
      
      const savedImages = localStorage.getItem('homeImages');
      if (savedImages) {
        const newImages = JSON.parse(savedImages);
        if (JSON.stringify(newImages) !== JSON.stringify(homeImages)) {
          setHomeImages(newImages);
        }
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleSettingsChange);
      clearInterval(interval);
    };
  }, [settings, projects, homeImages]);

  // Ensure settings and nested objects are defined to prevent "Cannot read properties of undefined" errors
  const heroTitle = settings?.hero?.title || (language === "en" ? "Creative Developer" : "مطور مبدع");
  const heroSubtitle = settings?.hero?.subtitle || (language === "en" 
    ? "Frontend Developer, Graphic Designer, and Video Editor creating stunning digital experiences with attention to detail."
    : "مطور واجهة أمامية، مصمم جرافيك، ومونتير فيديو أبتكر تجارب رقمية مذهلة مع الاهتمام بالتفاصيل.");
  const logoText = settings?.logo?.text || "Mohamed Taroqa";
  const aboutContent = settings?.about?.content || (language === "en"
    ? "As a Frontend Developer, Graphic Designer, and Video Editor, I bring a unique blend of technical and creative skills to every project. My passion lies in creating visually stunning and functional digital experiences that make an impact."
    : "كمطور واجهة أمامية، مصمم جرافيك، ومونتير فيديو، أجلب مزيجًا فريدًا من المهارات التقنية والإبداعية لكل مشروع. شغفي يكمن في إنشاء تجارب رقمية مذهلة بصريًا ووظيفية تحدث تأثيرًا.");

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <ScrollReveal>
              <p className="text-purple-600 font-medium mb-2" style={{ color: settings?.theme?.primary || "#9333ea" }}>
                {language === "en" ? "Hello, I'm" : "مرحبا، أنا"}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span>{logoText}</span>
                <span className="block mt-2 text-gradient" style={{ 
                  backgroundImage: `linear-gradient(to right, ${settings?.theme?.primary || "#9333ea"}, ${settings?.theme?.secondary || "#a855f7"})` 
                }}>
                  {heroTitle}
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {heroSubtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="btn-hover"
                  style={{ backgroundColor: settings?.theme?.primary || "#9333ea", color: 'white' }}
                >
                  <Link to="/contact">{language === "en" ? "Contact Me" : "تواصل معي"}</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-hover"
                  style={{ borderColor: settings?.theme?.primary || "#9333ea", color: settings?.theme?.primary || "#9333ea" }}
                >
                  <Link to="/projects">{language === "en" ? "View Projects" : "عرض المشاريع"}</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
          <div className="flex-1 relative">
            <div className="relative">
              <ScrollReveal direction="left">
                {settings?.hero?.image ? (
                  <div className="relative z-20 w-full aspect-square max-w-md mx-auto">
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 blur-lg animate-pulse"
                      style={{ background: `linear-gradient(to top right, ${settings?.theme?.primary || "#9333ea"}, ${settings?.theme?.secondary || "#a855f7"})` }}
                    ></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden p-2">
                      <img 
                        src={settings.hero.image} 
                        alt="Hero" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                ) : homeImages.length > 0 && homeImages[0]?.url ? (
                  <div className="relative z-20 w-full aspect-square max-w-md mx-auto">
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 blur-lg animate-pulse"
                      style={{ background: `linear-gradient(to top right, ${settings?.theme?.primary || "#9333ea"}, ${settings?.theme?.secondary || "#a855f7"})` }}
                    ></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden p-2">
                      <img 
                        src={homeImages[0].url} 
                        alt={homeImages[0].title || "Homepage image"} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative z-20 w-full aspect-square max-w-md mx-auto">
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 blur-lg animate-pulse"
                      style={{ background: `linear-gradient(to top right, ${settings?.theme?.primary || "#9333ea"}, ${settings?.theme?.secondary || "#a855f7"})` }}
                    ></div>
                    <div 
                      className="absolute inset-4 rounded-full border-2 animate-spin-slow"
                      style={{ borderColor: `${settings?.theme?.primary || "#9333ea"}30` }}
                    ></div>
                    <div 
                      className="absolute inset-8 rounded-full border-2 animate-spin-slow" 
                      style={{ borderColor: `${settings?.theme?.primary || "#9333ea"}30`, animationDirection: "reverse" }}
                    ></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden p-2">
                      <div 
                        className="w-full h-full rounded-full backdrop-blur-sm flex items-center justify-center"
                        style={{ backgroundColor: `${settings?.theme?.primary || "#9333ea"}10` }}
                      >
                        <span 
                          className="text-9xl font-bold"
                          style={{ color: settings?.theme?.primary || "#9333ea" }}
                        >
                          {logoText?.[0] || "M"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="block mb-2 text-sm text-muted-foreground">
            {language === "en" ? "Scroll Down" : "انزل للأسفل"}
          </span>
          <div 
            className="h-10 w-0.5" 
            style={{ backgroundColor: settings?.theme?.primary || "#9333ea" }}
          ></div>
        </div>
      </section>

      <section 
        className="py-20" 
        style={{ backgroundColor: `${settings?.theme?.primary || "#9333ea"}05` }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle 
            children={language === "en" ? "About Me" : "عني"}
            title={language === "en" 
              ? "About Me"
              : "عني"
            }
            subtitle={language === "en" 
              ? "I'm a passionate creative professional with expertise in multiple fields."
              : "أنا محترف مبدع شغوف بخبرة في مجالات متعددة."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  {aboutContent}
                </p>
                <p>
                  {language === "en"
                    ? "With a keen eye for detail and a commitment to excellence, I strive to deliver work that exceeds expectations and helps clients achieve their goals."
                    : "بعين حادة للتفاصيل والتزام بالتميز، أسعى جاهداً لتقديم عمل يفوق التوقعات ويساعد العملاء على تحقيق أهدافهم."}
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="btn-hover"
                  style={{ backgroundColor: settings?.theme?.primary || "#9333ea", color: 'white' }}
                >
                  <Link to="/about">
                    {language === "en" ? "Learn More About Me" : "تعرف علي أكثر"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-6">
                {skills.slice(0, 2).map((skill, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ 
                          transform: `scaleX(${skill.percentage / 100})`,
                          backgroundColor: settings?.theme?.primary || "#9333ea" 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {homeImages.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle 
              children={language === "en" ? "Gallery" : "معرض الصور"}
              title={language === "en" ? "Gallery" : "معرض الصور"}
              subtitle={language === "en"
                ? "A collection of images showcasing my work and inspiration."
                : "مجموعة من الصور التي تعرض عملي وإلهامي."
              }
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {homeImages.map((image, index) => (
                <ScrollReveal key={image.id} delay={index * 150}>
                  <div className="relative group overflow-hidden rounded-lg shadow-lg h-64">
                    <img 
                      src={image.url} 
                      alt={image.title || "Gallery image"} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {image.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-4">
                          <h3 className="text-white font-medium">{image.title}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle 
              children={language === "en" ? "Featured Projects" : "مشاريع مميزة"}
              title={language === "en" ? "Featured Projects" : "مشاريع مميزة"}
              subtitle={language === "en"
                ? "Take a look at some of my recent work and achievements."
                : "ألق نظرة على بعض أعمالي وإنجازاتي الأخيرة."
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal 
                  key={project.id} 
                  delay={index * 200}
                >
                  <ProjectCard 
                    {...project} 
                    language={language} 
                    tags={project.technologies || []}
                  />
                </ScrollReveal>
              ))}
            </div>

            {projects.length > 3 && (
              <ScrollReveal delay={600}>
                <div className="mt-16 text-center">
                  <Button 
                    size="lg" 
                    className="btn-hover"
                    style={{ backgroundColor: settings.theme.primary, color: 'white' }}
                  >
                    <Link to="/projects">
                      {language === "en" ? "View All Projects" : "عرض جميع المشاريع"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      <section 
        className="py-20 text-white"
        style={{ backgroundColor: settings?.theme?.primary || "#9333ea" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" 
                  ? "Have a project in mind?" 
                  : "هل لديك مشروع في ذهنك؟"}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl text-white/80 mb-8">
                {language === "en"
                  ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
                  : "أنا دائمًا منفتح لمناقشة مشاريع جديدة، أفكار إبداعية، أو فرص لأكون جزءًا من رؤيتك."}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600 btn-hover"
                style={{ borderColor: 'white', color: 'white' }}
              >
                <Link to="/contact">
                  {language === "en" ? "Let's Connect" : "دعنا نتواصل"}
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
