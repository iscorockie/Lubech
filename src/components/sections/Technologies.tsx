"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_ROW_1, TECH_ROW_2 } from "@/data/site";
import type { Technology } from "@/types";
import { fadeIn, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

function TechChip({ name, icon: Icon, color }: Technology) {
  return (
    <li
      className="group flex shrink-0 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] py-2.5 pl-3 pr-5 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_28px_-8px_rgba(192,38,211,0.6)]"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0a12] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-white/80">{name}</span>
    </li>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Technology[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="fade-x relative overflow-hidden py-2">
      <ul
        className={cn(
          "flex w-max gap-3 hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        aria-label={reverse ? "More technologies" : "Technologies"}
      >
        {doubled.map((t, i) => (
          <TechChip key={`${t.name}-${i}`} {...t} />
        ))}
      </ul>
    </div>
  );
}

export default function Technologies() {
  return (
    <section id="technologies" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
      <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Technologies we master"
          title={
            <>
              A modern stack, chosen for{" "}
              <span className="text-gradient">speed and longevity</span>
            </>
          }
          description="We pick proven, open technologies your future team will thank you for — and we stay current so you don't have to."
        />
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mt-14 space-y-3"
      >
        <MarqueeRow items={TECH_ROW_1} />
        <MarqueeRow items={TECH_ROW_2} reverse />
      </motion.div>

      <div className="container-x relative mt-12 grid gap-3 sm:grid-cols-3">
        {[
          ["Frontend", "React · Next.js · TypeScript · Tailwind · Framer Motion"],
          ["Mobile", "React Native · Expo · Flutter · Dart · App Store & Play"],
          ["Backend & Cloud", "Node.js · Go · Python · PostgreSQL · MongoDB · AWS"],
        ].map(([label, stack], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-center"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-200/80">{label}</p>
            <p className="mt-1.5 text-sm text-white/55">{stack}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
