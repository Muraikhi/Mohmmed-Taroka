
import React from "react";

export interface SectionTitleProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        {children}
      </h2>
      {title && <p className="mt-2 text-muted-foreground">{title}</p>}
      {subtitle && <p className="mt-1 text-muted-foreground text-lg">{subtitle}</p>}
      <div className="mx-auto mt-3 h-1 w-20 rounded bg-primary"></div>
    </div>
  );
};

export default SectionTitle;
