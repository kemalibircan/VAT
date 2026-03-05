import { Metadata } from "next";
import { Suspense } from "react";
import { VatCalculator } from "@/components/vat-calculator";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/jsonld";
import { getPostsByCluster } from "@/lib/blog";
import { getFaqSchema, getWebApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Home – Reverse VAT & GST in Plain English",
  description:
    "calculatemyvat helps you flip between net and gross with VAT or GST, understand the formulas, and share clean links to your calculations."
};

export default async function HomePage() {
  const guides = (await getPostsByCluster("reverse-vat")).slice(0, 10);
  const faqItems = [
    {
      question: "Is this calculator giving me tax advice?",
      answer:
        "No. calculatemyvat is a general-purpose calculator that helps you understand the maths. It does not provide tax or legal advice."
    },
    {
      question: "Where do your VAT and GST rates come from?",
      answer:
        "Country presets use example rates for convenience only. Rates can change and may vary by product or service. Always confirm the correct rate with an official source."
    },
    {
      question: "Can I change the VAT or GST rate?",
      answer:
        "Yes. The preset is just a starting point. You can always edit the rate field to match your specific case."
    }
  ];

  return (
    <div className="space-y-10">
      <JsonLd
        data={getWebApplicationSchema({
          url: "https://calculatemyvat.com/",
          name: "calculatemyvat VAT/GST Calculator",
          description:
            "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat."
        })}
      />
      <JsonLd data={getFaqSchema({ url: "https://calculatemyvat.com/", items: faqItems })} />
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-surfaceElevated/80 px-3 py-1 text-xs font-medium text-foreground-muted ring-1 ring-borderSubtle/70 backdrop-blur-sm">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.35)]" />
          <span>Friendly VAT & GST helper</span>
        </div>
        <h1 className="flex flex-wrap items-center gap-3 text-4xl font-semibold leading-tight md:text-5xl">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40 shadow-md">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M5.25 12.75 10 17.25 18.75 6.75"
                className="stroke-current"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="block">
            VAT & GST reverse calculator
            <br />
            in plain English
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Quickly jump between net and gross, add or remove VAT/GST, and see the
          maths explained step-by-step. No jargon, just numbers that make sense.
        </p>
        <div className="grid gap-3 text-xs md:grid-cols-3 md:text-sm">
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-md dark:border-slate-800">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/40 group-hover:scale-105 group-hover:bg-emerald-500/15 group-hover:ring-emerald-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M6.75 5.75h10.5M6.75 9.75h10.5M6.75 13.75h5.5M6.75 17.75h3.5"
                  className="stroke-current"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Built for quick checks</p>
              <p className="text-foreground-muted">
                Paste a number, pick a rate, and see every piece update together.
              </p>
            </div>
          </div>
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400/70 hover:shadow-md dark:border-slate-800">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/40 group-hover:scale-105 group-hover:bg-sky-500/15 group-hover:ring-sky-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M5.25 7.75 12 4.75l6.75 3v8.5L12 19.25l-6.75-3v-8.5Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Country presets</p>
              <p className="text-foreground-muted">
                Start from example VAT/GST rates for different countries, then tweak.
              </p>
            </div>
          </div>
          <div className="group flex items-start gap-2 rounded-xl border borderSubtle bg-surfaceElevated/60 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/70 hover:shadow-md dark:border-slate-800">
            <div className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/40 group-hover:scale-105 group-hover:bg-amber-500/15 group-hover:ring-amber-400/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  d="M7.75 6.75h8.5v10.5h-8.5V6.75Zm4.25 2v4.5"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="13.75"
                  r="0.8"
                  className="fill-current"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">No login, no fuss</p>
              <p className="text-foreground-muted">
                Just numbers and explanations you can copy into your tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calculator</h2>
        <Suspense
          fallback={
            <div className="rounded-2xl border borderSubtle bg-surfaceElevated p-6 text-sm text-muted shadow-sm dark:border-slate-800">
              Loading calculator…
            </div>
          }
        >
          <VatCalculator initialMode="add" />
        </Suspense>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          To add VAT, we multiply your net amount by (1 + rate/100) to find the
          gross. To remove VAT, we divide the gross by (1 + rate/100) to get
          back to net. The calculator shows net, VAT, and gross together so
          you can double-check invoices, receipts, or pricing.
        </p>
      </section>

      <FaqSection
        items={faqItems}
      />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related guides</h2>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Learn how reverse VAT works in practice, how to read invoices, and
          how to keep rounding under control.
        </p>
        <ul className="mt-2 grid gap-3 md:grid-cols-2">
          {guides.map((post) => (
            <li key={post.slug} className="rounded-lg border border-slate-800 bg-surfaceElevated p-3">
              <a href={`/blog/${post.slug}`} className="text-sm font-semibold">
                {post.title}
              </a>
              <p className="mt-1 text-xs text-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


