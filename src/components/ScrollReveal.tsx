
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  duration = 700,
  delay = 0,
  direction = "up",
  distance = 50,
  once = true,
  threshold = 0.1,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
    rootMargin: "-10% 0px",
  });

  const directionStyles = {
    up: `translate-y-[${distance}px]`,
    down: `translate-y-[-${distance}px]`,
    left: `translate-x-[${distance}px]`,
    right: `translate-x-[-${distance}px]`,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        inView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 " + directionStyles[direction],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
