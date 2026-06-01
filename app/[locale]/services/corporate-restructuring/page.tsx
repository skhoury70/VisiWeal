import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import RestructuringProcess from "@/components/sections/restructuring-process";
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
    title: "Corporate Restructuring and Turnaround Advisory | VisiWeal",
    description: t("restructuring.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/corporate-restructuring`,
        ar: `${baseUrl}/ar/services/corporate-restructuring`,
      },
    },
    openGraph: {
      title: `Turnaround and Corporate Recovery | VisiWeal`,
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
            question: "How does VisiWeal approach corporate restructuring?",
            answer: "VisiWeal combines rigorous financial analysis with deep operational expertise to develop a restructuring plan that holds up under scrutiny across the MENA region.",
          },
          {
            question: "What types of restructuring does VisiWeal handle?",
            answer: "VisiWeal handles operational restructuring (cost optimization, process redesign), financial restructuring (debt renegotiation, capital structure optimization), organizational restructuring, and turnaround management.",
          },
          {
            question: "How long does a corporate restructuring engagement take?",
            answer: "Restructuring timelines vary by complexity and urgency, typically ranging from 3-6 months for operational restructuring to 6-12 months for financial restructuring and turnaround programs.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "VisiWeal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Corporate Restructuring", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/corporate-restructuring` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="restructuring"
        locale={locale}
        hideStats
        methodologySection={<RestructuringProcess />}
      />
    </>
  );
}
