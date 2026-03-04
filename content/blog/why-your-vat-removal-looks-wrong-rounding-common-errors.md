---
title: "Why Your VAT Removal Looks Wrong: Rounding & Common Errors"
slug: "why-your-vat-removal-looks-wrong-rounding-common-errors"
description: "If your reverse VAT calculation doesn’t match the receipt, it’s usually rounding or a common formula mistake. Here’s how to debug it."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "8 min"
canonical: "https://example.com/blog/why-your-vat-removal-looks-wrong-rounding-common-errors"
faq:
  - question: "Why does my calculator differ from my receipt by 0.01?"
    answer: "Often it’s rounding: some systems round line items, others round totals. Both can be valid depending on the context."
  - question: "What is the most common reverse VAT mistake?"
    answer: "Subtracting the VAT rate like a discount. Reverse VAT requires dividing by (1 + rate/100)."
  - question: "Do currencies and decimals matter?"
    answer: "Yes. A currency with 2 decimal places will force rounding decisions that can change the last cent."
  - question: "Should I always round net and VAT separately?"
    answer: "Not always. Many systems calculate in high precision and only round for display or for invoice lines. Match the rounding approach used by your source document."
relatedSlugs:
  - "reverse-vat-formula-explained-with-examples"
  - "vat-calculation-examples-for-invoices-net-vat-gross"
---

# Why Your VAT Removal Looks Wrong: Rounding & Common Errors

You remove VAT from a gross price, but your result doesn’t match the receipt. Annoying, right?

Most of the time, the maths is fine—the difference comes from **rounding choices** or a simple formula mistake (usually “subtracting 20%” instead of dividing).

This is general information, not tax advice. Rates can change. Default rate is a convenience preset. You can edit it.

## Common mistake #1: subtracting the rate like a discount

Reverse VAT is not a discount. If the VAT rate is `r%`, the correct reverse formula is:

- `net = gross ÷ (1 + r/100)`

If you instead do `gross × (1 − r/100)`, you’ll get the wrong net amount.

## Common mistake #2: mixing up net and gross inputs

Make sure you know what number you’re starting with:

- **Add VAT mode** expects **net** as the input amount.
- **Remove VAT mode** expects **gross** as the input amount.

If you put a gross amount into Add VAT mode, you’ll accidentally add VAT twice.

## Rounding: the quiet troublemaker

Two perfectly reasonable systems can disagree by 0.01 because they round at different times.

Typical patterns:

- **Round each line**: calculate VAT per line item and round each VAT amount.
- **Round the total**: calculate totals in higher precision, then round once at the end.

### Worked example: why line vs total rounding differs

Assume an **example** VAT rate of **20%** (illustration only) and two net items:

- Item A net: 0.99 → VAT = 0.99 × 0.20 = 0.198 → rounds to 0.20
- Item B net: 0.99 → VAT = 0.198 → rounds to 0.20

Line-by-line VAT total = 0.20 + 0.20 = 0.40

But if you total first:

1. Total net = 0.99 + 0.99 = 1.98
2. VAT = 1.98 × 0.20 = 0.396 → rounds to 0.40

In this example it still matches. With other values, you can land on 0.39 vs 0.40. That’s not “wrong”—it’s a rounding policy difference.

## How to debug a mismatch (fast)

1. Confirm the rate you used is correct for your case (examples can mislead).
2. Check you’re using the right direction (add vs remove).
3. Try the calculator’s rounding toggle (“Rounding: 2 decimals”).
4. If it’s still off by a lot, re-check whether your source price is inclusive or exclusive.

## Try the calculator

Use VatSnap to compare both directions quickly:

- Reverse VAT: `/remove-vat-calculator`
- VAT inclusive to exclusive: `/vat-inclusive-to-exclusive`
- UK preset example: `/vat-calculator/uk`

## Related guides

- [Reverse VAT Formula Explained (With Examples)](/blog/reverse-vat-formula-explained-with-examples)
- [VAT Calculation Examples for Invoices (Net, VAT, Gross)](/blog/vat-calculation-examples-for-invoices-net-vat-gross)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


