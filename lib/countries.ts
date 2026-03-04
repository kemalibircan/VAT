export type CountryType = "vat" | "gst";

export type CountryPreset = {
  slug: string;
  name: string;
  type: CountryType;
  exampleDefaultRate: number;
  notes: string;
};

export const countryPresets: CountryPreset[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    type: "vat",
    exampleDefaultRate: 20,
    notes:
      "This is an example VAT rate only. Rates can change. Always confirm the correct rate for your case. Default rate is a convenience preset. You can edit it."
  },
  {
    slug: "germany",
    name: "Germany",
    type: "vat",
    exampleDefaultRate: 19,
    notes:
      "Example German VAT rate. Not tax advice. Please confirm the current rate with an official source."
  },
  {
    slug: "france",
    name: "France",
    type: "vat",
    exampleDefaultRate: 20,
    notes:
      "Example French VAT rate. Always double-check actual rates before using numbers in real documents."
  },
  {
    slug: "spain",
    name: "Spain",
    type: "vat",
    exampleDefaultRate: 21,
    notes:
      "Example Spanish VAT rate. Rates can change and may differ for some goods or services."
  },
  {
    slug: "italy",
    name: "Italy",
    type: "vat",
    exampleDefaultRate: 22,
    notes:
      "Example Italian VAT rate for illustration only. Confirm the correct rate for your scenario."
  },
  {
    slug: "ireland",
    name: "Ireland",
    type: "vat",
    exampleDefaultRate: 23,
    notes:
      "Example Irish VAT rate. Different goods can use different rates, so always check official guidance."
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    type: "vat",
    exampleDefaultRate: 21,
    notes:
      "Example Dutch VAT rate. Use it as a starting point only and verify against an official source."
  },
  {
    slug: "australia",
    name: "Australia",
    type: "gst",
    exampleDefaultRate: 10,
    notes:
      "Example Australian GST rate. This is general information, not tax advice. Confirm the rate before relying on it."
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    type: "gst",
    exampleDefaultRate: 15,
    notes:
      "Example New Zealand GST rate. Always confirm with a current, official source."
  }
];

export function getCountryPreset(slug: string | undefined | null) {
  if (!slug) return undefined;
  return countryPresets.find((c) => c.slug === slug);
}


