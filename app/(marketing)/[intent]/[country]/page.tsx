import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/jsonld";
import { getIntentConfig } from "@/lib/intents";
import { countryPresets, getCountryPreset } from "@/lib/countries";
import { getPostsByCluster, getAllPostMetas } from "@/lib/blog";
import { getFaqSchema, getWebApplicationSchema } from "@/lib/schema";
import { Suspense } from "react";
import { CountryPageClient } from "@/app/(marketing)/[intent]/[country]/CountryPageClient";

type Props = {
  params: { intent: string; country: string };
};

const seededCombos = [
  { intent: "remove-vat-calculator", country: "uk" },
  { intent: "vat-calculator", country: "uk" },
  { intent: "vat-inclusive-to-exclusive", country: "germany" },
  { intent: "gst-calculator", country: "australia" },
  { intent: "reverse-vat-calculator", country: "new-zealand" }
];

export async function generateStaticParams() {
  return seededCombos;
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const intent = getIntentConfig(params.intent);
  const country = getCountryPreset(params.country);
  if (!intent || !country) return {};

  const title = `${intent.title} – ${country.name}`;
  const description = `${intent.description} This version starts with an example rate for ${country.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://example.com/${intent.slug}/${country.slug}`
    }
  };
}

export default async function IntentCountryPage({ params }: Props) {
  const intent = getIntentConfig(params.intent);
  const country = getCountryPreset(params.country);
  if (!intent || !country) notFound();

  const vatGuides = (await getPostsByCluster("reverse-vat")).slice(0, 8);
  const gstGuides = (await getPostsByCluster("country-basics")).slice(0, 8);

  const faqItems = [
    {
      question: `Does this page know the official ${country.type.toUpperCase()} rate for ${country.name}?`,
      answer:
        "No. It uses an example rate as a starting point only. Real-world rates can change and may vary by product or service, so always confirm the correct rate from an official source."
    },
    {
      question: "Can I change the preset rate?",
      answer:
        "Yes. The preset is just a convenience. Edit the rate field to match the percentage you actually want to use."
    },
    {
      question: "Is this a replacement for professional tax advice?",
      answer:
        "No. This calculator is for general, educational use. It does not replace personal advice from a qualified professional."
    }
  ];

  const canonical = `https://example.com/${intent.slug}/${country.slug}`;

  return (
    <div className="space-y-10">
      <JsonLd
        data={getWebApplicationSchema({
          url: canonical,
          name: "VatSnap VAT/GST Calculator",
          description: `${intent.description} (${country.name})`
        })}
      />
      <JsonLd data={getFaqSchema({ url: canonical, items: faqItems })} />
      <Suspense
        fallback={
          <div className="rounded-2xl border borderSubtle bg-surfaceElevated p-6 text-sm text-muted shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
            Loading calculator…
          </div>
        }
      >
        <CountryPageClient
          intentTitle={intent.title}
          intentDescription={intent.description}
          defaultMode={intent.defaultMode}
          baseCountrySlug={country.slug}
          baseExampleRate={country.exampleDefaultRate}
          vatGuides={vatGuides}
          gstGuides={gstGuides}
          faqItems={faqItems}
        />
      </Suspense>
    </div>
  );
}


