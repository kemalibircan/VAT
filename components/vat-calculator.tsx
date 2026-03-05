"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Tabs } from "@/components/tabs";
import { useToast } from "@/components/toast-provider";
import {
  calculateVat,
  RoundingMode,
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
  initialRounding?: boolean | RoundingMode;
  intentSlug?: string;
  onCountryChange?: (slug: string | undefined) => void;
};

type SavedPreset = {
  id: number;
  label: string;
  mode: VatMode;
  rate: string;
  countrySlug?: string;
  rounding: RoundingMode;
};

type HistoryItem = {
  id: number;
  timestamp: number;
  mode: VatMode;
  amount: string;
  rate: string;
  countrySlug?: string;
  rounding: RoundingMode;
  result: VatCalculationResult;
};

type NumberFormatStyle = "en" | "eu";
type CurrencyCode = "none" | "TRY" | "EUR" | "USD" | "GBP";

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
  const [rounding, setRounding] = useState<RoundingMode>(() => {
    if (queryState.rounding === "none" || queryState.rounding === "2" || queryState.rounding === "3") {
      return queryState.rounding;
    }
    if (typeof initialRounding === "string") {
      return initialRounding;
    }
    if (typeof initialRounding === "boolean") {
      return initialRounding ? "2" : "none";
    }
    return "2";
  });
  const [countrySlug, setCountrySlug] = useState<string | undefined>(
    queryState.country ?? initialCountrySlug
  );

  const [result, setResult] = useState<VatCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [didYouKnowIndex, setDidYouKnowIndex] = useState(0);

  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [newPresetLabel, setNewPresetLabel] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [formatStyle, setFormatStyle] = useState<NumberFormatStyle>("en");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("none");

  const country = getCountryPreset(countrySlug);

  // Load presets & history from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const rawPresets = window.localStorage.getItem("vatPresets:v1");
      if (rawPresets) {
        setPresets(JSON.parse(rawPresets));
      }
    } catch {
      // ignore
    }
    try {
      const rawHistory = window.localStorage.getItem("vatHistory:v1");
      if (rawHistory) {
        setHistory(JSON.parse(rawHistory));
      }
    } catch {
      // ignore
    }

    try {
      const rawDisplay = window.localStorage.getItem("vatDisplay:v1");
      if (rawDisplay) {
        const parsed = JSON.parse(rawDisplay) as {
          formatStyle?: NumberFormatStyle;
          currencyCode?: CurrencyCode;
        };
        if (parsed.formatStyle) setFormatStyle(parsed.formatStyle);
        if (parsed.currencyCode) setCurrencyCode(parsed.currencyCode);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist presets & history
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("vatPresets:v1", JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "vatHistory:v1",
      JSON.stringify(history.slice(0, 20))
    );
  }, [history]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "vatDisplay:v1",
      JSON.stringify({ formatStyle, currencyCode })
    );
  }, [formatStyle, currencyCode]);

  useEffect(() => {
    // İlk yüklemede, kullanıcı henüz oran girmediyse ve bir ülke preset'i varsa
    // oran alanını örnek preset oranıyla doldur.
    if (!rate && country) {
      setRate(String(country.exampleDefaultRate));
    }
  }, [country, rate]);

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

        // Successful calculation → push into history (most recent first)
        setHistory((prev) => {
          const entry: HistoryItem = {
            id: Date.now() + Math.random(),
            timestamp: Date.now(),
            mode,
            amount,
            rate,
            countrySlug,
            rounding,
            result: calc
          };
          return [entry, ...prev].slice(0, 20);
        });
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

  const handleCopyResultsSummary = () => {
    if (!result) return;
    const parts = [
      `Mode: ${mode}`,
      `Amount: ${amount || "-"}`,
      `Rate: ${rate || "-"}%`,
      country ? `Country: ${country.name}` : "Country: (none)",
      `Net: ${result.net}`,
      `VAT / GST: ${result.vat}`,
      `Gross: ${result.gross}`
    ];
    const text = parts.join("\n");
    navigator.clipboard.writeText(text);
    showToast("Copied a summary of your results.");
  };

  const handleSavePreset = () => {
    if (!rate || !newPresetLabel.trim()) {
      showToast("Enter a label and rate before saving a preset.");
      return;
    }
    const preset: SavedPreset = {
      id: Date.now() + Math.random(),
      label: newPresetLabel.trim(),
      mode,
      rate,
      countrySlug,
      rounding
    };
    setPresets((prev) => [preset, ...prev].slice(0, 8));
    setNewPresetLabel("");
    showToast("Saved current setup as a preset.");
  };

  const applyPreset = (preset: SavedPreset) => {
    setMode(preset.mode);
    setRate(preset.rate);
    setCountrySlug(preset.countrySlug);
    setRounding(preset.rounding);
    onCountryChange?.(preset.countrySlug);
    showToast(`Applied preset: ${preset.label}`);
  };

  const applyHistoryItem = (item: HistoryItem) => {
    setMode(item.mode);
    setAmount(item.amount);
    setRate(item.rate);
    setCountrySlug(item.countrySlug);
    setRounding(item.rounding);
    onCountryChange?.(item.countrySlug);
    showToast("Restored a previous calculation.");
  };

  const formatAmount = (value: number): string => {
    if (!Number.isFinite(value)) return "--";
    const digits = rounding === "3" ? 3 : 2;
    const locale = formatStyle === "en" ? "en-US" : "de-DE";
    const formatted = value.toLocaleString(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
    const symbolMap: Record<CurrencyCode, string> = {
      none: "",
      TRY: "₺",
      EUR: "€",
      USD: "$",
      GBP: "£"
    };
    const symbol = symbolMap[currencyCode];
    return symbol ? `${symbol} ${formatted}` : formatted;
  };

  const comparisonRates = useMemo(() => {
    const parsedAmount = amount === "" ? NaN : Number(amount);
    const parsedRate = rate === "" ? NaN : Number(rate);
    if (!Number.isFinite(parsedAmount) || !Number.isFinite(parsedRate)) {
      return [];
    }
    const base = parsedRate;
    const candidates = [base - 5, base, base + 5];
    const unique = Array.from(new Set(candidates))
      .filter((r) => r > 0 && r <= 100)
      .sort((a, b) => a - b);
    return unique;
  }, [amount, rate]);

  return (
    <section
      aria-label="VAT and GST calculator"
      className="space-y-4 rounded-2xl border borderSubtle bg-surfaceElevated/95 p-5 shadow-md backdrop-blur-sm dark:border-slate-800 md:p-6"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 text-[11px] font-medium text-foreground-muted ring-1 ring-borderSubtle/70">
          <span className="relative h-7 w-7 overflow-hidden rounded-2xl ring-1 ring-emerald-500/60">
            <Image
              src="/icon.png"
              alt="calculatemyvat logo"
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span className="text-[11px] font-semibold text-foreground">
            calculatemyvat VAT / GST calculator
          </span>
        </div>
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

        <div className="grid gap-2 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end">
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-muted">
              Quick presets
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.length === 0 && (
                <span className="text-[11px] text-muted">
                  Save your favourite rate + country + mode combos here.
                </span>
              )}
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="inline-flex items-center gap-1 rounded-full border borderSubtle bg-surface px-2 py-1 text-[11px] text-muted hover:border-emerald-400/70 hover:bg-emerald-500/5 hover:text-emerald-300"
                >
                  <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    %
                  </span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-muted">
              Save current setup
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPresetLabel}
                onChange={(e) => setNewPresetLabel(e.target.value)}
                placeholder="e.g. UK 20% reverse VAT"
                className="block w-full rounded-lg border borderSubtle bg-surface px-2 py-1 text-xs text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={handleSavePreset}
                className="whitespace-nowrap rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20"
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
              className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
              placeholder="e.g. 100.00"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Country preset
                <span className="ml-1 text-[11px] font-normal text-muted">
                  (optional)
                </span>
              </label>
              <select
                value={countrySlug ?? ""}
                onChange={(e) => {
                  const next = e.target.value || undefined;
                  setCountrySlug(next);
                  // Ülke değiştiğinde, ilgili ülkenin örnek oranını otomatik olarak uygula
                  const preset = getCountryPreset(next);
                  if (preset) {
                    setRate(String(preset.exampleDefaultRate));
                  }
                  onCountryChange?.(next);
                }}
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground dark:border-slate-700"
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
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
                placeholder="e.g. 20"
              />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-muted">
                  Rounding
                </label>
                <select
                  value={rounding}
                  onChange={(e) => setRounding(e.target.value as RoundingMode)}
                  className="block rounded-lg border borderSubtle bg-surface px-2 py-1 text-xs text-foreground dark:border-slate-700"
                >
                  <option value="2">Round to 2 decimals</option>
                  <option value="3">Round to 3 decimals</option>
                  <option value="none">No rounding</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-muted">
                  Number format
                </label>
                <div className="flex gap-2">
                  <select
                    value={formatStyle}
                    onChange={(e) =>
                      setFormatStyle(e.target.value as NumberFormatStyle)
                    }
                    className="block rounded-lg border borderSubtle bg-surface px-2 py-1 text-xs text-foreground dark:border-slate-700"
                  >
                    <option value="en">1,234.56</option>
                    <option value="eu">1.234,56</option>
                  </select>
                  <select
                    value={currencyCode}
                    onChange={(e) =>
                      setCurrencyCode(e.target.value as CurrencyCode)
                    }
                    className="block rounded-lg border borderSubtle bg-surface px-2 py-1 text-xs text-foreground dark:border-slate-700"
                  >
                    <option value="none">No symbol</option>
                    <option value="TRY">₺ TRY</option>
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-medium text-accent hover:bg-accent/15"
              >
                Share this calculation
              </button>
            </div>
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

        <div className="space-y-3 rounded-xl border borderSubtle bg-surface p-4 shadow-sm dark:border-slate-800">
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
                  formatAmount={formatAmount}
                />
                <ResultRow
                  label="VAT / GST"
                  value={result.vat}
                  onCopy={() => handleCopy("tax", result.vat)}
                  formatAmount={formatAmount}
                />
                <ResultRow
                  label="Gross"
                  value={result.gross}
                  onCopy={() => handleCopy("gross", result.gross)}
                  formatAmount={formatAmount}
                />
              </div>
              <p className="text-xs text-foreground-muted dark:text-slate-300">
                {result.explanation}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyResultsSummary}
                  className="rounded-full border borderSubtle bg-surfaceElevated px-2 py-1 text-[11px] text-muted hover:border-emerald-400/70 hover:bg-emerald-500/10 hover:text-emerald-200"
                >
                  Copy results as text
                </button>
              </div>
            </div>
          )}

          {comparisonRates.length > 0 && (
            <div className="mt-3 space-y-2 rounded-lg border border-dashed borderSubtle bg-surfaceElevated/80 p-3 text-xs text-foreground-muted dark:border-slate-700 dark:bg-slate-900/40">
              <p className="font-medium">Compare rates</p>
              <p className="text-[11px]">
                Same amount, different rates. Helpful for seeing how a small rate
                change moves your totals.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {comparisonRates.map((r) => {
                  const parsedAmount =
                    amount === "" ? NaN : Number(amount);
                  if (!Number.isFinite(parsedAmount)) return null;
                  const calc = calculateVat({
                    amount: parsedAmount,
                    rate: r,
                    mode,
                    rounding
                  });
                  if ("error" in calc) return null;
                  return (
                    <div
                      key={r}
                      className="space-y-1 rounded-md border borderSubtle bg-surface p-2 text-[11px] dark:border-slate-700"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">
                          {r}% rate
                        </span>
                      </div>
                      <p className="text-foreground-muted">
                        Net: {formatAmount(calc.net)}
                      </p>
                      <p className="text-foreground-muted">
                        VAT: {formatAmount(calc.vat)}
                      </p>
                      <p className="text-foreground-muted">
                        Gross: {formatAmount(calc.gross)}
                      </p>
                    </div>
                  );
                })}
              </div>
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
  formatAmount: (value: number) => string;
};

function ResultRow({ label, value, onCopy, formatAmount }: ResultRowProps) {
  return (
    <div className="space-y-1 rounded-lg border borderSubtle bg-surfaceElevated p-3 shadow-sm dark:border-slate-800">
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
        {formatAmount(value)}
      </p>
    </div>
  );
}


