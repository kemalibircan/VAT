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
            Search
          </label>
          <input
            id="blog-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/70 dark:border-slate-700 dark:bg-slate-950/60 dark:placeholder:text-slate-500"
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
            className="block w-full rounded-lg border borderSubtle bg-surface px-3 py-2 text-sm text-foreground dark:border-slate-700 dark:bg-slate-950/60"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Clusters</p>
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
        <div className="rounded-xl border borderSubtle bg-surface p-4 text-sm text-muted shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
          No matches. Try a different keyword or clear the filters.
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {filtered.map((post) => (
            <li
              key={post.slug}
              className="rounded-xl border borderSubtle bg-surfaceElevated p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
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
                <span className="text-[11px] text-muted">{post.readingTime}</span>
              </div>
              <h2 className="mt-2 text-base font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                  {post.title}
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


