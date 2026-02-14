import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Wajib untuk GitHub Pages

  // Matikan optimasi gambar bawaan Next.js, karena fitur ini butuh server Node.js
  images: {
    unoptimized: true,
  },

  basePath: "/little-universe",
};

export default nextConfig;
