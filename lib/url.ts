export type CalculatorQueryState = {
  mode?: string;
  amount?: string;
  rate?: string;
  country?: string;
  rounding?: string;
};

export function parseCalculatorQuery(
  searchParams: URLSearchParams
): CalculatorQueryState {
  return {
    mode: searchParams.get("mode") ?? undefined,
    amount: searchParams.get("amount") ?? undefined,
    rate: searchParams.get("rate") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    rounding: searchParams.get("rounding") ?? undefined
  };
}

export function buildCalculatorQuery(state: CalculatorQueryState): string {
  const params = new URLSearchParams();
  if (state.mode) params.set("mode", state.mode);
  if (state.amount) params.set("amount", state.amount);
  if (state.rate) params.set("rate", state.rate);
  if (state.country) params.set("country", state.country);
  if (state.rounding) params.set("rounding", state.rounding);
  const query = params.toString();
  return query ? `?${query}` : "";
}


