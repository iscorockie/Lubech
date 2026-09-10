"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Linkedin, Youtube } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import { useMediaQuery } from "@/lib/hooks";
import { TEAM } from "@/data/site";
import { EASE, fadeUp, viewportReplay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

const socialIcon = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
} as const;

/*
 * Cosmic ambience behind the carousel — all positions are fixed (deterministic)
 * so SSR and client render identically. Layers: navy→black gradient, top
 * glow, centre "planet" glow + halo ring, two soft light rays, twinkling
 * particles (existing pulse-glow keyframes).
 */
const PARTICLES = [
  { top: "8%", left: "6%", size: 3, cls: "bg-sky-200/70", delay: "0s", dur: "5.5s" },
  { top: "16%", left: "22%", size: 2, cls: "bg-white/60", delay: "1.2s", dur: "7s" },
  { top: "10%", left: "38%", size: 2, cls: "bg-cyan-200/60", delay: "2.1s", dur: "6s" },
  { top: "6%", left: "57%", size: 3, cls: "bg-sky-300/70", delay: "0.6s", dur: "8s" },
  { top: "14%", left: "74%", size: 2, cls: "bg-white/50", delay: "1.8s", dur: "6.5s" },
  { top: "9%", left: "90%", size: 3, cls: "bg-cyan-200/60", delay: "2.6s", dur: "7.5s" },
  { top: "30%", left: "10%", size: 2, cls: "bg-white/55", delay: "0.9s", dur: "6s" },
  { top: "26%", left: "31%", size: 3, cls: "bg-sky-200/60", delay: "2.4s", dur: "8.5s" },
  { top: "34%", left: "49%", size: 2, cls: "bg-cyan-300/60", delay: "1.5s", dur: "5.5s" },
  { top: "28%", left: "66%", size: 2, cls: "bg-white/50", delay: "0.3s", dur: "7s" },
  { top: "36%", left: "84%", size: 3, cls: "bg-sky-300/60", delay: "2.9s", dur: "6s" },
  { top: "48%", left: "5%", size: 2, cls: "bg-cyan-200/55", delay: "1.1s", dur: "8s" },
  { top: "52%", left: "92%", size: 2, cls: "bg-white/45", delay: "0.7s", dur: "6.5s" },
  { top: "64%", left: "14%", size: 3, cls: "bg-sky-200/55", delay: "2.2s", dur: "7.5s" },
  { top: "70%", left: "87%", size: 2, cls: "bg-cyan-300/55", delay: "1.7s", dur: "6s" },
  { top: "84%", left: "28%", size: 2, cls: "bg-white/50", delay: "0.4s", dur: "7s" },
  { top: "88%", left: "70%", size: 3, cls: "bg-sky-300/55", delay: "2.7s", dur: "8s" },
  { top: "92%", left: "48%", size: 2, cls: "bg-cyan-200/50", delay: "1.3s", dur: "6.5s" },
] as const;

function CosmicBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep space: navy → black */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b1226_0%,#070b18_38%,#05050a_72%)]" />
      {/* glow falling from the top */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(37,99,235,0.28),transparent_65%)]" />
      {/* faint circular cosmic glow, centre of the carousel */}
      <div className="absolute left-1/2 top-[58%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,rgba(37,99,235,0.07)_42%,transparent_68%)]" />
      {/* halo ring around the glow */}
      <div className="absolute left-1/2 top-[58%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/[0.14] shadow-[0_0_80px_-24px_rgba(56,189,248,0.4),inset_0_0_60px_-34px_rgba(56,189,248,0.45)]" />
      {/* soft light rays (clip-path cones — no blur filters, cheap to paint) */}
      <div className="absolute -top-40 left-[16%] h-[540px] w-[190px] rotate-[16deg] bg-gradient-to-b from-sky-300/[0.10] via-sky-400/[0.04] to-transparent [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
      <div className="absolute -top-40 right-[14%] h-[580px] w-[230px] -rotate-[14deg] bg-gradient-to-b from-cyan-300/[0.08] via-sky-400/[0.03] to-transparent [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
      {/* twinkling particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${p.cls} animate-pulse-glow shadow-[0_0_10px_rgba(125,211,252,0.7)]`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}

function TeamCard({ m }: { m: TeamMember }) {
  const socials = Object.entries(m.social).filter(([, url]) => Boolean(url)) as [
    keyof typeof socialIcon,
    string,
  ][];

  return (
    <div className="team-glass mx-auto flex h-full max-w-[20.5rem] flex-col items-center px-6 pb-7 pt-9 text-center sm:px-7">
      <div className="rounded-full bg-gradient-to-b from-sky-300/70 via-blue-500/30 to-cyan-400/50 p-[2px] shadow-[0_0_40px_-10px_rgba(56,189,248,0.55)]">
        <div className="overflow-hidden rounded-full">
          <Image
            src={m.image}
            alt={m.name}
            width={288}
            height={288}
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 38vw, 28vw"
            className="h-32 w-32 object-cover object-top sm:h-36 sm:w-36"
          />
        </div>
      </div>

      <p className="mt-5 font-heading text-lg font-bold text-white">{m.name}</p>
      <p className="mt-1.5 text-[13px] font-semibold tracking-wide text-sky-300">{m.role}</p>

      <div className="hairline mt-5 w-24" aria-hidden />
      <p className="mt-4 flex-1 text-[13px] leading-relaxed text-white/55">{m.bio}</p>

      {socials.length ? (
        <div className="mt-6 flex gap-2.5">
          {socials.map(([key, url]) => {
            const Icon = socialIcon[key];
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on ${key} (opens in a new tab)`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function Team() {
  const [index, setIndex] = useState(0);

  // 1 card on phones, 2 on tablets, 3 on desktop
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const visible = isDesktop ? 3 : isTablet ? 2 : 1;
  const maxIndex = Math.max(0, TEAM.length - visible);
  const safeIndex = Math.min(index, maxIndex);
  const go = (i: number) => setIndex(Math.min(Math.max(i, 0), maxIndex));

  // The track is viewport-width, so each slide must be 100/visible % of it and
  // the x-offset is index × that — exactly one card per step, seam-free.
  const slideW = 100 / visible;

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <CosmicBackdrop />
      <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />

      <div className="container-x relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReplay}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-9 flex justify-center"
        >
          <span className="inline-block [filter:drop-shadow(0_0_18px_rgba(34,211,238,0.5))]">
            <Image
              src="/techvector.svg"
              alt="Lubech"
              width={267}
              height={82}
              className="h-10 w-auto md:h-12"
            />
          </span>
        </motion.div>

        <div className="mx-auto max-w-3xl text-center">
          <SplitText
            as="h2"
            id="team-title"
            className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            <>
              Meet the <span className="text-gradient">Team</span>
            </>
          </SplitText>
          <SplitText
            as="p"
            mode="lines"
            delay={0.45}
            className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg"
          >
            A small, senior team of engineers, designers and strategists — based in the UK
            and Uganda, building for clients worldwide. The people you meet are the people
            who build.
          </SplitText>
        </div>

        {/* Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReplay}
          className="relative mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Meet the team"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex touch-pan-y will-change-transform"
              animate={{ x: `-${safeIndex * slideW}%` }}
              transition={{ duration: 0.55, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(safeIndex + 1);
                else if (info.offset.x > 60) go(safeIndex - 1);
              }}
            >
              {TEAM.map((m, i) => {
                const inView = i >= safeIndex && i < safeIndex + visible;
                return (
                  <div
                    key={m.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${slideW}%` }}
                    aria-hidden={!inView || undefined}
                    aria-label={`${i + 1} of ${TEAM.length}`}
                  >
                    <TeamCard m={m} />
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-9 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(safeIndex - 1)}
              disabled={safeIndex === 0}
              aria-label="Previous team member"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to position ${i + 1}`}
                  aria-current={i === safeIndex ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === safeIndex
                      ? "w-8 bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/45",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(safeIndex + 1)}
              disabled={safeIndex === maxIndex}
              aria-label="Next team member"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing team members {safeIndex + 1}–{Math.min(safeIndex + visible, TEAM.length)} of{" "}
            {TEAM.length}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
