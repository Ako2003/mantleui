"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export function ScrollReveal({
  delay = 0,
  children,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(0);
        if (entry?.isIntersecting) {
          const timeout = setTimeout(() => {
            setRevealed(true);
          }, delay);
          observer.unobserve(el);
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`mantle-reveal${revealed ? " mantle-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
