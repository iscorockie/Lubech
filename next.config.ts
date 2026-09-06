import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow the sandbox / preview proxy host to load dev assets (HMR, /_next/*).
  allowedDevOrigins: ["*.e2b.app", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
