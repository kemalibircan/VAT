export type VatMode = "add" | "remove" | "amount";

export type VatCalculationInput = {
  amount: number;
  rate: number;
  mode: VatMode;
  rounding: boolean;
};

export type VatCalculationResult = {
  net: number;
  vat: number;
  gross: number;
  explanation: string;
};

export type VatCalculationError = {
  error: string;
};

const round2 = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateVat(
  input: VatCalculationInput
): VatCalculationResult | VatCalculationError {
  const { amount, rate, mode, rounding } = input;

  if (!Number.isFinite(amount) || amount < 0) {
    return { error: "Amount must be zero or higher." };
  }
  if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
    return { error: "Rate must be between 0% and 100%." };
  }

  const factor = 1 + rate / 100;

  if (factor === 0) {
    return { error: "Rate cannot make the factor zero." };
  }

  let net = 0;
  let gross = 0;
  let vat = 0;
  let explanation = "";

  if (mode === "add") {
    net = amount;
    gross = net * factor;
    vat = gross - net;
    explanation = `We multiplied your net amount by (1 + rate/100). Net × (1 + ${rate}/100) = gross.`;
  } else if (mode === "remove") {
    gross = amount;
    net = gross / factor;
    vat = gross - net;
    explanation = `We divided your gross amount by (1 + rate/100). Gross ÷ (1 + ${rate}/100) = net.`;
  } else {
    // VAT amount mode: interpret amount as net for clarity
    net = amount;
    vat = net * (rate / 100);
    gross = net + vat;
    explanation = `We calculated VAT as net × rate/100, then added it to net.`;
  }

  if (rounding) {
    net = round2(net);
    vat = round2(vat);
    gross = round2(gross);
  }

  if (!Number.isFinite(net) || !Number.isFinite(vat) || !Number.isFinite(gross)) {
    return { error: "Something went wrong with the calculation. Please check your inputs." };
  }

  return { net, vat, gross, explanation };
}


