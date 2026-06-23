import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#030506",
          925: "#05090B",
          900: "#070D10",
          850: "#0B1317",
          800: "#101A20",
          700: "#18262D",
          600: "#273941"
        },
        cyan: {
          300: "#62DCFF",
          400: "#19C4F7",
          500: "#00A9DC",
          600: "#008AB5"
        },
        gold: {
          300: "#F6D94B",
          400: "#E5C316",
          500: "#C7A300"
        },
        track: {
          red: "#D84734",
          white: "#F7FAFC",
          muted: "#92A4AD"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "Arial Narrow",
          "DIN Condensed",
          "Roboto Condensed",
          "Impact",
          "sans-serif"
        ],
        mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"]
      },
      transitionTimingFunction: {
        shop: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      boxShadow: {
        "panel": "0 22px 70px rgba(0, 0, 0, 0.42)",
        "cyan": "0 0 0 1px rgba(25, 196, 247, 0.2), 0 18px 60px rgba(0, 169, 220, 0.12)"
      },
      backgroundImage: {
        "technical-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "carbon":
          "linear-gradient(135deg, rgba(255,255,255,0.035) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.03) 25%, transparent 25%)"
      }
    }
  },
  plugins: []
};

export default config;
