"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import { NAV_LINKS } from "@/data/site";
import { EASE } from "@/lib/animations";

const MotionLink = motion.create(Link);

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The overlay is `md:hidden`, so if the viewport grows past the breakpoint while it is open
  // (tablet rotation, window resize) close it too — otherwise the scroll lock would linger.
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // Escape closes the menu, as keyboard users expect from a modal overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex h-16 w-full max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 sm:px-4 sm:pl-6",
            scrolled
              ? "border-white/10 bg-[#0a0a12]/75 shadow-[0_20px_60px_-25px_rgba(37,99,235,0.55)] backdrop-blur-2xl"
              : "border-white/[0.06] bg-white/[0.02] backdrop-blur-md",
          )}
        >
          {/* Brand */}
          <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="Lubech — home">
            <span className="relative block h-8 w-[104px] sm:h-9 sm:w-[118px]">
              <Image
                src="/techvector.svg"
                alt="Lubech"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <MotionLink
              href="/#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold md:inline-flex"
            >
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </MotionLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#05050a]/90 backdrop-blur-2xl md:hidden"
          >
            <span aria-hidden className="orb orb-blue animate-drift left-[-30%] top-[-10%] h-[70vw] w-[70vw]" />
            <span aria-hidden className="orb orb-cyan animate-drift-slow bottom-[-20%] right-[-30%] h-[80vw] w-[80vw]" />

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="relative flex h-full flex-col justify-center gap-2 px-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-semibold text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold"
                >
                  Start Your Project <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
