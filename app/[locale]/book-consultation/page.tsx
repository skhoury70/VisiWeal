import BookConsultationForm from "./book-consultation-form";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const baseUrl = "https://visiweal.com";
  const path = locale === "en" ? "/book-consultation" : "/ar/book-consultation";
  return {
    title: "Book a Strategic Consultation in Dubai and MENA | VisiWeal",
    description: "Book a confidential strategic consultation with VisiWeal's senior advisors for M&A, financial advisory, and CFO services across Dubai and the MENA region.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/en/book-consultation`,
        ar: `${baseUrl}/ar/book-consultation`,
      },
    },
    openGraph: {
      title: "Book a Strategic Consultation in Dubai and MENA | VisiWeal",
      description: "Book a confidential strategic consultation with VisiWeal's senior advisors for enterprise clients across the MENA region.",
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
          { name: "VisiWeal", url: "https://visiweal.com" },
          { name: "Book a Strategic Consultation", url: `https://visiweal.com/${locale === "en" ? "book-consultation" : "ar/book-consultation"}` },
        ]}
      />
      <BookConsultationForm />
    </>
  );
}
