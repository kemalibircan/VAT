---
title: "VAT on Discounts: Should You Remove VAT Before or After Discount?"
slug: "vat-on-discounts-should-you-remove-vat-before-or-after-discount"
description: "Discounts can make VAT feel confusing. Learn a simple way to think about net, VAT, and gross when a discount is involved."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "8 min"
canonical: "https://calculatemyvat.com/blog/vat-on-discounts-should-you-remove-vat-before-or-after-discount"
faq:
  - question: "Do discounts reduce VAT too?"
    answer: "Often, yes: if the taxable base is reduced, the VAT amount typically reduces as well. Exact rules can vary, so confirm for your case."
  - question: "Should I calculate VAT on the pre-discount price?"
    answer: "For most practical checks, calculate VAT based on the price that was actually charged. The invoice or receipt should show what happened."
  - question: "Why do my discount VAT numbers not match exactly?"
    answer: "Rounding and line-level vs total-level calculations can create small differences."
  - question: "Are the rates in your examples official?"
    answer: "No. Rates used in examples are illustrative only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "vat-calculation-examples-for-invoices-net-vat-gross"
  - "why-your-vat-removal-looks-wrong-rounding-common-errors"
---

# VAT on Discounts: Should You Remove VAT Before or After Discount?

Discounts are where people start second-guessing VAT. You see a price drop, then the VAT amount changes, then the totals don’t match what you expected.

This guide gives you a **practical mental model**: treat the discount as changing the price that VAT is applied to, then calculate net/VAT/gross consistently from that point.

This is general information, not tax advice. Rates can change. Default rate is a convenience preset. You can edit it.

## The simple way to think about it

In most day-to-day checks, you want VAT on the amount that was actually charged (after discount). That means:

1. Work out the discounted gross or discounted net (depending on what you have).
2. Then add/remove VAT using the usual formulas.

If your document shows the breakdown, use it as your ground truth.

## Two common discount setups

### 1) Discount applied to a VAT-exclusive (net) price

If you discount the net price first, then VAT is calculated on the discounted net:

- discountedNet = net − discount
- VAT = discountedNet × (rate/100)
- gross = discountedNet + VAT

### 2) Discount applied to a VAT-inclusive (gross) price

If you discount the gross price, reverse VAT from the discounted gross:

- net = discountedGross ÷ (1 + rate/100)
- VAT = discountedGross − net

## Worked example: discount on a VAT-inclusive price (example rate)

Assume an **example** VAT rate of **20%** and a VAT-inclusive price of **120.00**.
A discount of **10.00** is applied at checkout, so the discounted gross is **110.00**.

1. Factor = `1 + 20/100 = 1.20`
2. Net = `110.00 ÷ 1.20 = 91.666...` → 91.67 (if rounding to 2 decimals)
3. VAT = `110.00 − 91.67 = 18.33`

So at the example rate, **110.00 gross ≈ 91.67 net + 18.33 VAT** (rounded).

If your receipt shows slightly different cents, it’s usually because the discount was applied per line item or because of rounding policy differences.

## Why your totals might be “off”

- Discounts may be split across multiple items (line-level discounting).
- VAT may be calculated per line then rounded.
- Different items might use different rates.

If you only see a 0.01 difference, treat it as rounding unless there’s evidence of a bigger mismatch.

## Try the calculator

You can model discount scenarios quickly with a calculator:

- Reverse VAT from discounted totals: `/remove-vat-calculator`
- UK example preset page: `/vat-calculator/uk`

## Related guides

- [VAT Calculation Examples for Invoices (Net, VAT, Gross)](/blog/vat-calculation-examples-for-invoices-net-vat-gross)
- [Why Your VAT Removal Looks Wrong: Rounding & Common Errors](/blog/why-your-vat-removal-looks-wrong-rounding-common-errors)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


