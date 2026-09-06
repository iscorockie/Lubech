"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion settings.
 * `reducedMotion="user"` automatically disables transform/layout animations
 * for people who have "Reduce motion" enabled at the OS level.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
