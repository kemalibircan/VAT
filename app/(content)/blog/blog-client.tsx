"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FilterPills } from "@/components/filter-pills";
import type { BlogCluster, BlogPostMeta } from "@/lib/blog";
import clsx from "clsx";

const clusterLabels: Record<BlogCluster, string> = {
  "reverse-vat": "Reverse VAT",
  "country-basics": "Country basics",
  "use-cases": "Use cases"
};

type SortOrder = "newest" | "oldest";

export function BlogClient({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<BlogCluster | "all">("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts;
    if (cluster !== "all") {
      list = list.filter((p) => p.cluster === cluster);
    }
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) =>
      sort === "newest" ? (a.date < b.date ? 1 : -1) : a.date < b.date ? -1 : 1
    );
    return list;
  }, [posts, query, cluster, sort]);

  return (
    <section className="space-y-4" aria-label="Blog posts">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="blog-search">
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                  <path
                    d="M11 5.75a5.25 5.25 0 1 0 3.71 8.96"
                    className="stroke-current"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.25 15.25 18 18"
                    className="stroke-current"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Search</span>
            </span>
          </label>
          <input
            id="blog-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:placeholder:text-slate-500"
            placeholder="Try “reverse VAT”, “rounding”, or “invoice”"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="blog-sort">
            Sort
          </label>
          <select
            id="blog-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground dark:border-slate-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          <span className="inline-flex items-center gap-1">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M5.75 6.75h12.5L14 11.5v5.75l-2-1.5-2 1.5V11.5L5.75 6.75Z"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Clusters</span>
          </span>
        </p>
        <FilterPills<BlogCluster>
          options={[
            { value: "reverse-vat", label: "Reverse VAT" },
            { value: "country-basics", label: "Country basics" },
            { value: "use-cases", label: "Use cases" }
          ]}
          value={cluster}
          onChange={setCluster}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border borderSubtle bg-surface p-4 text-sm text-muted shadow-sm dark:border-slate-800">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                <circle
                  cx="12"
                  cy="12"
                  r="6.25"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                />
                <path
                  d="M12 9.25v3.5m0 2.5h.01"
                  className="stroke-current"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-medium">No matches</span>
          </div>
          <p>Try a different keyword or clear the filters.</p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {filtered.map((post) => (
            <li
              key={post.slug}
              className="group rounded-xl border borderSubtle bg-surfaceElevated p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-md dark:border-slate-800"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={clsx(
                    "rounded-full border px-2 py-0.5 text-[11px]",
                    post.cluster === "reverse-vat" &&
                      "border-indigo-500/60 text-indigo-300",
                    post.cluster === "country-basics" &&
                      "border-emerald-500/60 text-emerald-300",
                    post.cluster === "use-cases" &&
                      "border-amber-500/60 text-amber-300"
                  )}
                >
                  {clusterLabels[post.cluster]}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                  <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2">
                      <path
                        d="M12 5.25a6.5 6.5 0 1 0 6.5 6.5"
                        className="stroke-current"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 8.75v3.5l2.25 1.5"
                        className="stroke-current"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{post.readingTime}</span>
                </span>
              </div>
              <h2 className="mt-2 text-base font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 hover:text-accent"
                >
                  {post.title}
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 opacity-0 transition group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5">
                      <path
                        d="M8.75 5.75h9.5v9.5M18.25 5.75 5.75 18.25"
                        className="stroke-current"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


