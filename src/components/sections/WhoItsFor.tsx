"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import SplitText from "@/components/ui/SplitText";
import { Orb } from "@/components/ui/Orbs";
import { AUDIENCES } from "@/data/site";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Orb tone="cyan" size={700} animate="drift" className="-right-[22%] top-1/4 opacity-40" />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Who it's for"
          title={
            <>
              Built for the ambitious —{" "}
              <span className="text-gradient">at every stage</span>
            </>
          }
          description="Whether you're validating a first idea or scaling a platform that thousands rely on, we meet you where you are."
        />

        <motion.div
          variants={staggerContainer(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-2"
        >
          {AUDIENCES.map(({ id, eyebrow, title, description, icon: Icon, points, cta }, i) => (
            <GlowCard key={id} as="article" className="group relative overflow-hidden p-8 sm:p-10">
              {/* corner glow */}
              <span
                aria-hidden
                className={
                  i === 0
                    ? "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    : "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                }
              />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="icon-tile">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200/80">
                    {eyebrow}
                  </span>
                </div>

                <SplitText
                  as="h3"
                  delay={0.25}
                  className="mt-7 font-heading text-2xl font-bold leading-snug text-white sm:text-3xl"
                >
                  {title}
                </SplitText>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55 sm:text-base">{description}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 text-sm text-white/75"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-[0_0_12px_rgba(14,165,233,0.6)]">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-sky-400/50 hover:bg-white/[0.07] hover:shadow-[0_0_30px_-10px_rgba(14,165,233,0.7)]"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
