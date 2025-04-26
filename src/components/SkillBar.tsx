
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
  delay?: number;
  language: "en" | "ar";
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  percentage,
  color = "bg-purple-600",
  delay = 0,
  language,
}) => {
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (inView) {
      timeout = setTimeout(() => {
        setProgress(percentage);
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [inView, percentage, delay]);

  return (
    <div 
      ref={ref} 
      className="mb-6" 
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={cn("progress-bar-fill", color)}
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
