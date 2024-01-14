import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        curves: "url('/design.svg')",
      },
    },
    colors: {
      green: "#2BD17E",
      red: "#EB5757",
      "rich-black": "#093545",
      "dark-slate-gray": "#224957",
      "maasstricht-blue": "#092C39",
      white: "#ffffff",
    },
  },
  plugins: [],
};
export default config;
