"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import GlassCard from "@/components/effects/glass-card";
import ScrollReveal from "@/components/effects/scroll-reveal";
import SectionDivider from "@/components/effects/section-divider";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export interface Stat {
  value: string;
  label: string;
}

export interface WhoItem {
  title: string;
  desc: string;
}

export interface DeliverableItem {
  title: string;
  desc: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

const serviceImages: Record<string, string> = {
  ma: "/images/service-ma-advisory.avif",
  financial: "/images/service-financial.avif",
  digital: "/images/service-digital.avif",
  cfo: "/images/service-cfo.avif",
  restructuring: "/images/service-restructuring.avif",
  feasibility: "/images/service-feasibility.avif",
};

interface ServicePageTemplateProps {
  serviceKey: string;
  locale: string;
  chartSection?: React.ReactNode;
  comparisonSection?: React.ReactNode;
}

export default function ServicePageTemplate({
  serviceKey,
  locale,
  chartSection,
  comparisonSection,
}: ServicePageTemplateProps) {
  const t = useTranslations("servicesDetails");
  const section = t.raw(serviceKey) as Record<string, unknown>;
  const labels = t.raw("sectionLabels") as Record<string, string>;

  const stats = section.stats as Stat[];
  const whoItsFor = section.whoItsFor as WhoItem[];
  const deliverables = section.deliverables as DeliverableItem[];
  const process = section.process as ProcessStep[];
  const relatedServices = section.relatedServices as string[];

  return (
    <main className="bg-surface">
      <HeroSection badge={section.heroBadge as string} title={section.heroTitle as string} sub={section.heroSub as string} locale={locale} serviceKey={serviceKey} />
      <OverviewSection desc1={section.overviewDesc1 as string} desc2={section.overviewDesc2 as string} stats={stats} labels={labels} />
      <SectionDivider />
      <ProcessSection process={process} labels={labels} />
      <SectionDivider />
      <WhoSection whoItsFor={whoItsFor} labels={labels} />
      <SectionDivider />
      <DeliverablesSection deliverables={deliverables} labels={labels} />
      {chartSection && (<><SectionDivider />{chartSection}</>)}
      {comparisonSection && (<><SectionDivider />{comparisonSection}</>)}
      <SectionDivider />
      <RelatedSection relatedServices={relatedServices} labels={labels} locale={locale} />
      <CTASection labels={labels} locale={locale} />
    </main>
  );
}

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fallbackImage = "/images/service-ma-advisory.avif";

function HeroSection({ badge, title, sub, locale, serviceKey }: { badge: string; title: string; sub: string; locale: string; serviceKey: string }) {
  const imagePath = serviceImages[serviceKey] || fallbackImage;
  return (
    <section className="relative overflow-hidden bg-surface pt-32 md:pt-40">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={imagePath}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-[#0C1820]/70" />
        <div className="absolute -left-[20%] -top-[30%] h-[80vh] w-[60vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/10 via-glow-teal/5 to-transparent" />
        <div className="absolute -bottom-[20%] -right-[15%] h-[60vh] w-[50vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/8 via-glow-teal/4 to-transparent" />
      </div>
      <div className="container-base relative z-10 pb-28 md:pb-36">
        <motion.div variants={heroContainer} initial="hidden" animate="visible">
          <motion.span variants={heroItem} className="text-label mb-4 block text-brand-400/80">{badge}</motion.span>
          <motion.h1 variants={heroItem} className="text-display mb-6 leading-[1.08] tracking-tight text-text-primary"><span className="font-semibold">{title}</span></motion.h1>
          <motion.p variants={heroItem} className="max-w-2xl text-body text-text-tertiary md:text-lg">{sub}</motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <HoverBorderGradient containerClassName="rounded-full" className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-3.5 text-sm font-medium text-white shadow-glow-teal md:text-base" highlightColor="#14B8A6">
              <Link href={"/" + locale + "/book-consultation"} className="inline-flex items-center gap-2">{title}</Link>
            </HoverBorderGradient>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 + i * 0.1 },
  }),
};

function OverviewSection({ desc1, desc2, stats, labels }: { desc1: string; desc2: string; stats: Stat[]; labels: Record<string, string> }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <h2 className="text-label mb-4 block text-brand-400/80">{labels.overview}</h2>
            <p className="text-body text-text-secondary leading-relaxed">{desc1}</p>
            <p className="mt-6 text-body text-text-tertiary leading-relaxed">{desc2}</p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <h3 className="text-label mb-6 block text-brand-400/80">{labels.stats}</h3>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={i} custom={i} variants={statVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <p className="text-metric text-gradient-brand">{stat.value}</p>
                  <p className="mt-1 text-caption text-text-tertiary">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ process, labels }: { process: ProcessStep[]; labels: Record<string, string> }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">{labels.process}</span>
          <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">{labels.processSub}</h2>
        </ScrollReveal>
        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {process.map((step, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard className="relative h-full">
                <span className="font-display absolute right-4 top-2 text-[100px] leading-none text-white opacity-[0.04] select-none">{step.num}</span>
                <div className="relative z-10">
                  <span className="text-label text-brand-400/60">{step.num}</span>
                  <h3 className="mt-3 text-heading-3 text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-body-small text-text-tertiary leading-relaxed">{step.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhoSection({ whoItsFor, labels }: { whoItsFor: WhoItem[]; labels: Record<string, string> }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">{labels.who}</span>
          <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">{labels.who}</h2>
        </ScrollReveal>
        <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {whoItsFor.map((item, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard className="h-full">
                <svg className="mb-4 h-8 w-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.913-.413M20.25 14.15a2.18 2.18 0 01-2.25 2.15h-12a2.18 2.18 0 01-2.25-2.15M6.75 8.25l3.75 3.75 2.25-2.25 4.5 4.5" />}
                  {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />}
                  {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />}
                </svg>
                <h3 className="text-heading-3 mb-2 text-text-primary">{item.title}</h3>
                <p className="text-body-small text-text-tertiary leading-relaxed">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DeliverablesSection({ deliverables, labels }: { deliverables: DeliverableItem[]; labels: Record<string, string> }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">{labels.deliverables}</span>
          <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">{labels.deliverables}</h2>
        </ScrollReveal>
        <motion.div className="grid gap-6 md:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {deliverables.map((item, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard className="h-full" hover={true}>
                <div className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/10 text-sm font-semibold text-brand-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-heading-3 mb-2 text-text-primary">{item.title}</h3>
                    <p className="text-body-small text-text-tertiary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RelatedSection({ relatedServices, labels, locale }: { relatedServices: string[]; labels: Record<string, string>; locale: string }) {
  const t = useTranslations("services");
  const serviceKeys: Record<string, string> = {
    ma: "maAdvisory",
    financial: "financialAdvisory",
    digital: "digitalTransformation",
    cfo: "fractionalCFO",
    restructuring: "corporateRestructuring",
    feasibility: "feasibilityStudies",
  };
  const serviceSlugs: Record<string, string> = {
    ma: "ma-advisory",
    financial: "financial-advisory",
    digital: "digital-transformation",
    cfo: "fractional-cfo",
    restructuring: "corporate-restructuring",
    feasibility: "feasibility-studies",
  };
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">{labels.related}</span>
          <h2 className="text-heading-1 mb-16 tracking-tight text-text-primary">{labels.related}</h2>
        </ScrollReveal>
        <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {relatedServices.map((key) => (
            <motion.div key={key} variants={staggerItem}>
              <Link href={"/" + locale + "/services/" + serviceSlugs[key]}>
                <GlassCard className="group h-full cursor-pointer" hover={true}>
                  <h3 className="text-heading-3 mb-3 text-text-primary group-hover:text-brand-400 transition-colors duration-300">{t(serviceKeys[key])}</h3>
                  <span className="inline-flex items-center gap-2 text-sm text-brand-400">{labels.explore}</span>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection({ labels, locale }: { labels: Record<string, string>; locale: string }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <GlassCard className="mx-auto max-w-2xl text-center">
            <span className="text-label mb-4 block text-brand-400/80">{labels.ctaTitle}</span>
            <p className="mt-4 text-body text-text-tertiary">{labels.ctaSub}</p>
            <div className="mt-8 flex justify-center">
              <HoverBorderGradient containerClassName="rounded-full" className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-3.5 text-sm font-medium text-white shadow-glow-teal md:text-base" highlightColor="#14B8A6">
                <Link href={"/" + locale + "/book-consultation"}>{labels.book}</Link>
              </HoverBorderGradient>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}