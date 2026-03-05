export default function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="flex items-center gap-3 text-3xl font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/30 shadow-sm">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M5.25 5.75h13.5v12.5L12 14.25 5.25 18.25V5.75Z"
                className="fill-current"
              />
            </svg>
          </span>
          <span>Contact</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted md:text-base">
          Have a suggestion, spot a typo, or want a new feature? Use the form
          below to draft your message. It does not send anything automatically,
          but it helps you structure what you want to say.
        </p>
      </section>

      <section className="space-y-3">
        <form className="group space-y-3 rounded-2xl border borderSubtle bg-surfaceElevated p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400/70 hover:shadow-md dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-muted">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface px-2 py-1 ring-1 ring-borderSubtle/70">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>Draft only – nothing is sent automatically</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="contact-topic">
              Topic
            </label>
              <input
                id="contact-topic"
                type="text"
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
                placeholder="e.g. Feature request or bug report"
              />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="contact-message">
              Message
            </label>
              <textarea
                id="contact-message"
                rows={5}
                className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
                placeholder="Write your note here. You can then copy it into your email client."
              />
          </div>
          <p className="text-xs text-muted">
            This form is for drafting only. When you are happy with your message,
            copy it into your preferred email or chat tool.
          </p>
        </form>
      </section>
    </div>
  );
}


