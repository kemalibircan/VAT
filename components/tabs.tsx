"use client";

import { ReactNode } from "react";
import clsx from "clsx";

export type TabOption<Value extends string> = {
  value: Value;
  label: string;
  description?: string;
};

type TabsProps<Value extends string> = {
  options: TabOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  ariaLabel?: string;
};

export function Tabs<Value extends string>({
  options,
  value,
  onChange,
  ariaLabel
}: TabsProps<Value>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex w-full flex-wrap items-stretch justify-start gap-2 rounded-xl border borderSubtle bg-surface p-1 text-xs shadow-sm md:text-sm"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            type="button"
            aria-selected={active}
            className={clsx(
              "flex-1 rounded-lg px-3 py-2 text-left outline-none transition",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:bg-accent-soft"
            )}
            onClick={() => onChange(opt.value)}
          >
            <div className="font-medium">{opt.label}</div>
            {opt.description && (
              <p className="mt-0.5 text-[11px] text-slate-400">
                {opt.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}


