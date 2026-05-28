import React from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/effects/scroll-reveal";
import SectionDivider from "@/components/effects/section-divider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema, JsonLd } from "@/components/seo/json-ld";

type ArticleSection = {
  heading?: string;
  subheading?: string;
  content: string;
};

type ArticleData = {
  title: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  sections: ArticleSection[];
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const articles = t.raw("articleContents") as Record<string, ArticleData> | undefined;
  const article = articles?.[slug];
  if (!article) return {};
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? `/insights/${slug}` : `/ar/insights/${slug}`;
  return {
    title: `${article.title} | Visiweal`,
    description: article.sections[0]?.content?.slice(0, 160) ?? "",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/insights/${slug}`,
        ar: `${baseUrl}/ar/insights/${slug}`,
      },
    },
    openGraph: {
      title: `${article.title} | Visiweal`,
      description: article.sections[0]?.content?.slice(0, 160) ?? "",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const articles = t.raw("articleContents") as Record<string, ArticleData> | undefined;
  const article = articles?.[slug];

  if (!article) notFound();

  const baseUrl = "https://visiweal.com";
  const insightsPath = locale === "en" ? "/insights" : "/ar/insights";
  const articlePath = locale === "en" ? `/insights/${slug}` : `/ar/insights/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Person", name: article.author },
    image: `${baseUrl}${article.image}`,
    datePublished: "2026-02-01",
    publisher: {
      "@type": "Organization",
      name: "Visiweal",
      logo: { "@type": "ImageObject", url: `${baseUrl}/images/logo.avif` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}${articlePath}` },
  };

  function renderLinks(text: string): React.ReactNode {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const isExternal = match[2].startsWith("http");
        return (
          <a
            key={i}
            href={match[2]}
            className="text-teal-400 underline decoration-teal-500/30 underline-offset-2 transition-colors hover:text-teal-300"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[1]}
          </a>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  }

  function renderContent(text: string) {
    const processed = text.replace(/\{locale\}/g, locale);
    return processed.split("\n\n").map((paragraph, i) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;
      const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("• ");
      const isLink = trimmed.startsWith("→") || trimmed.startsWith("—");
      if (isBullet) {
        return (
          <li key={i} className="ml-5 list-disc text-gray-400">
            {renderLinks(trimmed.replace(/^[- •]\s*/, ""))}
          </li>
        );
      }
      return (
        <p key={i} className={`leading-relaxed text-gray-400 ${isLink ? "italic" : ""}`}>
          {renderLinks(trimmed)}
        </p>
      );
    });
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: baseUrl },
          { name: "Insights", url: `${baseUrl}${insightsPath}` },
          { name: article.title, url: `${baseUrl}${articlePath}` },
        ]}
      />
      <JsonLd data={articleSchema} />

      <section className="relative overflow-hidden pt-40 pb-12 md:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />
        </div>

        <Container className="relative">
          <ScrollReveal>
            <Link
              href={`/${locale}/insights`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-teal-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {locale === "ar" ? "العودة إلى الرؤى" : "Back to Insights"}
            </Link>
          </ScrollReveal>

          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <Badge className="mb-4 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                {article.category}
              </Badge>
              <h1 className="mb-4 text-3xl font-display font-medium leading-tight text-white md:text-5xl">
                {article.title}
              </h1>
              <div className="mb-8 flex items-center gap-4 text-sm text-gray-500">
                <span>{article.author}</span>
                <span className="h-1 w-1 rounded-full bg-gray-600" />
                <span>{article.readTime}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative mb-12 aspect-[2/1] overflow-hidden rounded-xl">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1820] via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            {article.sections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.03}>
                <div>
                  {section.heading && (
                    <h2 className="mb-3 text-xl font-display font-medium text-white md:text-2xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <h3 className="mb-3 text-base font-display font-medium text-teal-400">
                      {section.subheading}
                    </h3>
                  )}
                  {section.content && (
                    <div className="space-y-4">
                      {renderContent(section.content)}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="py-20 md:py-28">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="mb-4 text-2xl font-display font-light text-white md:text-3xl">
                {locale === "ar" ? "هل أنت مستعد لبدء تقييم جاهزية صفقتك؟" : "Ready to Start Your Transaction Readiness Assessment?"}
              </h2>
              <p className="mb-8 text-gray-400">
                {locale === "ar"
                  ? "تواصل مع فريقنا للاستشارات المالية المؤسسية اليوم."
                  : "Speak with our Corporate Finance team to begin your transaction readiness assessment."}
              </p>
              <Link
                href={`/${locale}/book-consultation`}
                className="inline-flex rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40"
              >
                {locale === "ar" ? "احجز استشارة" : "Book a Consultation"}
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
