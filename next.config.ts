import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
