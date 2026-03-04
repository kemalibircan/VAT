"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border borderSubtle bg-surface px-3 py-1 text-xs font-medium text-muted shadow-sm hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label="Toggle dark or light mode"
    >
      <span>{theme === "light" ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}


