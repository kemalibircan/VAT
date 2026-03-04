import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VatCalculator } from "@/components/vat-calculator";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/jsonld";
import { getIntentConfig, intentConfigs } from "@/lib/intents";
import { getPostsByCluster } from "@/lib/blog";
import { getFaqSchema, getWebApplicationSchema } from "@/lib/schema";

type Props = {
  params: { intent: string };
};

export async function generateStaticParams() {
  return intentConfigs.map((intent) => ({ intent: intent.slug }));
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const intent = getIntentConfig(params.intent);
  if (!intent) return {};
  return {
    title: intent.title,
    description: intent.description,
    alternates: {
      canonical: `https://calculatemyvat.com/${intent.slug}`
    }
  };
}

export default async function IntentPage({ params }: Props) {
  const intent = getIntentConfig(params.intent);
  if (!intent) notFound();

  const clusterGuides =
    intent.slug === "gst-calculator"
      ? await getPostsByCluster("country-basics")
      : await getPostsByCluster("reverse-vat");

  const guides = clusterGuides.slice(0, 6);

  const faqItems = [
    {
      question: "What does this calculator actually do?",
      answer:
        "It helps you move between net, VAT/GST, and gross amounts using a simple formula. You can add or remove VAT or GST and see every piece broken out."
    },
    {
      question: "Are the VAT or GST rates always correct?",
      answer:
        "No. Presets use example rates for illustration only. Rates can change and may differ by product or service. Always confirm the correct rate with an official source."
    },
    {
      question: "Can I share a specific calculation?",
      answer:
        "Yes. Use the “Share this calculation” button. It copies a clean URL with the current amount, rate, mode, and country so someone else can open exactly the same view."
    }
  ];

  const canonical = `https://calculatemyvat.com/${intent.slug}`;

  return (
    <div className="space-y-10">
      <JsonLd
        data={getWebApplicationSchema({
          url: canonical,
          name: "VatSnap VAT/GST Calculator",
          description: intent.description
        })}
      />
      <JsonLd data={getFaqSchema({ url: canonical, items: faqItems })} />
      <section className="space-y-3">
        <div className="inline-flex items-center gap-3 rounded-full bg-surfaceElevated/80 px-3 py-1 text-xs font-medium text-foreground-muted ring-1 ring-borderSubtle/70 backdrop-blur-sm dark:bg-slate-950/60">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.35)]" />
          <span>Interactive VAT / GST helper</span>
        </div>
        <h1 className="flex items-center gap-3 text-3xl font-semibold leading-tight md:text-4xl">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/30 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                d="M12 3.75 9.75 9.5 4 11.75l5.75 2.25L12 19.75l2.25-5.75L20 11.75l-5.75-2.25L12 3.75Z"
                className="fill-current"
              />
            </svg>
          </span>
          <span>{intent.title}</span>
        </h1>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          {intent.description} This page is designed to be a fast, friendly tool
          you can reuse whenever you need to check a price.
        </p>
        <div className="mt-4 grid gap-3 text-xs md:grid-cols-3 md:text-sm">
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/40 group-hover:scale-105 group-hover:bg-emerald-500/15 group-hover:ring-emerald-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M5 12.75 9.25 17 19 7.25"
                  className="stroke-current"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Instant results</p>
              <p className="text-foreground-muted">
                Type any amount and see net, tax, and gross update side by side.
              </p>
            </div>
          </div>
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/40 group-hover:scale-105 group-hover:bg-sky-500/15 group-hover:ring-sky-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M7.5 4.75h9a1.75 1.75 0 0 1 1.75 1.75v11.5L12 15.5l-6.25 2.5V6.5A1.75 1.75 0 0 1 7.5 4.75Z"
                  className="fill-current"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Shareable scenarios</p>
              <p className="text-foreground-muted">
                Save or share links that reopen the exact same calculation later.
              </p>
            </div>
          </div>
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/40 group-hover:scale-105 group-hover:bg-amber-500/15 group-hover:ring-amber-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M12 4.75 4.75 9.5 12 14.25 19.25 9.5 12 4.75Zm-7.25 7 7.25 4.75 7.25-4.75"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.75 14.75 12 19.5l7.25-4.75"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">No sign-up needed</p>
              <p className="text-foreground-muted">
                Use it freely for quick checks, quotes, or explaining tax to others.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Calculator</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-surfaceElevated px-2 py-0.5 text-[11px] font-medium text-foreground-muted ring-1 ring-borderSubtle">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Live preview</span>
          </span>
        </div>
        <Suspense
          fallback={
            <div className="space-y-4 rounded-2xl border borderSubtle bg-surfaceElevated p-6 text-sm text-muted shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 animate-pulse rounded bg-foreground-muted/20" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-foreground-muted/15" />
              </div>
              <div className="h-10 w-full animate-pulse rounded-lg bg-foreground-muted/15" />
              <div className="grid gap-3 md:grid-cols-3">
                <div className="h-16 animate-pulse rounded-xl bg-foreground-muted/10" />
                <div className="h-16 animate-pulse rounded-xl bg-foreground-muted/10" />
                <div className="h-16 animate-pulse rounded-xl bg-foreground-muted/10" />
              </div>
            </div>
          }
        >
          <VatCalculator initialMode={intent.defaultMode} />
        </Suspense>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Under the hood, the calculator uses simple percentage maths. To add
          VAT or GST, we multiply net by (1 + rate/100). To remove VAT or GST,
          we divide gross by (1 + rate/100). The tool keeps net, tax, and gross
          side by side so you can spot rounding or copy values into invoices.
        </p>
      </section>

      <FaqSection items={faqItems} />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related guides</h2>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Want to go deeper? These guides walk through common VAT and GST
          questions with worked examples.
        </p>
        <ul className="mt-2 grid gap-3 md:grid-cols-2">
          {guides.map((post) => (
            <li
              key={post.slug}
              className="group rounded-lg border borderSubtle bg-surfaceElevated p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60"
            >
              <a
                href={`/blog/${post.slug}`}
                className="flex items-start gap-2 text-sm font-semibold"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/30 group-hover:bg-emerald-500/15 group-hover:text-emerald-400 group-hover:ring-emerald-400/70">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
                    <path
                      d="M8.75 5.75h9.5v9.5M18.25 5.75 5.75 18.25"
                      className="stroke-current"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{post.title}</span>
              </a>
              <p className="mt-1 text-xs text-muted group-hover:text-foreground-muted">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


