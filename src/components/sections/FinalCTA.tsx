"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { Orb } from "@/components/ui/Orbs";
import SplitText, { Accent } from "@/components/ui/SplitText";
import { SITE } from "@/data/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

type Status = "idle" | "sending" | "sent" | "error";

const contactLinks = [
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: SITE.phone, href: SITE.phoneHref },
  { icon: MessageCircle, label: "Chat on WhatsApp", href: SITE.whatsapp, external: true },
  { icon: MapPin, label: "Northampton, United Kingdom", href: SITE.mapsUrl, external: true },
];

export default function FinalCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      {/* Background: planet horizon glow + orbs + stars */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-[position:center_75%] opacity-50"
        style={{ backgroundImage: "url('/space-blue.jpg')" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05050a] via-[#05050a]/60 to-[#05050a]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[url('/stars.svg')] bg-[length:900px_900px] opacity-30" />
      <Orb tone="blue" size={900} animate="drift-slow" className="left-1/2 top-[60%] -translate-x-1/2 opacity-60" />
      <Orb tone="cyan" size={600} animate="drift" className="-right-[15%] top-0 opacity-50" />

      <div className="container-x relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
            Let&apos;s build together
          </motion.span>

          <SplitText
            as="h2"
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl"
          >
            Ready to build something{" "}
            <Accent className="text-gradient drop-shadow-[0_0_30px_rgba(14,165,233,0.35)]">amazing?</Accent>
          </SplitText>

          <SplitText as="p" mode="lines" delay={0.55} className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Tell us about your idea and we&apos;ll come back within 24 hours with next steps, a rough
            timeline and honest advice — no strings attached.
          </SplitText>

          <motion.div variants={fadeUp} custom={0.8} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#project-form" size="lg" className="w-full sm:w-auto">
              Start Your Project <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={SITE.whatsapp} external variant="ghost" size="lg" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
            </Button>
          </motion.div>
        </motion.div>

        {/* Contact card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div
            aria-hidden
            className="absolute inset-x-16 -bottom-8 h-28 rounded-full bg-gradient-to-r from-blue-600/40 via-sky-500/40 to-cyan-400/40 blur-3xl"
          />
          <div className="glow-card relative overflow-hidden !rounded-[2rem] p-2">
            <div className="grid overflow-hidden rounded-[1.6rem] lg:grid-cols-[1fr_1.4fr]">
              {/* Left: details */}
              <div className="relative bg-gradient-to-br from-blue-700/40 via-sky-600/25 to-cyan-600/30 p-8 sm:p-10">
                <div aria-hidden className="absolute inset-0 bg-[url('/stars.svg')] bg-[length:500px_500px] opacity-25" />
                <div className="relative">
                  <h3 className="font-heading text-2xl font-bold text-white">Talk to a human</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Prefer email or a quick call? We&apos;re a friendly bunch. Reach us directly through any
                    of the channels below.
                  </p>

                  <ul className="mt-8 space-y-4">
                    {contactLinks.map(({ icon: Icon, label, href, external }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md transition-all group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Office hours</p>
                    <p className="mt-1.5 text-sm text-white/80">Mon – Fri · 09:00 – 18:00 GMT</p>
                    <p className="text-sm text-white/80">Sat · 10:00 – 16:00 GMT</p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="bg-[#0a0a12]/80 p-8 backdrop-blur-xl sm:p-10">
                {status === "sent" ? (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-[0_0_40px_rgba(14,165,233,0.6)]">
                      <CheckCircle2 className="h-8 w-8 text-white" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-white">Message received!</h3>
                    <p className="mt-2 max-w-sm text-sm text-white/60">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form id="project-form" onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
                    <div className="sm:col-span-1">
                      <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-white/60">
                        Name *
                      </label>
                      <input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" className="field" />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-white/60">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@company.com"
                        className="field"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="project" className="mb-1.5 block text-xs font-semibold text-white/60">
                        Project type *
                      </label>
                      <select id="project" name="project" required defaultValue="" className="field">
                        <option value="" disabled>
                          Select one
                        </option>
                        <option>Website / Web app</option>
                        <option>Mobile app</option>
                        <option>Backend / API</option>
                        <option>Full product (web + mobile)</option>
                        <option>Something else</option>
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="budget" className="mb-1.5 block text-xs font-semibold text-white/60">
                        Budget
                      </label>
                      <select id="budget" name="budget" defaultValue="" className="field">
                        <option value="">Not sure yet</option>
                        <option>Under £5k</option>
                        <option>£5k – £15k</option>
                        <option>£15k – £40k</option>
                        <option>£40k+</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-white/60">
                        Tell us about your project *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="What are you building, who is it for and when do you need it?"
                        className="field resize-none"
                      />
                    </div>

                    {status === "error" ? (
                      <p role="alert" className="text-sm text-rose-300 sm:col-span-2">
                        {error}
                      </p>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-white/40">We reply within 24 hours. Your details stay private.</p>
                      <Button type="submit" size="lg" disabled={status === "sending"} className="sm:min-w-[200px]">
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                          </>
                        ) : (
                          <>
                            Send message <ArrowRight className="h-4 w-4" aria-hidden />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
