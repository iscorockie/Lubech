import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Mobile Apps",
  description:
    "Cross-platform iOS and Android apps with React Native and Flutter — native feel, one codebase, shipped to both stores.",
};

export default function MobileAppsPage() {
  return <ServicePage slug="mobileapps" />;
}
