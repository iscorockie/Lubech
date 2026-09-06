# Lubech — Web & Mobile App Development Agency

Marketing site for [lubech.tech](https://lubech.tech): a dark, premium landing page built with
**Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion**.

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
│  ├─ globals.css         # design tokens (@theme), base styles, component classes
│  └─ api/contact/        # e-mail endpoint
├─ components/
│  ├─ Navigation.tsx      # floating glass pill nav + full-screen mobile menu
│  ├─ ScrollProgress.tsx  # gradient scroll bar (transform-only)
│  ├─ Footer.tsx
│  ├─ Providers.tsx
│  ├─ ui/                 # primitives: Button, GlowCard, SectionHeader, Orbs/GridPattern
│  └─ sections/           # Hero, Services, WhoItsFor, Process, Technologies,
│                         # Projects, WhyLubech, Team, FinalCTA
├─ data/site.ts           # ALL copy & content (services, projects, team, testimonials…)
├─ lib/animations.ts      # shared Motion variants / easing / viewport config
├─ lib/utils.ts           # cn()
└─ types/index.ts
```

To change copy, projects or team members edit **`src/data/site.ts`** — components are purely
presentational.

## Design system

| Token            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `#05050A` → `#0A0A12`                              |
| Accent gradient  | `#7C3AED` → `#C026D3` → `#DB2777`                  |
| Headings         | Sora (self-hosted, `public/fonts/sora`)            |
| Body             | Sen (self-hosted, `public/fonts/sen`)              |
| Cards            | `.glow-card` – dark, 1px violet border, soft glow, cursor spotlight |
| Buttons          | `.btn-gradient` (pill, gradient, glow) · `.btn-ghost` (frosted glass) |
| Ambient light    | `<Orb />` radial-gradient orbs (no `filter: blur` → cheap to paint) |

Motion rules used throughout:

- Only `transform` and `opacity` are animated (60 fps, no layout thrash).
- Entrances: `whileInView` + stagger, 0.3–0.7 s, custom expo-out easing (`EASE` in `lib/animations.ts`).
- Scroll-linked effects use `useScroll` + `useTransform`/`useSpring` (hero parallax, process timeline).
- Reduced motion is respected globally (`MotionConfig reducedMotion="user"` + a CSS fallback).

## Assets

- `public/space-purple.jpg` – hero / CTA backdrop (purple-graded version of the original space photo).
- `public/stars.svg` – tiling star field used as a subtle texture layer.
- `public/projects/*`, `public/staff/*` – portfolio screenshots and team portraits.

Deployed on Vercel (`vercel.json`).
