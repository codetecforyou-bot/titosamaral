"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "text" | "image";
  id?: string;
};

/** Revela o conteúdo suavemente quando ele entra na tela. */
export function Reveal({ as: Tag = "div", children, className, delay = 0, variant = "text", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={variant}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
