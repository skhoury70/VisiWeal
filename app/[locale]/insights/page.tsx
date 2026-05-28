import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  const t = await getTranslations({ locale, namespace: "insights" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/insights" : "/ar/insights";
  return {
    title: t("title"),
    description: t("sub"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/insights`,
        ar: `${baseUrl}/ar/insights`,
      },
    },
    openGraph: {
      title: `${t("title")} | Visiweal`,
      description: t("sub"),
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const categories = t.raw("categories") as Record<string, string>;
  const featured = t.raw("featured") as {
    category: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    slug: string;
    image: string;
  };
  const articles = t.raw("articles") as Array<{
    category: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    slug: string;
    image: string;
  }>;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Insights", url: `https://visiweal.com/${locale === "en" ? "insights" : "ar/insights"}` },
        ]}
      />
      <section className="relative overflow-hidden pt-40 pb-28 md:pb-36">
        <div className="absolute inset-0">
          <Image
            src="/images/Insights-Article.avif"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1820]/80 via-[#0C1820]/30 to-[#0C1820]/80" />
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

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {Object.values(categories).map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:border-teal-500/30 hover:text-teal-400"
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mb-16">
              <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Featured
              </p>
              <Link href={`/${locale}/insights/${featured.slug}`}>
                <GlassCard className="group relative overflow-hidden p-0">
                  <div className="absolute inset-0">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover object-center opacity-60 transition-opacity duration-700 group-hover:opacity-70"
                      sizes="100vw"
                      loading="lazy"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0C1820] via-[#0C1820]/50 to-[#0C1820]/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent mix-blend-overlay" />
                  <div className="relative p-8 md:p-12">
                    <Badge className="mb-4 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                      {featured.category}
                    </Badge>
                    <h2 className="mb-4 text-2xl font-display font-medium text-white md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-400">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{featured.author}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-600" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, i) => (
              <ScrollReveal key={article.title} delay={i * 0.06}>
                <Link href={`/${locale}/insights/${article.slug}`}>
                  <GlassCard className="group h-full overflow-hidden">
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-t-xl">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        loading="lazy"
                        quality={80}
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,24,32,0.3) 0%, rgba(12,24,32,0.7) 100%)' }} />
                      <Badge className="absolute bottom-3 left-3 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                        {article.category}
                      </Badge>
                    </div>
                    <div className="px-4 pb-4">
                      <h3 className="mb-3 text-lg font-display font-medium text-white transition-colors group-hover:text-teal-400">
                        {article.title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-400">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="mb-4 text-3xl font-display font-light text-white md:text-4xl">
                {t("newsletter.title")}
              </h2>
              <p className="mb-8 text-gray-400">
                {t("newsletter.sub")}
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-teal-500/30"
                />
                <button className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40">
                  {t("newsletter.cta")}
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-600">
                {t("newsletter.privacy")}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
