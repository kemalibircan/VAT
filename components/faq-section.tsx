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
      <h2 id="faq-heading" className="text-xl font-semibold">
        FAQ
      </h2>
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


