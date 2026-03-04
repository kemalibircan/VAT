---
title: "VAT Calculation Cheat Sheet (Printable)"
slug: "vat-calculation-cheat-sheet-printable"
description: "A simple VAT cheat sheet: formulas for add/remove VAT, quick examples, and a checklist you can copy into notes or print."
date: "2026-03-03"
cluster: "use-cases"
readingTime: "8 min"
canonical: "https://calculatemyvat.com/blog/vat-calculation-cheat-sheet-printable"
faq:
  - question: "What’s the fastest way to calculate VAT?"
    answer: "Use the formulas: gross = net × (1 + rate/100), and net = gross ÷ (1 + rate/100). A calculator helps you avoid mistakes."
  - question: "Can I remove VAT by subtracting the rate?"
    answer: "No. Reverse VAT requires dividing by (1 + rate/100)."
  - question: "What causes 0.01 differences?"
    answer: "Rounding policies (per-line vs total) are a common cause."
  - question: "Are the rates in examples official?"
    answer: "No. Example rates are illustrative only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "reverse-vat-formula-explained-with-examples"
  - "why-your-vat-removal-looks-wrong-rounding-common-errors"
---

# VAT Calculation Cheat Sheet (Printable)

If you want the “just give me the formulas” version, this cheat sheet is for you. Copy it into your notes, paste it into a doc, or print it.

This is general information, not tax advice. Rates can change—always confirm the correct rate for your case. Default rate is a convenience preset. You can edit it.

## The core formulas

Let `r` be the VAT rate as a percent.

### Add VAT (net → gross)

- `gross = net × (1 + r/100)`
- `VAT = gross − net`  
  (or `VAT = net × (r/100)`)

### Remove VAT (gross → net / reverse VAT)

- `net = gross ÷ (1 + r/100)`
- `VAT = gross − net`

## Quick worked example (illustration only)

Assume an **example** rate of **20%** and net **100.00**:

1. Factor = 1 + 20/100 = 1.20
2. Gross = 100.00 × 1.20 = 120.00
3. VAT = 20.00

Reverse direction from 120.00 gross:

- Net = 120.00 ÷ 1.20 = 100.00
- VAT = 120.00 − 100.00 = 20.00

## Common “don’t fall into this hole” list

- Don’t subtract the VAT rate from gross like a discount.
- Don’t add VAT twice (make sure you know whether your starting price is net or gross).
- Expect tiny rounding differences if your invoice rounds per line item.

## Mini checklist for invoices and receipts

When checking a document:

1. Identify whether the amounts are **inclusive (gross)** or **exclusive (net)**.
2. Confirm the **rate** you should use (examples aren’t official).
3. Use the correct direction:
   - net → gross = add VAT
   - gross → net = remove VAT
4. If you’re off by 0.01, check rounding.

## Try the calculator

Use VatSnap for fast checks and copy-ready values:

- VAT calculator: `/vat-calculator`
- Reverse VAT: `/remove-vat-calculator`
- UK preset example: `/vat-calculator/uk`

## Related guides

- [Reverse VAT Formula Explained (With Examples)](/blog/reverse-vat-formula-explained-with-examples)
- [Why Your VAT Removal Looks Wrong: Rounding & Common Errors](/blog/why-your-vat-removal-looks-wrong-rounding-common-errors)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


