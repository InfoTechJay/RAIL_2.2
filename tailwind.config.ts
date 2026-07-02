import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink-black)",
        graphite: "var(--graphite)",
        charcoal: "var(--charcoal-surface)",
        railGold: "var(--rail-gold)",
        railGoldSoft: "var(--rail-gold-soft)",
        line: "var(--border-line)"
      },
      boxShadow: {
        glow: "0 18px 70px rgba(201, 162, 39, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
