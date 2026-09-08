"use client";

import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Masked text reveal – the treatment used by editorial agency sites.
 *
 *   <SplitText as="h1">Transform Your Ideas <Accent>Into Digital Reality</Accent></SplitText>
 *   <SplitText as="p" mode="lines" delay={0.5}>Long paragraph … revealed one line at a time.</SplitText>
 *
 * mode="words" (default – headlines, card titles). Every word slides up out of its own
 *   clipped box, staggered left→right, top→bottom. Works as a child of a `staggerContainer`
 *   (it declares the same hidden/visible variant names) or standalone with `inView`.
 *
 * mode="lines" (paragraphs, statements, quotes). The text is laid out normally first, the
 *   browser's own line breaks are read back, and the words are regrouped into one clipped box
 *   per *rendered* line; the lines then rise in sequence. It drives itself from the viewport
 *   (use `delay` to sequence it after a sibling headline) and swaps back to plain text once
 *   the reveal has finished, so later resizes simply re-wrap.
 *
 * - Only `transform` + `opacity` animate → GPU-composited, no layout.
 * - Reduced motion: `MotionConfig reducedMotion="user"` in <Providers> turns the transforms
 *   into a plain fade automatically.
 * - Accessibility: headings expose the intact sentence via `aria-label`; other elements carry
 *   a visually-hidden copy. The animated spans are `aria-hidden`.
 *
 * Gradient text: `background-clip:text` must live on the *moving* span, not on a parent of
 * the overflow-clipped wrappers (Chrome paints nothing in that case). So
 * `<span className="text-gradient">…</span>` / `<Accent>` inside the children is flattened
 * and its className re-applied per word.
 */

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "blockquote";

interface SplitTextProps {
  children: ReactNode;
  as?: Tag;
  /** Forwarded to the rendered element (e.g. so a `<section aria-labelledby>` can point at the heading). */
  id?: string;
  className?: string;
  /** `words` (headlines) or `lines` (paragraphs / long statements). */
  mode?: "words" | "lines";
  /** Seconds between words / lines. */
  stagger?: number;
  /** Delay before the first word / line. */
  delay?: number;
  /** Per-word / per-line duration. */
  duration?: number;
  /** words mode: drive the reveal from the viewport instead of a parent variant. */
  inView?: boolean;
  /** Fires when this element owns the animation and it has finished (e.g. to chain a cursor). */
  onComplete?: () => void;
}

/** Marks a run of words to receive an extra className (typically `text-gradient`). */
export function Accent({ children, className = "text-gradient" }: { children: ReactNode; className?: string }) {
  return <Fragment key={className}>{children}</Fragment>;
}
Accent.displayName = "SplitTextAccent";

type Token = { word: string; className?: string; key: string };
type Line = Token[];

/** Flatten children into words, keeping line breaks (`<br />`) and Accent classNames. */
function tokenize(children: ReactNode, inherited?: string): Line[] {
  const lines: Line[] = [[]];
  let n = 0;
  const push = (word: string, cls?: string) => lines[lines.length - 1].push({ word, className: cls, key: `${word}-${n++}` });
  const walk = (node: ReactNode, cls?: string) => {
    Children.forEach(node, (child) => {
      if (child == null || typeof child === "boolean") return;
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => push(w, cls));
        return;
      }
      if (isValidElement(child)) {
        if (child.type === "br") {
          lines.push([]);
          return;
        }
        const props = child.props as { children?: ReactNode; className?: string };
        const isAccent = (child.type as { displayName?: string }).displayName === "SplitTextAccent";
        // <Accent> or any inline element carrying a className (e.g. <span className="text-gradient">)
        // passes that className down to each of its words.
        const nextCls = isAccent ? (props.className ?? "text-gradient") : (props.className ?? cls);
        walk(props.children, nextCls);
      }
    });
  };
  walk(children, inherited);
  return lines.filter((l) => l.length);
}

const HIDDEN = { y: "110%", opacity: 0 } as const;
const SHOWN = { y: "0%", opacity: 1 } as const;
const VIEWPORT = { once: true, margin: "0px 0px -60px 0px" } as const;

export default function SplitText({
  children,
  as = "h2",
  id,
  className,
  mode = "words",
  stagger = mode === "lines" ? 0.1 : 0.055,
  delay = 0,
  duration = mode === "lines" ? 0.85 : 0.75,
  inView = false,
  onComplete,
}: SplitTextProps) {
  const lines = useMemo(() => tokenize(children), [children]);
  const plain = lines.map((l) => l.map((t) => t.word).join(" ")).join(" ");
  const isHeading = /^h[1-6]$/.test(as);
  const ariaLabel = isHeading ? plain : undefined;
  const srCopy = isHeading ? null : <span className="sr-only">{plain}</span>;

  if (mode === "lines") {
    return (
      <LineReveal
        as={as}
        id={id}
        className={className}
        tokens={lines.flat()}
        stagger={stagger}
        delay={delay}
        duration={duration}
        onComplete={onComplete}
        ariaLabel={ariaLabel}
        srCopy={srCopy}
      />
    );
  }

  /* ── Words ─────────────────────────────────────────────────────────── */
  const MotionTag = motion[as];
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: HIDDEN,
    visible: { ...SHOWN, transition: { duration, ease: EASE } },
  };
  const own = inView ? { initial: "hidden", whileInView: "visible", viewport: VIEWPORT } : {};

  return (
    <MotionTag
      id={id}
      aria-label={ariaLabel}
      variants={container}
      {...own}
      onAnimationComplete={onComplete}
      className={cn("split-text", className)}
    >
      {srCopy}
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden>
          {line.map((t, wi) => (
            <span key={t.key} className="split-mask">
              <motion.span variants={word} className={cn("split-word", t.className)}>
                {t.word}
                {wi < line.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

/* ── Line mode ──────────────────────────────────────────────────────────── */

interface LineRevealProps {
  as: Tag;
  id?: string;
  className?: string;
  tokens: Token[];
  stagger: number;
  delay: number;
  duration: number;
  onComplete?: () => void;
  ariaLabel?: string;
  srCopy: ReactNode;
}

/**
 * Pass 1 renders every word as a plain inline span (laid out, but invisible) and reads each
 * word's `offsetTop` to find where the browser wrapped. Pass 2 renders the same words grouped
 * into one clipped block per line. Both passes wrap identically (same box, same font), so
 * nothing shifts. Until the reveal starts, the wrapping is re-measured whenever the width or
 * the fonts change; once it has finished (`done`) the element renders plain text again.
 */
function LineReveal({ as, id, className, tokens, stagger, delay, duration, onComplete, ariaLabel, srCopy }: LineRevealProps) {
  const Host = as as "p";
  const hostRef = useRef<HTMLParagraphElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [groups, setGroups] = useState<Token[][] | null>(null);
  const [done, setDone] = useState(false);
  const inView = useInView(hostRef, VIEWPORT);
  const inViewRef = useRef(false);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const measure = useCallback(() => {
    const probe = probeRef.current;
    if (!probe) return;
    const out: Token[][] = [];
    let lastTop: number | null = null;
    Array.from(probe.children).forEach((el, i) => {
      const top = (el as HTMLElement).offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 1) {
        out.push([]);
        lastTop = top;
      }
      out[out.length - 1].push(tokens[i]);
    });
    setGroups(out);
  }, [tokens]);

  // Measure after layout, before paint.
  useLayoutEffect(() => {
    if (groups === null && !done) measure();
  }, [groups, done, measure]);

  // Until the reveal starts, fall back to the probe whenever the wrapping may have changed.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let width = host.clientWidth;
    const remeasure = () => {
      if (!inViewRef.current) setGroups(null);
    };
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (Math.abs(host.clientWidth - width) < 1) return;
        width = host.clientWidth;
        remeasure();
      });
      ro.observe(host);
    }
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(() => {
        if (!cancelled) remeasure();
      });
    }
    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, []);

  // Motion also reports "complete" for the no-op `animate={HIDDEN}` pass while the element is
  // still off-screen (values already at target), so only the SHOWN definition counts.
  const handleComplete = useCallback(
    (definition: unknown) => {
      if (definition !== SHOWN) return;
      setDone(true);
      onComplete?.();
    },
    [onComplete],
  );

  const plainWords = tokens.map((t, i) => (
    <span key={t.key} className={t.className}>
      {t.word}
      {i < tokens.length - 1 ? " " : ""}
    </span>
  ));

  let content: ReactNode;
  if (done) {
    content = plainWords;
  } else if (groups === null) {
    content = (
      <span ref={probeRef} aria-hidden className="split-probe">
        {plainWords}
      </span>
    );
  } else {
    content = groups.map((g, li) => (
      <span key={li} className="split-linebox" aria-hidden>
        <motion.span
          initial={HIDDEN}
          animate={inView ? SHOWN : HIDDEN}
          transition={{ duration, ease: EASE, delay: delay + li * stagger }}
          onAnimationComplete={li === groups.length - 1 ? handleComplete : undefined}
          className="split-lineinner"
        >
          {g.map((t, wi) => (
            <span key={t.key} className={t.className}>
              {t.word}
              {wi < g.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.span>
      </span>
    ));
  }

  return (
    <Host ref={hostRef} id={id} aria-label={done ? undefined : ariaLabel} className={cn("split-text split-text--lines", className)}>
      {done ? null : srCopy}
      {content}
    </Host>
  );
}
