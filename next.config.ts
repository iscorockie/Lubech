import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow the sandbox / preview proxy host to load dev assets (HMR, /_next/*).
  allowedDevOrigins: ["*.e2b.app", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Local images are allowed by default, but query strings on them
    // (e.g. the "?v=2" cache-buster on the Actualisation project shot)
    // need an explicit pattern — Next.js 16 will require it.
    localPatterns: [{ pathname: "/**" }],
  },
  // Lets a production audit build live next to the dev server's .next folder.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
