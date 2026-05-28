"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="font-display text-[120px] leading-none tracking-tight text-teal-500/20"
          aria-hidden="true"
        >
          {t("title")}
        </h1>
        <h2 className="mt-4 text-3xl font-medium text-white">
          {t("headline")}
        </h2>
        <p className="mt-3 text-gray-400">{t("message")}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40"
        >
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
