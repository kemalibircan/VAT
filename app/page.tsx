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
    "VatSnap helps you flip between net and gross with VAT or GST, understand the formulas, and share clean links to your calculations."
};

export default async function HomePage() {
  const guides = (await getPostsByCluster("reverse-vat")).slice(0, 10);
  const faqItems = [
    {
      question: "Is this calculator giving me tax advice?",
      answer:
        "No. VatSnap is a general-purpose calculator that helps you understand the maths. It does not provide tax or legal advice."
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
          name: "VatSnap VAT/GST Calculator",
          description:
            "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with VatSnap."
        })}
      />
      <JsonLd data={getFaqSchema({ url: "https://calculatemyvat.com/", items: faqItems })} />
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          VAT & GST reverse calculator
          <br />
          in plain English
        </h1>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Quickly jump between net and gross, add or remove VAT/GST, and see the
          maths explained step-by-step. No jargon, just numbers that make sense.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calculator</h2>
        <Suspense
          fallback={
            <div className="rounded-2xl border borderSubtle bg-surfaceElevated p-6 text-sm text-muted shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
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
            <li key={post.slug} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
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


