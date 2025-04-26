
import React from "react";
import { useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  const language = localStorage.getItem("language") as "en" | "ar" || "en";
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle>
          {language === "en" ? "About Me" : "عني"}
          <p className="text-muted-foreground mt-4">
            {language === "en" 
              ? "Get to know me better"
              : "تعرف علي بشكل أفضل"
            }
          </p>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <ScrollReveal>
            <div className="relative rounded-lg overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary rounded-lg transform rotate-3 scale-105"></div>
              <div className="absolute inset-1 bg-background rounded-lg flex items-center justify-center">
                {/* Replace with your image or avatar */}
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={language === "ar" ? "rtl text-right" : ""}>
              <h3 className="text-2xl font-bold mb-4">
                {language === "en" ? "Who I Am" : "من أنا"}
              </h3>
              <p className="mb-4 text-muted-foreground">
                {language === "en" 
                  ? "I'm Mohamed Taroqa, a passionate developer with a love for creating beautiful, functional websites and applications. With several years of experience in web development, I've worked on a variety of projects ranging from small business websites to complex web applications."
                  : "أنا محمد طروقة، مطور شغوف بإنشاء مواقع وتطبيقات جميلة وعملية. مع سنوات من الخبرة في تطوير الويب، عملت على مجموعة متنوعة من المشاريع بدءًا من مواقع الأعمال الصغيرة وحتى تطبيقات الويب المعقدة."
                }
              </p>
              <p className="mb-6 text-muted-foreground">
                {language === "en" 
                  ? "My goal is to build digital experiences that are not only visually appealing but also intuitive and accessible to all users. I believe in continuous learning and staying updated with the latest technologies and design trends."
                  : "هدفي هو بناء تجارب رقمية ليست جذابة بصريًا فحسب، بل أيضًا بديهية ويمكن الوصول إليها لجميع المستخدمين. أؤمن بالتعلم المستمر والبقاء على اطلاع بأحدث التقنيات واتجاهات التصميم."
                }
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">
                    {language === "en" ? "Education" : "التعليم"}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Bachelor of Computer Science</li>
                    <li>Web Development Certification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    {language === "en" ? "Interests" : "الاهتمامات"}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Web Development</li>
                    <li>UI/UX Design</li>
                    <li>Mobile Applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {language === "en" ? "My Journey" : "رحلتي"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 rounded-lg border hover:border-primary transition-colors card-hover">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    {item}
                  </div>
                  <h4 className="text-lg font-bold mb-2">
                    {language === "en" ? `Journey Step ${item}` : `خطوة الرحلة ${item}`}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Description of this part of your journey in web development and design."
                      : "وصف لهذا الجزء من رحلتك في تطوير الويب والتصميم."
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
