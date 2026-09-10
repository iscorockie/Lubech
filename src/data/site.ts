import {
  Code2,
  Smartphone,
  Server,
  Rocket,
  Building2,
  Search,
  PenTool,
  Braces,
  Cloud,
  Gauge,
  ShieldCheck,
  Users,
  Handshake,
  Layers,
  Headset,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiFirebase,
  SiSupabase,
  SiGo,
  SiPhp,
  SiFlutter,
  SiRedis,
  SiTailwindcss,
  SiPython,
  SiExpo,
  SiPrisma,
  SiStripe,
  SiVercel,
  SiDart,
  SiJavascript,
  SiFramer,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type {
  Audience,
  ProcessStep,
  Project,
  Reason,
  Service,
  Stat,
  TeamMember,
  Technology,
  Testimonial,
} from "@/types";

/* ── Global ──────────────────────────────────────────────────────────────── */

export const SITE = {
  name: "Lubech",
  url: "https://lubech.tech",
  email: "info@lubech.tech",
  phone: "+44 7572 964620",
  phoneHref: "tel:+447572964620",
  whatsapp: "https://wa.me/447572964620",
  address: "28 Foxwell Square, NN3 5AT Northampton, UK",
  mapsUrl: "https://maps.google.com/?q=28 Foxwell Square NN35AT Northampton",
  linkedin: "https://linkedin.com/company/lubech",
};

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Why Us", href: "/#why-lubech" },
  { label: "Team", href: "/#team" },
];

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const STATS: Stat[] = [
  { value: "30+", label: "Projects delivered" },
  { value: "7+", label: "Years of experience" },
  { value: "100%", label: "Client satisfaction" },
  { value: "24/7", label: "Support & monitoring" },
];

/* ── Services ────────────────────────────────────────────────────────────── */

export const SERVICES: Service[] = [
  {
    id: "web",
    slug: "webdevelopment",
    title: "Web Development",
    description:
      "High-performance websites and web apps built with React and Next.js — fast, accessible, SEO-ready and designed to convert.",
    pageIntro:
      "From marketing sites to complex web platforms, we design and build the full front-end — and the full stack behind it. Every page is performance-tuned, accessible and optimised to turn visitors into customers.",
    pageIncludedHighlight: "website",
    pageCtaHighlight: "build your website",
    icon: Code2,
    accent: "blue",
    features: [
      "React & Next.js applications",
      "E-commerce & CMS platforms",
      "Core Web Vitals & SEO optimisation",
      "Design systems & accessibility",
    ],
  },
  {
    id: "mobile",
    slug: "mobileapps",
    title: "Mobile Apps",
    description:
      "Cross-platform iOS and Android apps with React Native and Flutter — native feel, one codebase, shipped to both stores.",
    pageIntro:
      "One codebase, both stores, native feel. We build cross-platform apps your users will actually keep on their home screen — with payments, maps, push notifications and offline-first sync baked in from day one.",
    pageIncludedHighlight: "app",
    pageCtaHighlight: "build your app",
    icon: Smartphone,
    accent: "sky",
    features: [
      "React Native & Flutter",
      "App Store & Play Store launch",
      "Payments, maps & push notifications",
      "Offline-first & real-time sync",
    ],
  },
  {
    id: "backend",
    slug: "backendsystems",
    title: "Backend Systems",
    description:
      "Secure, scalable APIs, databases and cloud infrastructure that quietly power everything your product needs to do.",
    pageIntro:
      "The invisible half of your product, done right. We architect secure, scalable APIs and data layers — then deploy, monitor and scale them so your front-end never has to worry about what happens at 3am.",
    pageIncludedHighlight: "backend",
    pageCtaHighlight: "build your backend",
    icon: Server,
    accent: "cyan",
    features: [
      "Node.js, Go & Python services",
      "PostgreSQL, MongoDB & Redis",
      "Auth, payments & integrations",
      "AWS, Docker & CI/CD pipelines",
    ],
  },
];

/* ── Who it's for ────────────────────────────────────────────────────────── */

export const AUDIENCES: Audience[] = [
  {
    id: "startups",
    slug: "build-my-mvp",
    eyebrow: "For Startups & Founders",
    title: "Launch your MVP fast — without cutting corners.",
    description:
      "You have the vision and the urgency. We bring a senior product team that turns your idea into a polished, investor-ready product in weeks, not months.",
    pageTitle: "Build your MVP",
    pageIntro:
      "From first call to a polished, investor-ready product — we scope, design and ship your MVP in weeks. A senior product team, weekly demos, and an architecture that's ready for the scale-up.",
    pageIncludedHighlight: "launch",
    pageCtaHighlight: "build your MVP",
    icon: Rocket,
    points: [
      "MVP scoping & rapid prototyping",
      "Investor-ready design and UX",
      "Scalable architecture from day one",
      "Flexible, milestone-based engagement",
    ],
    cta: "Build my MVP",
  },
  {
    id: "businesses",
    slug: "scale-my-platform",
    eyebrow: "For Growing Businesses",
    title: "Modernise, automate and scale with confidence.",
    description:
      "Your business has outgrown its tools. We rebuild legacy platforms, connect your systems and deliver software your customers and teams love to use.",
    pageTitle: "Scale your platform",
    pageIntro:
      "Your business has outgrown its tools. We modernise legacy platforms, connect the systems you already run, and ship software your customers and teams will actually love using — without stopping the machine while we do it.",
    pageIncludedHighlight: "grow",
    pageProcessTitle: "How we'll modernise, connect and scale",
    pageCtaHighlight: "scale your platform",
    icon: Building2,
    points: [
      "Legacy platform modernisation",
      "Custom portals, dashboards & CRMs",
      "Third-party integrations & automation",
      "Ongoing support, SLAs & maintenance",
    ],
    cta: "Scale my platform",
  },
];

/* ── Process ─────────────────────────────────────────────────────────────── */

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your goals, users and constraints, then shape a clear roadmap with scope, timeline and budget.",
    icon: Search,
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes, interactive prototypes and a design system that captures your brand — validated with you before we write code.",
    icon: PenTool,
    duration: "Weeks 2–3",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Clean, well-tested code shipped in weekly sprints with live previews, so you see real progress every single week.",
    icon: Braces,
    duration: "Weeks 3–8",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Deployment, monitoring and store submissions handled end to end — followed by ongoing support as you grow.",
    icon: Cloud,
    duration: "Ongoing",
  },
];

/* ── Technologies ────────────────────────────────────────────────────────── */

export const TECH_ROW_1: Technology[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4FA3E3" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
];

export const TECH_ROW_2: Technology[] = [
  { name: "Flutter", icon: SiFlutter, color: "#54C5F8" },
  { name: "Dart", icon: SiDart, color: "#0175C2" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Python", icon: SiPython, color: "#4B8BBE" },
  { name: "PHP", icon: SiPhp, color: "#8892BF" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Prisma", icon: SiPrisma, color: "#ffffff" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Expo", icon: SiExpo, color: "#ffffff" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Framer Motion", icon: SiFramer, color: "#ffffff" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

/* ── Projects ────────────────────────────────────────────────────────────── */

export const PROJECTS: Project[] = [
  {
    id: "space4climate",
    title: "Space4Climate",
    description:
      "An online educational experience for schoolkids worldwide about space and climate change, blending film-making with social media.",
    image: "/projects/space4climate.webp",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    category: "web",
    liveUrl: "https://space4climate.vercel.app",
  },
  {
    id: "masifa",
    title: "Masifa Group",
    description:
      "OFSTED-registered children's homes website for a specialist SEMH/EBD care provider, with referrals, activities and careers.",
    image: "/projects/masifa.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    liveUrl: "https://masifa.vercel.app",
  },
  {
    id: "queensgate",
    title: "Queensgate International School",
    description:
      "Full-featured site for an Ontario-certified online international school — admissions, academics and a multi-step application flow.",
    image: "/projects/queensgate.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    liveUrl: "https://queensgate.vercel.app",
  },
  {
    id: "nextgenfighthub",
    title: "Next Gen Fight Hub",
    description:
      "Gym website for a Muay Thai, Boxing & MMA facility in Essex — class schedules, membership tiers and a community hub.",
    image: "/projects/nextgenfighthub.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    liveUrl: "https://nextgenfighthub.vercel.app",
  },
  {
    id: "hope4nxtgen",
    title: "Hope for the Next Generation",
    description:
      "Non-profit platform using sport, education and community to build resilient young leaders across Mbale City, Uganda.",
    image: "/projects/hope4nxtgen.webp",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    category: "web",
    liveUrl: "https://hope4nxtgen.org",
  },
  {
    id: "mashongatea",
    title: "Mashonga Tea Farm",
    description:
      "Brand website for a sustainable tea farm — story-led design, product showcase and responsive layout tuned for performance.",
    image: "/projects/mashongatea.webp",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "web",
    liveUrl: "https://www.mashongatea.com",
  },
  {
    id: "gill-international-school",
    title: "Gill International School",
    description:
      "Complete website for a Cambridge International school in Najjera, Kampala — admissions with enquiry form, termly fees, staff directory, events calendar and filterable gallery.",
    image: "/projects/gill-international-school.webp",
    technologies: ["HTML", "CSS", "JavaScript", "OpenStreetMap"],
    category: "web",
    liveUrl: "https://gill.ac.ug",
  },
  {
    id: "chikwafu",
    title: "Chikwafu Technology",
    description:
      "E-commerce store for home appliances in Kampala — genuine stock, real pricing, same-day delivery and ordering online or straight over WhatsApp.",
    image: "/projects/chikwafu.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    category: "web",
    liveUrl: "https://chikwafu.com",
  },
  {
    id: "actualisation-project",
    title: "The Actualisation Project",
    description:
      "Immersive wellness website for a spiritual growth community — “a space for real connection” for those ready to go deeper, with programmes and a contact flow.",
    image: "/projects/actualisation-project.webp?v=2",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    category: "web",
  },
  {
    id: "glam-n-go",
    title: "Glam n' Go",
    description:
      "Cross-platform fashion e-commerce app with secure payments and real-time delivery tracking — 5K+ downloads and growing.",
    image: "",
    technologies: ["React Native", "Firebase", "Stripe", "Node.js"],
    category: "mobile",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.kenyana.glamngo",
    appStoreUrl: "https://apps.apple.com/ug/app/glam-n-go/id6503872122",
    mock: { initials: "GG", gradient: "from-cyan-400/70 via-sky-500/40 to-blue-700/50" },
  },
  {
    id: "tuwe",
    title: "Tuwe",
    description:
      "Community management platform for Ugandan neighbourhoods — fee collection, property listings and local services with Mobile Money.",
    image: "",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Mobile Money"],
    category: "mobile",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.emmanuellubwama.tuwe",
    appStoreUrl: "https://apps.apple.com/ug/app/tuwe/id6752911597",
    mock: { initials: "Tu", gradient: "from-blue-500/70 via-blue-700/40 to-sky-600/50" },
  },
  {
    id: "easy-gas",
    title: "Easy Gas",
    description:
      "Cooking-gas delivery app with seamless ordering, live courier tracking and reliable service across Uganda.",
    image: "",
    technologies: ["React Native", "Firebase", "Google Maps", "Node.js"],
    category: "mobile",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.easygas.mobile.app",
    appStoreUrl: "https://apps.apple.com/ug/app/easy-gas/id6738344020",
    mock: { initials: "EG", gradient: "from-sky-500/70 via-sky-500/40 to-cyan-600/50" },
  },
];

/* ── Why Lubech ──────────────────────────────────────────────────────────── */

export const REASONS: Reason[] = [
  {
    title: "Senior team, end to end",
    description:
      "Design, engineering and DevOps under one roof. No hand-offs, no agencies of agencies — the people you meet are the people who build.",
    icon: Users,
  },
  {
    title: "Built for performance",
    description:
      "Lighthouse-green by default. We obsess over load times, Core Web Vitals and smooth 60fps interactions on every device.",
    icon: Gauge,
  },
  {
    title: "Secure & scalable",
    description:
      "Battle-tested architecture, encrypted data, automated testing and CI/CD — so your product grows without growing pains.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent partnership",
    description:
      "Weekly demos, live previews and honest estimates. You always know what's shipped, what's next and what it costs.",
    icon: Handshake,
  },
  {
    title: "Modern stack, no lock-in",
    description:
      "React, Next.js, React Native, Node and cloud-native tooling — open standards your future team will thank you for.",
    icon: Layers,
  },
  {
    title: "Support beyond launch",
    description:
      "Monitoring, maintenance and 24/7 support plans keep your platform healthy long after release day.",
    icon: Headset,
  },
];

/* ── Team ────────────────────────────────────────────────────────────────── */

export const TEAM: TeamMember[] = [
  {
    id: "lubega",
    name: "Lubega Faizal",
    role: "Chief Executive Officer",
    image: "/staff/lubega.webp",
    bio: "Leads strategy and client partnerships, focused on delivering software that makes a measurable impact on businesses and communities.",
    social: { linkedin: "https://linkedin.com/in/lubega-faizal" },
  },
  {
    id: "emmanuel",
    name: "Lubwama Emmanuel",
    role: "Co-Founder & CTO",
    image: "/staff/emmanuel.webp",
    bio: "Full-stack engineer with 5+ years building scalable web and mobile products. Architect behind Tuwe, Glam n' Go and Easy Gas.",
    social: {
      linkedin: "https://www.linkedin.com/in/lubwama-emmanuel-b35377226/",
      github: "https://github.com/Lubwama-Emmanuel",
    },
  },
  {
    id: "isco",
    name: "Ronald Isiko",
    role: "UI/UX Designer",
    image: "/staff/isco.webp",
    bio: "Visual alchemist crafting interfaces people love — product design, motion, photography and Web3 explorer.",
    social: {
      linkedin: "https://www.linkedin.com/in/isiko-ronald-247865222/",
      github: "https://github.com/iscorockie",
    },
  },
  {
    id: "solomon",
    name: "Solomon Kyagulanyi",
    role: "Software Engineer",
    image: "/staff/solomon.webp",
    bio: "Backend and data engineer comfortable across Python, Java, SQL and Linux, with a strength in R and Julia for analytics.",
    social: {},
  },
  {
    id: "oscar",
    name: "Dembe Oscar",
    role: "AI / ML Engineer",
    image: "/staff/oscar.webp",
    bio: "Builds intelligent features and data pipelines — from recommendation systems to automation that saves teams hours.",
    social: { linkedin: "https://www.linkedin.com/in/oscardembe/" },
  },
  {
    id: "anncarl",
    name: "Anncarl Mwendwa",
    role: "Software Engineer",
    image: "/staff/anncarl.webp",
    bio: "Software engineer shipping reliable, well-tested features across the stack with a sharp eye for clean code.",
    social: { linkedin: "https://www.linkedin.com/in/anncarl-mwendwa/" },
  },
  {
    id: "daniel",
    name: "Daniel Sebakijje",
    role: "Tech Consultant",
    image: "/staff/daniel.webp",
    bio: "Bridges business and technology — helping clients turn requirements into clear, data-driven product decisions.",
    social: { youtube: "https://youtu.be/M0niLgG-QmA?si=8LDcTyDSG15DV45q" },
  },
];

/* ── Testimonials ────────────────────────────────────────────────────────── */

/*
 * Ordered like the old lubech.tech site: row 1 = [0..2] (scrolls left),
 * row 2 = [3..5] (scrolls right) — see components/sections/Reviews.tsx.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "Labour Experts",
    content:
      "Lubech transformed our vision into a powerful platform. Their expertise in web development and attention to detail exceeded our expectations. The team delivered on time and within budget.",
    rating: 5,
  },
  {
    id: "2",
    name: "Barbara Kenyana",
    role: "Founder",
    company: "Glam n' Go",
    content:
      "Working with Lubech was a game-changer. They built our e-commerce app with such professionalism and care. Our app has over 5K downloads and growing.",
    rating: 5,
  },
  {
    id: "3",
    name: "James Ochen",
    role: "Director",
    company: "Tuwe Technologies",
    content:
      "The team understood our community management needs perfectly and created a robust platform that serves thousands of users. Their backend expertise is outstanding.",
    rating: 5,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Director",
    company: "Ordnancity",
    content:
      "Lubech's technical skills and creative approach helped us build a cutting-edge city management platform. Their support throughout the project was exceptional.",
    rating: 5,
  },
  {
    id: "5",
    name: "Isaac Sekatawa",
    role: "Co-Founder",
    company: "Easy Gas",
    content:
      "From concept to launch, Lubech was with us every step of the way. Our delivery app is now live on both stores and users love it. Truly world-class work.",
    rating: 5,
  },
  {
    id: "6",
    name: "Amara Jaffer",
    role: "Owner",
    company: "Cafe Jaf'n",
    content:
      "We needed a food ordering app fast, and Lubech delivered beyond what we imagined. Clean UI, smooth payments, and zero issues after launch. Amazing team.",
    rating: 5,
  },
];
