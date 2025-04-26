
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const language = localStorage.getItem("language") as "en" | "ar" || "en";

  useEffect(() => {
    // Get certificates from localStorage (admin dashboard)
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      try {
        setCertificates(JSON.parse(savedCertificates));
      } catch (error) {
        console.error("Error parsing certificates:", error);
        setCertificates([]);
      }
    }
    setLoading(false);
  }, []);

  return (
    <div 
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          {language === "en" ? "My Certificates" : "شهاداتي"}
        </SectionTitle>
        
        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {language === "en" 
                  ? "No certificates available at the moment." 
                  : "لا توجد شهادات متاحة في الوقت الحالي."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <ScrollReveal key={cert.id}>
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{cert.title}</CardTitle>
                      <CardDescription>
                        {cert.issuer} • {cert.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div className="mt-2 flex justify-end">
                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                          {language === "en" ? "Verified" : "تم التحقق"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
