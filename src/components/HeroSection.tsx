"use client";

import { ArrowRight, Code2, Layers3, Play, Sparkles, Workflow } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="hero-template relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-sky pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-space-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 md:pb-16 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b8ed70]"><Sparkles className="h-3.5 w-3.5" /> Welcome to Lubech</div>
          <h1 className="font-heading text-5xl font-extrabold leading-[.98] tracking-[-.06em] text-white sm:text-7xl md:text-[5.5rem]">Where ideas become<br /><span className="text-white/55">digital excellence.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base">We design and build thoughtful websites, mobile apps, and digital systems for teams ready to make their next move.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="#contact" className="pill bg-[#b8ed70] px-7 py-3.5 text-xs font-bold uppercase tracking-[.08em] text-[#102431] transition-transform hover:scale-[1.03]">Start a project <ArrowRight className="h-4 w-4" /></a><a href="#portfolio" className="pill border border-white/25 bg-white/[.08] px-7 py-3.5 text-xs font-bold uppercase tracking-[.08em] text-white backdrop-blur-md transition-colors hover:bg-white/15"><Play className="h-3.5 w-3.5 fill-current" /> See our work</a></div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl sm:mt-24">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/20 bg-white/[.07] p-2 shadow-[0_30px_100px_rgba(0,0,0,.4)] backdrop-blur-xl"><div className="rounded-[1.5rem] border border-white/10 bg-[#071524]/55 px-5 py-7 sm:px-10 sm:py-9"><div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#b8ed70] shadow-[0_0_12px_#b8ed70]" /><span className="text-xs font-semibold text-white/70">Lubech / digital systems</span></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[.14em] text-white/45">Built for momentum</span></div><div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-white/[.06] p-5 text-left"><Code2 className="h-5 w-5 text-[#b8ed70]" /><p className="mt-8 text-sm font-bold text-white">Web experiences</p><p className="mt-1 text-xs leading-5 text-white/45">Clear, fast, and built to convert.</p></div><div className="rounded-2xl border border-[#b8ed70]/30 bg-[#b8ed70]/[.1] p-5 text-left"><Layers3 className="h-5 w-5 text-[#b8ed70]" /><p className="mt-8 text-sm font-bold text-white">Product design</p><p className="mt-1 text-xs leading-5 text-white/55">From first sketch to shipped product.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.06] p-5 text-left"><Workflow className="h-5 w-5 text-[#b8ed70]" /><p className="mt-8 text-sm font-bold text-white">Digital systems</p><p className="mt-1 text-xs leading-5 text-white/45">Reliable foundations for growth.</p></div></div></div></div>
          <div className="mx-auto mt-5 flex max-w-2xl items-center justify-center gap-4 text-center text-xs text-white/55"><span className="text-[#b8ed70]">★★★★★</span><span>Trusted by teams building what&apos;s next</span><span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" /><span>30+ projects delivered</span></div>
          <div className="pointer-events-none absolute -bottom-8 left-[4%] hidden h-20 w-20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md md:block" /><div className="pointer-events-none absolute -right-3 top-10 hidden h-14 w-14 rounded-full border border-[#b8ed70]/40 bg-[#b8ed70]/10 backdrop-blur-md md:block" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
