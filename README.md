# VatSnap – VAT/GST Reverse Calculator + Blog (MVP)

VatSnap is a mobile-first, dark/light, shareable **VAT/GST reverse calculator** with SEO-friendly intent/country landing pages and a markdown-powered blog.

This project intentionally implements **Steps 1–7 only** (no analytics, tracking pixels, or Google Search Console instructions).

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Where to edit country presets (example rates)

- **Country presets** live in `lib/countries.ts`.
- Preset rates are **examples only** and always editable in the UI.

## Where blog posts live

- **Generated title list**: `content/blog/_titles.generated.md`
- **Published posts (markdown)**: `content/blog/*.md`

Each post includes frontmatter (title/slug/description/date/cluster/readingTime/canonical/faq/relatedSlugs). The blog routes are:

- `/blog` (index with search + filters)
- `/blog/[slug]` (post page with TOC, copy-link, schema, related guides)

## Self-review checklist (Steps 1–7)

- **Step 1 (Product)**: 3 modes (Add / Remove / VAT Amount), editable rate, rounding toggle, inline validation, debounced updates, copy buttons with toasts, shareable URLs.
- **Step 2 (Programmatic SEO)**: intent pages + country pages + seeded combination pages.
- **Step 3 (Sitemap structure)**: Home, intent/country pages, Blog index/post, About/Privacy/Terms/Contact.
- **Step 4 (Landing templates)**: each landing includes H1, calculator embed, how-it-works, FAQ, related guides.
- **Step 5 (Blog strategy)**: 60+ generated titles + 30 required published full posts in `/content/blog`.
- **Step 6 (Schema)**: WebApplication on tool pages, FAQPage on pages with FAQs, Article on blog posts.
- **Step 7 (Internal linking)**: tool pages link to guides; posts link back to calculators and relevant country pages; country pages link to region guides.

## Explicitly NOT implemented (Step 8+)

- No analytics
- No tracking pixels
- No Google Search Console setup/instructions
- No scripts that call external tracking endpoints


