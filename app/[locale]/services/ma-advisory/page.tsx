import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import MaDealSankey from "@/components/charts/ma-deal-sankey";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
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
  const path = locale === "en" ? "/services/ma-advisory" : `/ar/services/ma-advisory`;
  return {
    title: t("ma.title"),
    description: t("ma.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/ma-advisory`,
        ar: `${baseUrl}/ar/services/ma-advisory`,
      },
    },
    openGraph: {
      title: `${t("ma.title")} | Visiweal`,
      description: t("ma.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function MAAdvisoryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const ma = t.raw("ma") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="M&A Advisory"
        description={ma.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is M&A advisory?",
            answer: "M&A advisory provides end-to-end transaction support, from strategic target identification and valuation to negotiation, due diligence, and post-merger integration for buyers and sellers across the Middle East.",
          },
          {
            question: "What does an M&A advisor do?",
            answer: "An M&A advisor manages the full deal lifecycle including target screening, financial modeling and valuation, due diligence coordination, deal structuring, negotiation support, and post-merger integration planning.",
          },
          {
            question: "Why choose Visiweal for M&A advisory?",
            answer: "Visiweal delivers senior-led M&A advisory with deep MENA regional expertise, having completed 85+ deals valued at over AED 2.8B across 12 countries. Each engagement is led by a partner with decades of transaction experience.",
          },
          {
            question: "How does M&A advisory create value for businesses?",
            answer: "M&A advisory creates value by identifying strategic acquisition targets, optimizing deal structures, negotiating favorable terms, managing due diligence risks, and ensuring seamless post-merger integration to capture projected synergies.",
          },
          {
            question: "What is the typical M&A advisory process?",
            answer: "The typical M&A advisory process includes four phases: discovery (understanding strategic objectives), target screening and assessment, execution (valuation, due diligence, negotiation), and post-merger integration planning and monitoring.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "M&A Advisory", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/ma-advisory` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="ma"
        locale={locale}
        chartSection={
          <section className="py-28 md:py-36">
            <div className="container-base">
              <ScrollReveal direction="up">
                <span className="text-label mb-4 block text-brand-400/80">Deal Flow</span>
                <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">M&A Deal Flow Visualization</h2>
              </ScrollReveal>
              <GlassCard className="h-[500px] overflow-hidden">
                <MaDealSankey />
              </GlassCard>
            </div>
          </section>
        }
      />
    </>
  );
}
