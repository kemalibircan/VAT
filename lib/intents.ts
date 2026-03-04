import type { VatMode } from "@/lib/vat";

export type IntentConfig = {
  slug: string;
  title: string;
  description: string;
  defaultMode: VatMode;
};

export const intentConfigs: IntentConfig[] = [
  {
    slug: "vat-calculator",
    title: "VAT Calculator (Net ↔ Gross)",
    description:
      "Flip between net and gross amounts with VAT in one friendly calculator.",
    defaultMode: "add"
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator (Net ↔ Gross)",
    description:
      "Quickly move between net and gross amounts with GST, with plain-English explanations.",
    defaultMode: "add"
  },
  {
    slug: "remove-vat-calculator",
    title: "Remove VAT Calculator (Reverse VAT)",
    description:
      "Start from a VAT-inclusive price and work backwards to find the net and VAT parts.",
    defaultMode: "remove"
  },
  {
    slug: "add-vat-calculator",
    title: "Add VAT to Net Price",
    description:
      "Begin with a net amount and add VAT on top to see the VAT and gross total.",
    defaultMode: "add"
  },
  {
    slug: "reverse-vat-calculator",
    title: "Reverse VAT Calculator",
    description:
      "Take a VAT-inclusive price and reverse it back to net, VAT, and gross breakdown.",
    defaultMode: "remove"
  },
  {
    slug: "vat-inclusive-to-exclusive",
    title: "VAT Inclusive to Exclusive",
    description:
      "Turn a VAT-inclusive price into a VAT-exclusive net amount, with the maths explained.",
    defaultMode: "remove"
  },
  {
    slug: "exclusive-to-inclusive-vat",
    title: "VAT Exclusive to Inclusive",
    description:
      "Start from a VAT-exclusive net amount and find the VAT-inclusive total.",
    defaultMode: "add"
  }
];

export function getIntentConfig(slug: string | undefined | null) {
  if (!slug) return undefined;
  return intentConfigs.find((intent) => intent.slug === slug);
}


