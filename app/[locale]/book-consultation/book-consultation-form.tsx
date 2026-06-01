"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

type FormData = {
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  services: string[];
  date: string;
  timeSlot: string;
  hearAbout: string;
  notes: string;
};

const initial: FormData = {
  fullName: "", company: "", jobTitle: "", email: "", phone: "",
  services: [], date: "", timeSlot: "", hearAbout: "", notes: "",
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const hearAboutOptions = ["LinkedIn", "Google Search", "Client Referral", "Conference / Event", "Social Media", "Other"];

const serviceKeys = [
  "maAdvisory", "financialAdvisory", "digitalTransformation",
  "fractionalCFO", "corporateRestructuring", "feasibilityStudies",
];

const TIME_SLOTS = [
  "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00",
  "15:00 - 16:00", "16:00 - 17:00",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isPastDate(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

function isPastTimeSlot(slot: string) {
  const hour = parseInt(slot, 10);
  const now = new Date();
  return now.getHours() >= hour + 1;
}

export default function BookConsultationForm() {
  const t = useTranslations("consultation");
  const tSvc = useTranslations("services");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleService = (svc: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const calendarDays = useMemo(() => {
    const { year, month } = calendarMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    return grid;
  }, [calendarMonth]);

  const prevMonth = () => {
    setCalendarMonth((prev) => {
      const m = prev.month - 1;
      return m < 0 ? { year: prev.year - 1, month: 11 } : { ...prev, month: m };
    });
  };

  const nextMonth = () => {
    setCalendarMonth((prev) => {
      const m = prev.month + 1;
      return m > 11 ? { year: prev.year + 1, month: 0 } : { ...prev, month: m };
    });
  };

  useEffect(() => {
    if (data.date) {
      fetch(`/api/slots?date=${data.date}`)
        .then((r) => r.json())
        .then((res) => setTakenSlots(res.takenSlots ?? []))
        .catch(() => setTakenSlots([]));
    }
  }, [data.date]);

  const selectDate = (day: number) => {
    const { year, month } = calendarMonth;
    const d = new Date(year, month, day);
    const dateStr = d.toLocaleDateString("en-CA");
    setData((prev) => ({ ...prev, date: dateStr, timeSlot: "" }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.date;
      return next;
    });
  };

  const selectTime = (slot: string) => {
    setData((prev) => ({ ...prev, timeSlot: slot }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.timeSlot;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!data.fullName.trim()) newErrors.fullName = t("required");
    if (!data.email.trim()) newErrors.email = t("required");
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) newErrors.email = t("emailInvalid");
    if (!data.phone.trim()) newErrors.phone = t("required");
    if (!data.date) newErrors.date = t("required");
    if (!data.timeSlot) newErrors.timeSlot = t("required");
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setErrors({ form: t("error") });
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0 && !data.fullName.trim()) newErrors.fullName = t("required");
    if (s === 1) {
      if (!data.email.trim()) newErrors.email = t("required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) newErrors.email = t("emailInvalid");
      if (!data.phone.trim()) newErrors.phone = t("required");
    }
    if (s === 3) {
      if (!data.date) newErrors.date = t("required");
      if (!data.timeSlot) newErrors.timeSlot = t("required");
    }
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
    return true;
  };

  const goTo = (s: number) => {
    const goingForward = s > step;
    if (goingForward && !validateStep(step)) return;
    setDir(goingForward ? 1 : -1);
    setErrors({});
    setStep(s);
  };

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  if (success) {
    return (
      <main className="bg-surface min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500"
          >
            <Check className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-display font-light text-white md:text-4xl">
            {t("success")}
          </h1>
        </motion.div>
      </main>
    );
  }

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-teal-500/30 focus:bg-white/[0.06]";
  const selectStyle =
    "w-full rounded-xl border border-white/10 bg-[#071017] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-teal-500/30 focus:bg-[#0a1a24]";

  const requiredLabel = (label: string, isReq = true) => (
    <span>{label}{isReq && <span className="ml-1 text-red-400">*</span>}</span>
  );

  const monthLabel = new Date(calendarMonth.year, calendarMonth.month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="bg-surface min-h-screen">
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-28 md:pb-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-[120px]" />
        </div>

        <div className="container-base relative">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{t("step")} {step + 1}/{totalSteps}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={dir}>
                {step === 0 && (
                  <motion.div key="s0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h1 className="text-4xl font-display font-light text-white md:text-5xl mb-6">{t("title")}</h1>
                    <p className="text-gray-400 mb-10">{t("sub")}</p>
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {(t as unknown as { raw: (k: string) => string[] }).raw
                        ? (t as unknown as { raw: (k: string) => string[] }).raw("whatToExpect").map((item: string, i: number) => (
                            <div key={i} className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-4 text-sm text-gray-300">
                              <span className="mb-1 block text-teal-400 text-xs uppercase tracking-wider">{`0${i + 1}`}</span>
                              {item}
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-fullname">{requiredLabel(t("fullName"))}</label>
                        <input suppressHydrationWarning id="book-fullname" className={inputStyle} value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder={t("fullName")} />
                        {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-company">{t("company")}</label>
                        <input suppressHydrationWarning id="book-company" className={inputStyle} value={data.company} onChange={(e) => update("company", e.target.value)} placeholder={t("company")} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-jobtitle">{t("jobTitle")}</label>
                        <input suppressHydrationWarning id="book-jobtitle" className={inputStyle} value={data.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder={t("jobTitle")} />
                      </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <button suppressHydrationWarning type="button" onClick={() => goTo(1)} className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40">{t("next")}</button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-display font-light text-white mb-6">{t("contactTitle")}</h2>
                    <p className="mb-6 text-xs text-gray-500"><span className="text-red-400">*</span> {t("requiredLabel")}</p>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-email">{requiredLabel(t("email"))}</label>
                        <input suppressHydrationWarning id="book-email" type="email" className={inputStyle} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder={t("email")} />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-phone">{requiredLabel(t("phone"))}</label>
                        <input suppressHydrationWarning id="book-phone" type="tel" className={inputStyle} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t("phone")} />
                        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="mt-10 flex justify-between">
                      <button suppressHydrationWarning type="button" onClick={() => goTo(0)} className="rounded-full border border-white/10 px-8 py-3 text-sm text-gray-300 hover:border-teal-500/30">{t("back")}</button>
                      <button suppressHydrationWarning type="button" onClick={() => goTo(2)} className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20">{t("next")}</button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-display font-light text-white mb-1">{t("serviceTitle")}</h2>
                    <p className="mb-6 text-xs text-gray-500">{t("serviceMulti")}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceKeys.map((sk) => {
                        const selected = data.services.includes(sk);
                        return (
                          <button key={sk} type="button" onClick={() => toggleService(sk)}
                            className={`rounded-xl border p-4 text-left text-sm transition-all ${
                              selected ? "border-teal-500 bg-teal-500/10 text-teal-400" : "border-white/10 text-gray-300 hover:border-white/20"
                            }`}>
                            {tSvc(sk)}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && <p className="mt-2 text-xs text-red-400">{errors.services}</p>}
                    <div className="mt-10 flex justify-between">
                      <button suppressHydrationWarning type="button" onClick={() => goTo(1)} className="rounded-full border border-white/10 px-8 py-3 text-sm text-gray-300">{t("back")}</button>
                      <button suppressHydrationWarning type="button" onClick={() => goTo(3)} className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white">{t("next")}</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-display font-light text-white mb-6">{t("dateTitle")}</h2>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button suppressHydrationWarning type="button" onClick={prevMonth} className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm font-medium text-white">{monthLabel}</span>
                        <button suppressHydrationWarning type="button" onClick={nextMonth} className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-0 text-center text-xs mb-2">
                        {DAYS.map((d) => (
                          <div key={d} className="py-1.5 text-gray-500 font-medium">{d}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-0 text-center text-sm">
                        {calendarDays.map((day, i) => {
                          if (day === null) return <div key={`e-${i}`} />;
                          const { year, month } = calendarMonth;
                          const disabled = isPastDate(year, month, day);
                          const selected = data.date === new Date(year, month, day).toLocaleDateString("en-CA");
                          const dateObj = new Date(year, month, day);
                          const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                          const clickable = !disabled && !isWeekend;
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={!clickable}
                              onClick={() => clickable && selectDate(day)}
                              className={`rounded-xl py-2 text-sm transition-all ${
                                selected
                                  ? "bg-teal-500 text-white font-semibold"
                                  : !clickable
                                    ? "text-gray-700 cursor-not-allowed"
                                    : "text-gray-300 hover:bg-white/5"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {data.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <h3 className="text-lg font-display font-light text-white mb-3">{t("timeTitle")}</h3>
                        <div className="flex flex-wrap gap-2">
                            {TIME_SLOTS.map((slot) => {
                              const d = new Date(data.date);
                              const isToday = d.toDateString() === today.toDateString();
                              const taken = takenSlots.includes(slot);
                              const disabled = (isToday && isPastTimeSlot(slot)) || taken;
                              const selected = data.timeSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => !disabled && selectTime(slot)}
                                  className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                                    selected
                                      ? "border-teal-500 bg-teal-500/10 text-teal-400"
                                      : disabled
                                        ? "border-white/5 text-gray-700 cursor-not-allowed"
                                        : "border-white/10 text-gray-300 hover:border-teal-500/30"
                                  }`}
                                >
                                  {slot}{taken ? " (taken)" : ""}
                                </button>
                              );
                            })}
                          </div>
                        {errors.timeSlot && <p className="mt-2 text-xs text-red-400">{errors.timeSlot}</p>}
                      </motion.div>
                    )}

                    {errors.date && <p className="mt-2 text-xs text-red-400">{errors.date}</p>}

                    <div className="mt-10 flex justify-between">
                      <button suppressHydrationWarning type="button" onClick={() => goTo(2)} className="rounded-full border border-white/10 px-8 py-3 text-sm text-gray-300">{t("back")}</button>
                      <button suppressHydrationWarning type="button" onClick={() => goTo(4)} className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3 text-sm font-semibold text-white">{t("next")}</button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-display font-light text-white mb-6">{t("notesTitle")}</h2>

                    <div className="mb-6 rounded-xl border border-teal-500/10 bg-teal-500/5 p-4 text-sm text-gray-300">
                      <p className="text-teal-400 font-medium mb-1">{t("summaryTitle")}</p>
                      <p className="text-gray-400">{t("date")}: <span className="text-white">{data.date}</span></p>
                      <p className="text-gray-400">{t("time")}: <span className="text-white">{data.timeSlot}</span></p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-hearabout">{t("hearAbout")}</label>
                        <select suppressHydrationWarning id="book-hearabout" className={selectStyle} value={data.hearAbout} onChange={(e) => update("hearAbout", e.target.value)}>
                          <option value="" className="bg-[#071017]">{t("selectHearAbout")}</option>
                          {hearAboutOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#071017]">{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-400" htmlFor="book-notes">{t("notes")}</label>
                        <textarea suppressHydrationWarning id="book-notes" className={inputStyle + " resize-none h-32"} value={data.notes} onChange={(e) => update("notes", e.target.value)} placeholder={t("notes")} />
                      </div>
                    </div>
                    {errors.form && <p className="mt-4 text-sm text-red-400">{errors.form}</p>}
                    <div className="mt-10 flex justify-between">
                      <button suppressHydrationWarning type="button" onClick={() => goTo(3)} className="rounded-full border border-white/10 px-8 py-3 text-sm text-gray-300">{t("back")}</button>
                      <button suppressHydrationWarning type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 disabled:opacity-50">
                        {loading ? t("submitting") : t("submit")}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
