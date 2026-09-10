import type { ComponentType } from "react";

export interface IconProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}

export type Icon = ComponentType<IconProps>;

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  pageIntro?: string;
  /** Gradient word in "Everything your <word> needs". */
  pageIncludedHighlight?: string;
  /** Gradient phrase in the final CTA: "Ready to <phrase>?" */
  pageCtaHighlight?: string;
  icon: Icon;
  features: string[];
  accent: "blue" | "sky" | "cyan";
}

export interface Audience {
  id: string;
  slug?: string;
  eyebrow: string;
  title: string;
  description: string;
  pageTitle?: string;
  pageIntro?: string;
  /** Gradient highlight word in "Everything you need to <word>". */
  pageIncludedHighlight?: string;
  /** Custom process heading; falls back to the default "from idea to live" one. */
  pageProcessTitle?: string;
  /** Gradient highlight in the final CTA: "Ready to <word>?" */
  pageCtaHighlight?: string;
  icon: Icon;
  points: string[];
  cta: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: Icon;
  duration: string;
}

export interface Technology {
  name: string;
  icon: Icon;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "web" | "mobile";
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  /** Short label + gradient for the stylised phone mock-up (mobile projects without a screenshot). */
  mock?: { initials: string; gradient: string };
}

export interface Reason {
  title: string;
  description: string;
  icon: Icon;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}
