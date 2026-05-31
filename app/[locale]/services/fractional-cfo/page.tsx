import { getTranslations } from "next-intl/server";
import ServicePageTemplate from "@/components/sections/service-page-template";
import CfoRoiCalculator from "@/components/charts/cfo-roi-calculator";
import CfoDiagnostic from "@/components/diagnostic/cfo-diagnostic";
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
  const path = locale === "en" ? "/services/fractional-cfo" : `/ar/services/fractional-cfo`;
  return {
    title: t("cfo.title"),
    description: t("cfo.short"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services/fractional-cfo`,
        ar: `${baseUrl}/ar/services/fractional-cfo`,
      },
    },
    openGraph: {
      title: `${t("cfo.title")} | Visiweal`,
      description: t("cfo.short"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function FractionalCFOPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesDetails" });
  const cfo = t.raw("cfo") as Record<string, unknown>;

  return (
    <>
      <ServiceSchema
        name="Fractional CFO"
        description={cfo.short as string}
      />
      <FAQPageSchema
        questions={[
          {
            question: "What is a fractional CFO?",
            answer: "A fractional CFO provides strategic financial leadership on a part-time or flexible basis, giving high-growth enterprises access to institutional-grade financial expertise without the cost of a full-time executive.",
          },
          {
            question: "How does fractional CFO pricing work in the MENA region?",
            answer: `Fractional CFO engagements in the MENA region typically range from AED 180K to 350K annually, compared to AED 600K to 1.2M for a full-time CFO. Engagements are flexible, scalable, and deliver impact within 2-4 weeks.`,
          },
          {
            question: "What does a fractional CFO do?",
            answer: "A fractional CFO oversees strategic financial planning, FP&A, board and investor relations, cash flow management, capital allocation, financial operations, and fundraising support. They serve as a senior strategic partner, not just a financial controller.",
          },
          {
            question: "Who needs fractional CFO services?",
            answer: "Growth-stage companies, mid-market enterprises, and PE-backed portfolio companies in the MENA region benefit most from fractional CFO services — especially those preparing for institutional investment, scaling operations, or needing senior financial leadership without a full-time hire.",
          },
          {
            question: "How quickly can a fractional CFO start delivering value?",
            answer: "A fractional CFO can typically onboard and start delivering strategic value within 2-4 weeks, compared to 3-6 months for a full-time CFO hire. This accelerated timeline makes fractional CFOs ideal for time-sensitive financial initiatives.",
          },
          {
            question: "What is the difference between a fractional CFO and an outsourced CFO?",
            answer: "A fractional CFO acts as a senior strategic partner embedded in your leadership team, while outsourced CFO services are typically transaction-focused. Fractional CFOs provide strategic guidance, board support, and hands-on financial leadership rather than just accounting oversight.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services` },
          { name: "Fractional CFO", url: `https://visiweal.com/${locale === "en" ? "" : "ar/"}services/fractional-cfo` },
        ]}
      />
      <ServicePageTemplate
        serviceKey="cfo"
        locale={locale}
        hideStats
        chartSection={
          <section className="py-28 md:py-36">
            <div className="container-base">
              <ScrollReveal direction="up">
                <span className="text-label mb-4 block text-brand-400/80">ROI Calculator</span>
                <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">Calculate Your Fractional CFO ROI</h2>
              </ScrollReveal>
              <GlassCard className="overflow-hidden p-6">
                <CfoRoiCalculator />
              </GlassCard>
            </div>
          </section>
        }
        comparisonSection={
          <section className="py-28 md:py-36">
            <div className="container-base">
              <ScrollReveal direction="up">
                <span className="text-label mb-4 block text-brand-400/80">Diagnostic Tool</span>
                <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">Which model fits your business?</h2>
              </ScrollReveal>
              <GlassCard className="overflow-hidden p-8">
                <CfoDiagnostic />
              </GlassCard>
            </div>
          </section>
        }
      />
    </>
  );
}


