"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate parallax offset based on scroll position
        const scrollProgress = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);
        const parallax = scrollProgress * 100 * speed;
        setOffset(parallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, ref]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${direction === "up" ? -offset : offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
