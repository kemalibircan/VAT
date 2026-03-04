---
title: "Net vs Gross Price: A Practical Explanation for Beginners"
slug: "net-vs-gross-price-a-practical-explanation-for-beginners"
description: "A beginner-friendly explanation of net vs gross prices, with simple VAT/GST examples and a quick way to check your maths."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "7 min"
canonical: "https://calculatemyvat.com/blog/net-vs-gross-price-a-practical-explanation-for-beginners"
faq:
  - question: "What is net price?"
    answer: "Net is the price before VAT/GST is added (tax-exclusive)."
  - question: "What is gross price?"
    answer: "Gross is the final price after VAT/GST is included (tax-inclusive)."
  - question: "Why do businesses talk about net more than gross?"
    answer: "Because net is often the revenue before tax. Many invoices and accounting systems track net and tax separately."
  - question: "Are the rates shown here official?"
    answer: "No. Any rates shown are examples only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "vat-inclusive-vs-vat-exclusive-whats-the-difference"
  - "how-to-remove-vat-from-a-price-reverse-vat-step-by-step"
---

# Net vs Gross Price: A Practical Explanation for Beginners

If you’ve ever looked at an invoice and wondered why the “total” isn’t the “price”, you’re probably looking at the gap between **net** and **gross**.

This guide explains the difference in plain English, with quick examples and a simple way to calculate it using a VAT/GST calculator.

## Net and gross in plain English

- **Net** (tax-exclusive): the price before VAT/GST.
- **Gross** (tax-inclusive): the price after VAT/GST.

In many VAT/GST systems, businesses calculate in net, then add tax to arrive at gross.

## The simple formulas (add and remove)

If the rate is `r%` (use an example rate for learning; always confirm the correct rate for your case):

- Add tax: `gross = net × (1 + r/100)`
- Remove tax: `net = gross ÷ (1 + r/100)`
- Tax slice: `VAT/GST = gross − net`

## Worked example: net to gross (example rate)

Let’s use an **example** rate of **20%** and a net price of **50.00**:

1. Factor = `1 + 20/100 = 1.20`
2. Gross = `50.00 × 1.20 = 60.00`
3. Tax = `60.00 − 50.00 = 10.00`

So at the example rate, **50.00 net becomes 60.00 gross**, with **10.00 tax**.

## Worked example: gross to net (reverse)

If you start from **60.00 gross** with the same **example** rate:

1. Net = `60.00 ÷ 1.20 = 50.00`
2. Tax = `60.00 − 50.00 = 10.00`

This is the key idea behind reverse VAT: you divide to undo the factor.

## Where you’ll see net vs gross in real life

- **Consumer pricing** often shows gross (“what you pay”).
- **Business invoices** often show net + tax + gross.
- **Marketplaces** may show one view in the UI and another in payouts or statements.

If you’re ever unsure, look for words like “excluding VAT” (net) or “including VAT” (gross).

## Try the calculator

To flip between net and gross instantly:

- General VAT calculator: `/vat-calculator`
- Reverse VAT: `/remove-vat-calculator`
- UK preset example: `/vat-calculator/uk`

## Related guides

- [VAT Inclusive vs VAT Exclusive: What’s the Difference?](/blog/vat-inclusive-vs-vat-exclusive-whats-the-difference)
- [How to Remove VAT From a Price (Reverse VAT) — Step-by-Step](/blog/how-to-remove-vat-from-a-price-reverse-vat-step-by-step)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


