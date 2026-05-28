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
  const path = locale === "en" ? "/services/digital-transformation" : `/ar/services/digital-transformation`;
  return {
    title: t("digital.title"),
    description: t("digital.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/digital-transformation`,
        ar: `${baseUrl}/ar/services/digital-transformation`,
      },
    },
    openGraph: {
      title: `${t("digital.title")} | Visiweal`,
      description: t("digital.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function DigitalTransformationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const dig = t.raw("digital") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="Digital Transformation"
        description={dig.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is digital transformation consulting?",
            answer: "Digital transformation consulting helps traditional enterprises navigate digital disruption, modernize operations, implement AI and automation strategies, and build new technology-enabled business models for durable competitive advantage.",
          },
          {
            question: "What does a digital transformation consultant do?",
            answer: "A digital transformation consultant develops comprehensive digital strategy, assesses technology capabilities, designs target architecture, implements AI and automation solutions, and guides organizational change to drive measurable business outcomes.",
          },
          {
            question: "How does Visiweal approach digital transformation?",
            answer: "Visiweal combines deep technology expertise with practical business acumen, ensuring digital initiatives are grounded in commercial reality. Our 50+ transformations have generated over AED 600M in value across 15+ sectors.",
          },
          {
            question: "Which industries benefit most from digital transformation?",
            answer: "Industries including banking and financial services, healthcare, retail, logistics, manufacturing, energy, and the public sector benefit significantly from digital transformation initiatives that modernize operations and unlock new revenue streams.",
          },
          {
            question: "How long does a digital transformation engagement typically take?",
            answer: "Digital transformation engagements vary by scope and complexity, ranging from 3-month strategy assessments to multi-year implementation programs. Visiweal structures engagements to deliver quick wins within the first 8-12 weeks.",
          },
          {
            question: "What role does AI play in digital transformation?",
            answer: "AI is a core enabler of modern digital transformation, driving automation of routine processes, enhancing data-driven decision-making, enabling predictive analytics, and creating personalized customer experiences at scale.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Digital Transformation", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/digital-transformation` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="digital"
        locale={locale}
      />
    </>
  );
}
