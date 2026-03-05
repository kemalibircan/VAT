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
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
        {theme === "light" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
            <circle
              cx="12"
              cy="12"
              r="3"
              className="fill-current"
            />
            <path
              d="M12 4.75v2.5M12 16.75v2.5M6.75 12h-2.5M19.75 12h-2.5M8.25 8.25 6.75 6.75M17.25 17.25l-1.5-1.5M8.25 15.75 6.75 17.25M17.25 6.75l-1.5 1.5"
              className="stroke-current"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
            <path
              d="M18 14.75A6.25 6.25 0 0 1 9.25 6 6.25 6.25 0 1 0 18 14.75Z"
              className="stroke-current"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}


