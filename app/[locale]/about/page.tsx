import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/about" : "/ar/about";

  return {
    title: "About Us — " + t("title"),
    description: t("sub"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/about`,
        ar: `${baseUrl}/ar/about`,
      },
    },
    openGraph: {
      title: `${t("title")} | Visiweal`,
      description: t("sub"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

const DOT_SEED = 42;
function seededRandom(seed: number, idx: number) {
  const x = Math.sin(seed + idx) * 10000;
  return x - Math.floor(x);
}

const offices = [
  {
    city: "Dubai",
    address: "Gate Building, DIFC\nDubai, United Arab Emirates",
    localeKey: "footer.dubai",
  },
  {
    city: "Riyadh",
    address: "King Abdullah Financial District\nRiyadh, Kingdom of Saudi Arabia",
    localeKey: "footer.riyadh",
  },
  {
    city: "Cairo",
    address: "Zamalek\nCairo, Egypt",
    localeKey: "footer.cairo",
  },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const teamT = await getTranslations({ locale, namespace: "team" });
  const teamHref = `/${locale}/team`;

  const timeline = t.raw("timeline") as Array<{
    year: string;
    title: string;
    desc: string;
  }>;
  const values = t.raw("values") as Array<{
    title: string;
    desc: string;
  }>;
  const diffItems = t.raw("difference.items") as Array<[string, string]>;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "About", url: `https://visiweal.com/${locale === "en" ? "about" : "ar/about"}` },
        ]}
      />
      <section className="relative overflow-hidden pt-40 pb-28 md:pb-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />

          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/10"
              style={{
                left: `${seededRandom(DOT_SEED, i * 3) * 100}%`,
                top: `${seededRandom(DOT_SEED, i * 3 + 1) * 100}%`,
                animation: `fade-in ${1.5 + seededRandom(DOT_SEED, i * 3 + 2) * 2}s ease-out ${seededRandom(DOT_SEED, i * 3 + 3) * 2}s both`,
              }}
            />
          ))}
        </div>

        <Container className="relative">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-teal-400 uppercase">
                {t("title")}
              </Badge>
              <h1 className="mb-6 text-5xl font-display font-light leading-tight tracking-tight text-white md:text-7xl">
                {t("title")}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                {t("sub")}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-[1fr_40%]">
            <div className="space-y-6">
              <ScrollReveal direction="left" delay={0.1}>
                <GlassCard className="h-full">
                  <p className="text-base leading-relaxed text-gray-300">
                    {t("mission1")}
                  </p>
                </GlassCard>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <GlassCard className="h-full">
                  <p className="text-base leading-relaxed text-gray-300">
                    {t("mission2")}
                  </p>
                </GlassCard>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right" delay={0.15}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/about-executive.avif"
                  alt="Visiweal executive advisory team in premium consultation environment"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 40vw"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #0C1820 0%, transparent 30%)' }} />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-[rgba(29,191,160,0.2)]" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Our Journey
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Story Timeline
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent" />

            <div className="space-y-16">
              {timeline.map((m, i) => (
                <ScrollReveal
                  key={m.year}
                  delay={i * 0.12}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`relative flex items-center gap-8 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col`}
                  >
                    <div className="flex-1">
                      <GlassCard
                        className={i % 2 === 0 ? "text-right md:text-left" : "text-left md:text-right"}
                      >
                        <p className="mb-1 text-sm font-bold text-teal-400">
                          {m.year}
                        </p>
                        <h3 className="mb-2 text-xl font-display font-medium text-white">
                          {m.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {m.desc}
                        </p>
                      </GlassCard>
                    </div>

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal-500/40 bg-surface text-sm font-bold text-teal-400 shadow-lg shadow-teal-500/10">
                      {i + 1}
                    </div>

                    <div className="flex-1 md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Our Principles
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Values That Drive Us
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.12}>
                <GlassCard className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/10">
                    <ValueIcon index={i} />
                  </div>
                  <h3 className="mb-3 text-xl font-display font-medium text-white">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {v.desc}
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
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                {t("difference.title")}
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                {t("difference.title")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="overflow-hidden p-0">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-white/[0.06] p-8 md:border-b-0 md:border-r">
                  <p className="mb-6 text-sm font-semibold tracking-wider text-red-400 uppercase">
                    {t("difference.traditional")}
                  </p>
                  <ul className="space-y-5">
                    {diffItems.map(([item]) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-gray-500"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                          <span className="text-xs text-red-400">&#10005;</span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8">
                  <p className="mb-6 text-sm font-semibold tracking-wider text-teal-400 uppercase">
                    {t("difference.visiweal")}
                  </p>
                  <ul className="space-y-5">
                    {diffItems.map(([, item]) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-gray-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10">
                          <Check className="h-3 w-3 text-teal-400" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Leadership
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-2 text-gray-500">
                Seasoned advisors with deep regional and global expertise
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const member = teamT.raw("members")[i] as {
                name: string;
                title: string;
                practice: string;
                location: string;
                bio: string;
              };
              return (
                <ScrollReveal key={member.name} delay={i * 0.12}>
                  <Link href={teamHref}>
                    <GlassCard className="group h-full transition-all">
                      <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white/[0.03]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 text-2xl font-display font-medium text-teal-400 transition-transform duration-500 group-hover:scale-110">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                      <h3 className="mb-1 text-lg font-display font-medium text-white">
                        {member.name}
                      </h3>
                      <p className="mb-1 text-sm font-medium text-teal-400">
                        {member.title}
                      </p>
                      <p className="mb-3 text-xs text-gray-500">
                        {member.practice} &middot; {member.location}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-400">
                        {member.bio}
                      </p>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href={teamHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3 text-sm font-medium text-white transition-all hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-400"
              >
                View Full Team
                <span className="text-teal-400">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Global Footprint
              </p>
              <h2 className="text-3xl font-display font-light text-white md:text-4xl">
                Our Offices
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {offices.map((office, i) => (
              <ScrollReveal key={office.city} delay={i * 0.12}>
                <GlassCard className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10">
                    <MapPinIcon />
                  </div>
                  <h3 className="mb-2 text-lg font-display font-medium text-white">
                    {office.city}
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-400">
                    {office.address}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ValueIcon({ index }: { index: number }) {
  const icons = ["\u2696", "\u25CE", "\u2197"];
  return (
    <span className="text-xl text-teal-400">{icons[index] || "\u2605"}</span>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}
