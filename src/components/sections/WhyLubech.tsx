"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Orb, GridPattern } from "@/components/ui/Orbs";
import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import { REASONS, TESTIMONIALS, HERO_STATS } from "@/data/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function WhyLubech() {
  return (
    <section id="why-lubech" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <GridPattern className="opacity-40" />
      <Orb tone="blue" size={800} animate="drift-slow" className="-left-[25%] top-0 opacity-40" />
      <Orb tone="cyan" size={700} animate="drift" className="-right-[20%] bottom-0 opacity-35" />

      <div className="container-x relative">
        <SectionHeader
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
          viewport={viewportOnce}
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
          viewport={viewportOnce}
          className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-sky-400/20 bg-gradient-to-r from-blue-900/30 via-sky-900/20 to-cyan-900/30 p-1 shadow-[0_0_80px_-30px_rgba(14,165,233,0.7)]"
        >
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((s, i) => (
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

        {/* Testimonials */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <GlowCard key={t.id} as="article" hoverLift={false} className="flex h-full flex-col p-7">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sky-400 text-sky-400" aria-hidden />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/15" aria-hidden />
              </div>
              <SplitText as="blockquote" mode="lines" stagger={0.07} className="mt-5 flex-1 text-[15px] leading-relaxed text-white/75">
                {`“${t.content}”`}
              </SplitText>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-700 font-heading text-sm font-bold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/45">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
