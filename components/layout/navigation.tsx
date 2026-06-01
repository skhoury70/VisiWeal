"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  // { key: "trackRecord", href: "/track-record" }, // hidden — enable when track record page is ready
  // { key: "team", href: "/team" }, // hidden — enable when team page is ready
  { key: "founder", href: "/founder" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
];

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const setScrolled = useState(false)[1];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrolled]);

  const otherLocale = locale === "en" ? "ar" : "en";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-300"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Visiweal"
              width={56}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const href = `/${locale}${item.href === "/" ? "" : item.href}`;
              const isActive = pathname === href;
              if (item.key === "services") {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={href}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                        isActive || megaOpen
                          ? "text-teal-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t(item.key)}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-teal-500" />
                      )}
                    </Link>
                    {megaOpen && (
                      <div className="absolute left-0 mt-0 w-64 rounded-b-2xl border border-gray-200 bg-white shadow-xl">
                        <div className="p-4">
                          <div className="space-y-1">
                            {[
                              { key: "maAdvisory", href: "/services/ma-advisory" },
                              { key: "financialAdvisory", href: "/services/financial-advisory" },
                              { key: "digitalTransformation", href: "/services/digital-transformation" },
                              { key: "fractionalCFO", href: "/services/fractional-cfo" },
                              { key: "corporateRestructuring", href: "/services/corporate-restructuring" },
                              { key: "feasibilityStudies", href: "/services/feasibility-studies" },
                            ].map((s) => (
                              <Link
                                key={s.key}
                                href={`/${locale}${s.href}`}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                              >
                                {t(s.key)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-teal-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={switchPath}
              className="hidden rounded-md border border-teal-500/30 px-3 py-1.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50 hover:text-teal-700 md:block"
            >
              {locale === "en" ? "AR" : "EN"}
            </Link>

            <Link
              href={`/${locale}/book-consultation`}
              className="hidden rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 md:block"
            >
              {t("bookConsultation")}
            </Link>

            <button
              className="flex flex-col gap-1.5 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 w-6 bg-gray-800 transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-gray-800 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-gray-800 transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white md:hidden">
          <nav className="flex flex-col gap-2 p-6">
            {navItems.map((item, i) => {
              const href = `/${locale}${item.href === "/" ? "" : item.href}`;
              return (
                <Link
                  key={item.key}
                  href={href}
                  className="border-b border-gray-100 py-4 text-lg font-medium text-gray-700 transition-colors hover:text-teal-600"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <Link
              href={switchPath}
              className="mt-4 rounded-md border border-teal-500/30 py-3 text-center text-lg font-semibold text-teal-600"
              onClick={() => setMobileOpen(false)}
            >
              {locale === "en" ? "AR" : "EN"}
            </Link>
            <Link
              href={`/${locale}/book-consultation`}
              className="mt-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-teal-500/20"
              onClick={() => setMobileOpen(false)}
            >
              {t("bookConsultation")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
