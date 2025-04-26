
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  tags?: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const language = localStorage.getItem("language") as "en" | "ar" || "en";

  useEffect(() => {
    // Get projects from localStorage (admin dashboard)
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error("Error parsing projects:", error);
        setProjects([]);
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
          {language === "en" ? "My Projects" : "مشاريعي"}
        </SectionTitle>
        
        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {language === "en" 
                  ? "No projects available at the moment." 
                  : "لا توجد مشاريع متاحة في الوقت الحالي."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ScrollReveal key={project.id}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    language={language}
                    tags={project.tags || []}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
