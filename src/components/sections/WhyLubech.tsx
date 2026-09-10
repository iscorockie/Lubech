"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Orb, GridPattern } from "@/components/ui/Orbs";
import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import { REASONS, STATS } from "@/data/site";
import { fadeUp, staggerContainer, viewportReplay } from "@/lib/animations";

export default function WhyLubech() {
  return (
    <section id="why-lubech" aria-labelledby="why-lubech-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <GridPattern className="opacity-40" />
      <Orb tone="blue" size={800} animate="drift-slow" className="-left-[25%] top-0 opacity-40" />
      <Orb tone="cyan" size={700} animate="drift" className="-right-[20%] bottom-0 opacity-35" />

      <div className="container-x relative">
        <SectionHeader
          titleId="why-lubech-title"
          eyebrow="Why choose Lubech"
          title={
            <>
              Technical depth meets{" "}
              <span className="text-gradient">creative vision</span>
            </>
          }
          description="We combine senior engineering with thoughtful design and honest communication — the combination that turns good ideas into products people love."
        />

        {/* Reasons grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReplay}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REASONS.map(({ title, description, icon: Icon }) => (
            <GlowCard key={title} as="article" className="group p-6 sm:p-7">
              <span className="icon-tile !h-12 !w-12 !rounded-2xl">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <SplitText as="h3" delay={0.2} className="mt-6 font-heading text-lg font-bold text-white">
                {title}
              </SplitText>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">{description}</p>
            </GlowCard>
          ))}
        </motion.div>

        {/* Stats band */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReplay}
          className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-sky-400/20 bg-gradient-to-r from-blue-900/30 via-sky-900/20 to-cyan-900/30 p-1 shadow-[0_0_80px_-30px_rgba(14,165,233,0.7)]"
        >
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="bg-[#0a0a12]/80 px-6 py-8 text-center backdrop-blur-xl">
                <p className="font-display text-4xl font-extrabold">
                  <CountUp value={s.value} delay={i * 0.12} className="text-gradient" />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
