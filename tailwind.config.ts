import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
        "accent-color": "rgba(var(--accent-color))",
        border: "rgba(var(--border))",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
export default config;
