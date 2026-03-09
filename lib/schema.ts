import type { BlogPost } from "@/lib/blog";

export const SITE_URL = "https://calculatemyvat.com";
export const SITE_NAME = "calculatemyvat";
export const SITE_ALTERNATE_NAME = "Calculate My VAT";
export const SITE_LOGO_PATH = "/brand-mark.png";
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

function getLogoImageObject() {
  return {
    "@type": "ImageObject",
    url: SITE_LOGO_URL,
    contentUrl: SITE_LOGO_URL,
    width: 512,
    height: 512,
    caption: `${SITE_NAME} logo`
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    logo: getLogoImageObject(),
    image: getLogoImageObject()
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    publisher: {
      "@id": ORGANIZATION_ID
    }
  };
}

export function getWebApplicationSchema(args: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${args.url}#webapplication`,
    name: args.name,
    url: args.url,
    description: args.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    isPartOf: {
      "@id": WEBSITE_ID
    },
    publisher: {
      "@id": ORGANIZATION_ID
    }
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonical
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: getLogoImageObject()
    }
  };
}

