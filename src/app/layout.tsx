import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const BASE_URL = "https://lubech.tech";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0f23",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Core ──────────────────────────────────────────────────────────────────
  title: {
    default: "Lubech — Web & Mobile App Development Agency",
    template: "%s | Lubech",
  },
  description:
    "Lubech is a UK-based software development agency building high-performance websites, cross-platform mobile apps, and robust backend systems. We bring ideas to life.",
  keywords: [
    "web development UK",
    "mobile app development UK",
    "software agency United Kingdom",
    "web development agency England",
    "Next.js development",
    "React Native apps",
    "Node.js backend",
    "TypeScript developers",
    "Flutter development",
    "e-commerce development",
    "full-stack development",
    "Lubech",
    "tech company UK",
    "app development agency",
  ],
  authors: [
    { name: "Lubwama Emmanuel", url: BASE_URL },
    { name: "Lubega Faizal", url: BASE_URL },
  ],
  creator: "Lubech",
  publisher: "Lubech",
  category: "Technology",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["en_US"],
    url: BASE_URL,
    siteName: "Lubech",
    title: "Lubech — Web & Mobile App Development Agency",
    description:
      "We build stunning websites, cross-platform mobile apps, and robust backend systems. Based in the UK, serving clients worldwide.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lubech — We bring ideas to life",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@lubech",
    creator: "@lubech",
    title: "Lubech | Web & Mobile App Development Agency",
    description:
      "We build stunning websites, cross-platform mobile apps, and robust backend systems. Based in the UK, serving clients worldwide.",
    images: ["/og.png"],
  },

  // ── Icons / PWA ───────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/web_favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/web_favicon.svg", color: "#4676c2" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lubech",
  },

  // ── Crawling ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add your codes when ready) ──────────────────────────────
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
    // yandex: "REPLACE_WITH_YANDEX_CODE",
    // bing: "REPLACE_WITH_BING_CODE",
  },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Lubech",
      alternateName: "Lubech Tech",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo_icon.png`,
        width: 512,
        height: 512,
      },
      description:
        "Lubech is a UK-based software development agency building high-performance websites, cross-platform mobile apps, and robust backend systems.",
      foundingDate: "2022",
      founders: [
        { "@type": "Person", name: "Lubwama Emmanuel", jobTitle: "Co-Founder & CTO" },
        { "@type": "Person", name: "Lubega Faizal", jobTitle: "CEO" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Northampton",
        addressRegion: "England",
        addressCountry: "GB",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+256752615503",
          contactType: "customer service",
          email: "info@lubech.tech",
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://twitter.com/lubech",
        "https://linkedin.com/company/lubech",
        "https://github.com/lubech",
        "https://wa.me/256752615503",
      ],
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "React Native",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Flutter",
        "Firebase",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Lubech",
      description: "Web & Mobile App Development Agency based in the UK",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-GB",
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Lubech — Web & Mobile App Development Agency",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      description:
        "We build stunning websites, cross-platform mobile apps, and robust backend systems. Based in the UK, serving clients worldwide.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
        ],
      },
      inLanguage: "en-GB",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Lubech Software Development",
      image: `${BASE_URL}/og.png`,
      url: BASE_URL,
      telephone: "+256752615503",
      email: "info@lubech.tech",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Northampton",
        addressRegion: "England",
        addressCountry: "GB",
      },
      priceRange: "$$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "16:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend & API Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/web_favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
