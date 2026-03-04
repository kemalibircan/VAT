---
title: "How to Calculate VAT in Excel (Template + Formula)"
slug: "how-to-calculate-vat-in-excel-template-formula"
description: "Use simple Excel formulas to calculate net, VAT, and gross. Includes a tiny template layout and a worked example."
date: "2026-03-03"
cluster: "use-cases"
readingTime: "10 min"
canonical: "https://example.com/blog/how-to-calculate-vat-in-excel-template-formula"
faq:
  - question: "What Excel formula adds VAT to net?"
    answer: "Gross = Net * (1 + Rate/100). VAT = Gross - Net."
  - question: "What Excel formula removes VAT from gross?"
    answer: "Net = Gross / (1 + Rate/100). VAT = Gross - Net."
  - question: "How do I round to 2 decimals in Excel?"
    answer: "Use ROUND(value, 2). Different rounding choices can change the last cent."
  - question: "Are example rates official?"
    answer: "No. Example rates are illustrative only. Rates can change. Always confirm the correct rate for your case."
relatedSlugs:
  - "vat-calculation-cheat-sheet-printable"
  - "how-to-calculate-vat-for-multiple-items-cart-example"
---

# How to Calculate VAT in Excel (Template + Formula)

Excel is great for VAT checks when you have lots of line items. The key is using the right formula depending on whether you start from **net** (exclusive) or **gross** (inclusive).

This guide gives you a tiny spreadsheet template and formulas you can copy. It is general information, not tax advice. Rates can change—confirm the correct rate for your case.

## A simple Excel layout

Here’s a minimal setup:

- **A**: Item name  
- **B**: Amount (net or gross)  
- **C**: Rate (%)  
- **D**: Net  
- **E**: VAT  
- **F**: Gross

## Add VAT (starting from net)

If **B2** is net and **C2** is rate (%):

- Gross (F2): `=B2*(1+C2/100)`
- VAT (E2): `=F2-B2`
- Net (D2): `=B2`

To round to 2 decimals:

- Gross (F2): `=ROUND(B2*(1+C2/100),2)`
- VAT (E2): `=ROUND(F2-B2,2)`

## Remove VAT (starting from gross)

If **B2** is gross and **C2** is rate (%):

- Net (D2): `=B2/(1+C2/100)`
- VAT (E2): `=B2-D2`
- Gross (F2): `=B2`

Rounded:

- Net (D2): `=ROUND(B2/(1+C2/100),2)`
- VAT (E2): `=ROUND(B2-D2,2)`

## Worked example (illustration only)

Assume an **example** rate of **20%** and net **100.00**:

- Gross = 100.00 × 1.20 = 120.00
- VAT = 120.00 − 100.00 = 20.00

In Excel, with net in B2 and rate in C2, you’d use: `=B2*(1+C2/100)`.

## A note about rounding

If you round each line item’s VAT, your totals can differ slightly compared to rounding only at the end. Match the approach used by your invoice or system if you’re trying to reconcile totals.

## Try the calculator

If you don’t want to build a sheet, use:

- Add VAT: `/add-vat-calculator`
- Reverse VAT: `/remove-vat-calculator`
- UK preset example: `/vat-calculator/uk`

## Related guides

- [VAT Calculation Cheat Sheet (Printable)](/blog/vat-calculation-cheat-sheet-printable)
- [How to Calculate VAT for Multiple Items (Cart Example)](/blog/how-to-calculate-vat-for-multiple-items-cart-example)

## Disclaimer

Rates can change. Always confirm the correct rate for your case.  
Default rate is a convenience preset. You can edit it.


