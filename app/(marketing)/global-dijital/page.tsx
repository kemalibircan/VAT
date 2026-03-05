import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Dijital – All Products",
  description:
    "Discover all digital products by Global Dijital: calculatemyvat, Study Planner Hub, globaldijital.com, and EdgeFootball AI score predictions."
};

const products = [
  {
    name: "calculatemyvat",
    badge: "VAT & GST Calculator",
    href: "https://calculatemyvat.com",
    highlight: "Net ↔ Gross in plain English",
    description:
      "Reverse VAT or GST, jump between net and gross, and see the maths explained in simple language. Built for quick checks, invoices, and sanity-checking pricing.",
    color: "emerald"
  },
  {
    name: "Study Planner Hub",
    badge: "Student Productivity",
    href: "https://studyplannerhub.com",
    highlight: "Smart study plans and productivity tools for students",
    description:
      "Studyplannerhub.com offers intelligent study planners, goal tracking, and daily/weekly schedules for students. It makes it easier to stay focused, build consistent study habits, and track progress during exam preparation.",
    color: "purple"
  },
  {
    name: "globaldijital.com",
    badge: "Global Dijital",
    href: "https://globaldijital.com",
    highlight: "Umbrella brand for digital products and AI projects",
    description:
      "Global Dijital brings together digital products and AI projects across finance, education, and sports. It is the central hub for new launches, integrations, and partnerships.",
    color: "sky"
  },
  {
    name: "EdgeFootball",
    badge: "AI Football Predictions",
    href: "https://edgefootball.org",
    highlight: "AI‑powered football score prediction app",
    description:
      "EdgeFootball.org uses match statistics, form data, and multiple data sources to generate AI‑driven score and match outcome predictions. It aims to provide transparent, data‑driven, and fun predictions for football fans.",
    color: "amber"
  }
] as const;

const colorClasses: Record<
  (typeof products)[number]["color"],
  {
    badge: string;
    ring: string;
    pill: string;
  }
> = {
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-500",
    ring: "ring-emerald-500/40",
    pill: "hover:border-emerald-400/70"
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400",
    ring: "ring-purple-500/40",
    pill: "hover:border-purple-400/70"
  },
  sky: {
    badge: "bg-sky-500/10 text-sky-500",
    ring: "ring-sky-500/40",
    pill: "hover:border-sky-400/70"
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-500",
    ring: "ring-amber-500/40",
    pill: "hover:border-amber-400/70"
  }
};

export default function GlobalDijitalPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-surfaceElevated/80 px-3 py-1 text-xs font-medium text-foreground-muted ring-1 ring-borderSubtle/70 backdrop-blur-sm">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.35)]" />
          <span>Global Dijital – All Products</span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          The Global Dijital product family
        </h1>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          We bring together digital products built across finance, education, and sports into a
          single place. Below you can explore every app in the Global Dijital ecosystem, with short
          descriptions and direct links.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {products.map((product) => {
          const colors = colorClasses[product.color];
          return (
            <article
              key={product.name}
              className={`group flex flex-col justify-between rounded-2xl border borderSubtle bg-surfaceElevated/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 ${colors.pill}`}
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${colors.badge} ring-1 ${colors.ring}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span>{product.badge}</span>
                  </span>
                </div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm font-medium text-foreground">
                  {product.highlight}
                </p>
                <p className="text-sm text-foreground-muted">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-muted">
                  Part of the globaldijital.com ecosystem
                </span>
                <Link
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/10"
                >
                  <span>Visit site</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      d="M9.5 5.75h8.75v8.75M14.25 9.75 9 15m-3.75-2a7 7 0 0 0 7 7"
                      className="stroke-current"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

