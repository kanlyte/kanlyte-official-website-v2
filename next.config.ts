import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Ensures the generated Prisma client (and its query engine binaries) is
  // copied into .next/standalone — file tracing doesn't follow the engine's
  // dynamic require() on its own.
  outputFileTracingIncludes: {
    '/*': ['./node_modules/.prisma/client/**/*', './public/**/*'],
  },

  images: {
    unoptimized: true,

    localPatterns: [
      {
        pathname: "/uploads/**",
      },
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
