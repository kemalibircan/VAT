---
title: "How to Add VAT to a Net Price (Quick Guide)"
slug: "how-to-add-vat-to-a-net-price-quick-guide"
description: "A quick, practical guide to adding VAT to a net price, with a worked example and copy-ready results."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "6 min"
canonical: "https://calculatemyvat.com/blog/how-to-add-vat-to-a-net-price-quick-guide"
faq:
  - question: "What is the formula to add VAT?"
    answer: "Gross = Net × (1 + rate/100). VAT amount = Gross − Net."
  - question: "Can I just calculate VAT as net × rate?"
    answer: "You can calculate VAT as Net × (rate/100). Then add it to net to get gross."
  - question: "What if the VAT rate is 0%?"
    answer: "Then gross equals net and VAT is 0."
  - question: "Are rates in examples official?"
    answer: "No. Rates shown in examples are for illustration only. Rates can change, so always confirm the correct rate for your case."
relatedSlugs:
  - "vat-calculation-examples-for-invoices-net-vat-gross"
  - "vat-inclusive-vs-vat-exclusive-whats-the-difference"
---

# How to Add VAT to a Net Price (Quick Guide)

You have a net (VAT-exclusive) amount and want the VAT-inclusive total. This is the “add VAT” use case—common for quotes, invoices, and pricing checks.

This guide shows the formula, a worked example (with an example rate), and a simple way to copy the net, VAT, and gross breakdown.

## The add VAT formula

If the VAT rate is `r%`:

- `gross = net × (1 + r/100)`
- `VAT = gross − net`  
  (equivalently `VAT = net × (r/100)`)

## Worked example: add VAT at an example 20% rate

We will use an example 20% rate for illustration only. **Rates can change. Always confirm the correct rate for your case.**

Say your net price is **100.00**:

1. Convert rate to a factor:  
   `factor = 1 + 20/100 = 1.20`
2. Multiply to get gross:  
   `gross = 100.00 × 1.20 = 120.00`
3. VAT slice:  
   `VAT = 120.00 − 100.00 = 20.00`

Result: **Net 100.00 + VAT 20.00 = Gross 120.00** (with the example rate).

## Quick checklist for invoices

When adding VAT, sanity-check these things:

- Your invoice shows **net**, **VAT**, and **gross** clearly.
- The VAT amount matches `net × (rate/100)` (with your chosen rounding rule).
- If your totals differ by 0.01, it’s usually rounding, not a totally wrong formula.

## Try the calculator

To add VAT with live results and copy buttons:

- Add VAT intent page: `/add-vat-calculator`
- UK example preset page: `/vat-calculator/uk`

## Related guides

- [VAT Calculation Examples for Invoices (Net, VAT, Gross)](/blog/vat-calculation-examples-for-invoices-net-vat-gross)
- [VAT Inclusive vs VAT Exclusive: What’s the Difference?](/blog/vat-inclusive-vs-vat-exclusive-whats-the-difference)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


