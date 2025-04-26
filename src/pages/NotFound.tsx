
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center max-w-md">
        <ScrollReveal>
          <div className="text-9xl font-bold text-gradient mb-4">404</div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <h1 className="text-3xl font-bold mb-4">
            {language === "en" ? "Page Not Found" : "الصفحة غير موجودة"}
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <p className="text-muted-foreground mb-8">
            {language === "en"
              ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              : "ربما تمت إزالة الصفحة التي تبحث عنها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتًا."
            }
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={600}>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Link to="/">{language === "en" ? "Return Home" : "العودة للرئيسية"}</Link>
            </Button>
            
            <Button variant="outline" onClick={() => navigate(-1)}>
              {language === "en" ? "Go Back" : "رجوع للخلف"}
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={800}>
          <div className="mt-12">
            <div className="inline-block animate-float">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-purple-600 rounded-md rotate-45"></div>
                <div className="absolute inset-1 bg-background rounded-md rotate-45 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-2xl">?</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default NotFound;
