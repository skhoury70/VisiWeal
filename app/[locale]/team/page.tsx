import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/team" : "/ar/team";
  return {
    title: "Our Team — " + t("title"),
    description: t("sub"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/team`,
        ar: `${baseUrl}/ar/team`,
      },
    },
    openGraph: {
      title: `${t("title")} | Visiweal`,
      description: t("sub"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const members = t.raw("members") as Array<{
    name: string;
    nameAr: string;
    title: string;
    practice: string;
    location: string;
    bio: string;
    category: string;
  }>;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Team", url: `https://visiweal.com/${locale === "en" ? "team" : "ar/team"}` },
        ]}
      />
      <section className="relative overflow-hidden pt-40 pb-28 md:pb-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />
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
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <GlassCard className="group h-full">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 text-2xl font-display font-medium text-teal-400 transition-transform duration-500 group-hover:scale-110">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-medium text-white">
                        {locale === "ar" ? member.nameAr : member.name}
                      </h3>
                      <p className="text-sm font-medium text-teal-400">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <p className="mb-3 text-xs text-gray-500">
                    {member.practice} &middot; {member.location}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {member.bio}
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
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-display font-light text-white md:text-4xl">
                {t("joinUs")}
              </h2>
              <p className="mb-8 text-gray-400">
                {t("joinUsSub")}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
