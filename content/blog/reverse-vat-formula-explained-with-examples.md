---
title: "Reverse VAT Formula Explained (With Examples)"
slug: "reverse-vat-formula-explained-with-examples"
description: "Understand the reverse VAT formula in plain English, including why dividing (not subtracting) is the key to removing VAT correctly."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "7 min"
canonical: "https://calculatemyvat.com/blog/reverse-vat-formula-explained-with-examples"
faq:
  - question: "What is the reverse VAT formula?"
    answer: "Net = Gross ÷ (1 + rate/100). Then VAT = Gross − Net."
  - question: "Why do I divide instead of subtracting the rate?"
    answer: "Because VAT was added as a multiplier. To undo a multiplier, you divide by the same factor."
  - question: "Does this work for 0% VAT?"
    answer: "Yes. If the rate is 0%, net equals gross and VAT is 0."
  - question: "Is the VAT rate in examples official?"
    answer: "No. Any rates shown in examples are for illustration only. Rates can change, so always confirm the correct rate for your case."
relatedSlugs:
  - "how-to-remove-vat-from-a-price-reverse-vat-step-by-step"
  - "why-your-vat-removal-looks-wrong-rounding-common-errors"
---

# Reverse VAT Formula Explained (With Examples)

Reverse VAT (also called “removing VAT” or “calculating VAT backwards”) is just undoing a percentage that was added to a net price.

The good news: the maths is simple. The tricky part is **remembering you divide**—you don’t take a percentage off like a discount.

This is general information, not tax advice. Rates can change. **Default rate is a convenience preset. You can edit it.**

## The forward formula (adding VAT)

If a net price is `net` and the VAT rate is `r%`, then VAT is added like this:

- `gross = net × (1 + r/100)`

That `(1 + r/100)` piece is the “VAT factor”. At an example 20% rate, the factor is `1.20`.

## The reverse formula (removing VAT)

To remove VAT, you undo the multiplication by dividing by the same factor:

- `net = gross ÷ (1 + r/100)`
- `VAT = gross − net`

That’s the whole trick.

## Worked example: gross to net using an example rate

Let’s use an example rate of **20%** (for illustration only; always confirm the correct rate for your case).

You have a VAT-inclusive price (gross) of **120.00**:

1. Convert rate to factor:  
   `factor = 1 + 20/100 = 1.20`
2. Remove VAT:  
   `net = 120.00 ÷ 1.20 = 100.00`
3. Find the VAT slice:  
   `VAT = 120.00 − 100.00 = 20.00`

So **120.00 gross = 100.00 net + 20.00 VAT** at the example 20% rate.

## Why “take 20% off” is wrong (quick sanity check)

If you tried `120.00 × (1 − 0.20)`, you’d get `96.00`. That would imply VAT is `24.00`, which is not how VAT is applied here.

VAT is added as a multiplier to net, so removing it must undo that multiplier.

## Handling 0% and edge cases

- **Rate = 0%**:  
  Factor = 1. Net = Gross. VAT = 0. No surprises.
- **Amount = 0**:  
  Everything stays 0.
- **Rounding**:  
  Two systems can disagree by 0.01 depending on whether they round line items or totals. That’s normal—see the rounding guide below.

## Try the calculator

Use the calculator to plug in your own numbers and share a clean link:

- Reverse VAT: `/remove-vat-calculator`
- UK example preset page: `/vat-calculator/uk`

## Related guides

- [How to Remove VAT From a Price (Reverse VAT) — Step-by-Step](/blog/how-to-remove-vat-from-a-price-reverse-vat-step-by-step)
- [Why Your VAT Removal Looks Wrong: Rounding & Common Errors](/blog/why-your-vat-removal-looks-wrong-rounding-common-errors)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


