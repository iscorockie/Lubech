# Lubech — Web & Mobile App Development Agency

Marketing site for [lubech.tech](https://lubech.tech): a dark, premium landing page built with
**Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Three.js (React Three Fiber)**.

## Getting started

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # production build (Turbopack)
yarn lint
```

Contact form e-mails are sent by `src/app/api/contact/route.ts` via Nodemailer. Set these env vars
(e.g. in `.env.local` / Vercel project settings):

```
SMTP_HOST= SMTP_PORT=587 SMTP_SECURE=false SMTP_USER= SMTP_PASS= CONTACT_TO=info@lubech.tech
NEXT_PUBLIC_GA_ID=            # optional – Google Analytics
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          # metadata, JSON-LD, <Providers> (MotionConfig reducedMotion="user")
│  ├─ page.tsx            # section order for the landing page
│  ├─ not-found.tsx       # branded 404 (also used for stale links from the old site)
│  ├─ error.tsx           # branded client error boundary with "Try again"
│  ├─ globals.css         # design tokens (@theme), base styles, component classes
│  └─ api/contact/        # e-mail endpoint
├─ components/
│  ├─ Navigation.tsx      # floating glass pill nav + full-screen mobile menu
│  ├─ ScrollProgress.tsx  # gradient scroll bar (transform-only)
│  ├─ StatusPage.tsx      # shared shell for the 404 / error routes
│  ├─ Footer.tsx
│  ├─ Providers.tsx
│  ├─ ui/                 # primitives: Button, GlowCard, SectionHeader, Orbs/GridPattern,
│  │                      # SplitText (word-mask headline reveal), CountUp (scroll-triggered numerals)
│  ├─ three/Earth3D.tsx   # WebGL night-side Earth horizon (React Three Fiber), lazy-loaded
│  └─ sections/           # Hero, Services, WhoItsFor, Process, Technologies,
│                         # Projects, WhyLubech, Team, FinalCTA
├─ data/site.ts           # ALL copy & content (services, projects, team, testimonials…)
├─ lib/animations.ts      # shared Motion variants / easing / viewport config
├─ lib/hooks.ts           # useMediaQuery (SSR-safe)
├─ lib/utils.ts           # cn()
└─ types/index.ts
```

To change copy, projects or team members edit **`src/data/site.ts`** — components are purely
presentational.

## Design system

| Token            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `#05050A` → `#0A0A12`                              |
| Accent gradient  | `#2563eb` → `#0ea5e9` → `#22d3ee` (blue → sky → cyan; filled buttons/badges use the deeper `#2563eb → #0369a1 → #0e7490` run so white labels meet WCAG AA (≥ 4.5:1) along the whole gradient) |
| Headings         | Bricolage Grotesque (self-hosted, `public/fonts/bricolage`) — 36/48 pt display cut for h1/h2, 14 pt text cut for h3–h6 |
| Body             | Quicksand (self-hosted, `public/fonts/quicksand`)  |
| Cards            | `.glow-card` – dark, 1px blue border, soft glow, cursor spotlight |
| Buttons          | `.btn-gradient` (pill, gradient, glow) · `.btn-ghost` (frosted glass) |
| Ambient light    | `<Orb />` radial-gradient orbs (no `filter: blur` → cheap to paint) |

Motion rules used throughout:

- Only `transform` and `opacity` are animated (60 fps, no layout thrash).
- Entrances: `whileInView` + stagger, 0.3–0.7 s, custom expo-out easing (`EASE` in `lib/animations.ts`).
- Scroll-linked effects use `useScroll` + `useTransform`/`useSpring` (hero parallax, process timeline).
- Reduced motion is respected globally (`MotionConfig reducedMotion="user"` + a CSS fallback).

### Text animations

`SplitText` (`src/components/ui/SplitText.tsx`) has two modes:

- **`mode="words"`** (default) – every word rises out of its own overflow-clipped box, staggered
  left→right / line by line (`y: 110% → 0`, expo-out ease, ~55 ms between words, 70 ms in the
  hero). Used for the hero h1, every section h2, card / project / step titles and team names.
  Inside a `staggerContainer` it joins the parent cascade; standalone, pass `inView`.
- **`mode="lines"`** – for paragraphs and quotes. The text is laid out normally first, the
  browser's own line breaks are read back (`offsetTop` of each word), and the words are regrouped
  into one clip box per *rendered* line, which then rise in sequence (`delay` sequences it after
  a sibling headline). Nothing moves between the passes, so there is no layout shift; the wrapping
  is re-measured on resize / font swap until the reveal starts, and the element drops back to plain
  text once it has finished. Used for the hero / CTA / section descriptions and the testimonials.

Headings expose the intact sentence via `aria-label`, paragraphs carry a visually-hidden copy, and
the animated spans are `aria-hidden`. Gradient runs (`<span className="text-gradient">` /
`<Accent>`) are re-applied per word because `background-clip: text` does not survive a clipped
parent in Chrome. Numbers in the stats bands use `CountUp`, which animates the first number in a
string ("30+", "100%", "24/7") when it scrolls into view. Everything honours
`prefers-reduced-motion` through the global `MotionConfig` (text fades in place, numbers show
their final value).

### Pinned "Our Process" timeline

On desktop (≥ 1024 px wide, ≥ 640 px tall, no reduced-motion) the Process section is a
`position: sticky` stage that stays pinned for ~2.4 viewports. Section scroll progress (0 → 1,
smoothed with `useSpring`) drives everything in lock-step, with no React re-renders:

| Layer | Driven by progress |
| --- | --- |
| 3D Earth (`three/Earth3D.tsx`) | rises into place, then rotates (idle spin + scroll-driven turn, read from the MotionValue inside `useFrame`) |
| Gradient timeline | `scaleX` fill + a travelling glowing tip |
| Four steps | each dot ignites, then its card fades/rises within its own slice of the scroll |

The Three.js chunk (~235 kB gz) is `next/dynamic`-loaded only when the section comes within one
viewport, the render loop pauses when it's off-screen, textures are brand-graded WebP
(`public/textures`), and a pure-CSS horizon renders while textures load or if WebGL is missing
(context loss is handled too). Phones/tablets and reduced-motion users get a vertical
`whileInView` timeline with no WebGL at all.

## Assets

- `public/space-blue.jpg` – hero / CTA backdrop (blue-graded version of the original space photo).
- `public/stars.svg` – tiling star field used as a subtle texture layer.
- `public/textures/` – brand-graded Earth colour + city-lights maps for the 3D globe (see README there).
- `public/projects/*.webp`, `public/staff/*.webp` – portfolio screenshots and team portraits, stored as
  WebP (≤ 1200 px, q 84). When adding new ones convert first, e.g.
  `npx sharp-cli -i shot.png -o public/projects/shot.webp -f webp -q 84 resize 1200` — the whole set is ~0.5 MB
  instead of the 5 MB of source PNG/JPEGs it replaced.
- `public/og.png` – 1200×630 social-share card (Open Graph / Twitter), rendered from the hero design.
- `public/web_favicon.svg` (SVG favicon + Safari mask icon), `public/icon-512.png` (PWA, maskable-safe),
  `public/apple-touch-icon.png`, `src/app/favicon.ico` (multi-size, served automatically by the App Router).
  All carry the blue → cyan version of the Lubech mark; `public/techvector.svg` is the white word-mark used in the nav/footer.
- `public/projects/*`, `public/staff/*` – portfolio screenshots and team portraits.

Deployed on Vercel (`vercel.json`).
