"use client";

import Image from "next/image";
import { ArrowUp, Linkedin, Mail, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";

const serviceLinks = [
  { label: "Web Development", href: "#services" },
  { label: "Mobile Apps", href: "#services" },
  { label: "Backend Systems", href: "#services" },
  { label: "UI/UX Design", href: "#services" },
];

const socials = [
  { label: "LinkedIn", href: SITE.linkedin, icon: Linkedin },
  { label: "WhatsApp", href: SITE.whatsapp, icon: MessageCircle },
  { label: "Email", href: `mailto:${SITE.email}`, icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#05050a]">
      <div aria-hidden className="hairline absolute inset-x-[15%] top-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(37,99,235,0.18),transparent_70%)]"
      />

      <div className="container-x relative pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#home" aria-label="Lubech — home" className="inline-block">
              <span className="relative block h-10 w-32">
                <Image src="/techvector.svg" alt="Lubech" fill unoptimized className="object-contain object-left" />
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              A UK-based software agency building high-performance websites, cross-platform
              mobile apps and robust backend systems. We bring ideas to life.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:border-sky-400/50 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(14,165,233,0.8)]"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-white/80">Services</h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/50 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-white/80">Company</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/50 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-sm text-white/50 transition-colors hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-white/80">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/50">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="leading-relaxed">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Lubech. All rights reserved.</p>
          <p className="hidden sm:block">Designed &amp; built in-house with Next.js, Tailwind &amp; Motion.</p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-white/70 transition-all hover:border-sky-400/50 hover:text-white"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      {/* Giant watermark */}
      <div aria-hidden className="pointer-events-none relative h-24 select-none overflow-hidden sm:h-36">
        <span className="absolute left-1/2 top-2 -translate-x-1/2 bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text font-display text-[7rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[12rem]">
          LUBECH
        </span>
      </div>
    </footer>
  );
}
