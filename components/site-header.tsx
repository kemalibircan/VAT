import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b borderSubtle bg-surface/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative h-9 w-9 overflow-hidden rounded-2xl ring-1 ring-emerald-500/60 shadow-sm transition group-hover:scale-105 group-hover:ring-emerald-400/90">
            <Image
              src="/brand-mark.png"
              alt="calculatemyvat logo"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-tight">
              calculatemyvat
            </span>
            <span className="text-[11px] text-muted">
              Net ↔ Gross in plain English
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/vat-calculator"
            className="group inline-flex items-center gap-1 rounded-full px-3 py-1 text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M6.75 5.75h10.5M6.75 9.75h10.5M6.75 13.75h5.5M6.75 17.75h3.5"
                  className="stroke-current"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>Calculator</span>
          </Link>
          <Link
            href="/vat-calculator/uk"
            className="group inline-flex items-center gap-1 rounded-full px-3 py-1 text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M5.25 7.75 12 4.75l6.75 3v8.5L12 19.25l-6.75-3v-8.5Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Countries</span>
          </Link>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 rounded-full px-3 py-1 text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M6.75 5.75h10.5v12.5H6.75V5.75Zm3 3h4.5"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Blog</span>
          </Link>
          <Link
            href="/global-dijital"
            className="group inline-flex items-center gap-1 rounded-full px-3 py-1 text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M9.5 5.75h8.75v8.75M14.25 9.75 9 15m-3.75-2a7 7 0 0 0 7 7"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Global Dijital – All Products</span>
          </Link>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

