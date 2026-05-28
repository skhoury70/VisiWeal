import { MetadataRoute } from "next";

const staticRoutes = [
  "",
  "about",
  "services",
  "services/ma-advisory",
  "services/financial-advisory",
  "services/digital-transformation",
  "services/fractional-cfo",
  "services/corporate-restructuring",
  "services/feasibility-studies",
  "founder",
  "team",
  "track-record",
  "insights",
  "book-consultation",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://visiweal.com";
  const locales = ["en", "ar"];

  return staticRoutes.flatMap((route) =>
    locales.map((locale) => {
      const path = locale === "en" ? `/${route}` : `/${locale}/${route}`;
      const normalized = path.replace(/\/$/, "") || "/";
      return {
        url: `${baseUrl}${normalized}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1.0 : route.startsWith("services/") ? 0.8 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}${locale === "en" ? `/${route}` : `/en/${route}`}`,
            ar: `${baseUrl}${locale === "ar" ? `/${route}` : `/ar/${route}`}`,
          },
        },
      };
    })
  );
}
