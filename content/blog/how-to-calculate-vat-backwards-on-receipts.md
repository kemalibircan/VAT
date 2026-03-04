---
title: "How to Calculate VAT Backwards on Receipts"
slug: "how-to-calculate-vat-backwards-on-receipts"
description: "A practical method for reversing VAT from receipt totals, including a worked example and common receipt quirks."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "7 min"
canonical: "https://calculatemyvat.com/blog/how-to-calculate-vat-backwards-on-receipts"
faq:
  - question: "What number on a receipt should I use as the gross amount?"
    answer: "Use the VAT-inclusive total for the relevant line or the subtotal that includes VAT. Receipts vary, so check the labels."
  - question: "What if the receipt shows VAT already?"
    answer: "If VAT is shown, you can use it as a cross-check. Reverse VAT is still useful when VAT isn’t shown or you suspect rounding differences."
  - question: "Can I reverse VAT if the receipt has multiple VAT rates?"
    answer: "Yes, but you should reverse each rate band separately if the receipt splits them. A single reverse calculation assumes one rate."
  - question: "Are the example rates here official?"
    answer: "No. Any rates used are examples only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "reverse-vat-formula-explained-with-examples"
  - "why-your-vat-removal-looks-wrong-rounding-common-errors"
---

# How to Calculate VAT Backwards on Receipts

Receipts are great at telling you what you paid… and not-so-great at telling you how the number was built.

If you need to work out the net and VAT parts from a VAT-inclusive total, you’re doing **reverse VAT**: you start from gross and work backwards to net.

This is general information, not tax advice. Rates can change. Default rate is a convenience preset. You can edit it.

## Step 1: confirm what your receipt total represents

Receipts typically include VAT already, but the wording varies:

- “Total” is usually **gross** (VAT-inclusive).
- “Subtotal” might be net or gross depending on the store.
- Some receipts include tips or donations that may be treated differently.

If in doubt, use the number that you actually paid for the item(s) that are VAT-rated.

## Step 2: use the reverse VAT formula

If the VAT rate is `r%`:

- `net = gross ÷ (1 + r/100)`
- `VAT = gross − net`

The key is dividing by the factor. You don’t subtract the rate like a discount.

## Worked example: reverse VAT from a receipt total (example rate)

Let’s use an **example** VAT rate of **20%** and a receipt total of **24.00**.
This rate is for illustration only—**always confirm the correct rate for your case**.

1. Factor = `1 + 20/100 = 1.20`
2. Net = `24.00 ÷ 1.20 = 20.00`
3. VAT = `24.00 − 20.00 = 4.00`

So at an example 20% rate, **24.00 gross = 20.00 net + 4.00 VAT**.

## Receipt quirks that can affect your result

- **Rounding**: some receipts round line items; others round the final total.
- **Mixed rates**: if a receipt contains items taxed at different rates, a single reverse calculation won’t match perfectly.
- **Discounts**: if discounts were applied, the VAT slice might be calculated on discounted values.

If you’re off by 0.01–0.02, it’s usually rounding, not a wrong formula.

## Try the calculator

Use a reverse VAT calculator to double-check receipts quickly:

- Reverse VAT: `/remove-vat-calculator`
- UK example preset page: `/vat-calculator/uk`

## Related guides

- [Reverse VAT Formula Explained (With Examples)](/blog/reverse-vat-formula-explained-with-examples)
- [Why Your VAT Removal Looks Wrong: Rounding & Common Errors](/blog/why-your-vat-removal-looks-wrong-rounding-common-errors)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


