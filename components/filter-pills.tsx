"use client";

import clsx from "clsx";

type FilterPillsProps<Value extends string> = {
  options: { value: Value; label: string }[];
  value: Value | "all";
  onChange: (value: Value | "all") => void;
};

export function FilterPills<Value extends string>({
  options,
  value,
  onChange
}: FilterPillsProps<Value>) {
  return (
    <div className="flex flex-wrap gap-2 text-xs md:text-sm">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={clsx(
          "rounded-full border px-3 py-1",
          value === "all"
            ? "border-accent bg-accent-soft text-accent"
            : "borderSubtle text-muted hover:border-accent hover:text-accent"
        )}
      >
        All
      </button>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={clsx(
            "rounded-full border px-3 py-1",
            value === o.value
              ? "border-accent bg-accent-soft text-accent"
              : "borderSubtle text-muted hover:border-accent hover:text-accent"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}


