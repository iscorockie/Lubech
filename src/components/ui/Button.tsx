"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springTap } from "@/lib/animations";
import type { ReactNode } from "react";

type Variant = "gradient" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  gradient: "btn-gradient",
  ghost: "btn-ghost",
};

/**
 * Fully-rounded pill button. `gradient` = blue→cyan with glow, `ghost` = frosted glass.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
export default function Button({
  href,
  children,
  variant = "gradient",
  size = "md",
  className,
  external,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight select-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    sizes[size],
    variants[variant],
    className,
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.04 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: springTap,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
