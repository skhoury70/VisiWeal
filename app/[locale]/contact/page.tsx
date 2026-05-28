import { getTranslations } from "next-intl/server";
import ContactForm from "./contact-form";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/contact" : "/ar/contact";
  return {
    title: "Contact Us — " + t("title"),
    description: "Get in touch with Visiweal's team of strategic M&A, financial advisory, and fractional CFO experts in Dubai, Riyadh, and across the Middle East. Contact our offices for a confidential discussion.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/contact`,
        ar: `${baseUrl}/ar/contact`,
      },
    },
    openGraph: {
      title: `Contact Us | Visiweal`,
      description: "Reach Visiweal's premium strategic advisory team serving enterprise clients across the MENA region and beyond.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <LocalBusinessSchema
        name="Visiweal"
        description="Premium M&A, Financial Advisory, and Fractional CFO services for enterprise clients across the Middle East and beyond."
      />
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Contact", url: `https://visiweal.com/${locale === "en" ? "contact" : "ar/contact"}` },
        ]}
      />
      <ContactForm />
    </>
  );
}
