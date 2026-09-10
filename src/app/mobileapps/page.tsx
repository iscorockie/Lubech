import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Mobile Apps",
  description:
    "Cross-platform iOS and Android apps with React Native and Flutter — native feel, one codebase, shipped to both stores.",
  alternates: { canonical: `${SITE.url}/mobileapps` },
};

export default function MobileAppsPage() {
  return <ServicePage slug="mobileapps" />;
}
