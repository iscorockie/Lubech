"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Orb } from "@/components/ui/Orbs";
import SplitText from "@/components/ui/SplitText";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface StatusPageProps {
  /** Large decorative status code, e.g. "404". */
  code: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions: ReactNode;
  footnote?: ReactNode;
}

/**
 * Shared shell for the 404 / error routes so they inherit the same dark,
 * glowing visual language as the landing page instead of the framework defaults.
 */
export default function StatusPage({
  code,
  eyebrow,
  title,
  description,
  actions,
  footnote,
}: StatusPageProps) {
  return (
    <main className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      {/* ── Ambient background ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[url('/stars.svg')] bg-[length:900px_900px] opacity-40"
      />
      <Orb tone="violet" size={760} className="-left-[20%] -top-[30%] opacity-70" />
      <Orb tone="fuchsia" size={620} animate="drift-slow" className="-right-[18%] top-[10%] opacity-60" />
      <Orb tone="pink" size={520} animate="float" className="-bottom-[25%] left-[30%] opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.16),transparent_60%)]"
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-2xl flex-col items-center"
      >
        <motion.a variants={fadeUp} href="/" aria-label="Lubech — home" className="relative block h-10 w-32">
          <Image src="/techvector.svg" alt="" fill unoptimized priority className="object-contain" />
        </motion.a>

        <motion.p
          variants={fadeUp}
          aria-hidden
          className="font-display text-gradient mt-10 text-[7rem] font-extrabold leading-none tracking-[-0.06em] drop-shadow-[0_0_40px_rgba(192,38,211,0.35)] sm:text-[9.5rem]"
        >
          {code}
        </motion.p>

        <motion.span
          variants={fadeUp}
          className="glass mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white/80 shadow-[0_0_30px_-10px_rgba(192,38,211,0.8)]"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 shadow-[0_0_10px_rgba(232,121,249,0.9)]"
          />
          {eyebrow}
        </motion.span>

        <SplitText as="h1" className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
          {title}
        </SplitText>

        <motion.p variants={fadeUp} custom={0.35} className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
          {description}
        </motion.p>

        <motion.div variants={fadeUp} custom={0.4} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          {actions}
        </motion.div>

        {footnote && (
          <motion.div variants={fadeUp} className="mt-10 text-sm text-white/40">
            {footnote}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
