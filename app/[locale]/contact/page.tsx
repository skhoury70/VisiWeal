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
    title: "Financial Advisory for Dubai and the Middle East | VisiWeal",
    description: "Contact VisiWeal for strategic M&A, financial advisory, and fractional CFO services across Dubai, Riyadh, and the MENA region. Book a strategic consultation.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/contact`,
        ar: `${baseUrl}/ar/contact`,
      },
    },
    openGraph: {
      title: "Financial Advisory for Dubai and the Middle East | VisiWeal",
      description: "Strategic M&A, financial advisory, and fractional CFO services for enterprises across the MENA region. Book a strategic consultation.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <LocalBusinessSchema
        name="VisiWeal"
        description="Premium M&A, Financial Advisory, and Fractional CFO services for enterprise clients across the Middle East and beyond."
      />
      <BreadcrumbSchema
        items={[
          { name: "VisiWeal", url: "https://visiweal.com" },
          { name: "Contact", url: `https://visiweal.com/${locale === "en" ? "contact" : "ar/contact"}` },
        ]}
      />
      <ContactForm />
    </>
  );
}
