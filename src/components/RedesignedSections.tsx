"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Code2, Database, Smartphone, Sparkles } from "lucide-react";

const services = [
  { icon: Code2, number: "01", title: "Web experiences", text: "Fast, responsive websites and platforms that make your brand impossible to ignore." },
  { icon: Smartphone, number: "02", title: "Mobile products", text: "Thoughtful cross-platform apps that turn everyday problems into simple experiences." },
  { icon: Database, number: "03", title: "Digital systems", text: "Reliable APIs, dashboards, and infrastructure built for the next stage of growth." },
];

const projects = [
  { title: "Space4Climate", type: "Web platform", image: "/projects/space4climate.png", tone: "from-[#315d83] to-[#13293e]" },
  { title: "Glam n' Go", type: "Mobile commerce", image: "/projects/glam-n-go.jpg", tone: "from-[#4d755f] to-[#1c3a36]" },
  { title: "Easy Gas", type: "Delivery platform", image: "/projects/easy-gas.jpg", tone: "from-[#8b633b] to-[#392719]" },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .65, ease: [0.22, 1, .36, 1] as const } } };

export default function RedesignedSections() {
  return (
    <div className="bg-[#f5f7f5] text-[#102431]">
      <section id="services" className="bg-[#102431] px-4 py-24 text-white sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: .12 } } }} className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <motion.div variants={fadeUp}><span className="mb-5 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#b8ed70]">What we do</span><h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-[-.04em] sm:text-6xl">Built around your<br /><span className="text-[#b8ed70]">big next move.</span></h2></motion.div>
            <motion.div variants={fadeUp} className="flex items-end"><p className="max-w-xl text-lg leading-8 text-white/60">From first idea to daily growth, we pair sharp strategy with dependable engineering to build digital products people want to use.</p></motion.div>
          </motion.div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">{services.map(({ icon: Icon, number, title, text }) => <motion.div key={number} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group rounded-[1.75rem] border border-white/10 bg-white/[.06] p-7 transition hover:-translate-y-1 hover:bg-white/[.1]"><div className="mb-12 flex items-center justify-between"><span className="font-heading text-sm font-bold text-white/35">{number}</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b8ed70] text-[#102431]"><Icon className="h-5 w-5" /></span></div><h3 className="font-heading text-2xl font-bold text-white">{title}</h3><p className="mt-3 leading-7 text-white/55">{text}</p><a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#b8ed70]">Let&apos;s talk <ArrowUpRight className="h-4 w-4" /></a></motion.div>)}</div>
        </div>
      </section>

      <section id="portfolio" className="bg-[#f5f7f5] px-4 py-24 text-[#102431] sm:px-6 md:py-32 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="mb-5 inline-flex rounded-full border border-[#102431]/15 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#4676c2]">Selected work</span><h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-[-.04em] sm:text-6xl">Proof over<br /><span className="text-[#4676c2]">promises.</span></h2></div><a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#102431]/60 transition hover:text-[#102431]">Start a conversation <ArrowUpRight className="h-4 w-4" /></a></div><div className="mt-14 grid gap-5 md:grid-cols-3">{projects.map((project, i) => <motion.a href="#contact" key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * .08 }} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[.05]"><div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.tone}`}>{project.image ? <Image src={project.image} alt="" fill className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" /> : null}<div className="absolute inset-0 bg-gradient-to-t from-[#102431] to-transparent" /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#b8ed70]">{project.type}</p><div className="mt-2 flex items-center justify-between"><h3 className="font-heading text-xl font-bold">{project.title}</h3><ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:text-[#b8ed70]" /></div></div></motion.a>)}</div></div></section>

      <section id="about" className="px-4 py-24 sm:px-6 md:py-32 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_.9fr]"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative"><div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#b8ed70]" /><div className="relative overflow-hidden rounded-[2rem] bg-[#dce6df] p-6 pt-12"><Image src="/staff/lubega.jpg" alt="Lubech team" width={700} height={700} className="mx-auto aspect-square max-h-[520px] object-cover object-top mix-blend-multiply" /><div className="absolute bottom-8 left-8 rounded-2xl bg-white px-5 py-4 shadow-xl"><p className="font-heading text-2xl font-bold">7+</p><p className="text-xs text-[#102431]/55">years of building</p></div></div></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><span className="mb-5 inline-flex rounded-full border border-[#102431]/15 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#4676c2]">Why Lubech</span><h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-[-.04em] sm:text-6xl">The team behind<br /><span className="text-[#4676c2]">the momentum.</span></h2><p className="mt-7 max-w-lg text-lg leading-8 text-[#102431]/60">We are a small, senior team that believes good technology should feel clear, useful, and human. No hand-offs. No unnecessary layers. Just thoughtful work that creates measurable progress.</p><div className="mt-8 space-y-3">{['Clear communication from day one', 'Design and engineering in one team', 'Support long after launch'].map(x => <div key={x} className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b8ed70]"><Check className="h-3.5 w-3.5" /></span>{x}</div>)}</div></motion.div></div></section>

      <section id="testimonials" className="bg-[#e4eedf] px-4 py-24 sm:px-6 md:py-28 lg:px-8"><div className="mx-auto max-w-5xl text-center"><Sparkles className="mx-auto h-7 w-7 text-[#4676c2]" /><h2 className="mt-5 font-heading text-3xl font-extrabold tracking-[-.03em] sm:text-5xl">“They understood what we were trying to build—and made it better.”</h2><p className="mt-7 text-sm font-bold uppercase tracking-[.12em] text-[#102431]/50">Sarah Johnson · CEO, Labour Experts</p></div></section>

      <section id="contact" className="bg-[#b8ed70] px-4 py-20 sm:px-6 md:py-28 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end"><div><span className="mb-5 inline-flex rounded-full border border-[#102431]/20 px-4 py-2 text-xs font-bold uppercase tracking-[.12em]">Have a challenge?</span><h2 className="max-w-2xl font-heading text-4xl font-extrabold leading-[1] tracking-[-.04em] sm:text-6xl">Let&apos;s build what<br />comes next.</h2></div><a href="mailto:hello@lubech.com" className="pill pill-dark self-start px-7 py-4 text-sm md:self-end">Start a project <ArrowRight className="h-4 w-4" /></a></div></section>
    </div>
  );
}
