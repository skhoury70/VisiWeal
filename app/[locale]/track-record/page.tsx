import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import DealVolumeBarChart from "@/components/charts/deal-volume-bar-chart";
import DealTypeDonut from "@/components/charts/deal-type-donut";
import IndustrySectorChart from "@/components/charts/industry-sector-chart";
import KpiAreaChart from "@/components/charts/kpi-area-chart";
import MenaPresenceMap from "@/components/charts/mena-presence-map";
import DealFlowSunburst from "@/components/charts/deal-flow-sunburst";
import GrowthLineChart from "@/components/charts/growth-line-chart";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trackRecord" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/track-record" : "/ar/track-record";

  return {
    title: t("title"),
    description: t("sub"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/track-record`,
        ar: `${baseUrl}/ar/track-record`,
      },
    },
    openGraph: {
      title: `${t("title")} | Visiweal`,
      description: t("sub"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

const transactions = [
  {
    id: 1,
    title: "TechCorp Acquisition",
    subtitle: "AED 280M Cross-Border M&A",
    category: "M&A",
    description:
      "Advised a GCC technology group on the acquisition of a European SaaS platform, managing end-to-end deal execution from valuation to integration.",
    image: null,
  },
  {
    id: 2,
    title: "Al-Majlis Holding Restructuring",
    subtitle: "AED 150M Debt Restructuring",
    category: "Restructuring",
    description:
      "Led a comprehensive financial restructuring for a UAE real estate conglomerate, reducing debt burden by 40% and restoring operational liquidity.",
    image: null,
  },
  {
    id: 3,
    title: "Greenfield Energy CFO Mandate",
    subtitle: "Fractional CFO – 24 Months",
    category: "CFO",
    description:
      "Provided fractional CFO services to a renewable energy startup, building financial infrastructure from scratch and securing AED 90M in Series A funding.",
    image: null,
  },
  {
    id: 4,
    title: "Al-Faisal Group Digital Transformation",
    subtitle: "AED 60M Digital Overhaul",
    category: "Digital",
    description:
      "Designed and implemented a full digital transformation strategy for a Saudi retail conglomerate, resulting in 35% operational cost savings.",
    image: null,
  },
  {
    id: 5,
    title: "Logistics Platform Series B",
    subtitle: "AED 200M Capital Raise",
    category: "M&A",
    description:
      "Advised a MENA logistics platform on a Series B capital raise, structuring a hybrid equity-debt instrument that attracted a sovereign wealth fund anchor.",
    image: null,
  },
  {
    id: 6,
    title: "Healthcare Chain Expansion",
    subtitle: "AED 120M Growth Advisory",
    category: "CFO",
    description:
      "Provided strategic CFO advisory to a regional healthcare chain during its expansion across three GCC markets, optimizing capital structure and reporting.",
    image: null,
  },
];

export default async function TrackRecordPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trackRecord" });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Track Record", url: `https://visiweal.com/${locale === "en" ? "track-record" : "ar/track-record"}` },
        ]}
      />
      <section className="relative overflow-hidden pt-40 pb-28 md:pb-36">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/track-record-hero.avif"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[#0C1820]/70" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(12,24,32,0.6) 0%, rgba(29,191,160,0.04) 50%, transparent 100%)' }} />
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />
        </div>

        <Container className="relative">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-6 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-teal-400 uppercase">
                {t("title")}
              </Badge>
              <h1 className="mb-4 text-5xl font-display font-light leading-tight tracking-tight text-white md:text-7xl">
                {t("title")}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                {t("sub")}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {(["kpi1", "kpi2", "kpi3", "kpi4"] as const).map((kpi, i) => (
              <ScrollReveal key={kpi} delay={i * 0.1}>
                <GlassCard className="text-center">
                  <p className="text-3xl font-display font-light text-teal-400 md:text-4xl">
                    {t(kpi)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(`${kpi}Label`)}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("dealVolume")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("dealVolume")}
              </h2>
              <p className="mt-2 text-gray-500">{t("dealVolumeSub")}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="h-[400px] p-4 md:p-6">
              <DealVolumeBarChart />
            </GlassCard>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("portfolio")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("portfolio")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <GlassCard className="h-[320px] p-4 md:p-6">
                <p className="mb-4 text-sm font-medium text-white">Deal Type Distribution</p>
                <DealTypeDonut />
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard className="h-[320px] p-4 md:p-6">
                <p className="mb-4 text-sm font-medium text-white">Industry Sector</p>
                <IndustrySectorChart />
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <GlassCard className="h-[320px] p-4 md:p-6">
                <p className="mb-4 text-sm font-medium text-white">KPI Trends</p>
                <KpiAreaChart />
              </GlassCard>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/geographic-mena.avif"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
            quality={85}
          />
          <div className="absolute inset-0 bg-[#0C1820]/70" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0C1820 0%, transparent 20%, transparent 80%, #0C1820 100%)' }} />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("geographic")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("geographic")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="h-[450px] p-4 md:p-6">
              <MenaPresenceMap />
            </GlassCard>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("dealFlow")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("dealFlow")}
              </h2>
              <p className="mt-2 text-gray-500">{t("dealFlowSub")}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="h-[500px] p-4 md:p-6">
              <DealFlowSunburst />
            </GlassCard>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("transactions")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("transactions")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-10 flex flex-wrap gap-3" dir="ltr">
              {(["filterAll", "filterMA", "filterCFO", "filterRestructuring", "filterDigital"] as const).map((f) => (
                <button
                  key={f}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-gray-400 transition-all hover:border-teal-500/30 hover:text-teal-400"
                >
                  {t(f)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {transactions.map((tx, i) => (
              <ScrollReveal key={tx.id} delay={i * 0.08}>
                <GlassCard className="group flex h-full flex-col">
                  <div className="img-hover-zoom relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src="/images/insight-abstract.avif"
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      loading="lazy"
                      quality={80}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,24,32,0.4) 0%, rgba(12,24,32,0.7) 100%)' }} />
                    <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-teal-500/20 bg-[#0C1820]/80 text-xs font-bold text-teal-400 backdrop-blur-sm">
                      <TxIcon category={tx.category} />
                    </div>
                  </div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-teal-400 uppercase">
                    {tx.category}
                  </p>
                  <h3 className="mb-1 text-lg font-display font-medium text-white">
                    {tx.title}
                  </h3>
                  <p className="mb-3 text-sm text-teal-400/70">{tx.subtitle}</p>
                  <p className="mt-auto text-sm leading-relaxed text-gray-500">
                    {tx.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("growth")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("growth")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="h-[400px] p-4 md:p-6">
              <GrowthLineChart />
            </GlassCard>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}

function TxIcon({ category }: { category: string }) {
  const icons: Record<string, string> = {
    "M&A": "M",
    CFO: "F",
    Restructuring: "R",
    Digital: "D",
  };

  return (
    <span className="text-lg font-bold">{icons[category] || "T"}</span>
  );
}
