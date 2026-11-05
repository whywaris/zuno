import type { NextConfig } from "next";
import { ALLOWED_IMAGE_HOSTS } from "./lib/images";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/guide/:slug",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: ALLOWED_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default nextConfig;
