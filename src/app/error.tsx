"use client";

import { useEffect } from "react";
import { Home, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import StatusPage from "@/components/StatusPage";
import { SITE } from "@/data/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure in the console / monitoring without exposing it in the UI.
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code="500"
      eyebrow="Something went wrong"
      title={
        <>
          We hit an <span className="text-gradient">unexpected error</span>
        </>
      }
      description="Our side, not yours. Try again in a moment — if it keeps happening, let us know and we'll fix it fast."
      actions={
        <>
          <Button size="lg" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Try again
          </Button>
          <Button href="/" variant="ghost" size="lg">
            <Home className="h-4 w-4" aria-hidden /> Back to home
          </Button>
        </>
      }
      footnote={
        <>
          {error.digest && (
            <span className="mr-3 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/50">
              ref {error.digest}
            </span>
          )}
          Need help now?{" "}
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
