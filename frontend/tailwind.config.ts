import type { Config } from "tailwindcss";
// @ts-ignore
import theme from 'chaya-ui/dist/tailwind-theme';

const config: Config = {
  content: [
    "node_modules/chaya-ui/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: theme,
  },
  plugins: [],
};
export default config;
