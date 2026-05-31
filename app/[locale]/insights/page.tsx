import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ScrollReveal from "@/components/effects/scroll-reveal";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import InsightsContent from "@/components/sections/insights-content";
import NewsletterForm from "@/components/sections/newsletter-form";

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

        </Container>
      </section>

      <InsightsContent
        categories={categories}
        featured={featured}
        articles={articles}
      />

      <SectionDivider />

      <NewsletterForm
        title={t("newsletter.title")}
        sub={t("newsletter.sub")}
        placeholder={t("newsletter.placeholder")}
        cta={t("newsletter.cta")}
        privacy={t("newsletter.privacy")}
      />
    </>
  );
}
