import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Quote } from "lucide-react";
import { PersonSchema, BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "founder" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/founder" : "/ar/founder";
  return {
    title: "Independent M&A and Financial Advisor for MENA | VisiWeal",
    description: "Sleiman El-Khoury, founder of VisiWeal, brings over 35 years of M&A, restructuring, and financial advisory experience to family businesses and enterprises across the MENA region. Book a strategic consultation.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/founder`,
        ar: `${baseUrl}/ar/founder`,
      },
    },
    openGraph: {
      title: "Independent M&A and Financial Advisor for MENA | VisiWeal",
      description: "Sleiman El-Khoury, founder of VisiWeal, brings over 35 years of M&A, restructuring, and financial advisory experience to family businesses and enterprises across the MENA region.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

const engagements = [
  {
    num: "01",
    tag: "Cross-Border M&A & Complexity",
    title: "Multilane Semiconductors",
    result: "$200M+ Exit",
    detail:
      "Lead Financial & Strategic Advisor on the sale of Multilane, a privately held Lebanese semiconductor company, to a NASDAQ-listed US acquirer in a $200M+ transaction. Architected full financial workstream across valuation, QoE, due diligence, SPA schedules, carve-out financials, and Delaware holding structure. Delivered nearly 2x valuation uplift versus the family's initial position.",
  },
  {
    num: "02",
    tag: "Family Business Governance & Holding Group",
    title: "Fattal Group",
    result: "12% Revenue Growth",
    detail:
      "Served as Group Financial Advisor to the Board, designing a multi-entity holding and restructuring architecture to prepare for acquisitions, partnerships, and generational transition. Secured board approval for a major divestiture at a 15% premium on initial valuation. Operational finance reforms contributed to 12% revenue growth and 7% EBITDA expansion within six months.",
  },
  {
    num: "03",
    tag: "Multi-Entity Restructuring & Debt Advisory",
    title: "Obegi Chemicals Group",
    result: "$19M Restructured",
    detail:
      "As Group CFO of a 16-entity regional conglomerate, restructured a $19M debt package with an international banking syndicate, improving liquidity by 35%. Secured a $20M multi-currency credit facility for expansion into three new markets and centralized treasury operations to improve working capital by $8M.",
  },
  {
    num: "04",
    tag: "Interim CFO & Institutional Growth",
    title: "Tyconz (PwC), Dubai",
    result: "$50M+ Transactions",
    detail:
      "Served as Group CFO managing financial workstreams of $50M+ in M&A transactions. Established global-standard governance and compliance frameworks that reduced audit risk by 40%, and delivered 15% revenue growth across three GCC markets.",
  },
];

const services = [
  { key: "ma-advisory", label: "M&A Advisory", desc: "Cross-border transaction execution, valuation, and deal structuring" },
  { key: "financial-advisory", label: "Financial Advisory", desc: "Capital strategy, financial modeling, and institutional-grade reporting" },
  { key: "digital-transformation", label: "Digital Transformation", desc: "ERP architecture, data intelligence, and operational digitization" },
  { key: "fractional-cfo", label: "Fractional CFO", desc: "Interim finance leadership for growth-stage and established enterprises" },
  { key: "corporate-restructuring", label: "Corporate Restructuring", desc: "Debt advisory, turnaround strategy, and multi-entity reorganization" },
  { key: "feasibility-studies", label: "Feasibility Studies", desc: "Investment appraisal, market validation, and strategic planning" },
];

export default async function FounderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "founder" });

  return (
    <>
      <PersonSchema
        name="Sleiman El-Khoury"
        givenName="Sleiman"
        familyName="El-Khoury"
        jobTitle="Founder & Managing Director"
        description="Founder and Managing Director of VisiWeal, leading M&A and financial advisory across the MENA region."
        sameAs={["https://www.linkedin.com/company/visiweal/"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "VisiWeal", url: "https://visiweal.com" },
          { name: "Founder", url: `https://visiweal.com/${locale === "en" ? "founder" : "ar/founder"}` },
        ]}
      />
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/8 blur-[180px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>

        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            {/* TEXT */}
            <div className="relative z-10 order-2 md:order-1">
              <ScrollReveal direction="left">
                <Badge variant="brand" className="mb-6">
                  {t("title")}
                </Badge>
                <h1 className="mb-4 text-5xl font-display font-light leading-tight tracking-tight text-white md:text-7xl whitespace-nowrap">
                  {t("name")}
                </h1>
                <p className="mb-2 text-lg font-medium text-teal-400">
                  {t("role")}
                </p>
                <p className="mb-8 text-base leading-relaxed text-gray-400">
                  {t("sub")}
                </p>


              </ScrollReveal>
            </div>

            {/* PHOTO */}
            <div className="relative order-1 md:order-2">
              <ScrollReveal direction="right">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-md scale-[0.9] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0C1820] via-[#0F1F2C] to-[#0C1820]">
                  <Image
                    src="/images/contact-founder.avif"
                    alt="Sleiman El-Khoury"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width:768px) 100vw, 50vw"
                    priority
                    quality={95}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-[rgba(29,191,160,0.2)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C1820] to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* STATS STRIP */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {[
              { value: "35+", label: "Years of Advisory Experience" },
              { value: "$500M+", label: "Largest Single Transaction" },
              { value: "15+", label: "Years Board-Level Leadership" },
              { value: "$3B+", label: "Advised Transaction Value" },
              { value: "20+", label: "Countries Across MENA" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center md:p-5">
                  <p className="text-xl font-bold text-teal-400 md:text-2xl">{s.value}</p>
                  <p className="mt-1 text-xs text-gray-500 md:text-sm">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ABOUT */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <ScrollReveal direction="left">
                <Badge variant="brand" className="mb-4">About</Badge>
                <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                  Sleiman El-Khoury
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-teal-500/40" />
              </ScrollReveal>
            </div>
            <div className="space-y-6 md:col-span-3">
              <ScrollReveal delay={0.1}>
                <p className="text-base leading-relaxed text-gray-300">
                  Sleiman El-Khoury has spent over three decades advising on financial decisions that define
                  businesses. These include transactions that shift ownership, restructurings that preserve
                  enterprise value, and governance choices that outlast any single deal.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-base leading-relaxed text-gray-300">
                  He works with family-owned enterprises, holding groups, and growth-stage companies across
                  the Middle East. His clients face situations where capital, control, and legacy converge.
                  These are not spreadsheet problems. They are leadership decisions.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-base leading-relaxed text-gray-300">
                  His career was built across Siemens, Nokia Siemens Networks, and the PwC ecosystem,
                  operating in more than 17 markets from Dubai to Doha to Cairo. That experience shaped a
                  clear perspective. Technical precision matters. Judgment under fragmented regulation and
                  complex ownership matters more.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className="text-base leading-relaxed text-gray-300">
                  Sleiman has also held Group CFO roles with full accountability for capital allocation,
                  financial control, and direction in scaling and restructuring environments. He has sat
                  on both sides of the table. Advice that cannot be executed is not advice. It is commentary.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-base leading-relaxed text-gray-300">
                  At Tyconz (PwC) in Dubai, he led M&A transactions exceeding $50M and implemented governance
                  frameworks aligned with global standards. Across earlier and subsequent roles, he led
                  restructuring and financial strategy mandates in high-pressure situations where preserving
                  value required speed, discipline, and clear decision-making.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <p className="text-base leading-relaxed text-gray-300">
                  In 2015, he founded VisiWeal Strategic &amp; Financial Advisory on a simple premise. Complex
                  financial decisions require more than analysis. They require clarity, structure, and
                  accountability in execution.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-base leading-relaxed text-gray-300">
                  Fluent in English, Arabic, and French, Sleiman operates across the GCC, the Levant,
                  and international markets with a perspective grounded in both institutional standards
                  and regional realities.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* PHILOSOPHY */}
      <section className="py-28 md:py-36">
        <Container width="narrow">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-teal-500/15 bg-gradient-to-br from-teal-500/5 to-transparent p-10 text-center md:p-16">
              <Quote className="mx-auto mb-6 h-10 w-10 text-teal-400/40" />
              <blockquote className="text-2xl font-display font-light leading-relaxed text-white md:text-3xl">
                Where rigor meets relationships. Every engagement is a partnership built on institutional
                standards and personal accountability. We don&apos;t just advise. We sit on the same side
                of the table as our clients.
              </blockquote>
              <div className="mt-8">
                <p className="text-sm font-medium text-teal-400">Sleiman El-Khoury</p>
                <p className="text-xs text-gray-500">Founder, VisiWeal Strategic &amp; Financial Advisory</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      {/* SELECTED ENGAGEMENTS */}
      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-16 text-center">
              <Badge variant="brand" className="mb-4">Track Record</Badge>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Selected Engagements
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                A representative sample of the mandates led by Sleiman El-Khoury
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {engagements.map((e, i) => (
              <ScrollReveal key={e.num} delay={i * 0.1}>
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-sm font-bold text-teal-400">
                      {e.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-label text-brand-400/80">
                          {e.tag}
                        </p>
                        <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-300">
                          {e.result}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-display font-medium text-white">
                        {e.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
                        {e.detail}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>



      {/* AREAS OF ENGAGEMENT */}
      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-16 text-center">
              <Badge variant="brand" className="mb-4">Services</Badge>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Areas of Engagement
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                The breadth of Sleiman&apos;s advisory practice spans the full corporate finance lifecycle
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.key} delay={i * 0.08}>
                <Link href={`/${locale}/services/${s.key}`}>
                  <GlassCard className="group h-full">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 transition-colors group-hover:bg-teal-500/20">
                      <ServiceIcon index={i} />
                    </div>
                    <h3 className="mb-2 text-lg font-display font-medium text-white group-hover:text-teal-300 transition-colors">
                      {s.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-teal-400 opacity-0 transition-all group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-28 md:py-36">
        <Container width="narrow">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-teal-500/5 to-transparent p-10 text-center md:p-16">
              <Badge variant="brand" className="mb-4">Let&rsquo;s Talk</Badge>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Ready to Work with Sleiman?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-400">
                Schedule a confidential consultation to discuss how decades of institutional-grade
                advisory experience can be brought to bear on your most consequential decisions.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href={`/${locale}/book-consultation`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40"
                >
                  Book a Strategic Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white transition-all hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-400"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    /* M&A */ "\u2697",
    /* Financial */ "\u25A0",
    /* Digital */ "\u25B3",
    /* CFO */ "\u25CB",
    /* Restructuring */ "\u25B2",
    /* Feasibility */ "\u25A1",
  ];
  return <span className="text-lg">{icons[index] || "\u2605"}</span>;
}
