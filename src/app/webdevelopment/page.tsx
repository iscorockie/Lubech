import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "High-performance websites and web apps built with React and Next.js — fast, accessible, SEO-ready and designed to convert.",
  alternates: { canonical: `${SITE.url}/webdevelopment` },
};

export default function WebDevelopmentPage() {
  return <ServicePage slug="webdevelopment" />;
}
