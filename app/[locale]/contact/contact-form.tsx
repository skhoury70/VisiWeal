"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import SectionDivider from "@/components/effects/section-divider";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/visiweal/",
    label: "LinkedIn",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/VisiWeal1",
    label: "X",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@VisiWeal",
    label: "YouTube",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/visiweal/",
    label: "Facebook",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

type FormData = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  contactMethod: string;
};

export default function ContactForm() {
  const t = useTranslations("contact");
  const [data, setData] = useState<FormData>({
    name: "", company: "", role: "", email: "", phone: "",
    service: "", message: "", contactMethod: "Email",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const services = t.raw("form.services") as string[];
  const contactMethods = t.raw("form.contactMethods") as string[];
  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-teal-500/30 focus:bg-white/[0.06]";
  const selectStyle =
    "w-full rounded-xl border border-white/10 bg-[#071017] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-teal-500/30 focus:bg-[#0a1a24]";

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = t("form.required");
    if (!data.email.trim()) newErrors.email = t("form.required");
    if (!data.message.trim()) newErrors.message = t("form.required");
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setErrors({ form: t("form.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-surface">
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0">
          <Image
            src="/images/contact.avif"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1820]/70 via-[#0C1820]/30 to-[#0C1820]/70" />
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />
        </div>

        <div className="container-base relative">
          <ScrollReveal direction="up">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-6 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-teal-400 uppercase">
                {t("heroBadge")}
              </Badge>
              <h1 className="mb-6 text-5xl font-display font-light leading-tight tracking-tight text-white md:text-7xl">
                {t("title")}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                {t("sub")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      <section className="py-28 md:py-36">
        <div className="container-base">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
                      {t("info.title")}
                    </h2>
                    <p className="text-body text-text-tertiary">
                      {t("info.sub")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-text-tertiary">
                      <Mail className="h-5 w-5 text-brand-400" />
                      <span>info@visiweal.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-tertiary">
                      <Phone className="h-5 w-5 text-brand-400" />
                      <span>{t("info.phone")}</span>
                    </div>
                    <div className="flex items-start gap-4 text-sm text-text-tertiary">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <p>{t("info.beirut")}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-teal-500/30 hover:text-teal-400"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>

                  <p className="text-sm italic text-text-tertiary">
                    {t("geography")}
                  </p>

                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.15}>
                <GlassCard className="overflow-hidden p-0">
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center px-6 py-24 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500"
                        >
                          <Check className="h-8 w-8 text-white" />
                        </motion.div>
                        <p className="mt-6 text-lg text-white">
                          {t("form.success")}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="p-8 md:p-10"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-name">
                              {t("form.name")}
                            </label>
                            <input
                              suppressHydrationWarning
                              id="contact-name"
                              className={inputStyle}
                              value={data.name}
                              onChange={(e) => update("name", e.target.value)}
                              placeholder={t("form.name")}
                            />
                            {errors.name && (
                              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-company">
                              {t("form.company")}
                            </label>
                            <input
                              suppressHydrationWarning
                              id="contact-company"
                              className={inputStyle}
                              value={data.company}
                              onChange={(e) => update("company", e.target.value)}
                              placeholder={t("form.company")}
                            />
                            {errors.company && (
                              <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-email">
                              {t("form.email")}
                            </label>
                            <input
                              suppressHydrationWarning
                              id="contact-email"
                              type="email"
                              className={inputStyle}
                              value={data.email}
                              onChange={(e) => update("email", e.target.value)}
                              placeholder={t("form.email")}
                            />
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-phone">
                              {t("form.phone")}
                            </label>
                            <input
                              suppressHydrationWarning
                              id="contact-phone"
                              type="tel"
                              className={inputStyle}
                              value={data.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              placeholder={t("form.phone")}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-role">
                              {t("form.role")}
                            </label>
                            <input
                              suppressHydrationWarning
                              id="contact-role"
                              className={inputStyle}
                              value={data.role}
                              onChange={(e) => update("role", e.target.value)}
                              placeholder={t("form.role")}
                            />
                          </div>
                        </div>

                        <div className="mt-5">
                          <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-service">
                            {t("form.serviceInterest")}
                          </label>
                          <select
                            suppressHydrationWarning
                            id="contact-service"
                            className={selectStyle}
                            value={data.service}
                            onChange={(e) => update("service", e.target.value)}
                          >
                            <option value="" className="bg-[#071017]">
                              {t("form.serviceInterest")}
                            </option>
                            {services.map((s) => (
                              <option key={s} value={s} className="bg-[#071017]">
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-5">
                          <label className="mb-1.5 block text-sm text-gray-400" htmlFor="contact-message">
                            {t("form.message")}
                          </label>
                          <textarea
                            suppressHydrationWarning
                            id="contact-message"
                            rows={4}
                            className={inputStyle + " resize-none"}
                            value={data.message}
                            onChange={(e) => update("message", e.target.value)}
                            placeholder={t("form.message")}
                          />
                          {errors.message && (
                            <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                          )}
                        </div>

                        <div className="mt-5">
                          <span className="mb-3 block text-sm text-gray-400">
                            {t("form.preferredContact")}
                          </span>
                          <div className="flex flex-wrap gap-4">
                            {contactMethods.map((method) => (
                              <label
                                key={method}
                                className="flex cursor-pointer items-center gap-2 text-sm text-gray-300"
                              >
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                                    data.contactMethod === method
                                      ? "border-teal-500 bg-teal-500"
                                      : "border-white/20"
                                  }`}
                                >
                                  {data.contactMethod === method && (
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <input
                                  suppressHydrationWarning
                                  type="radio"
                                  name="contactMethod"
                                  value={method}
                                  checked={data.contactMethod === method}
                                  onChange={(e) => update("contactMethod", e.target.value)}
                                  className="sr-only"
                                />
                                {method}
                              </label>
                            ))}
                          </div>
                        </div>

                        <button
                          suppressHydrationWarning
                          type="submit"
                          disabled={loading}
                          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 disabled:opacity-50"
                        >
                          {loading ? t("form.sending") : (
                            <>{t("form.send")} <Send className="h-4 w-4" /></>
                          )}
                        </button>

                        {errors.form && (
                          <p className="mt-4 text-center text-sm text-red-400">{errors.form}</p>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
