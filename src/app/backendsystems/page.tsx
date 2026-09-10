import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Backend Systems",
  description:
    "Secure, scalable APIs, databases and cloud infrastructure that quietly power everything your product needs to do.",
  alternates: { canonical: `${SITE.url}/backendsystems` },
};

export default function BackendSystemsPage() {
  return <ServicePage slug="backendsystems" />;
}
