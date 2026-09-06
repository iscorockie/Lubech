"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Youtube } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Orb } from "@/components/ui/Orbs";
import { TEAM } from "@/data/site";
import { staggerContainer, viewportOnce } from "@/lib/animations";

const socialIcon = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
} as const;

export default function Team() {
  return (
    <section id="team" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
      <Orb tone="fuchsia" size={760} animate="drift-slow" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Meet the team"
          title={
            <>
              The people behind <span className="text-gradient">the products</span>
            </>
          }
          description="A small, senior team of engineers, designers and strategists based in the UK and Uganda — building for clients worldwide."
        />

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {TEAM.map((m) => {
            const socials = Object.entries(m.social).filter(([, url]) => Boolean(url)) as [
              keyof typeof socialIcon,
              string,
            ][];

            return (
              <GlowCard key={m.id} as="li" className="group overflow-hidden">
                <div className="relative aspect-[4/4.4] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* colour wash + fade to card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/55 via-35% to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 mix-blend-soft-light" />

                  {/* socials */}
                  {socials.length ? (
                    <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0">
                      {socials.map(([key, url]) => {
                        const Icon = socialIcon[key];
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${m.name} on ${key}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-fuchsia-400/60 hover:bg-fuchsia-600/40"
                          >
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <div className="-mt-10 relative px-5 pb-6">
                  <h3 className="font-heading text-lg font-bold text-white">{m.name}</h3>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.16em] text-gradient">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{m.bio}</p>
                </div>
              </GlowCard>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
