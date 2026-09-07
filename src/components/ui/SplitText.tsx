"use client";

import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Word-level "rise from behind a mask" reveal – the headline treatment used by
 * editorial agency sites (each word slides up out of its own clipped line box,
 * staggered left→right, top→bottom).
 *
 *   <SplitText as="h1">Transform Your Ideas <Accent>Into Digital Reality</Accent></SplitText>
 *
 * - Works as a child of a `staggerContainer` (it declares the same
 *   hidden/visible variant names) or standalone with `animate`/`whileInView`.
 * - Only `transform` + `opacity` animate → GPU-composited, no layout.
 * - Reduced motion: `MotionConfig reducedMotion="user"` in <Providers> turns the
 *   transforms into a plain fade automatically.
 * - Screen readers get the intact sentence through `aria-label`; the split
 *   spans are `aria-hidden`.
 *
 * Gradient text: `background-clip:text` must live on the *moving* word span,
 * not on a parent of the overflow-clipped wrappers (Chrome paints nothing in
 * that case). So `<span className="text-gradient">…</span>` / `<Accent>` inside
 * the children is flattened and its className re-applied per word.
 */

interface SplitTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** Seconds between words. */
  stagger?: number;
  /** Delay before the first word (only used when this element owns the animation). */
  delay?: number;
  /** Per-word duration. */
  duration?: number;
  /** Drive the reveal from the viewport instead of a parent variant. */
  inView?: boolean;
  /** Fires when this element owns the animation and it has finished (e.g. to chain a cursor). */
  onComplete?: () => void;
}

/** Marks a run of words to receive an extra className (typically `text-gradient`). */
export function Accent({ children, className = "text-gradient" }: { children: ReactNode; className?: string }) {
  return <Fragment key={className}>{children}</Fragment>;
}
Accent.displayName = "SplitTextAccent";

type Token = { word: string; className?: string; key: string };
type Line = Token[];

/** Flatten children into words, keeping line breaks (`<br />`) and Accent classNames. */
function tokenize(children: ReactNode, inherited?: string): Line[] {
  const lines: Line[] = [[]];
  let n = 0;
  const push = (word: string, cls?: string) => lines[lines.length - 1].push({ word, className: cls, key: `${word}-${n++}` });
  const walk = (node: ReactNode, cls?: string) => {
    Children.forEach(node, (child) => {
      if (child == null || typeof child === "boolean") return;
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => push(w, cls));
        return;
      }
      if (isValidElement(child)) {
        if (child.type === "br") {
          lines.push([]);
          return;
        }
        const props = child.props as { children?: ReactNode; className?: string };
        const isAccent = (child.type as { displayName?: string }).displayName === "SplitTextAccent";
        // <Accent> or any inline element carrying a className (e.g. <span className="text-gradient">)
        // passes that className down to each of its words.
        const nextCls = isAccent ? (props.className ?? "text-gradient") : (props.className ?? cls);
        walk(props.children, nextCls);
      }
    });
  };
  walk(children, inherited);
  return lines.filter((l) => l.length);
}

export default function SplitText({
  children,
  as = "h2",
  className,
  stagger = 0.055,
  delay = 0,
  duration = 0.75,
  inView = false,
  onComplete,
}: SplitTextProps) {
  const lines = tokenize(children);
  const plain = lines.map((l) => l.map((t) => t.word).join(" ")).join(" ");
  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration, ease: EASE } },
  };

  const own = inView ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px 0px -60px 0px" } } : {};

  return (
    <Tag
      aria-label={plain}
      variants={container}
      {...own}
      onAnimationComplete={onComplete}
      className={cn("split-text", className)}
    >
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden>
          {line.map((t, wi) => (
            <span key={t.key} className="split-mask">
              <motion.span variants={word} className={cn("split-word", t.className)}>
                {t.word}
                {wi < line.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
