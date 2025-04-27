
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <ScrollReveal>
            <div className="relative rounded-lg overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary rounded-lg transform rotate-3 scale-105"></div>
              <div className="absolute inset-1 bg-background rounded-lg flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="mb-4 text-muted-foreground">
                {siteSettings?.about_content || "Loading..."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Education</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Bachelor of Computer Science</li>
                    <li>Web Development Certification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Interests</h4>
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
      </div>
    </div>
  );
};

export default About;
