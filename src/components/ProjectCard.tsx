
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  language: "en" | "ar";
  technologies?: string[];  // Add technologies as an optional prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  tags,
  githubLink,
  demoLink,
  language,
  technologies,
}) => {
  // Use technologies if provided, otherwise fall back to tags
  const displayTags = technologies || tags;
  
  return (
    <div 
      className="project-card group card-hover"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="project-content">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2 mb-3">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {displayTags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className={cn(
            "flex gap-2",
            language === "ar" ? "justify-start" : "justify-start"
          )}>
            {githubLink && (
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                asChild
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {language === "en" ? "Code" : "الكود"}
                </a>
              </Button>
            )}
            
            {demoLink && (
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                asChild
              >
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {language === "en" ? "Live Demo" : "عرض حي"}
                </a>
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 ml-auto"
              asChild
            >
              <Link to={`/projects/${id}`}>
                {language === "en" ? "View Details" : "عرض التفاصيل"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
