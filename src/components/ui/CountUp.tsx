"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Display string such as "30+", "100%", "24/7", "$124M". Leading/trailing text is kept, the first number counts up. */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Counts the first number inside `value` from 0 when it scrolls into view,
 * keeping any prefix/suffix ("+", "%", "/7", "$") as static text.
 * Uses `font-variant-numeric: tabular-nums` so the width doesn't jitter.
 */
export default function CountUp({ value, className, duration = 1.6, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Replay: count again every time the stat re-enters the viewport (the reset happens
  // while it is off-screen, so the digits never visibly snap back to zero).
  const inView = useInView(ref, { once: false, margin: "-40px 0px" });
  const reduce = useReducedMotion();

  const match = value.match(/(\d[\d,]*(?:\.\d+)?)/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : NaN;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const prefix = match ? value.slice(0, match.index) : value;
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : "";

  // Always start from "0" so the server and client render the same markup; reduced-motion
  // users are switched to the final value on mount (before anything is scrolled into view).
  const [display, setDisplay] = useState(() => (Number.isNaN(target) ? value : `${prefix}0${suffix}`));

  useEffect(() => {
    if (Number.isNaN(target)) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      // Off-screen: re-arm so the next entry counts up from zero again.
      setDisplay(`${prefix}0${suffix}`);
      return;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, target, duration, delay, prefix, suffix, decimals, value, reduce]);

  // `aria-label` isn't allowed on a role-less <span>, so assistive tech gets the final value
  // from a visually-hidden copy while the counting digits stay decorative.
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
