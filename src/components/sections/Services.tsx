"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import SplitText from "@/components/ui/SplitText";
import { Orb } from "@/components/ui/Orbs";
import { SERVICES } from "@/data/site";
import { staggerContainer, viewportReplay } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Orb tone="blue" size={700} animate="drift-slow" className="-left-[20%] top-1/3 opacity-40" />

      <div className="container-x relative">
        <SectionHeader
          titleId="services-title"
          eyebrow="What we build"
          title={
            <>
              End-to-end product development,{" "}
              <span className="text-gradient">one senior team</span>
            </>
          }
          description="From concept to deployment, we cover every layer of your product — the interface people see, the apps they carry and the systems that quietly power it all."
        />

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReplay}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {SERVICES.map(({ id, title, description, icon: Icon }, i) => (
            <GlowCard key={id} as="article" className="group flex h-full flex-col p-7 sm:p-8">
              {/* top gradient edge */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent opacity-60 transition-opacity group-hover:opacity-100",
                )}
              />

              <div className="flex items-start justify-between">
                <span className="icon-tile">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-heading text-sm font-bold text-white/25">0{i + 1}</span>
              </div>

              <SplitText as="h3" delay={0.25} className="mt-8 font-heading text-2xl font-bold text-white">
                {title}
              </SplitText>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">{description}</p>

              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-sky-200/90 transition-colors hover:text-white"
              >
                Discuss {title.toLowerCase()}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
