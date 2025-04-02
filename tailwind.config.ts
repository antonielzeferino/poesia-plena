import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        link: 'var(--link)',
        muted: 'var(--muted)',
        contrast: 'var(--bg-contrast)'
      },

    },
  },
  darkMode: 'media',
  plugins: [],
} satisfies Config;