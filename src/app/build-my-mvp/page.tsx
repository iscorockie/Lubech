import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";

export const metadata: Metadata = {
  title: "Build Your MVP",
  description:
    "Launch your MVP fast — without cutting corners. A senior product team that turns your idea into a polished, investor-ready product in weeks, not months.",
};

export default function BuildMyMvpPage() {
  return <AudiencePage slug="build-my-mvp" />;
}
