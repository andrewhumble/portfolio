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
