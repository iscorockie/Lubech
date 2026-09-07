"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SplitText from "@/components/ui/SplitText";
import { GridPattern, Orb } from "@/components/ui/Orbs";
import { PROCESS } from "@/data/site";
import { EASE, viewportOnce } from "@/lib/animations";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * "Our Process" — a pinned, scroll-scrubbed timeline.
 *
 * Desktop (lg+, no reduced-motion): the section is `position: sticky` for ~2.2 viewports.
 * While pinned, scroll progress (0 → 1) drives, in lock-step:
 *   • the 3D Earth rising + rotating in the background (Three.js, see three/Earth3D),
 *   • the gradient progress line growing across the track,
 *   • each glowing dot igniting and its card fading/rising into place.
 * Everything is a transform/opacity, read from MotionValues — no React re-renders on scroll.
 *
 * Mobile / reduced-motion: a plain vertical timeline with `whileInView` reveals.
 */

const Earth3D = dynamic(() => import("@/components/three/Earth3D"), { ssr: false });

const STEPS = PROCESS.length;
const STEP_WINDOW = 0.75; // the four cards reveal within the first 75% of the pin
const TIMELINE_END = 0.85; // the line finishes just after the last card lands

/* ── Desktop: pinned stage ─────────────────────────────────────────────── */

function PinnedProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Mount the WebGL scene once the section comes within a viewport of the screen;
  // afterwards it stays mounted and simply pauses its render loop while off-screen.
  const nearViewport = useInView(trackRef, { margin: "100% 0px 100% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (nearViewport) setMounted(true);
  }, [nearViewport]);
  const [earthReady, setEarthReady] = useState(false);
  const handleReady = useCallback(() => setEarthReady(true), []);

  // 0 → 1 across the whole pinned scroll distance (track = 220vh tall).
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  // Timeline line.
  const lineScale = useTransform(progress, [0.04, TIMELINE_END], [0, 1]);
  // Glow that travels along with the tip of the line.
  const tipX = useMotionTemplate`${useTransform(lineScale, [0, 1], [0, 100])}%`;
  const tipOpacity = useTransform(progress, [0, 0.04, TIMELINE_END, TIMELINE_END + 0.06], [0, 1, 1, 0]);

  // Earth: rises up as it starts rendering, then rotation is driven inside the canvas.
  const earthY = useTransform(progress, [0, 0.5], ["16%", "0%"]);
  const earthOpacity = useTransform(progress, [0, 0.12], [0.3, 1]);

  // Header drifts up slightly once the cards take over; the hint disappears as soon as you move.
  const headerY = useTransform(progress, [0.55, 1], ["0%", "-6%"]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <div ref={trackRef} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen min-h-[640px] flex-col overflow-hidden">
        {/* ── Background ─────────────────────────────────────────────── */}
        <GridPattern className="opacity-50" />
        <Orb tone="blue" size={900} animate="drift-slow" className="-left-[15%] top-[10%] opacity-40" />
        <Orb tone="cyan" size={700} animate="drift" className="-right-[12%] top-[30%] opacity-30" />

        <motion.div
          aria-hidden
          style={{ y: earthY, opacity: earthOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          {/* CSS horizon fallback – shown while the WebGL textures load, or if WebGL is unavailable */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-[60%] overflow-hidden transition-opacity duration-1000",
              earthReady ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="absolute left-1/2 top-1/2 aspect-square w-[240vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#0a1230_0%,#0c1738_90%,rgba(37,99,235,0.9)_97%,rgba(186,230,253,0.95)_99.4%,transparent_100%)] shadow-[0_0_90px_24px_rgba(59,130,246,0.4),0_0_220px_80px_rgba(37,99,235,0.2)]" />
          </div>

          {mounted ? (
            <Earth3D
              progress={progress}
              active={nearViewport}
              onReady={handleReady}
              capFraction={0.5}
              className="!top-auto h-[60%]"
            />
          ) : null}
        </motion.div>

        {/* Readability veils: keep the copy crisp over the horizon */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05050a] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05050a] via-[#05050a]/70 to-transparent" />

        {/* ── Content ────────────────────────────────────────────────── */}
        <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-16 pt-24">
          <motion.div style={{ y: headerY }} className="[@media(max-height:760px)]:[&_p]:hidden">
            <SectionHeader
              eyebrow="Our process"
              title={
                <>
                  A clear path from <span className="text-gradient">idea to launch</span>
                </>
              }
              description="No black boxes. A proven four-step process with weekly demos, so you always know where your product stands."
            />
          </motion.div>

          <div className="relative mt-10 xl:mt-14">
            {/* Track */}
            <div aria-hidden className="absolute left-0 right-0 top-7 h-px">
              <div className="absolute inset-0 bg-white/[0.08]" />
              <motion.div
                style={{ scaleX: lineScale }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 shadow-[0_0_18px_rgba(14,165,233,0.85)]"
              />
              <motion.span
                style={{ left: tipX, opacity: tipOpacity }}
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(125,211,252,0.75)]"
              />
            </div>

            <ol className="relative grid grid-cols-4 gap-6">
              {PROCESS.map((step, i) => (
                <PinnedStep key={step.step} index={i} progress={progress} {...step} />
              ))}
            </ol>
          </div>

        </div>

        {/* Scroll hint */}
        <motion.p
          aria-hidden
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40"
        >
          Keep scrolling
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
        </motion.p>
      </div>
    </div>
  );
}

interface PinnedStepProps {
  index: number;
  progress: MotionValue<number>;
  step: string;
  title: string;
  description: string;
  duration: string;
  icon: (typeof PROCESS)[number]["icon"];
}

function PinnedStep({ index, progress, step, title, description, duration, icon: Icon }: PinnedStepProps) {
  // Each step owns a slice of the pinned scroll; the dot ignites slightly before its card.
  const start = 0.06 + (index / STEPS) * STEP_WINDOW;
  const end = start + STEP_WINDOW / STEPS;

  const dotScale = useTransform(progress, [start - 0.03, start + 0.04], [0.55, 1]);
  const dotOpacity = useTransform(progress, [start - 0.03, start + 0.02], [0.3, 1]);
  const ringOpacity = useTransform(progress, [start, start + 0.05], [0, 1]);

  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardY = useTransform(progress, [start, end], [48, 0]);
  const cardScale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <li className="relative">
      <div className="relative z-10">
        <motion.span
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-sky-300/30 bg-[#0a0a12] shadow-[0_0_0_6px_rgba(37,99,235,0.08),0_0_30px_rgba(14,165,233,0.45)]"
        >
          <motion.span
            aria-hidden
            style={{ opacity: ringOpacity }}
            className="animate-pulse-glow absolute inset-1 rounded-full bg-sky-500/25"
          />
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-sky-700 to-cyan-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            <Icon className="h-[18px] w-[18px]" aria-hidden />
          </span>
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        className="glow-card mt-8 bg-[#0a0a12]/85 p-5 will-change-transform xl:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-extrabold tracking-wider text-gradient">STEP {step}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
            {duration}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-white">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/55">{description}</p>
      </motion.div>
    </li>
  );
}

/* ── Mobile / reduced-motion: vertical timeline ───────────────────────── */

function StackedProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <GridPattern className="opacity-60" />
      <Orb tone="blue" size={800} animate="drift-slow" className="left-1/2 top-[50%] -translate-x-1/2 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(37,99,235,0.28),transparent_70%)]"
      />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Our process"
          title={
            <>
              A clear path from <span className="text-gradient">idea to launch</span>
            </>
          }
          description="No black boxes. A proven four-step process with weekly demos, so you always know where your product stands."
        />

        <div ref={trackRef} className="relative mx-auto mt-16 max-w-3xl">
          <div aria-hidden className="absolute bottom-6 left-7 top-7 w-px">
            <div className="absolute inset-0 bg-white/[0.08]" />
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-blue-500 via-sky-500 to-cyan-400 shadow-[0_0_18px_rgba(14,165,233,0.8)]"
            />
          </div>

          <ol className="relative grid gap-10">
            {PROCESS.map(({ step, title, description, icon: Icon, duration }, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="relative flex gap-5"
              >
                <div className="relative z-10 shrink-0">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-sky-300/30 bg-[#0a0a12] shadow-[0_0_0_6px_rgba(37,99,235,0.08),0_0_30px_rgba(14,165,233,0.45)]">
                    <span aria-hidden className="animate-pulse-glow absolute inset-2 rounded-full bg-sky-500/20" />
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-sky-700 to-cyan-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                  </span>
                </div>

                <div className="glow-card flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-extrabold tracking-wider text-gradient">STEP {step}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                      {duration}
                    </span>
                  </div>
                  <SplitText as="h3" inView delay={0.1 + i * 0.08} className="mt-4 font-heading text-xl font-bold text-white">
                    {title}
                  </SplitText>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">{description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export default function Process() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");
  const pinned = isDesktop && !reduced;

  return (
    <section id="process" className={cn("relative", pinned ? "-scroll-mt-26" : "scroll-mt-24")}>
      {pinned ? <PinnedProcess /> : <StackedProcess />}
    </section>
  );
}
