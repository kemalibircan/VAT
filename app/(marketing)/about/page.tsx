export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">About VatSnap</h1>
      <p className="max-w-2xl text-sm text-muted md:text-base">
        VatSnap is a small, focused tool that helps you move between net and
        gross prices with VAT or GST. The goal is to explain the maths in plain
        English so you can sanity-check invoices, receipts, and price lists
        without needing a spreadsheet.
      </p>
      <p className="max-w-2xl text-sm text-muted md:text-base">
        This site is for general information only. It is not tax or legal
        advice. Rates can change. Always confirm the correct rate for your case.
        Default rate is a convenience preset. You can edit it.
      </p>
    </div>
  );
}


