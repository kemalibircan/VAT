import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t borderSubtle bg-surface/90 px-4 py-4 text-xs text-muted backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/privacy" className="hover:text-accent">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </div>
        <p className="max-w-md text-[11px] text-muted">
          Rates can change. Always confirm the correct rate for your case.
          Default rate is a convenience preset. You can edit it.
        </p>
      </div>
    </footer>
  );
}


