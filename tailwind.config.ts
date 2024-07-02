import type { Config } from "tailwindcss";

export const Theme = {
  colors: {
    primary: {
      50: "#E5F2FF",
      100: "#CCE5FF",
      200: "#99CAFF",
      300: "#66B0FF",
      400: "#3396FF",
      500: "#007AFF",
      600: "#0063CC",
      700: "#004A99",
      800: "#003166",
      900: "#001933",
      950: "#000C19",
    },
    secondary: {
      50: "#F2F2F3",
      100: "#E2E2E4",
      200: "#C5C5C9",
      300: "#AAAAB1",
      400: "#8D8D96",
      500: "#71717A",
      600: "#5B5B62",
      700: "#45454A",
      800: "#2C2C30",
      900: "#161618",
      950: "#0C0C0D",
    },
  },
  fontFamily: {
    sans: ["var(--font-inter)"],
    mono: ["var(--font-roboto-mono)"],
  },
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./ui/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: Theme,
  },
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
