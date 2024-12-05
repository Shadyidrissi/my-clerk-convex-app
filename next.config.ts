import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HMAC_KEY: process.env.HMAC_KEY,
  },
};

export default nextConfig;
