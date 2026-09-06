"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { useState } from "react";

const projects = [
  { title: "Space4Climate", type: "Web platform", image: "/projects/space4climate.png", stat: "Climate intelligence" },
  { title: "Glam n' Go", type: "Mobile commerce", image: "/projects/glam-n-go.jpg", stat: "5K+ downloads" },
  { title: "Easy Gas", type: "Delivery platform", image: "/projects/easy-gas.jpg", stat: "Live on mobile" },
  { title: "Masifa", type: "Community platform", image: "/projects/masifa.png", stat: "Built for impact" },
];

const orbitAngles = [-150, -65, 25, 115];

const HeroSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const project = projects[activeProject];

  const previousProject = () => setActiveProject((current) => (current - 1 + projects.length) % projects.length);
  const nextProject = () => setActiveProject((current) => (current + 1) % projects.length);

  return (
    <section id="home" className="hero-template relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-sky pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-cloud hero-cloud-one pointer-events-none absolute" />
      <div aria-hidden="true" className="hero-cloud hero-cloud-two pointer-events-none absolute" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-32 sm:px-6 md:pb-14 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#d6ff63]"><Sparkles className="h-3.5 w-3.5" /> Lubech digital studio</div>
          <h1 className="font-heading text-5xl font-extrabold leading-[.98] tracking-[-.055em] text-white sm:text-7xl">Building the future<br /><span className="text-white/55">one bold idea at a time.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/70 sm:text-base">We help ambitious teams turn complex ideas into clear, useful digital products that people love to use.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="#contact" className="pill bg-[#d6ff63] px-6 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#102431] transition-transform hover:scale-[1.03]">Get started <ArrowUpRight className="h-4 w-4" /></a><a href="#portfolio" className="pill border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[.08em] text-white backdrop-blur-md transition-colors hover:bg-white/20"><Play className="h-3.5 w-3.5 fill-current" /> View our work</a></div>
        </div>

        {/* Orbiting project system: cards replace the reference's 3D objects. */}
        <div className="relative mx-auto mt-14 h-[330px] max-w-4xl sm:h-[390px] md:mt-16" aria-label="Featured Lubech projects">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[225px] w-[min(92vw,670px)] -translate-x-1/2 -translate-y-1/2 sm:h-[270px]"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={prefersReducedMotion ? undefined : { duration: 34, ease: "linear", repeat: Infinity }}
            style={{ transformStyle: "preserve-3d", perspective: 1100 }}
          >
            <div className="absolute inset-0 rounded-[50%] border border-white/20 bg-white/[.04] shadow-[0_0_80px_rgba(255,255,255,.15)]" />
            <div className="absolute inset-[17%] rounded-[50%] border border-dashed border-white/20" />
            {projects.map((item, index) => {
              const angle = orbitAngles[index];
              const radians = (angle * Math.PI) / 180;
              const left = 50 + Math.cos(radians) * 47;
              const top = 50 + Math.sin(radians) * 43;
              const depth = (Math.cos(radians) + 1) / 2;
              const scale = 0.78 + depth * 0.22;
              const opacity = 0.5 + depth * 0.5;
              return <button key={item.title} type="button" onClick={() => setActiveProject(index)} aria-label={`Feature ${item.title}`} className="absolute hidden w-40 -translate-x-1/2 -translate-y-1/2 text-left transition-transform hover:scale-110 sm:block" style={{ left: `${left}%`, top: `${top}%`, opacity, transform: `translate(-50%, -50%) rotate(${-angle * .12}deg) scale(${scale})`, transformOrigin: "center" }}><div className={`overflow-hidden rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl ${activeProject === index ? "border-[#d6ff63] bg-[#d6ff63]/20" : "border-white/30 bg-white/20"}`}><div className="relative h-24 overflow-hidden rounded-xl"><Image src={item.image} alt="" fill className="object-cover" sizes="160px" /><div className="absolute inset-0 bg-[#102431]/25" /></div><p className="truncate px-1 pb-1 pt-2 text-[10px] font-bold text-white">{item.title}</p></div></button>;
            })}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 w-[min(78vw,330px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/45 bg-white/25 p-2 shadow-[0_30px_80px_rgba(0,0,0,.3)] backdrop-blur-xl sm:w-[380px]">
            <div className="relative h-52 overflow-hidden rounded-2xl sm:h-60"><Image src={project.image} alt={project.title} fill priority={activeProject === 0} className="object-cover" sizes="380px" /><div className="absolute inset-0 bg-gradient-to-t from-[#102431]/90 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-left"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#d6ff63]">{project.type}</p><p className="mt-1 font-heading text-2xl font-bold text-white">{project.title}</p></div><ArrowUpRight className="h-5 w-5 text-white" /></div></div>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/25 bg-[#102431]/35 px-2 py-1.5 backdrop-blur-md"><button type="button" onClick={previousProject} aria-label="Previous project" className="flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition hover:bg-white/15 hover:text-white"><ChevronLeft className="h-4 w-4" /></button><div className="flex gap-1.5">{projects.map((item, index) => <button key={item.title} type="button" onClick={() => setActiveProject(index)} aria-label={`Show ${item.title}`} className={`h-1.5 rounded-full transition-all ${index === activeProject ? "w-6 bg-[#d6ff63]" : "w-1.5 bg-white/45"}`} />)}</div><button type="button" onClick={nextProject} aria-label="Next project" className="flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition hover:bg-white/15 hover:text-white"><ChevronRight className="h-4 w-4" /></button></div>
        </div>

        <div className="mx-auto mt-7 flex max-w-lg flex-col items-center justify-center gap-3 text-center text-xs text-white/70 sm:flex-row sm:gap-5"><span className="flex items-center gap-1 text-[#d6ff63]">★★★★★</span><span>Trusted by teams building what&apos;s next</span><span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" /><span>{project.stat}</span></div>
      </div>
    </section>
  );
};

export default HeroSection;
