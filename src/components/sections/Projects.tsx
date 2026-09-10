"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronRight, Globe, Smartphone } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import { Orb } from "@/components/ui/Orbs";
import { PROJECTS } from "@/data/site";
import type { Project } from "@/types";
import { EASE, viewportReplay } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Filter = "all" | "web" | "mobile";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile apps" },
];

/** Stylised phone mock-up used for mobile projects without a screenshot. */
export function PhoneArt({ project }: { project: Project }) {
  const initials =
    project.mock?.initials ??
    project.title
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
  const gradient = project.mock?.gradient ?? "from-blue-600/40 via-sky-500/25 to-cyan-500/30";

  return (
    <div
      aria-hidden
      className="relative flex h-full w-full items-end justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.35),rgba(10,10,18,0.2)_60%)]"
    >
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-[length:600px_600px] opacity-30" />
      {/* floating accent chips */}
      <span aria-hidden className="absolute left-[12%] top-[22%] h-10 w-10 rounded-[1.25rem] border border-white/10 bg-white/[0.06] backdrop-blur-md" style={{ animation: "float 7s ease-in-out infinite" }} />
      <span aria-hidden className="absolute right-[12%] top-[38%] h-7 w-7 rounded-full border border-sky-300/30 bg-sky-500/20 backdrop-blur-md" style={{ animation: "float 9s ease-in-out infinite 1.5s" }} />

      <div className="relative h-[86%] w-[46%] translate-y-6 rounded-[2.5rem] border border-white/15 bg-[#0a0a12] p-2 shadow-[0_30px_80px_-20px_rgba(14,165,233,0.6)] transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-2deg]">
        <div className={cn("flex h-full flex-col rounded-[2rem] bg-gradient-to-b p-3", gradient)}>
          <span className="mx-auto mt-1 h-1.5 w-12 rounded-full bg-black/60" />
          <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-[1.25rem] bg-white font-heading text-sm font-extrabold text-blue-700 shadow-lg">
            {initials}
          </div>
          <div className="mt-4 space-y-2">
            <span className="block h-2 w-3/4 rounded-full bg-white/70" />
            <span className="block h-2 w-1/2 rounded-full bg-white/40" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            <span className="h-12 rounded-[1.25rem] bg-white/15" />
              <span className="h-12 rounded-[1.25rem] bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isWeb = project.category === "web";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease: EASE, delay: Math.min(index, 5) * 0.06 }}
      className="glow-card group flex flex-col overflow-hidden"
    >
      {/* Thumbnail — opens the project's own page */}
      <Link
        href={`/project/${project.id}`}
        aria-label={`View the ${project.title} case study`}
        className="relative block aspect-[16/11] overflow-hidden rounded-t-[2rem] border-b border-white/[0.06]"
      >
        <span className="sr-only">View the {project.title} case study</span>
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <PhoneArt project={project} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/20 to-transparent opacity-80" />

        <span
          aria-hidden
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md"
        >
          {isWeb ? <Globe className="h-3 w-3" aria-hidden /> : <Smartphone className="h-3 w-3" aria-hidden />}
          {isWeb ? "Web app" : "Mobile app"}
        </span>

        <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-[#0a0a12] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <SplitText as="h3" inView delay={0.15 + Math.min(index, 5) * 0.06} className="font-heading text-lg font-bold text-white">
          {project.title}
        </SplitText>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-2.5 py-1 text-[11px] font-medium text-blue-100/80"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-6">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-200/90 transition-colors hover:text-white"
            >
              View live <ChevronRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          {project.appStoreUrl ? (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on the App Store`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-all hover:border-sky-400/40 hover:text-white"
            >
              <FaApple className="h-3.5 w-3.5" aria-hidden /> App Store
            </a>
          ) : null}
          {project.playStoreUrl ? (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on Google Play`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-all hover:border-sky-400/40 hover:text-white"
            >
              <FaGooglePlay className="h-3 w-3" aria-hidden /> Google Play
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
    return expanded ? list : list.slice(0, 6);
  }, [filter, expanded]);

  const total = filter === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === filter).length;

  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Orb tone="sky" size={800} animate="drift" className="-right-[25%] top-0 opacity-35" />
      <Orb tone="blue" size={700} animate="drift-slow" className="-left-[20%] bottom-0 opacity-35" />

      <div className="container-x relative">
        <SectionHeader
          titleId="work-title"
          eyebrow="Featured projects"
          title={
            <>
              Real products, <span className="text-gradient">real impact</span>
            </>
          }
          description="From web platforms to mobile apps shipped to thousands of users — a selection of work we're proud of."
        />

        {/* Filters */}
        <LayoutGroup id="project-filters">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReplay}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
            role="group"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  aria-pressed={active}
                  type="button"
                  onClick={() => {
                    setFilter(f.id);
                    setExpanded(false);
                  }}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                    active ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-sky-700 to-cyan-700 shadow-[0_0_24px_-6px_rgba(14,165,233,0.8)]"
                    />
                  ) : null}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {total > 6 ? (
          <div className="mt-12 flex justify-center">
            <Button variant="ghost" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show fewer" : `Show all ${total} projects`}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
