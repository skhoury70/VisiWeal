import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import LenisProvider from "@/components/layout/lenis-provider";
import { OrganizationSchema } from "@/components/seo/json-ld";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://visiweal.com";
  const path = "";

  return {
    title: {
      default: t("title"),
      template: "%s | Visiweal",
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}${path}`,
        ar: `${baseUrl}/ar${path}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_AE" : "en_US",
      type: "website",
      siteName: "Visiweal",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Visiweal — Strategic M&A & Financial Advisory",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LenisProvider>
        <OrganizationSchema locale={locale} />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
