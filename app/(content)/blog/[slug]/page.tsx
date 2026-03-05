import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/faq-section";
import { getAllPostMetas, getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { CopyLinkButton } from "@/components/copy-link-button";
import { JsonLd } from "@/components/jsonld";
import { getArticleSchema, getFaqSchema } from "@/lib/schema";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllPostMetas().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonical
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { html, toc } = await renderMarkdown(post.content);

  const related =
    post.relatedSlugs?.map((slug) => getPostBySlug(slug)).filter(Boolean) ?? [];

  const calculatorLinks =
    post.cluster === "country-basics" && post.slug.includes("australia")
      ? [
          { href: "/gst-calculator", label: "GST calculator" },
          { href: "/gst-calculator/australia", label: "Australia GST page" }
        ]
      : post.cluster === "country-basics" && post.slug.includes("new-zealand")
        ? [
            { href: "/gst-calculator", label: "GST calculator" },
            { href: "/gst-calculator/new-zealand", label: "New Zealand GST page" }
          ]
        : [
            { href: "/remove-vat-calculator", label: "Remove VAT (reverse VAT)" },
            { href: "/vat-calculator/uk", label: "UK VAT page" }
          ];

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_260px] md:items-start">
      <JsonLd data={getArticleSchema(post)} />
      {post.faq?.length ? (
        <JsonLd data={getFaqSchema({ url: post.canonical, items: post.faq })} />
      ) : null}
      <article className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs text-muted">
            {post.cluster.replace("-", " ")} · {post.readingTime} · {post.date}
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">{post.title}</h1>
          <p className="max-w-2xl text-sm text-muted md:text-base">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <CopyLinkButton url={post.canonical} />
            <Link
              href="/vat-calculator"
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-800 hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
            >
              Open calculator
            </Link>
          </div>
        </header>

        {toc.length > 0 && (
          <nav
            aria-label="Table of contents"
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <p className="text-sm font-semibold">On this page</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {toc.map((item) => (
                <li key={`${item.id}-${item.level}`} className={item.level === 3 ? "pl-4" : ""}>
                  <a href={`#${item.id}`} className="hover:text-accent">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-slate-900/60 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-slate-900/60"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.faq?.length ? <FaqSection items={post.faq} /> : null}

        {related.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Related guides</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {related.map((p) => (
                <li
                  key={p!.slug}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800"
                >
                  <Link
                    href={`/blog/${p!.slug}`}
                    className="text-sm font-semibold hover:text-accent"
                  >
                    {p!.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{p!.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <aside className="md:sticky md:top-24">
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800">
          <p className="text-sm font-semibold">Try the calculator</p>
          <p className="text-sm text-muted">
            Want to plug in your own numbers? These links jump straight into the tool.
          </p>
          <ul className="space-y-2 text-sm">
            {calculatorLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-accent hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted">
            Rates can change. Always confirm the correct rate for your case. Default rate is a convenience preset. You can edit it.
          </p>
        </div>
      </aside>
    </div>
  );
}


