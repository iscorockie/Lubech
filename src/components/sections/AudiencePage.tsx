"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import GlowCard from "@/components/ui/GlowCard";
import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import { Orb } from "@/components/ui/Orbs";
import { AUDIENCES, PROCESS, STATS } from "@/data/site";
import { staggerContainer, viewportReplay } from "@/lib/animations";

/**
 * Dedicated page for one audience from the "Who it's for" section —
 * currently rendered by /build-my-mvp.
 */
export default function AudiencePage({ slug }: { slug: string }) {
  const audience = AUDIENCES.find((a) => a.slug === slug);
  if (!audience) return null;

  return (
    <>
      <a href="#main" className="skip-link btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold">
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <Orb tone="blue" size={800} animate="drift-slow" className="-left-[20%] top-0 opacity-40" />
          <Orb tone="cyan" size={600} animate="drift" className="-right-[15%] bottom-0 opacity-35" />

          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200/90 shadow-[0_0_24px_-8px_rgba(14,165,233,0.6)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
                {audience.eyebrow}
              </motion.span>

              <SplitText
                as="h1"
                className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              >
                {audience.pageTitle ?? audience.title}
              </SplitText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
              >
                {audience.pageIntro ?? audience.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-9 flex flex-wrap items-center justify-center gap-4"
              >
                <Link href="/#contact" className="btn-gradient rounded-full px-7 py-3 text-sm font-semibold">
                  Start your project
                </Link>
                <Link href="/#work" className="btn-ghost rounded-full px-7 py-3 text-sm font-semibold">
                  See our work
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section aria-labelledby="included-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
          <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200/90 shadow-[0_0_24px_-8px_rgba(14,165,233,0.6)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
                What&apos;s included
              </motion.span>
              <SplitText
                as="h2"
                id="included-title"
                className="mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                Everything you need to{" "}
                <span className="text-gradient">{audience.pageIncludedHighlight ?? "launch"}</span>
              </SplitText>
              <SplitText
                as="p"
                mode="lines"
                delay={0.45}
                className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg"
              >
                {audience.description}
              </SplitText>
            </div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportReplay}
              className="mt-14 grid gap-5 sm:grid-cols-2"
            >
              {audience.points.map((p) => (
                <GlowCard key={p} className="flex items-center gap-4 p-6">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/60 to-cyan-400/40">
                    <Check className="h-4 w-4 text-white" aria-hidden strokeWidth={3} />
                  </span>
                  <p className="text-sm font-semibold text-white/80">{p}</p>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section aria-labelledby="process-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
          <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
          <Orb tone="sky" size={700} animate="drift" className="-right-[20%] top-1/4 opacity-30" />
          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <SplitText
                as="h2"
                id="process-title"
                className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                {audience.pageProcessTitle ?? (
                  <>
                    How we&apos;ll take it <span className="text-gradient">from idea to live</span>
                  </>
                )}
              </SplitText>
            </div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportReplay}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {PROCESS.map((p) => (
                <GlowCard key={p.step} className="p-6">
                  <span className="font-display text-3xl font-extrabold text-gradient">{p.step}</span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.description}</p>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-300/80">
                    {p.duration}
                  </p>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="Lubech by the numbers" className="relative overflow-hidden py-10">
          <div className="container-x relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReplay}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-sky-400/20 bg-gradient-to-r from-blue-900/30 via-sky-900/20 to-cyan-900/30 p-1 shadow-[0_0_80px_-30px_rgba(14,165,233,0.7)]"
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

        {/* CTA */}
        <section aria-labelledby="audience-cta-title" className="relative overflow-hidden py-24 md:py-32">
          <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
          <Orb tone="blue" size={760} animate="drift-slow" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="container-x relative text-center">
            <div className="mx-auto max-w-2xl">
              <SplitText
                as="h2"
                id="audience-cta-title"
                className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                Ready to <span className="text-gradient">{audience.pageCtaHighlight ?? "build your MVP"}</span>?
              </SplitText>
              <SplitText
                as="p"
                mode="lines"
                delay={0.45}
                className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
              >
                Tell us about your project — we&apos;ll get back to you within 24 hours.
              </SplitText>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-9"
              >
                <Link
                  href="/#contact"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
                >
                  {audience.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
