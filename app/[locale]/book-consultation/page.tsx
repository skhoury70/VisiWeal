import { getTranslations } from "next-intl/server";
import BookConsultationForm from "./book-consultation-form";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "consultation" });
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/book-consultation" : "/ar/book-consultation";
  return {
    title: "Book a Consultation — " + t("title"),
    description: "Schedule a 45-minute strategic consultation with Visiweal's senior M&A, financial advisory, and fractional CFO experts. Discuss your business objectives and discover how we drive value creation across the Middle East.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/book-consultation`,
        ar: `${baseUrl}/ar/book-consultation`,
      },
    },
    openGraph: {
      title: `Book a Strategic Consultation | Visiweal`,
      description: "Schedule a confidential strategic consultation with Visiweal's senior advisors for enterprise clients across the MENA region.",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function BookConsultationPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Visiweal", url: "https://visiweal.com" },
          { name: "Book Consultation", url: `https://visiweal.com/${locale === "en" ? "book-consultation" : "ar/book-consultation"}` },
        ]}
      />
      <BookConsultationForm />
    </>
  );
}
