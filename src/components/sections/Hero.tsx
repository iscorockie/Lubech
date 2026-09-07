"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Play, Server, Smartphone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import { Orb } from "@/components/ui/Orbs";
import SplitText, { Accent } from "@/components/ui/SplitText";
import { HERO_STATS } from "@/data/site";
import { EASE, fadeUp, staggerContainer } from "@/lib/animations";

const pillars = [
  { icon: Code2, label: "Web platforms", note: "Next.js · React" },
  { icon: Smartphone, label: "Mobile apps", note: "iOS · Android" },
  { icon: Server, label: "Backend & cloud", note: "APIs · AWS" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Gentle parallax: background drifts slower than content, content fades as you leave.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 sm:pt-36 md:pb-24"
    >
      {/* ── Background: purple space photo + orbs + stars ─────────────────── */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-[-10%] -z-30 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-[position:center_35%] opacity-70"
          style={{ backgroundImage: "url('/space-purple.jpg')" }}
        />
      </motion.div>

      <div aria-hidden className="absolute inset-0 -z-20 bg-[url('/stars.svg')] bg-[length:900px_900px] opacity-40" />

      <Orb tone="violet" size={820} className="-left-[18%] -top-[25%] opacity-80" />
      <Orb tone="fuchsia" size={680} animate="drift-slow" className="-right-[14%] top-[5%] opacity-70" />
      <Orb tone="pink" size={560} animate="float" className="bottom-[-18%] left-[28%] opacity-60" />

      {/* Fades into the page background so sections blend */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent via-[#05050a]/70 to-[#05050a]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.16),transparent_60%)]" />

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
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white/80 shadow-[0_0_30px_-10px_rgba(192,38,211,0.8)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
            </span>
            Web &amp; Mobile App Development Agency
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" aria-hidden />
          </motion.span>

          <SplitText
            as="h1"
            stagger={0.07}
            duration={0.9}
            className="mt-7 text-[2.65rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Transform Your Ideas
            <br />
            <Accent className="text-gradient drop-shadow-[0_0_30px_rgba(192,38,211,0.35)]">
              Into Digital Reality
            </Accent>
          </SplitText>

          <motion.p
            variants={fadeUp}
            custom={0.45}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
          >
            We design and build stunning websites, cross-platform mobile apps and
            robust backend systems that move your business forward — from first
            sketch to launch day and beyond.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
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

          <motion.p variants={fadeUp} custom={0.55} className="mt-6 text-xs text-white/40">
            Free discovery call · No commitment · Reply within 24 hours
          </motion.p>
        </motion.div>

        {/* ── Floating glass panel ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="relative mx-auto mt-16 max-w-4xl sm:mt-20"
        >
          {/* glow under the panel */}
          <div
            aria-hidden
            className="absolute inset-x-10 -bottom-6 h-24 rounded-full bg-gradient-to-r from-violet-600/40 via-fuchsia-500/40 to-pink-500/40 blur-3xl"
          />

          <div className="animate-float relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_100px_-30px_rgba(124,58,237,0.6)] backdrop-blur-2xl">
            <div className="rounded-[1.35rem] border border-white/[0.06] bg-[#0a0a12]/80 px-5 py-6 sm:px-8 sm:py-7">
              {/* window chrome */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400/80" />
                  <span className="ml-3 hidden text-xs font-medium text-white/45 sm:block">
                    lubech.tech / your-next-product
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  Live
                </span>
              </div>

              {/* pillars */}
              <div className="grid gap-3 sm:grid-cols-3">
                {pillars.map(({ icon: Icon, label, note }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 1.05 + i * 0.12 }}
                    className={
                      i === 1
                        ? "rounded-2xl border border-fuchsia-400/30 bg-gradient-to-b from-fuchsia-500/[0.14] to-violet-600/[0.08] p-4 text-left shadow-[0_0_40px_-12px_rgba(192,38,211,0.7)]"
                        : "rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left"
                    }
                  >
                    <span className="icon-tile !h-10 !w-10 !rounded-xl">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <p className="mt-5 font-heading text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs text-white/45">{note}</p>
                  </motion.div>
                ))}
              </div>

              {/* stats strip */}
              <div className="mt-6 grid grid-cols-2 gap-y-4 border-t border-white/[0.06] pt-5 sm:grid-cols-4">
                {HERO_STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}
                    className="text-center"
                  >
                    <p className="font-heading text-xl font-bold text-white sm:text-2xl">
                      <CountUp value={s.value} delay={0.2 + i * 0.1} className="text-gradient" />
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-white/40">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* decorative floating chips */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
            className="glass absolute -left-28 top-16 hidden rounded-2xl px-4 py-3 text-left shadow-[0_0_30px_-8px_rgba(124,58,237,0.8)] xl:block"
            style={{ animation: "float 9s ease-in-out infinite 1s" }}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Lighthouse</p>
            <p className="font-heading text-lg font-bold text-white">
              98<span className="text-gradient">/100</span>
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.65, ease: EASE }}
            className="glass absolute -right-28 bottom-16 hidden rounded-2xl px-4 py-3 text-left shadow-[0_0_30px_-8px_rgba(219,39,119,0.8)] xl:block"
            style={{ animation: "float 10s ease-in-out infinite 2s" }}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Shipped</p>
            <p className="font-heading text-lg font-bold text-white">
              iOS <span className="text-white/30">+</span> Android
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
