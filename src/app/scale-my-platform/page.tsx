import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Scale Your Platform",
  description:
    "Modernise, automate and scale with confidence. We rebuild legacy platforms, connect your systems and deliver software your customers and teams love to use.",
  alternates: { canonical: `${SITE.url}/scale-my-platform` },
};

export default function ScaleMyPlatformPage() {
  return <AudiencePage slug="scale-my-platform" />;
}
