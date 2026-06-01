import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import MAMethodologyPipeline from "@/components/sections/ma-methodology-pipeline";
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
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/services/ma-advisory" : `/ar/services/ma-advisory`;
  return {
      title: `M&A Advisory in Dubai & Across the Middle East | VisiWeal`,
      description: `Independent M&A advisory in Dubai and across MENA — buy-side and sell-side transaction support from target screening through post-merger integration. Speak to a senior advisor.`,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/ma-advisory`,
        ar: `${baseUrl}/ar/services/ma-advisory`,
      },
    },
    openGraph: {
      title: `M&A Advisory in Dubai & Across the Middle East | VisiWeal`,
      description: `Independent M&A advisory in Dubai and across MENA — buy-side and sell-side transaction support from target screening through post-merger integration. Speak to a senior advisor.`,
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
            answer: "M&A advisors guide buyers and sellers through every phase of a transaction — from target identification and valuation to negotiation, due diligence, and post-merger integration.",
          },
          {
            question: "What does an M&A advisor do?",
            answer: "An M&A advisor manages every phase of a transaction — target screening, financial modeling and valuation, due diligence coordination, deal structuring, negotiation support, and post-merger integration planning.",
          },
          {
            question: "Why engage VisiWeal for M&A advisory?",
            answer: "VisiWeal delivers senior-led M&A advice with deep MENA regional expertise. Each engagement is led by a partner with decades of transaction experience, bringing direct market knowledge from across the GCC and Levant.",
          },
          {
            question: "How does M&A advisory create value for businesses?",
            answer: "M&A advisors create value by identifying strategic acquisition targets, structuring transactions effectively, negotiating terms that reflect real market conditions, managing due diligence risks, and ensuring post-merger integration delivers projected outcomes.",
          },
          {
            question: "What is the typical M&A advisory process?",
            answer: "The typical M&A process includes four phases: discovery (understanding strategic objectives), target screening and assessment, execution (valuation, due diligence, negotiation), and post-merger integration planning and monitoring.",
          },
          {
            question: "What is proprietary deal sourcing in M&A?",
            answer: "We originate proprietary opportunities through market mapping, sector intelligence, and trusted relationships — giving clients access to strategic targets before competitive processes begin.",
          },
          {
            question: "What does M&A due diligence cover?",
            answer: "We lead a structured diligence process to validate performance, identify risks, test assumptions, and translate findings into valuation, structure, and negotiation strategy.",
          },
          {
            question: "What is Post-Merger Integration in M&A?",
            answer: "We support post-merger integration to convert transaction logic into realized value — operating model alignment, governance integration, reporting cadence, and Day 1 readiness.",
          },
          {
            question: "What is an Indication of Interest in M&A?",
            answer: "We develop a compelling Indication of Interest that positions the client credibly, anchors valuation expectations, and opens the path toward exclusivity and deeper diligence.",
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
        methodologySection={<MAMethodologyPipeline />}
        chartSection={
          <section className="py-28 md:py-36">
            <div className="container-base">
              <ScrollReveal direction="up">
                <span className="text-label mb-4 block text-brand-400/80">Deal Flow</span>
                <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">From 100 Targets to One Signature</h2>
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
