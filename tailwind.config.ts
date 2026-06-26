import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080A0D",
        graphite: "#111827",
        charcoal: "#171A1F",
        railGold: "#C9A227",
        railGoldSoft: "#E8C95B",
        line: "rgba(255,255,255,0.1)"
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
