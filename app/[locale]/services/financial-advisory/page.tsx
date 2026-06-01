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
    title: "Capital Raising and Corporate Finance Advisory in MENA | VisiWeal",
    description: "Capital raising, debt advisory, and financial restructuring for enterprise clients across MENA. Book a Strategic Consultation with VisiWeal today.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/financial-advisory`,
        ar: `${baseUrl}/ar/services/financial-advisory`,
      },
    },
    openGraph: {
      title: "Capital Raising and Corporate Finance Advisory in MENA | VisiWeal",
      description: "Capital raising, debt advisory, and financial restructuring for enterprise clients across MENA. Book a Strategic Consultation with VisiWeal today.",
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
            answer: "Capital raising, debt advisory, financial restructuring, and financial planning for enterprise clients across MENA.",
          },
          {
            question: "What does a financial advisor do for businesses?",
            answer: "A financial advisor helps businesses raise capital, optimize capital structure, manage debt, plan financial initiatives, and execute complex financial transactions including IPOs, private placements, and structured finance.",
          },
          {
            question: "How can VisiWeal help with capital raising?",
            answer: "VisiWeal has raised over AED 1.4B in capital across 40+ financings, drawing on strong relationships with regional and international lenders, investors, and financial institutions to structure optimal financing solutions.",
          },
          {
            question: "What industries does VisiWeal's financial advisory cover?",
            answer: "VisiWeal's team serves enterprise clients across technology, healthcare, financial services, real estate, industrials, energy, and consumer sectors across MENA.",
          },
          {
            question: "How does financial advisory differ from M&A advisory?",
            answer: "While M&A advice focuses on mergers, acquisitions, and divestitures, financial advisory covers a broader scope including capital raising, debt structuring, financial planning, IPO readiness, and balance sheet optimization.",
          },
          {
            question: "What is the typical engagement model for financial advisory?",
            answer: "Engagements are structured as project-based mandates with clear deliverables and timelines, led by a senior partner who brings deep regional expertise and institutional-grade capabilities.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "VisiWeal", url: "https://visiweal.com" },
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
