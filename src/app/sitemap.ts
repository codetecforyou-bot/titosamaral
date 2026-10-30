import type { MetadataRoute } from "next";
import { practiceAreas } from "@/config/practice-areas";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...practiceAreas.map((a) => ({
      url: `${site.url}/areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: a.featured ? 0.9 : 0.8,
    })),
    { url: `${site.url}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
