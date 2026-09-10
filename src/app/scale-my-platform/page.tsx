import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";

export const metadata: Metadata = {
  title: "Scale Your Platform | Lubech",
  description:
    "Modernise, automate and scale with confidence. We rebuild legacy platforms, connect your systems and deliver software your customers and teams love to use.",
};

export default function ScaleMyPlatformPage() {
  return <AudiencePage slug="scale-my-platform" />;
}
