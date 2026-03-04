"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VatCalculator } from "@/components/vat-calculator";
import { FaqSection } from "@/components/faq-section";
import { getCountryPreset } from "@/lib/countries";
import type { BlogPostMeta } from "@/lib/blog";

type CountryPageClientProps = {
  intentTitle: string;
  intentDescription: string;
  defaultMode: "add" | "remove" | "amount";
  baseCountrySlug: string;
  baseExampleRate: number;
  vatGuides: BlogPostMeta[];
  gstGuides: BlogPostMeta[];
  faqItems: { question: string; answer: string }[];
};

export function CountryPageClient({
  intentTitle,
  intentDescription,
  defaultMode,
  baseCountrySlug,
  baseExampleRate,
  vatGuides,
  gstGuides,
  faqItems
}: CountryPageClientProps) {
  const searchParams = useSearchParams();
  const countryFromQuery = searchParams.get("country") ?? undefined;

  const initialSlug = countryFromQuery ?? baseCountrySlug;
  const [currentCountrySlug, setCurrentCountrySlug] = useState<string | undefined>(
    initialSlug
  );
  const handleCountryChange = (slug: string | undefined) => {
    setCurrentCountrySlug(slug ?? baseCountrySlug);
  };

  const currentCountry = useMemo(
    () => getCountryPreset(currentCountrySlug) ?? getCountryPreset(baseCountrySlug)!,
    [currentCountrySlug, baseCountrySlug]
  );

  const guides =
    currentCountry.type === "gst"
      ? gstGuides.slice(0, 4)
      : vatGuides.slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="flex items-center gap-3 text-3xl font-semibold md:text-4xl">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/30 shadow-sm">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
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
          <span>
            {intentTitle} – {currentCountry.name}
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-muted md:text-base">
          {intentDescription} This version starts with an example{" "}
          {currentCountry.type.toUpperCase()} rate for {currentCountry.name},
          but you can edit the rate at any time.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Calculator</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-surfaceElevated px-2 py-0.5 text-[11px] font-medium text-foreground-muted ring-1 ring-borderSubtle">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Country-aware</span>
          </span>
        </div>
        <VatCalculator
          initialMode={defaultMode}
          initialCountrySlug={initialSlug}
          initialRate={baseExampleRate}
          onCountryChange={handleCountryChange}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="max-w-2xl text-sm text-slate-700 dark:text-slate-200 md:text-base">
          The maths is the same regardless of country: we still use percentages.
          To add tax, net × (1 + rate/100) gives you gross. To reverse it, gross
          ÷ (1 + rate/100) gets you back to net. This page simply nudges you
          toward a typical example rate for {currentCountry.name} so you do less
          typing.
        </p>
      </section>

      <FaqSection items={faqItems} />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Guides for this region</h2>
        <p className="max-w-2xl text-sm text-foreground-muted dark:text-slate-200 md:text-base">
          These articles talk about VAT, GST, and pricing in a way that is
          friendly to readers in {currentCountry.name} and similar regions.
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


