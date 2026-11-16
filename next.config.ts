import type { NextConfig } from "next";
import { ALLOWED_IMAGE_HOSTS } from "./lib/images";
import { MERGE_REDIRECTS, MERGE_REDIRECTS_ENABLED } from "./lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/guide/:slug",
        permanent: true,
      },
      ...(MERGE_REDIRECTS_ENABLED
        ? MERGE_REDIRECTS.map(({ from, to }) => ({
            source: `/guide/${from}`,
            destination: `/guide/${to}`,
            permanent: true,
          }))
        : []),
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
