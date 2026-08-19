import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",

  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*", "./public/**/*"],
  },

  images: {
    minimumCacheTTL: 60,
    localPatterns: [
      { pathname: "/**" },
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
