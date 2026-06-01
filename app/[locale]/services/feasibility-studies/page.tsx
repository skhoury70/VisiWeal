import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import FeasibilityMethodology from "@/components/sections/feasibility-methodology";
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
  const path = locale === "en" ? "/services/feasibility-studies" : `/ar/services/feasibility-studies`;
  return {
    title: "Feasibility Studies and Investment Appraisal for Enterprise | VisiWeal",
    description: t("feasibility.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/feasibility-studies`,
        ar: `${baseUrl}/ar/services/feasibility-studies`,
      },
    },
    openGraph: {
      title: `Investment Appraisal and Feasibility Analysis | VisiWeal`,
      description: t("feasibility.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function FeasibilityStudiesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const feas = t.raw("feasibility") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="Feasibility Studies"
        description={feas.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is a feasibility study?",
            answer: "A feasibility study is a comprehensive analysis of a proposed project or venture covering market assessment, financial modeling, risk analysis, and regulatory review to determine viability and support investment decisions.",
          },
          {
            question: "What does a feasibility study include?",
            answer: "A thorough feasibility study includes market analysis, technical assessment, financial projections, risk evaluation, regulatory compliance review, and a clear recommendation with supporting evidence for decision-makers.",
          },
          {
            question: "Why choose VisiWeal for feasibility studies?",
            answer: "VisiWeal produces feasibility studies that meet the highest standards for investment committee and lender requirements, providing clarity and confidence for informed investment decisions across the MENA region.",
          },
          {
            question: "Which sectors require feasibility studies?",
            answer: "Feasibility studies are critical for real estate development, infrastructure projects, industrial ventures, energy investments, healthcare facilities, technology initiatives, and any large-scale capital expenditure in the MENA region.",
          },
          {
            question: "How long does a feasibility study take to complete?",
            answer: "A comprehensive feasibility study typically takes 4-8 weeks depending on project complexity, data availability, and the scope of market analysis required for informed investment decision-making.",
          },
          {
            question: "What standards do VisiWeal's feasibility studies meet?",
            answer: "VisiWeal's feasibility studies meet the highest standards for investment committee review, lender requirements, and regulatory approvals across the MENA region, providing institutional-grade analysis and clear go/no-go recommendations.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "VisiWeal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Feasibility Studies", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/feasibility-studies` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="feasibility"
        locale={locale}
        hideStats
        methodologySection={<FeasibilityMethodology />}
      />
    </>
  );
}
