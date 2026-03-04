import type { MetadataRoute } from "next";
import { getAllPostMetas } from "@/lib/blog";

const baseUrl = "https://calculatemyvat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/blog",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
    "/vat-calculator",
    "/gst-calculator",
    "/remove-vat-calculator",
    "/add-vat-calculator",
    "/reverse-vat-calculator",
    "/vat-inclusive-to-exclusive",
    "/exclusive-to-inclusive-vat"
  ];

  const vatCountries = [
    "uk",
    "germany",
    "france",
    "spain",
    "italy",
    "ireland",
    "netherlands"
  ];
  const gstCountries = ["australia", "new-zealand"];

  const countryRoutes = [
    ...vatCountries.map((c) => `/vat-calculator/${c}`),
    ...gstCountries.map((c) => `/gst-calculator/${c}`)
  ];

  const comboSeedRoutes = [
    "/remove-vat-calculator/uk",
    "/vat-calculator/uk",
    "/vat-inclusive-to-exclusive/germany",
    "/gst-calculator/australia",
    "/reverse-vat-calculator/new-zealand"
  ];

  const blogRoutes = getAllPostMetas().map((p) => `/blog/${p.slug}`);

  const routes = Array.from(
    new Set([...staticRoutes, ...countryRoutes, ...comboSeedRoutes, ...blogRoutes])
  );

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}


