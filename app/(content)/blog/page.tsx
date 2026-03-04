import type { Metadata } from "next";
import { getAllPostMetas } from "@/lib/blog";
import { BlogClient } from "@/app/(content)/blog/blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English guides on reverse VAT, net vs gross, rounding, and practical pricing checks."
};

export default function BlogIndexPage() {
  const posts = getAllPostMetas();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="max-w-2xl text-sm text-foreground-muted md:text-base">
          Practical guides for reverse VAT, net ↔ gross maths, and “why is my
          receipt off by one cent?” moments.
        </p>
      </header>

      <BlogClient posts={posts} />
    </div>
  );
}


