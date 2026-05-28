import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/effects/scroll-reveal";
import SectionDivider from "@/components/effects/section-divider";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/privacy-policy" : "/ar/privacy-policy";
  return {
    title: t("title"),
    description: "Visiweal's Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or engage our M&A, financial advisory, and consulting services.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/privacy-policy`,
        ar: `${baseUrl}/ar/privacy-policy`,
      },
    },
    openGraph: {
      title: `${t("title")} | Visiweal`,
      description: "Learn how Visiweal protects your personal information and respects your privacy.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: t("title"), url: `https://visiweal.com/${locale === "en" ? "privacy-policy" : "ar/privacy-policy"}` },
        ]}
      />
      <main className="bg-surface">
        <section className="relative overflow-hidden pt-32 md:pt-40">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute -left-[20%] -top-[30%] h-[80vh] w-[60vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/10 via-glow-teal/5 to-transparent" />
          </div>
          <div className="container-base relative z-10 pb-20 md:pb-28">
            <ScrollReveal direction="up">
              <span className="text-label mb-4 block text-brand-400/80">{t("lastUpdated")}</span>
              <h1 className="text-display mb-6 leading-[1.08] tracking-tight text-text-primary">{t("title")}</h1>
            </ScrollReveal>
          </div>
        </section>
        <SectionDivider />
        <section className="py-20 md:py-28">
          <div className="container-base">
            <div className="mx-auto max-w-3xl space-y-12">
              {sections.map((section, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.05}>
                  <div>
                    <h2 className="text-heading-2 mb-4 text-text-primary">{section.title}</h2>
                    <p className="text-body text-text-tertiary leading-relaxed">{section.content}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
