"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Orb } from "@/components/ui/Orbs";
import { TESTIMONIALS } from "@/data/site";
import { fadeIn, viewportReplay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

function TestimonialCard({ t }: { t: Testimonial }) {
  const rating = t.rating ?? 5;

  return (
    <figure className="glow-card flex h-full flex-col p-6 sm:p-7">
      <Quote className="h-6 w-6 text-sky-400/40" aria-hidden />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-heading text-sm font-bold text-white">{t.name}</p>
          <p className="mt-0.5 text-xs text-white/45">
            {t.role} · {t.company}
          </p>
        </div>
        <div
          className="flex shrink-0 gap-0.5"
          role="img"
          aria-label={`Rated ${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" aria-hidden />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * One seamless marquee row. The items are doubled and the track animates
 * translateX(-50%) (see `--animate-marquee*` in globals.css), so the loop
 * restarts exactly on the duplicate — no visible seam.
 */
function MarqueeRow({
  items,
  reverse = false,
  label,
}: {
  items: Testimonial[];
  reverse?: boolean;
  label: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="fade-x overflow-hidden py-2.5">
      {/* Spacing is trailing padding (not gap) so the -50% loop lands exactly on
          the duplicate set — a flex gap would leave a half-gap seam per cycle. */}
      <ul
        aria-label={label}
        className={cn(
          "flex w-max hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {doubled.map((t, i) => (
          <li
            key={`${t.id}-${i}`}
            className="w-[21rem] shrink-0 pr-5 sm:w-[24rem]"
            aria-hidden={i >= items.length || undefined}
          >
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Reviews() {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 6);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div className="hairline absolute inset-x-[10%] top-0" aria-hidden />
      <Orb
        tone="cyan"
        size={720}
        animate="drift"
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
      />

      <div className="container-x relative">
        <SectionHeader
          titleId="reviews-title"
          eyebrow="Client reviews"
          title={
            <>
              What our <span className="text-gradient">clients say</span>
            </>
          }
          description="Don't just take our word for it — here's what founders and directors say about working with Lubech."
        />
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReplay}
        className="relative mt-14"
      >
        {/* Row 1 — scrolls left */}
        <MarqueeRow items={row1} label="Client reviews" />
        {/* Row 2 — scrolls right */}
        <MarqueeRow items={row2} reverse label="More client reviews" />
      </motion.div>
    </section>
  );
}
