import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b borderSubtle bg-surface/90 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-xl font-semibold tracking-tight">
            VatSnap
          </span>
          <span className="text-xs text-muted">
            Net ↔ Gross in plain English
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/vat-calculator" className="text-muted hover:text-accent">
            Calculator
          </Link>
          <Link
            href="/vat-calculator/uk"
            className="text-muted hover:text-accent"
          >
            Countries
          </Link>
          <Link href="/blog" className="text-muted hover:text-accent">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


