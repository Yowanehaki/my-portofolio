import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Perhatian: Ini memungkinkan build produksi berhasil meskipun
    // proyek Anda memiliki error ESLint.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;