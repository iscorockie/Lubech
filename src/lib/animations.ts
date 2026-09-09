import type { Transition, Variants } from "framer-motion";

/**
 * Shared Motion presets.
 *
 * Rules of thumb (see docs/notes in README):
 *  – Only animate `transform` + `opacity` for buttery 60fps.
 *  – Entrances live between 0.3–0.7s.
 *  – Reduced-motion is handled globally by `<MotionConfig reducedMotion="user">`.
 */

/** Custom "expo-out" curve – snappy start, silky landing. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const baseTransition: Transition = { duration: 0.6, ease: EASE };

/** Fade + rise. Pass a number through `custom` to add a delay. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

/** Parent wrapper that staggers any child using the variants above. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/**
 * Default `viewport` config for `whileInView` reveals – replays every time the element
 * re-enters the viewport (so scrolling back up re-runs the text reveals), flipping back to
 * the hidden state only once the element is ~80 px off-screen (never visibly mid-fade).
 */
export const viewportReplay = { once: false, margin: "-80px 0px -80px 0px" } as const;

/** Springy micro-interaction for buttons / chips. */
export const springTap = { type: "spring", stiffness: 420, damping: 22 } as const;
