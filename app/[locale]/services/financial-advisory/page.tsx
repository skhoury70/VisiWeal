import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import CapitalAdvisoryProcess from "@/components/sections/capital-advisory-process";
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
  const path = locale === "en" ? "/services/financial-advisory" : `/ar/services/financial-advisory`;
  return {
    title: t("financial.title"),
    description: t("financial.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/financial-advisory`,
        ar: `${baseUrl}/ar/services/financial-advisory`,
      },
    },
    openGraph: {
      title: `${t("financial.title")} | Visiweal`,
      description: t("financial.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function FinancialAdvisoryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const fin = t.raw("financial") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="Financial Advisory"
        description={fin.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is financial advisory?",
            answer: "Financial advisory encompasses capital raising, debt advisory, financial restructuring, and strategic financial planning services tailored to the unique dynamics of MENA markets.",
          },
          {
            question: "What does a financial advisor do for businesses?",
            answer: "A financial advisor helps businesses raise capital, optimize capital structure, manage debt, plan strategic financial initiatives, and navigate complex financial transactions including IPOs, private placements, and structured finance.",
          },
          {
            question: "How can Visiweal help with capital raising?",
            answer: "Visiweal has raised over AED 1.4B in capital across 40+ financings, leveraging strong relationships with regional and international lenders, investors, and financial institutions to structure optimal financing solutions.",
          },
          {
            question: "What industries does Visiweal's financial advisory cover?",
            answer: "Visiweal's financial advisory practice serves enterprise clients across technology, healthcare, financial services, real estate, industrials, energy, and consumer sectors throughout the MENA region.",
          },
          {
            question: "How does financial advisory differ from M&A advisory?",
            answer: "While M&A advisory focuses specifically on mergers, acquisitions, and divestitures, financial advisory encompasses a broader scope including capital raising, debt structuring, financial planning, IPO readiness, and balance sheet optimization.",
          },
          {
            question: "What is the typical engagement model for financial advisory?",
            answer: "Financial advisory engagements are typically structured as project-based mandates with clear deliverables and timelines, led by a senior partner who brings deep regional expertise and institutional-grade capabilities.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Financial Advisory", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/financial-advisory` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="financial"
        locale={locale}
        hideStats
        methodologySection={<CapitalAdvisoryProcess />}
      />
    </>
  );
}
