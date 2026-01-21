"use client";

import { useEffect, useState, useRef } from "react";
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
  const elementRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Combine refs
  const combinedRef = (node: HTMLDivElement | null) => {
    elementRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
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
  }, [speed]);

  return (
    <div
      ref={combinedRef}
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
