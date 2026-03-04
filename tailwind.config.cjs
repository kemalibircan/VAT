/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        surface: "var(--background-soft)",
        surfaceElevated: "var(--background-elevated)",
        borderSubtle: "var(--border-subtle)",
        borderStrong: "var(--border-strong)",
        accentSoft: "var(--accent-soft)",
        accentForeground: "var(--accent-foreground)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};


