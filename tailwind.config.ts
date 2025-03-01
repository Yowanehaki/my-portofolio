import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-subtle': 'bounce 3s infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2563eb", // Warna biru utama
        secondary: "#1e293b", // Warna abu-abu gelap
        accent: "#e11d48", // Warna aksen merah
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
        strong: "0 6px 12px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
