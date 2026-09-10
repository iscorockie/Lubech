"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Globe, Smartphone } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import GlowCard from "@/components/ui/GlowCard";
import SplitText from "@/components/ui/SplitText";
import { Orb } from "@/components/ui/Orbs";
import { PhoneArt } from "@/components/sections/Projects";
import { PROJECTS } from "@/data/site";
import { EASE, staggerContainer, viewportReplay } from "@/lib/animations";
import type { Project } from "@/types";

/**
 * Dedicated case-study page for one portfolio project —
 * rendered by /project/[slug]. The project image is embedded in a
 * banner frame inside the hero.
 */
export default function ProjectPage({ project }: { project: Project }) {
  const web = project.category === "web";

  // The three projects that follow this one in the portfolio (wrapping).
  const others = useMemo(() => {
    const idx = PROJECTS.findIndex((p) => p.id === project.id);
    return [1, 2, 3].map((off) => PROJECTS[(idx + off) % PROJECTS.length]);
  }, [project.id]);

  const storeButtons = (
    <>
      {project.appStoreUrl ? (
        <a
          href={project.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on the App Store`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/85 transition-all hover:border-sky-400/40 hover:text-white"
        >
          <FaApple className="h-4 w-4" aria-hidden /> App Store
        </a>
      ) : null}
      {project.playStoreUrl ? (
        <a
          href={project.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on Google Play`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/85 transition-all hover:border-sky-400/40 hover:text-white"
        >
          <FaGooglePlay className="h-3.5 w-3.5" aria-hidden /> Google Play
        </a>
      ) : null}
    </>
  );

  return (
    <>
      <a href="#main" className="skip-link btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold">
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="relative">
        {/* Hero — banner with the project image embedded */}
        <section className="relative overflow-hidden py-24 md:py-28">
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
                Our work
              </motion.span>

              <SplitText
                as="h1"
                className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              >
                {project.title}
              </SplitText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReplay}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Banner */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportReplay}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="relative mx-auto mt-10 max-w-4xl"
            >
              <div className="overflow-hidden rounded-[2rem] border border-sky-400/20 bg-gradient-to-r from-blue-900/30 via-sky-900/20 to-cyan-900/30 p-1 shadow-[0_40px_120px_-40px_rgba(14,165,233,0.65)]">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0a0a12]">
                  {project.image ? (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={project.image}
                        alt={`${project.title} — project preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-[320px] sm:h-[380px]">
                      <PhoneArt project={project} />
                    </div>
                  )}
                  {/* legibility shade + category chip */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12]/60 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                    {web ? <Globe className="h-3 w-3" aria-hidden /> : <Smartphone className="h-3 w-3" aria-hidden />}
                    {web ? "Web app" : "Mobile app"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Details */}
        <section aria-labelledby="details-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
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
                Project details
              </motion.span>
              <SplitText
                as="h2"
                id="details-title"
                className="mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                The <span className="text-gradient">full picture</span>
              </SplitText>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
              <GlowCard className="p-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200/80">Tech stack</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-3.5 py-1.5 text-sm font-medium text-blue-100/85"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-white/55">
                  Chosen for the job — performant, maintainable and easy for your team to hand
                  off or extend later.
                </p>
              </GlowCard>

              <GlowCard className="flex flex-col p-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200/80">Availability</h3>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/85 transition-all hover:border-sky-400/40 hover:text-white"
                    >
                      <Globe className="h-4 w-4" aria-hidden /> View live
                    </a>
                  ) : (
                    <span className="text-sm text-white/50">Not public yet — ask us about it.</span>
                  )}
                  {storeButtons}
                </div>
                <div className="mt-auto pt-6">
                  <Link
                    href="/#contact"
                    className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
                  >
                    Want one like this? <ChevronRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* More work */}
        <section aria-labelledby="more-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
          <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
          <Orb tone="sky" size={700} animate="drift" className="-right-[20%] top-1/4 opacity-30" />
          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <SplitText
                as="h2"
                id="more-title"
                className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                Keep <span className="text-gradient">browsing the portfolio</span>
              </SplitText>
            </div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportReplay}
              className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/project/${o.id}`}
                  className="glow-card group block overflow-hidden text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {o.image ? (
                      <Image
                        src={o.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${o.mock?.gradient ?? "from-blue-600/40 via-sky-500/25 to-cyan-500/30"}`}
                      >
                        <span className="font-display text-6xl font-extrabold text-white/85">
                          {o.mock?.initials ??
                            o.title
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")}
                        </span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12]/70 via-transparent to-transparent" />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-heading text-[13px] font-bold text-white">{o.title}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                        {o.category === "web" ? "Web app" : "Mobile app"}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 group-hover:border-sky-400/50 group-hover:text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="project-cta-title" className="relative overflow-hidden py-24 md:py-32">
          <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
          <Orb tone="blue" size={760} animate="drift-slow" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="container-x relative text-center">
            <div className="mx-auto max-w-2xl">
              <SplitText
                as="h2"
                id="project-cta-title"
                className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl"
              >
                Want a project <span className="text-gradient">built like this</span>?
              </SplitText>
              <SplitText
                as="p"
                mode="lines"
                delay={0.45}
                className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
              >
                Tell us about your idea — we&apos;ll get back to you within 24 hours.
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
                  Start a project <ChevronRight className="h-4 w-4" aria-hidden />
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
