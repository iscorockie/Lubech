"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { Orb, GridPattern } from "@/components/ui/Orbs";
import { PROCESS } from "@/data/site";
import { EASE, viewportOnce } from "@/lib/animations";

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Progress line fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 45%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const scaleY = scaleX; // reused for the vertical (mobile) line

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      {/* Background: subtle grid + orbs + planet-horizon glow */}
      <GridPattern className="opacity-60" />
      <Orb tone="violet" size={900} animate="drift-slow" className="left-1/2 top-[55%] -translate-x-1/2 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(124,58,237,0.28),transparent_70%)]"
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

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <div ref={trackRef} className="relative mt-20">
          {/* Horizontal track (md+) */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px md:block">
            <div className="absolute inset-0 bg-white/[0.08]" />
            <motion.div
              style={{ scaleX }}
              className="absolute inset-0 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_18px_rgba(192,38,211,0.8)]"
            />
          </div>

          {/* Vertical track (mobile) */}
          <div aria-hidden className="absolute bottom-6 left-7 top-7 w-px md:hidden">
            <div className="absolute inset-0 bg-white/[0.08]" />
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_18px_rgba(192,38,211,0.8)]"
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS.map(({ step, title, description, icon: Icon, duration }, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="relative flex gap-5 md:block"
              >
                {/* Glowing dot */}
                <div className="relative z-10 shrink-0">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-fuchsia-300/30 bg-[#0a0a12] shadow-[0_0_0_6px_rgba(124,58,237,0.08),0_0_30px_rgba(192,38,211,0.45)]">
                    <span aria-hidden className="animate-pulse-glow absolute inset-2 rounded-full bg-fuchsia-500/20" />
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                  </span>
                </div>

                {/* Card */}
                <div className="glow-card flex-1 p-6 md:mt-8">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-extrabold tracking-wider text-gradient">
                      STEP {step}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                      {duration}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">{description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
