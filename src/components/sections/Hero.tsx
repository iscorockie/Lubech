"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { Orb } from "@/components/ui/Orbs";
import SplitText, { Accent } from "@/components/ui/SplitText";
import EarthHorizon from "@/components/three/EarthHorizon";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMediaQuery } from "@/lib/hooks";

/** Delay before the WebGL globe is requested – every entrance animation has finished by then. */
const GLOBE_DELAY_MS = 2200;

/**
 * Height of the planet's visible cap. Scales with the viewport but shrinks faster on short
 * screens (≈ 21 % at 900 px, 17 % at 700 px) so the copy, the CTAs *and* the horizon all
 * fit on a laptop's first screen. The horizon box is twice this (head-room for the halo).
 */
const HORIZON_CAP = "clamp(6.5rem, 32.5svh - 102px, 17rem)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Gentle parallax: background drifts slower than content, content fades as you leave.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // The planet sinks a little slower than the page and fades out as the hero leaves.
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const earthOpacity = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);

  // 3D Earth: desktop only (phones get the CSS horizon), never before the entrance has
  // played, and its render loop pauses as soon as the hero is scrolled out of view.
  const reduced = useReducedMotion() ?? false;
  const wantsGlobe = useMediaQuery("(min-width: 1024px)") && !reduced;
  const [globeEnabled, setGlobeEnabled] = useState(false);
  useEffect(() => {
    if (!wantsGlobe) {
      setGlobeEnabled(false);
      return;
    }
    const id = window.setTimeout(() => setGlobeEnabled(true), GLOBE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [wantsGlobe]);
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      ref={ref}
      style={{ "--cap": HORIZON_CAP } as CSSProperties}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-[calc(var(--cap)+min(7vh,4rem))] sm:pt-[min(9rem,17vh)]"
    >
      {/* ── Background: blue space photo + orbs + stars ─────────────────── */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-[-10%] -z-30 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-[position:center_35%] opacity-70"
          style={{ backgroundImage: "url('/space-blue.webp')" }}
        />
      </motion.div>

      <div aria-hidden className="absolute inset-0 -z-20 bg-[url('/stars.svg')] bg-[length:900px_900px] opacity-40" />

      <Orb tone="blue" size={820} className="-left-[18%] -top-[25%] opacity-80" />
      <Orb tone="sky" size={680} animate="drift-slow" className="-right-[14%] top-[5%] opacity-70" />
      <Orb tone="cyan" size={560} animate="float" className="bottom-[-18%] left-[28%] opacity-60" />

      {/* ── Planet horizon: night-side Earth rising behind the copy ─────── */}
      <motion.div aria-hidden style={{ y: earthY, opacity: earthOpacity }} className="absolute inset-0 -z-10 will-change-transform">
        <EarthHorizon enabled={globeEnabled} active={inView} idleSpeed={0.035} className="h-[calc(var(--cap)*2)]" />
      </motion.div>

      {/* Fades into the page background so sections blend */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent via-[#05050a]/60 to-[#05050a]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,99,235,0.16),transparent_60%)]" />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative">
        <motion.div
          variants={staggerContainer(0.13, 0.15)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white/80 shadow-[0_0_30px_-10px_rgba(14,165,233,0.8)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
            </span>
            Web &amp; Mobile App Development Agency
            <Sparkles className="h-3.5 w-3.5 text-sky-300" aria-hidden />
          </motion.span>

          <SplitText
            as="h1"
            id="hero-title"
            stagger={0.07}
            duration={0.9}
            className="mt-[min(1.75rem,3.5vh)] text-[2.65rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[min(5.25rem,9.35vh)]"
          >
            Transform Your Ideas
            <br />
            <Accent className="text-gradient drop-shadow-[0_0_30px_rgba(14,165,233,0.35)]">
              Into Digital Reality
            </Accent>
          </SplitText>

          <SplitText
            as="p"
            mode="lines"
            delay={0.95}
            className="mx-auto mt-[min(1.75rem,3.5vh)] max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg md:text-[min(1.25rem,2.7vh)]"
          >
            We design and build stunning websites, cross-platform mobile apps and
            robust backend systems that move your business forward — from first
            sketch to launch day and beyond.
          </SplitText>

          <motion.div
            variants={fadeUp}
            custom={0.95}
            className="mt-[min(2.5rem,4.8vh)] flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button href="#contact" size="lg" className="w-full sm:w-auto">
              Start Your Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="#work" variant="ghost" size="lg" className="w-full sm:w-auto">
              <Play className="h-4 w-4 fill-current" aria-hidden />
              See Our Work
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} custom={1.0} className="mt-[min(1.5rem,3vh)] text-xs text-white/40">
            Free discovery call · No commitment · Reply within 24 hours
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
