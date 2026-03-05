type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/40">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
            <path
              d="M12 5.25a4 4 0 0 0-4 4"
              className="stroke-current"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M12 5.25a4 4 0 0 1 4 4c0 2-2 2.5-2 4.25"
              className="stroke-current"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="17.25"
              r="0.9"
              className="fill-current"
            />
          </svg>
        </span>
        <h2 id="faq-heading" className="text-xl font-semibold">
          FAQ
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-xl border borderSubtle bg-surfaceElevated/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/40"
          >
            <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-foreground-muted dark:text-slate-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}


