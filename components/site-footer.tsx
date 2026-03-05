import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t borderSubtle bg-surface/90 px-4 py-4 text-xs text-muted backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2">
                <path
                  d="M12 5.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm0 5.75a4.5 4.5 0 0 0-4.5 4.5h9a4.5 4.5 0 0 0-4.5-4.5Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>About</span>
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2">
                <path
                  d="M12 4.75a3.5 3.5 0 0 0-3.5 3.5v.5H7.25v7h9.5v-7H15.5v-.5a3.5 3.5 0 0 0-3.5-3.5Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Privacy</span>
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2">
                <path
                  d="M7.75 5.75h8.5v12.5h-8.5V5.75Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Terms</span>
          </Link>
          <a
            href="mailto:info@globaldijital.com"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent-soft hover:text-accent"
          >
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2">
                <path
                  d="M5.25 6.75h13.5v10.5H5.25V6.75Zm0 0L12 12l6.75-5.25"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>info@globaldijital.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.4)]" />
          <p className="max-w-md">
            Rates can change. Always confirm the correct rate for your case. Default
            rate is a convenience preset you can edit any time.
          </p>
        </div>
      </div>
    </footer>
  );
}


