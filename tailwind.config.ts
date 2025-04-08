import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#101827", // Default color (light mode)
          dark: "#FFFFFF", // Dark mode variant
        },
        secondary: {
          DEFAULT: "#52525B", // Default color (light mode)
          dark: "#71717A", // Dark mode variant
        },
        tertiary: {
          DEFAULT: "#4b5563", // Default color (light mode)
          dark: "#9ca3af", // Dark mode variant
        },
      },
      fontFamily: {
        'sans': ['Mona Sans'],
        'mackinac': ['p22-mackinac-pro', 'serif', 'sans-serif'],
      },
      screens: {
        md: '999px', // Default is 768pc
      },
    },
  },
  plugins: [],
} satisfies Config;
