import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home page reads `content/` from disk and regenerates hourly under ISR,
  // so the content files must ship with its serverless function.
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
  },
};

export default nextConfig;
