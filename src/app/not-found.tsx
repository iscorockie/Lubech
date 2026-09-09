import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import StatusPage from "@/components/StatusPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Page not found"
      title={
        <>
          This page drifted <span className="text-gradient">off the map</span>
        </>
      }
      description="The link may be outdated, or the page has moved. Head back home — everything you need is on one page."
      actions={
        <>
          <Button href="/" size="lg">
            Back to home <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/#contact" variant="ghost" size="lg">
            <Mail className="h-4 w-4" aria-hidden /> Contact us
          </Button>
        </>
      }
      footnote={
        <>
          Looking for something specific? Email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {SITE.email}
          </a>
        </>
      }
    />
  );
}
