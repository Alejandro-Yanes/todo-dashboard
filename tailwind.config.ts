import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#21222d",
        "dark-main-color": "#2c2c37",
        "dark-new-col": "#24242f",
        "dark-grey": "#494a55",
        "light-background": "#f1f7ff",
        "light-main-color": "#ffffff",
        "light-new-col": "#e8f0fb",
        todo: "#5bc1df",
        doing: "#8576e2",
        done: "#87ddc0",
      },
      textColor: {
        "light-text-primary": "#666568",
        "light-text-secondary": "#bec0bf",
        "light-text-white": "#FFFFFF",
        "dark-text-primary": "#FFFFFF",
        "dark-text-secondary": "#494a55",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
