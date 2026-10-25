"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "clip" | "blur" | "rotate";

const variantClass: Record<Variant, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  clip: "reveal-clip",
  blur: "reveal-blur",
  rotate: "reveal-rotate",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const timeouts = useRef<number[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = window.setTimeout(() => setVisible(true), delay);
            timeouts.current.push(id);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timeouts.current.forEach((id) => window.clearTimeout(id));
      timeouts.current = [];
    };
  }, [delay]);

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={`reveal ${variantClass[variant]} ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}