"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a mouse-following spotlight highlight. */
  spotlight?: boolean;
  /** Lift the card on hover (transform only – GPU friendly). */
  hoverLift?: boolean;
  variants?: Variants;
  custom?: number;
  as?: "div" | "article" | "li";
}

const hoverTransition = { type: "spring", stiffness: 300, damping: 24 } as const;

/**
 * Dark card with a subtle blue border and soft outer glow.
 * Uses CSS variables for the spotlight so we never re-render on mouse move.
 */
export default function GlowCard({
  children,
  className,
  spotlight = true,
  hoverLift = true,
  variants = fadeUp,
  custom,
  as = "div",
}: GlowCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const shared = {
    variants,
    custom,
    whileHover: hoverLift ? { y: -6 } : undefined,
    transition: hoverTransition,
    onMouseMove: spotlight ? handleMouseMove : undefined,
    className: cn("glow-card", className),
  };

  const inner = (
    <>
      {spotlight ? <span aria-hidden className="glow-card__spotlight" /> : null}
      <div className="relative z-[1] h-full">{children}</div>
    </>
  );

  if (as === "li") {
    return (
      <motion.li ref={ref as React.RefObject<HTMLLIElement>} {...shared}>
        {inner}
      </motion.li>
    );
  }
  if (as === "article") {
    return (
      <motion.article ref={ref as React.RefObject<HTMLElement>} {...shared}>
        {inner}
      </motion.article>
    );
  }
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} {...shared}>
      {inner}
    </motion.div>
  );
}
