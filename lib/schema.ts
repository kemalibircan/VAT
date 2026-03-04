import type { BlogPost } from "@/lib/blog";

export function getWebApplicationSchema(args: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: args.name,
    url: args.url,
    description: args.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web"
  };
}

export function getFaqSchema(args: {
  url: string;
  items: { question: string; answer: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: args.items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.answer
      }
    })),
    url: args.url
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: post.canonical,
    author: {
      "@type": "Organization",
      name: "VatSnap"
    },
    publisher: {
      "@type": "Organization",
      name: "VatSnap"
    }
  };
}


