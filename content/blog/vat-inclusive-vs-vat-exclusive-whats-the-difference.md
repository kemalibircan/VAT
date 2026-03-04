---
title: "VAT Inclusive vs VAT Exclusive: What’s the Difference?"
slug: "vat-inclusive-vs-vat-exclusive-whats-the-difference"
description: "Learn what VAT-inclusive and VAT-exclusive prices really mean, and how to jump between them using simple formulas."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "7 min"
canonical: "https://calculatemyvat.com/blog/vat-inclusive-vs-vat-exclusive-whats-the-difference"
faq:
  - question: "What does VAT-inclusive actually mean on a price tag?"
    answer: "VAT-inclusive means the tax is already baked into the number you see. When you pay, you pay exactly that amount."
  - question: "What is a VAT-exclusive price?"
    answer: "VAT-exclusive means the number shown does not include VAT yet. Tax will be added on top using the relevant percentage."
  - question: "Can the same item be shown in both inclusive and exclusive formats?"
    answer: "Yes. For example, a B2B price list might show net (exclusive) amounts, while a consumer-facing page shows gross (inclusive) prices."
  - question: "Are the example VAT rates in this article official?"
    answer: "No. Any rates mentioned here are examples only. Rates can change, so always confirm the correct rate from an official source."
relatedSlugs:
  - "how-to-remove-vat-from-a-price-reverse-vat-step-by-step"
  - "reverse-vat-formula-explained-with-examples"
---

# VAT Inclusive vs VAT Exclusive: What’s the Difference?

VAT-inclusive vs VAT-exclusive pricing is one of those phrases that sounds formal but means something very simple. It just says whether tax is already included in the price or still needs to be added.

Understanding the difference helps you read invoices more confidently, compare quotes, and avoid mixing up net and gross amounts when you use a calculator.

## One idea, two labels

- **VAT-exclusive (net)**: the price before VAT is added.  
- **VAT-inclusive (gross)**: the price after VAT is added.

That is it. Every price in a VAT system lives in one of these two worlds.

## The formulas behind the labels

Imagine an example VAT rate of 20%. This is just an example; **rates can change, so always confirm the correct rate for your case.**

If `net` is the VAT-exclusive price and `gross` is the VAT-inclusive price, then:

- **Add VAT (exclusive → inclusive)**  
  `gross = net × (1 + rate/100)`  
  For example, with rate = 20: `gross = net × 1.20`.

- **Remove VAT (inclusive → exclusive)**  
  `net = gross ÷ (1 + rate/100)`  
  For example, with rate = 20: `net = gross ÷ 1.20`.

## Example: from net to gross at an example 20% rate

Let’s say your net price is **£50.00** and the example rate is **20%**:

1. Turn 20% into a factor: `1 + 20/100 = 1.20`.
2. Multiply: `gross = 50.00 × 1.20 = 60.00`.
3. The VAT slice is `60.00 − 50.00 = 10.00`.

So in this example, **£50.00 net becomes £60.00 gross**, with **£10.00 VAT**.

## Example: from gross to net at the same example rate

Now imagine you only know the VAT-inclusive price: **£60.00** at an example 20% rate.

1. Use the same factor: `1 + 20/100 = 1.20`.
2. Divide to remove VAT: `net = 60.00 ÷ 1.20 = 50.00`.
3. VAT is again `60.00 − 50.00 = 10.00`.

This is why subtracting “20% off” the gross does not work—you must divide, not discount.

## Why businesses care about both views

Different people look at different sides of the same number:

- Customers often think in **VAT-inclusive** prices (“What will I pay?”).
- Many businesses plan in **VAT-exclusive** numbers (“What is my revenue before tax?”).
- Accountants and bookkeepers juggle both all the time.

A calculator that shows net, VAT, and gross together helps everyone stay on the same page.

## Try the calculator

To switch between VAT-inclusive and VAT-exclusive pricing without doing the maths in your head, try:

- The general **VAT calculator**: `/vat-calculator`
- A UK-flavoured example: `/vat-calculator/uk`

You can type any price and rate, then copy the net, VAT, or gross numbers straight into your invoice.

## Related guides

You may also like:

- [Net vs Gross Price: A Practical Explanation for Beginners](/blog/net-vs-gross-price-a-practical-explanation-for-beginners)
- [Reverse VAT Formula Explained (With Examples)](/blog/reverse-vat-formula-explained-with-examples)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


