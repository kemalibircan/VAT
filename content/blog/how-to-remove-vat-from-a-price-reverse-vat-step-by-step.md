---
title: "How to Remove VAT From a Price (Reverse VAT) — Step-by-Step"
slug: "how-to-remove-vat-from-a-price-reverse-vat-step-by-step"
description: "Walk through a clear, non-technical method for reversing VAT from a VAT-inclusive price using simple formulas and a calculator."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "8 min"
canonical: "https://example.com/blog/how-to-remove-vat-from-a-price-reverse-vat-step-by-step"
faq:
  - question: "Can I remove VAT by just subtracting a percentage from the price?"
    answer: "No. To reverse VAT you divide the gross by (1 + rate/100). Simply subtracting a percentage gives the wrong answer."
  - question: "Do I need the exact official VAT rate for this to work?"
    answer: "You need a rate to work with, but in examples we use illustration rates only. Always confirm the correct rate with an official source before using numbers in real paperwork."
  - question: "Is this article tax or legal advice?"
    answer: "No. It is general educational information about the maths behind VAT. For decisions, talk to a qualified professional."
  - question: "What if my invoice has multiple VAT rates?"
    answer: "The same reverse-VAT logic applies, but you need to work on each rate band separately. A calculator like VatSnap helps you check the maths line by line."
relatedSlugs:
  - "reverse-vat-formula-explained-with-examples"
  - "net-vs-gross-price-a-practical-explanation-for-beginners"
---

# How to Remove VAT From a Price (Reverse VAT) — Step-by-Step

Removing VAT from a price sounds simple until you try it with a calculator and get a weird result. Many people try to “take 20% off” a VAT-inclusive amount and end up with the wrong net price.

This guide shows, in plain English, how reverse VAT really works. You will see the formula, a worked example with an example rate, and how to double-check your numbers using a calculator like VatSnap.

Throughout, remember: the rates used here are examples only. **Rates can change. Always confirm the correct rate for your case.** Default rate is a convenience preset. You can edit it.

## VAT-inclusive vs VAT-exclusive in one sentence

When a price is **VAT-inclusive**, VAT is already baked into the total. When a price is **VAT-exclusive**, VAT will be added on top.

To reverse VAT you start with a VAT-inclusive price (gross) and want to know the VAT-exclusive price (net) plus the VAT slice.

## The reverse VAT formula

The key idea is that a VAT-inclusive price already contains both net and VAT. If the VAT rate is `r%`, the gross price is:

- **gross = net × (1 + r/100)**

To reverse it, you solve for net:

- **net = gross ÷ (1 + r/100)**
- **VAT amount = gross − net**

Notice that we divide by `(1 + r/100)`. We do **not** simply subtract `r%` from the gross.

## Worked example: reverse VAT at an example 20% rate

Let’s walk through a concrete example to see the difference. We will use an example VAT rate of 20%. This is just for illustration; **always confirm the correct rate for your case.**

Imagine you have a VAT-inclusive invoice total of **£120.00** at an example rate of **20%**:

1. Start with the gross (VAT-inclusive) price:  
   - gross = 120.00
2. Turn the example rate into a factor:  
   - rate = 20 → rate/100 = 0.20  
   - factor = 1 + 0.20 = 1.20
3. Reverse the VAT to find net:  
   - net = gross ÷ factor  
   - net = 120.00 ÷ 1.20 = 100.00
4. Find the VAT slice:  
   - VAT amount = gross − net  
   - VAT amount = 120.00 − 100.00 = 20.00

So at an example rate of 20%, **£120.00 gross breaks down into £100.00 net + £20.00 VAT**.

If you had incorrectly “taken 20% off” the 120.00 (i.e. calculated 120.00 × 0.8), you would also get 96.00, which is not the correct net.

## Using a reverse VAT calculator instead of doing it by hand

Doing the division by hand is fine for one or two numbers. When you are checking dozens of receipts, a calculator is faster and less error‑prone.

With a reverse VAT mode, you usually:

1. Choose the **Remove VAT** or **Reverse VAT** tab.
2. Enter the VAT-inclusive amount (gross).
3. Pick a country preset with an example rate, or type your own rate.
4. See net, VAT, and gross update instantly.

If you use the **VatSnap** calculator, you will also see a short explanation under the results that reminds you we used the reverse formula gross ÷ (1 + rate/100).

## Rounding and why your number might be off by a cent

Real‑world invoices often round line items and totals to 2 decimals, which can make your manual checks feel off by a cent or two.

Common rounding situations include:

- Each line is rounded, and the totals are just the sum of those rounded lines.
- The calculator rounds the final total only.
- Some systems use “bankers rounding”; others use the more common “round half up.”

When you compare VatSnap against an invoice:

- Try toggling the **“Rounding: 2 decimals”** option.
- If the difference is just one cent, it is likely a rounding style difference, not a maths error.

## When reverse VAT is especially useful

Reverse VAT comes up all the time in practice:

- Checking whether a receipt used the example rate you expected.
- Comparing net prices from different suppliers who only show gross.
- Working backwards from a client’s “VAT-inclusive budget” to see your net amount.

Being comfortable with `net = gross ÷ (1 + rate/100)` makes all of these feel far less mysterious.

## Try the calculator

Ready to try this with your own numbers? Open one of these calculators in a new tab:

- Use the dedicated **Remove VAT** tool: `/remove-vat-calculator`
- If you are working with UK-style VAT examples, start with: `/vat-calculator/uk`

You can type any amount and example rate you like. Remember to confirm the correct rate for your real‑world case.

## Related guides

If you want to keep building intuition, these guides pair nicely with this one:

- [VAT Inclusive vs VAT Exclusive: What’s the Difference?](/blog/vat-inclusive-vs-vat-exclusive-whats-the-difference)
- [Net vs Gross Price: A Practical Explanation for Beginners](/blog/net-vs-gross-price-a-practical-explanation-for-beginners)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


