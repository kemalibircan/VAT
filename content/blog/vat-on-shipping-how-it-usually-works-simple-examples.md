---
title: "VAT on Shipping: How It Usually Works (Simple Examples)"
slug: "vat-on-shipping-how-it-usually-works-simple-examples"
description: "Shipping can be taxable in some setups. Learn a plain-English way to think about VAT on shipping using simple, worked examples."
date: "2026-03-03"
cluster: "reverse-vat"
readingTime: "7 min"
canonical: "https://calculatemyvat.com/blog/vat-on-shipping-how-it-usually-works-simple-examples"
faq:
  - question: "Is shipping always subject to VAT?"
    answer: "Not always. Treatment can vary by country and situation. This guide is general information—confirm the rules for your case."
  - question: "If shipping has VAT, how do I calculate it?"
    answer: "If the shipping charge is net, VAT = shippingNet × (rate/100). If it’s gross, reverse VAT using net = gross ÷ (1 + rate/100)."
  - question: "Why does VAT on shipping differ from VAT on the goods?"
    answer: "Some invoices may apply different treatments depending on what’s being shipped and where. Always check your invoice breakdown."
  - question: "Are your rates official?"
    answer: "No. Rates in examples are illustrative only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "vat-calculation-examples-for-invoices-net-vat-gross"
  - "vat-on-discounts-should-you-remove-vat-before-or-after-discount"
---

# VAT on Shipping: How It Usually Works (Simple Examples)

Shipping is the sneaky line item that makes totals look “wrong”. The goods might be clear, but then there’s delivery, handling, or “shipping & packing”, and suddenly you’re wondering how VAT applies.

This guide gives you a practical way to think about shipping lines. It’s general information (not tax advice), and rules can vary—so always confirm the correct approach for your case.

## Start with what your invoice shows

Before you calculate anything, look for clues:

- Does the invoice list shipping as a separate line?
- Does it show the VAT rate next to shipping?
- Does it show net, VAT, and gross totals for the whole invoice?

If shipping has its own VAT line, use that as your best indicator of how the invoice treated it.

## Two common ways shipping is presented

### 1) Shipping shown as VAT-exclusive (net)

If the shipping price is net and VAT is added on top:

- `shippingVAT = shippingNet × (rate/100)`
- `shippingGross = shippingNet + shippingVAT`

### 2) Shipping shown as VAT-inclusive (gross)

If shipping is already VAT-inclusive and you want the net:

- `shippingNet = shippingGross ÷ (1 + rate/100)`
- `shippingVAT = shippingGross − shippingNet`

## Worked example: shipping as a gross amount (example rate)

Assume an **example** VAT rate of **20%** and shipping shown as **12.00 gross**.

1. Factor = `1 + 20/100 = 1.20`
2. Net = `12.00 ÷ 1.20 = 10.00`
3. VAT = `12.00 − 10.00 = 2.00`

So in this example, **12.00 gross shipping = 10.00 net + 2.00 VAT**.

## Why you might see odd cents

Shipping can trigger rounding issues, especially when:

- There are multiple VAT rates on the invoice.
- Discounts are applied across the whole cart.
- The system rounds per line item rather than at the total.

If the mismatch is tiny (0.01), it’s usually rounding policy.

## Try the calculator

You can model just the shipping line or the whole invoice using:

- Add VAT: `/add-vat-calculator`
- Reverse VAT: `/remove-vat-calculator`
- UK example preset page: `/vat-calculator/uk`

## Related guides

- [VAT Calculation Examples for Invoices (Net, VAT, Gross)](/blog/vat-calculation-examples-for-invoices-net-vat-gross)
- [VAT on Discounts: Should You Remove VAT Before or After Discount?](/blog/vat-on-discounts-should-you-remove-vat-before-or-after-discount)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


