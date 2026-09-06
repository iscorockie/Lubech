import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow the sandbox / preview proxy host to load dev assets (HMR, /_next/*).
  allowedDevOrigins: ["*.e2b.app", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Lets a production audit build live next to the dev server's .next folder.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
