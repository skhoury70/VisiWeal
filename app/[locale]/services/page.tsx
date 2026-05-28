import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import BarChartBars from "@/components/effects/bar-chart-bars";
import GlassCard from "@/components/effects/glass-card";
import ScrollReveal from "@/components/effects/scroll-reveal";
import SectionDivider from "@/components/effects/section-divider";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/services" : "/ar/services";
  return {
    title: `${t("title")} - Services`,
    description: "Comprehensive M&A Advisory, Financial Advisory, Fractional CFO, Digital Transformation, Corporate Restructuring, and Feasibility Study services for enterprise clients across the Middle East and MENA region.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/services`,
        ar: `${baseUrl}/ar/services`,
      },
    },
    openGraph: {
      title: "Services | Visiweal",
      description: "Comprehensive financial advisory and strategic consulting services for the MENA region's most discerning enterprises.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Services", url: `https://visiweal.com/${locale === "en" ? "services" : "ar/services"}` },
        ]}
      />
      <ServicesContent locale={locale} />
    </>
  );
}

function ServicesContent({ locale }: { locale: string }) {
  const t = useTranslations("servicesDetails");
  const cards = t.raw("overview.cards") as Array<{
    num: string;
    title: string;
    desc1: string;
    desc2: string;
    desc3: string;
    deliverables: string[];
    whoItsFor: string;
    link: string;
  }>;
  const labels = t.raw("sectionLabels") as Record<string, string>;

  return (
    <main className="bg-surface">
      <HeroSection />
      <SectionDivider />
      <ServicesGridSection cards={cards} locale={locale} />
      <SectionDivider />
      <CTASection labels={labels} locale={locale} />
    </main>
  );
}

function HeroSection() {
  const t = useTranslations("servicesDetails");

  return (
    <section className="relative overflow-hidden bg-surface pt-32 md:pt-40">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-[20%] -top-[30%] h-[80vh] w-[60vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/10 via-glow-teal/5 to-transparent" />
        <div className="absolute -bottom-[20%] -right-[15%] h-[60vh] w-[50vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/8 via-glow-teal/4 to-transparent" />
      </div>
      <div className="container-base relative z-10 pb-28 md:pb-36">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">{t("overview.heroTitle")}</span>
          <h1 className="text-display mb-6 leading-[1.08] tracking-tight text-text-primary">
            <span className="font-semibold">{t("overview.heroTitle")}</span>
          </h1>
          <p className="max-w-2xl text-body text-text-tertiary md:text-lg">{t("overview.heroSub")}</p>
          <div className="mt-8">
            <BarChartBars className="h-16 w-48" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ServicesGridSection({
  cards,
  locale,
}: {
  cards: Array<{
    num: string;
    title: string;
    desc1: string;
    desc2: string;
    desc3: string;
    deliverables: string[];
    whoItsFor: string;
    link: string;
  }>;
  locale: string;
}) {
  const t = useTranslations("servicesDetails");

  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
              <GlassCard className="group relative h-full overflow-hidden" hover={true}>
                <span className="font-display absolute -right-4 -top-4 text-[100px] leading-none text-white opacity-[0.04] select-none pointer-events-none">
                  {card.num}
                </span>
                <div className="relative z-10">
                  <h3 className="font-display text-[26px] leading-tight text-text-primary group-hover:text-brand-400 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <p className="text-body-small text-text-secondary leading-relaxed">{card.desc1}</p>
                    <p className="text-body-small text-text-tertiary leading-relaxed">{card.desc2}</p>
                    <p className="text-body-small text-text-tertiary leading-relaxed">{card.desc3}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-caption mb-2 font-medium uppercase tracking-wider text-brand-400/70">Key Deliverables</p>
                    <ul className="space-y-1.5">
                      {card.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-body-small text-text-tertiary">
                          <svg className="mt-1 h-3 w-3 shrink-0 text-brand-400" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M4.5 9L2 6.5l1-1L4.5 7l4.5-4.5 1 1L4.5 9z" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <span className="inline-block rounded-full border border-brand-400/20 bg-brand-400/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-brand-400/80">
                      {card.whoItsFor}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={"/" + locale + "/services/" + card.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
                    >
                      {t("sectionLabels.explore")}
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({
  labels,
  locale,
}: {
  labels: Record<string, string>;
  locale: string;
}) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <GlassCard className="mx-auto max-w-2xl text-center">
            <span className="text-label mb-4 block text-brand-400/80">{labels.ctaTitle}</span>
            <p className="mt-4 text-body text-text-tertiary">{labels.ctaSub}</p>
            <div className="mt-8 flex justify-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-3.5 text-sm font-medium text-white shadow-glow-teal md:text-base"
                highlightColor="#14B8A6"
              >
                <Link href={"/" + locale + "/book-consultation"}>
                  {labels.book}
                </Link>
              </HoverBorderGradient>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}