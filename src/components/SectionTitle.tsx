
import React from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  center = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-12",
        center && "text-center",
        className
      )}
    >
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient">{title}</span>
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={200}>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-1 w-16 bg-purple-600 rounded"></div>
        <div className="h-1 w-4 bg-purple-400 rounded"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
