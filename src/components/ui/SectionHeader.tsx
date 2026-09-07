"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Consistent section intro: small gradient eyebrow pill → big white headline → soft gray copy.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "relative z-10 max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200/90 shadow-[0_0_24px_-8px_rgba(14,165,233,0.6)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
        {eyebrow}
      </motion.span>

      <SplitText
        as="h2"
        className="mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </SplitText>

      {description ? (
        <SplitText
          as="p"
          mode="lines"
          delay={0.45}
          className={cn(
            "mt-5 text-base leading-relaxed text-white/55 sm:text-lg",
            centered && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </SplitText>
      ) : null}
    </motion.div>
  );
}
