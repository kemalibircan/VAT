"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "@/components/tabs";
import { useToast } from "@/components/toast-provider";
import {
  calculateVat,
  VatMode,
  VatCalculationResult
} from "@/lib/vat";
import { validateAmount, validateRate } from "@/lib/validation";
import { countryPresets, getCountryPreset } from "@/lib/countries";
import { buildCalculatorQuery, parseCalculatorQuery } from "@/lib/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const didYouKnowByMode: Record<VatMode, string[]> = {
  add: [
    "Did you know? Many invoices show net, VAT, and gross so everyone can see exactly how the tax was added.",
    "Fun fact: You can treat VAT like a percentage markup on top of your net price.",
    "Tip: When pricing, decide whether you want to think in net or gross first, then let the calculator handle the rest."
  ],
  remove: [
    "Did you know? You can’t remove VAT by just subtracting a percentage from the gross price—you need to divide.",
    "Hint: Reverse VAT is basically undoing a percentage increase, not applying a discount.",
    "Fun fact: Reverse-calculating VAT is a common task for checking receipts and invoices."
  ],
  amount: [
    "Did you know? The VAT amount is just the slice of the price that represents tax.",
    "Tip: Keeping an eye on the VAT amount helps you understand how much tax you’re really paying.",
    "Fun fact: Once you know the VAT amount, it’s easy to jump between net and gross."
  ]
};

type VatCalculatorProps = {
  initialMode?: VatMode;
  initialAmount?: number;
  initialRate?: number;
  initialCountrySlug?: string;
  initialRounding?: boolean;
  intentSlug?: string;
  onCountryChange?: (slug: string | undefined) => void;
};

export function VatCalculator({
  initialMode = "add",
  initialAmount,
  initialRate,
  initialCountrySlug,
  initialRounding = true,
  onCountryChange
}: VatCalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const queryState = useMemo(
    () => parseCalculatorQuery(searchParams),
    [searchParams]
  );

  const [mode, setMode] = useState<VatMode>(
    (queryState.mode as VatMode) || initialMode
  );
  const [amount, setAmount] = useState<string>(
    queryState.amount ??
      (typeof initialAmount === "number" ? String(initialAmount) : "")
  );
  const [rate, setRate] = useState<string>(
    queryState.rate ??
      (typeof initialRate === "number" ? String(initialRate) : "")
  );
  const [rounding, setRounding] = useState<boolean>(
    queryState.rounding
      ? queryState.rounding === "true"
      : initialRounding ?? true
  );
  const [countrySlug, setCountrySlug] = useState<string | undefined>(
    queryState.country ?? initialCountrySlug
  );

  const [result, setResult] = useState<VatCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [didYouKnowIndex, setDidYouKnowIndex] = useState(0);

  const country = getCountryPreset(countrySlug);

  useEffect(() => {
    if (!rate && country) {
      setRate(String(country.exampleDefaultRate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countrySlug]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const parsedAmount = amount === "" ? NaN : Number(amount);
      const parsedRate = rate === "" ? NaN : Number(rate);

      const amountError = validateAmount(
        amount === "" ? undefined : parsedAmount
      );
      const rateError = validateRate(rate === "" ? undefined : parsedRate);

      if (amount === "" && rate === "") {
        setResult(null);
        setError(null);
        return;
      }

      if (amountError || rateError) {
        setResult(null);
        setError(amountError || rateError);
        return;
      }

      const calc = calculateVat({
        amount: parsedAmount,
        rate: parsedRate,
        mode,
        rounding
      });

      if ("error" in calc) {
        setResult(null);
        setError(calc.error);
      } else {
        setResult(calc);
        setError(null);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [amount, rate, mode, rounding]);

  useEffect(() => {
    const query = buildCalculatorQuery({
      mode,
      amount: amount || undefined,
      rate: rate || undefined,
      country: countrySlug || undefined,
      rounding: String(rounding)
    });
    router.replace(`${pathname}${query}`, { scroll: false });
  }, [amount, rate, mode, countrySlug, rounding, pathname, router]);

  useEffect(() => {
    const options = didYouKnowByMode[mode];
    const nextIndex = Math.floor(Math.random() * options.length);
    setDidYouKnowIndex(nextIndex);
  }, [mode, result?.net, result?.gross, result?.vat]);

  const handleCopy = (label: string, value: number | undefined) => {
    if (value === undefined || !Number.isFinite(value)) return;
    navigator.clipboard.writeText(String(value));
    showToast(`Copied ${label} amount.`);
  };

  const handleShare = () => {
    const query = buildCalculatorQuery({
      mode,
      amount: amount || undefined,
      rate: rate || undefined,
      country: countrySlug || undefined,
      rounding: String(rounding)
    });
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${pathname}${query}`
        : `${pathname}${query}`;
    navigator.clipboard.writeText(url);
    showToast("Copied shareable link to your calculation.");
  };

  return (
    <section
      aria-label="VAT and GST calculator"
      className="space-y-4 rounded-2xl border borderSubtle bg-surfaceElevated/95 p-5 shadow-md backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60 md:p-6"
    >
      <div className="space-y-3">
        <Tabs<VatMode>
          ariaLabel="Choose VAT mode"
          options={[
            {
              value: "add",
              label: "Add VAT",
              description: "Start from a net price and add VAT on top."
            },
            {
              value: "remove",
              label: "Remove VAT (reverse)",
              description: "Start from a VAT-inclusive price and go back to net."
            },
            {
              value: "amount",
              label: "VAT amount",
              description: "See just the VAT slice, plus net and gross."
            }
          ]}
          value={mode}
          onChange={setMode}
        />
        <p className="text-xs text-muted">
          This is general information, not tax advice. Rates can change. Default
          rate is a convenience preset. You can edit it.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Amount
              <span className="ml-1 text-xs font-normal text-muted">
                {mode === "remove"
                  ? "(gross / VAT inclusive)"
                  : "(net / VAT exclusive)"}
              </span>
            </label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:bg-slate-950/60 dark:placeholder:text-slate-500"
              placeholder="e.g. 100.00"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Country preset</label>
              <select
                value={countrySlug ?? ""}
                onChange={(e) => {
                  const next = e.target.value || undefined;
                  setCountrySlug(next);
                  onCountryChange?.(next);
                }}
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground dark:border-slate-700 dark:bg-slate-950/60"
              >
                <option value="">No preset (manual rate)</option>
                {countryPresets.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              {country && (
                <p className="text-[11px] text-muted">
                  Example rate for {country.name}. {country.notes}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Rate
                <span className="ml-1 text-xs font-normal text-muted">
                  (% VAT or GST)
                </span>
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                inputMode="decimal"
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:bg-slate-950/60 dark:placeholder:text-slate-500"
                placeholder="e.g. 20"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded borderSubtle bg-surface text-accent dark:border-slate-700 dark:bg-slate-950"
                checked={rounding}
                onChange={(e) => setRounding(e.target.checked)}
              />
              <span>Rounding: 2 decimals</span>
            </label>

            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-medium text-accent hover:bg-accent/15"
            >
              Share this calculation
            </button>
          </div>

          {error && (
            <p
              className="mt-1 text-sm text-rose-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <div className="space-y-3 rounded-xl border borderSubtle bg-surface p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
          <h2 className="text-sm font-semibold">Results</h2>
          {!result && !error && (
            <p className="text-sm text-foreground-muted dark:text-muted">
              Start typing an amount and rate to see net, VAT, and gross update
              instantly.
            </p>
          )}
          {result && (
            <div className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultRow
                  label="Net"
                  value={result.net}
                  onCopy={() => handleCopy("net", result.net)}
                />
                <ResultRow
                  label="VAT / GST"
                  value={result.vat}
                  onCopy={() => handleCopy("tax", result.vat)}
                />
                <ResultRow
                  label="Gross"
                  value={result.gross}
                  onCopy={() => handleCopy("gross", result.gross)}
                />
              </div>
              <p className="text-xs text-foreground-muted dark:text-slate-300">
                {result.explanation}
              </p>
            </div>
          )}

          <div className="mt-2 rounded-lg border border-dashed borderSubtle bg-surfaceElevated p-3 text-xs text-foreground-muted dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200">
            <p className="font-medium">Did you know?</p>
            <p className="mt-1 text-slate-300">
              {didYouKnowByMode[mode][didYouKnowIndex]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type ResultRowProps = {
  label: string;
  value: number;
  onCopy: () => void;
};

function ResultRow({ label, value, onCopy }: ResultRowProps) {
  return (
    <div className="space-y-1 rounded-lg border borderSubtle bg-surfaceElevated p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted">{label}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-[11px] text-accent hover:underline"
        >
          Copy
        </button>
      </div>
      <p className="text-sm font-semibold">
        {Number.isFinite(value) ? value : "--"}
      </p>
    </div>
  );
}


