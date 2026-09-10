import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Web Development | Lubech",
  description:
    "High-performance websites and web apps built with React and Next.js — fast, accessible, SEO-ready and designed to convert.",
};

export default function WebDevelopmentPage() {
  return <ServicePage slug="webdevelopment" />;
}
