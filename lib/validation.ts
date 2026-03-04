export function validateRate(rate: number | undefined | null): string | null {
  if (rate === undefined || rate === null || Number.isNaN(rate)) {
    return "Enter a rate between 0% and 100%.";
  }
  if (rate < 0 || rate > 100) {
    return "Rate must be between 0% and 100%.";
  }
  return null;
}

export function validateAmount(
  amount: number | undefined | null
): string | null {
  if (amount === undefined || amount === null || Number.isNaN(amount)) {
    return "Enter an amount of zero or more.";
  }
  if (amount < 0) {
    return "Amount cannot be negative.";
  }
  return null;
}


