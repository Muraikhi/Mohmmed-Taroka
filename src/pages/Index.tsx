
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const location = useLocation();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";
  const isMobile = useIsMobile();

  // Example projects data (in a real app this would come from an API/database)
  const featuredProjects = [
    {
      id: "1",
      title: language === "en" ? "E-commerce Website" : "متجر إلكتروني",
      description: language === "en" 
        ? "A modern e-commerce platform with advanced filtering and cart functionality." 
        : "منصة تجارة إلكترونية حديثة مع تصفية متقدمة ووظائف عربة التسوق.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      tags: ["React", "Redux", "Tailwind"],
      githubLink: "#",
      demoLink: "#",
    },
    {
      id: "2",
      title: language === "en" ? "Portfolio Template" : "قالب معرض الأعمال",
      description: language === "en"
        ? "A customizable portfolio template for creative professionals."
        : "قالب معرض أعمال قابل للتخصيص للمحترفين المبدعين.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
      tags: ["HTML", "CSS", "JavaScript"],
      githubLink: "#",
      demoLink: "#",
    },
    {
      id: "3",
      title: language === "en" ? "Task Management App" : "تطبيق إدارة المهام",
      description: language === "en"
        ? "A task management application with drag-and-drop functionality."
        : "تطبيق إدارة المهام مع وظيفة السحب والإفلات.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2000&auto=format&fit=crop",
      tags: ["React", "TypeScript", "Firebase"],
      githubLink: "#",
      demoLink: "#",
    }
  ];
  
  // Example skills data
  const skills = [
    { name: language === "en" ? "Frontend Development" : "تطوير الواجهة الأمامية", percentage: 90 },
    { name: language === "en" ? "Graphic Design" : "تصميم الجرافيك", percentage: 85 },
    { name: language === "en" ? "Video Editing" : "تحرير الفيديو", percentage: 80 },
    { name: language === "en" ? "UI/UX Design" : "تصميم واجهة المستخدم", percentage: 75 }
  ];

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <ScrollReveal>
              <p className="text-purple-600 font-medium mb-2">
                {language === "en" ? "Hello, I'm" : "مرحبا، أنا"}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span>Mohamed Taroqa</span>
                <span className="block mt-2 text-gradient">
                  {language === "en" ? "Creative Developer" : "مطور مبدع"}
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {language === "en" 
                  ? "Frontend Developer, Graphic Designer, and Video Editor creating stunning digital experiences with attention to detail."
                  : "مطور واجهة أمامية، مصمم جرافيك، ومونتير فيديو أبتكر تجارب رقمية مذهلة مع الاهتمام بالتفاصيل."}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 btn-hover">
                  <Link to="/contact">{language === "en" ? "Contact Me" : "تواصل معي"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-hover">
                  <Link to="/projects">{language === "en" ? "View Projects" : "عرض المشاريع"}</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
          <div className="flex-1 relative">
            <div className="relative">
              <ScrollReveal direction="left">
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-600/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-20 w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 opacity-20 blur-lg animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full border-2 border-purple-500/30 animate-spin-slow"></div>
                  <div className="absolute inset-8 rounded-full border-2 border-purple-500/30 animate-spin-slow" style={{ animationDirection: "reverse" }}></div>
                  <div className="absolute inset-0 rounded-full overflow-hidden p-2">
                    <div className="w-full h-full rounded-full bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-9xl font-bold">M</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="block mb-2 text-sm text-muted-foreground">
            {language === "en" ? "Scroll Down" : "انزل للأسفل"}
          </span>
          <div className="h-10 w-0.5 bg-purple-600"></div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-20 bg-purple-50/50 dark:bg-purple-900/5">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={language === "en" ? "About Me" : "عني"} 
            subtitle={language === "en" 
              ? "I'm a passionate creative professional with expertise in multiple fields."
              : "أنا محترف مبدع شغوف بخبرة في مجالات متعددة."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  {language === "en"
                    ? "As a Frontend Developer, Graphic Designer, and Video Editor, I bring a unique blend of technical and creative skills to every project. My passion lies in creating visually stunning and functional digital experiences that make an impact."
                    : "كمطور واجهة أمامية، مصمم جرافيك، ومونتير فيديو، أجلب مزيجًا فريدًا من المهارات التقنية والإبداعية لكل مشروع. شغفي يكمن في إنشاء تجارب رقمية مذهلة بصريًا ووظيفية تحدث تأثيرًا."}
                </p>
                <p>
                  {language === "en"
                    ? "With a keen eye for detail and a commitment to excellence, I strive to deliver work that exceeds expectations and helps clients achieve their goals."
                    : "بعين حادة للتفاصيل والتزام بالتميز، أسعى جاهداً لتقديم عمل يفوق التوقعات ويساعد العملاء على تحقيق أهدافهم."}
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 btn-hover">
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
                        className="progress-bar-fill bg-purple-600"
                        style={{ transform: `scaleX(${skill.percentage / 100})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={language === "en" ? "Featured Projects" : "مشاريع مميزة"} 
            subtitle={language === "en"
              ? "Take a look at some of my recent work and achievements."
              : "ألق نظرة على بعض أعمالي وإنجازاتي الأخيرة."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ScrollReveal 
                key={project.id} 
                delay={index * 200}
              >
                <ProjectCard {...project} language={language} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 btn-hover">
                <Link to="/projects">
                  {language === "en" ? "View All Projects" : "عرض جميع المشاريع"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
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
