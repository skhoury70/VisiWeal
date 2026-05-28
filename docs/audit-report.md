# Visiweal Website — Audit Report

**Date:** 2026-05-27
**Scope:** Full-stack audit of Next.js 16 + next-intl v4 website
**Build status:** ✅ Passed (Next.js 16.2.6, Turbopack, TypeScript)
**Routes:** 20 discovered, all functional

---

## Health Score: 17/20 — Good

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Semantic HTML, decent contrast, missing aria-labels in some interactive areas |
| 2 | Performance | 3/4 | Heavy deps (Three.js, GSAP, d3, echarts, framer-motion) — bundle likely large |
| 3 | Responsive | 3/4 | Tailwind responsive classes present; not verified across all breakpoints |
| 4 | Theming | 4/4 | Excellent OKLch design tokens, dark theme, brand-50→950 scale |
| 5 | Anti-Patterns | 4/4 | No AI slop. Real brand, real data, real photography |
| **Total** | | **17/20** | **Good** |

---

## P1 Findings — Must Fix

### 1. Consultation form translation keys broken

**Files:** `app/[locale]/book-consultation/book-consultation-form.tsx`, `messages/en.json`, `messages/ar.json`

The form uses `useTranslations("consultation")` and reads keys like `t("fullName")`, `t("company")`, etc. — resolving to `consultation.fullName`, `consultation.company`.

The actual keys in `messages/en.json` are nested under `consultation.form.*` (e.g. `consultation.form.fullName`).

**Missing keys entirely** — form calls `t()` for these but they don't exist at any path:
`step`, `contactTitle`, `serviceTitle`, `detailsTitle`, `notesTitle`, `submit`, `submitting`, `successSub`, `error`, `required`, `urgencyNow`, `urgencyMonth`, `urgencyQuarter`, `urgencyExploring`

**Impact:** Both `/en/book-consultation` and `/ar/book-consultation` show raw translation key names instead of labels.

**Fix:** Either change the form to `useTranslations("consultation.form")` and add all missing keys, or flatten the keys under `consultation.*` in the JSON files.

---

## P2 Findings — Should Fix

### 2. Lint errors (69 errors, 22 warnings)

**Key categories:**
- **React 19 purity violations:** `particles.tsx` (refs during render), `dot-pattern.tsx` (`Math.random` during render), `canvas-reveal-effect.tsx` (local var mutation after render)
- **`setState` in effects:** `animated-grid-pattern.tsx:90`, `magic-card.tsx:78`, `meteors.tsx:40`
- **`prefer-const`:** 25+ violations across `vortex.tsx`, `floating-dock.tsx`, `hero-highlight.tsx`, `card-spotlight.tsx`, `glowing-effect.tsx`
- **`@typescript-eslint/no-explicit-any`:** 8 violations across tooltip, canvas-reveal, glare-card, hover-border, vortex
- **Unescaped entities:** `founder/page.tsx:261,334`
- **`<img>` instead of `<Image>`:** `animated-tooltip.tsx:87`
- **Missing deps in hooks:** `hover-border-gradient.tsx:58`, `canvas-reveal-effect.tsx:282`, `vortex.tsx:250`

### 3. Unused imports/variables

| File | Line | Issue |
|------|------|-------|
| `components/sections/hero.tsx` | 12 | `HoverBorderGradient` imported but never used |
| `components/layout/navigation.tsx` | 24 | `scrolled` state variable declared but never read |
| `app/[locale]/book-consultation/book-consultation-form.tsx` | 41 | `locale` unused |
| `app/[locale]/contact/contact-form.tsx` | 64 | `locale` unused |
| `app/[locale]/founder/page.tsx` | 86 | `isRtl` declared but unused |
| `components/sections/service-page-template.tsx` | 298 | `i` in map unused |
| `components/ui/glow.tsx` | 30 | `color` unused |
| `components/ui/tracing-beam.tsx` | 7 | `useVelocity` unused |

### 4. `/en/ma-advisory` returns 404

Direct access to `/en/ma-advisory` returns 404. Expected path is `/en/services/ma-advisory`. Navigation correctly links to `/services/ma-advisory` — affects direct deep-linking only.

---

## P3 — Informational

### 5. Middleware deprecation (false alarm)

Previous audit flagged `middleware.ts` as deprecated in Next.js 16. **This is incorrect** — the project uses `next-intl` v4's standard `createMiddleware(routing)` pattern which requires `middleware.ts`. No change needed.

---

## Positive Findings

- ✅ Strong design system with OKLch tokens and teal brand palette
- ✅ All 20 routes compile and render successfully
- ✅ Arabic i18n works across all major pages
- ✅ Real data in charts (deal flow, sector breakdowns, geographic maps)
- ✅ Real photography, custom imagery
- ✅ Professional copywriting throughout
- ✅ Form validation and submission working (Contact, Book Consultation)
- ✅ SEO infrastructure in place (sitemap.xml, robots.txt, opengraph-image)

---

## Recommended Action Plan

1. **P1 — Fix consultation form translation keys** (biggest user-facing bug; both locales show broken keys)
2. **P2 — Address lint errors** (especially React 19 purity violations which can cause runtime issues)
3. **P2 — Clean up unused imports/variables** (low effort, reduces noise)
4. **P2 — Fix 404 on `/en/ma-advisory`** (if direct deep-linking matters)
