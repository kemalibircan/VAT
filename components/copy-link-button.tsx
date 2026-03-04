"use client";

import { useToast } from "@/components/toast-provider";

export function CopyLinkButton({ url }: { url: string }) {
  const { showToast } = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(url);
        showToast("Copied link.");
      }}
      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-accent hover:text-accent"
    >
      Copy link
    </button>
  );
}


