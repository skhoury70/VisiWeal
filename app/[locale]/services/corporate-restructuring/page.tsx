import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import {
  ServiceSchema,
  FAQPageSchema,
  BreadcrumbSchema,
} from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/services/corporate-restructuring" : `/ar/services/corporate-restructuring`;
  return {
    title: t("restructuring.title"),
    description: t("restructuring.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/corporate-restructuring`,
        ar: `${baseUrl}/ar/services/corporate-restructuring`,
      },
    },
    openGraph: {
      title: `${t("restructuring.title")} | Visiweal`,
      description: t("restructuring.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function CorporateRestructuringPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const rest = t.raw("restructuring") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="Corporate Restructuring"
        description={rest.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is corporate restructuring?",
            answer: "Corporate restructuring is the process of reorganizing a company's operations, finances, or structure to improve performance, address financial distress, and create sustainable value for stakeholders.",
          },
          {
            question: "When does a company need restructuring?",
            answer: "Companies typically need restructuring when facing operational or financial challenges such as declining profitability, cash flow pressure, covenant breaches, or the need to optimize capital structure and operational efficiency.",
          },
          {
            question: "How does Visiweal approach corporate restructuring?",
            answer: "Visiweal combines rigorous financial analysis with deep operational expertise, having preserved over AED 800M in value across 25+ restructuring cases with a 90% success rate across the MENA region.",
          },
          {
            question: "What types of restructuring does Visiweal handle?",
            answer: "Visiweal handles operational restructuring (cost optimization, process redesign), financial restructuring (debt renegotiation, capital structure optimization), organizational restructuring, and strategic turnaround management.",
          },
          {
            question: "How long does a corporate restructuring engagement take?",
            answer: "Restructuring timelines vary by complexity and urgency, typically ranging from 3-6 months for operational restructuring to 6-12 months for comprehensive financial restructuring and turnaround programs.",
          },
          {
            question: "What is the success rate of corporate restructuring?",
            answer: "Visiweal has a 90% success rate across 25+ restructuring cases in the MENA region, having preserved over AED 800M in client value through rigorous financial analysis, stakeholder management, and operational execution.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Corporate Restructuring", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/corporate-restructuring` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="restructuring"
        locale={locale}
        hideStats
      />
    </>
  );
}
