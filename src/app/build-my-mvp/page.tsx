import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Build Your MVP",
  description:
    "Launch your MVP fast — without cutting corners. A senior product team that turns your idea into a polished, investor-ready product in weeks, not months.",
  alternates: { canonical: `${SITE.url}/build-my-mvp` },
};

export default function BuildMyMvpPage() {
  return <AudiencePage slug="build-my-mvp" />;
}
