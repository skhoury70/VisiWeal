# Article Design Reference

> Source of truth derived from two audited articles: 
> - `mena-ma-boom-2026` (14 sections) 
> - `digital-transformation-mena-strategy-ceo-guide-2025` (12 sections)
> 
> ALL future articles MUST match this spec exactly.

---

## Section Structure (Section Schema)

Every section is an object with **these allowed keys only**:

| Key | Type | Applies where | Renders as |
|-----|------|---------------|-----------|
| `heading` | string | Section dividers, insights, named blocks | `<h2>` (white, 1xl-2xl) |
| `subheading` | string | Accompanies heading | `<h3>` (teal) |
| `content` | string | Body text | parsed by `renderContent()` |

A section can have:
- Only `content` — intro hook, body paragraphs
- Only `heading` — section divider, no body
- `heading` + `content` — named section with body
- `heading` + `subheading` + `content` — named section with subtitle
- `heading` + `subheading` — section divider with subtitle, no body

**NEVER use `title` as a key** — `title` is NOT rendered as a heading by the page component. Always use `heading`.

---

## Article Blueprint (14-section M&A pattern)

```
Section 0:  (no heading)           — content: intro hook paragraph
Section 1:  heading + subheading   — content: market landscape analysis
Section 2:  heading only           — section divider (e.g. "Three Realities...")
Section 3:  heading + content      — Insight #1
Section 4:  heading + content      — Insight #2
Section 5:  heading + content      — Insight #3
Section 6:  heading + subheading   — content: Advisor's Perspective (numbered steps)
Section 7:  heading + content      — Expert Perspectives (quotes + analysis)
Section 8:  heading + subheading   — section divider (e.g. "Critical Considerations...")
Section 9:  heading + content      — subsection title
Section 10: heading + content      — subsection title
Section 11: heading + content      — subsection title
Section 12: heading + content      — Conclusion
Section 13: heading + content      — Additional Resources (special format)
```

Or the 12-section Digital pattern:

```
Section 0:  (no heading)           — content: intro hook
Section 1..4: heading + content    — body sections
Section 5:  heading + content      — numbered list + advisory link
Section 6:  heading + content      — Expert Perspectives (blockquotes with `>`)
Section 7:  heading + subheading   — content
Section 8..9: heading + content    — body sections
Section 10: heading + content      — Conclusion
Section 11: heading + content      — Additional Resources
```

---

## Content Formatting Rules (CRITICAL)

### Rule 1: NEVER use `###`, `##`, `#` markers in content
The `renderContent()` function does NOT process markdown headers. `###` renders as literal text on the page.

**WRONG:**
```json
{"content": "### Insight 1: Title\n\nBody text..."}
```

**RIGHT:**
```json
{"heading": "Insight #1 — Title", "content": "Body text..."}
```

### Rule 2: NEVER use `**bold**` markers in content
The `renderContent()` function does NOT process `**`. It renders as literal asterisks.

### Rule 3: Paragraph separation = `\n\n` (double newline)
Each block separated by `\n\n` becomes a `<p>`, `<blockquote>`, or `<li>` element.

### Rule 4: Inline quotation marks = curly quotes `\u201c...\u201d`
For quotes that are embedded IN a paragraph (not full-block quotes), use Unicode curly quotes.

### Rule 5: Blockquote = `>` prefix on every line
For pull-quote style expert quotes, prefix each line with `> `:

```
> "Quote text here."
> — Attributed Name, Title
```

Works because `renderContent()` does `isBlockquote` detection (every line starts with `>`).

Minimum proper blockquote (2 lines: quote + attribution):
```json
"content": "> \u201cThe Gulf M&A market has entered a mature phase.\u201d\n> \u2014 Corporate Finance Partner, Riyadh\n\nAnalysis paragraph follows..."
```

### Rule 6: Links = `[text](url)` format
- External: `[Title](https://example.com)` → renders with `target="_blank"`
- Internal service pages: `[Service Title](/{locale}/services/service-slug)` → same-domain link
- The `{locale}` placeholder is auto-replaced at render time

### Rule 7: No target="_blank" for internal links
The renderer auto-detects: `startsWith("http")` → external with target blank. Otherwise → internal.

---

## Section Type Specifications

### Intro Hook (Section 0)
- No `heading` or `subheading`
- Single compelling paragraph ending with a hook into the article

### Insight Sections (Sections with `heading` + `content`)
- `heading` format: `"Insight #N — Descriptive Title"`
- Content: 1-3 short paragraphs separated by `\n\n`
- No list markup, no bold, no # markers

### Section Dividers (heading only, no content)
- Used to group related insights (e.g. M&A Section 2: "Three Realities Shaping Gulf Deals")
- Renders as an `<h2>` with no body — creates visual breath

### Advisor's Perspective (heading + subheading + content)
- `heading`: `"The Advisor\u2019s Perspective"` (use curly apostrophe)
- `subheading`: e.g. `"Five Priorities for Sellers"`
- Content: numbered steps or advice, each step separated by `\n\n`
- Each step starts with a lead word like "First,", "Next,", "Finally,"

### Expert Perspectives (heading + content)
- `heading`: `"Expert Perspectives"`
- Content has TWO parts separated by `\n\n`:
  1. Blockquote(s) using `>` prefix (or inline curly quotes in M&A pattern)
  2. Analysis paragraph(s) after the quote

### Critical Considerations (heading + subheading only)
- Acts as another section divider
- `subheading` adds nuance underneath

### Themed Sub-Sections (heading + content)
- Each covers one distinct angle (legal, family dynamics, ESG, etc.)
- Content: 1-2 paragraphs, self-contained

### Conclusion (heading + content)
- `heading`: `"Conclusion"`
- Content: forward-looking, ends with a call to connect (not CTA button - the page already has a CTA component)

### Additional Resources (heading + content) — STRICT FORMAT

```
heading: "Additional Resources"

content: "Recommended Reports & Readings:\n\n
[Title](url)\n\n
[Title](url)\n\n
[Title](url)\n\n
\n
Internal Service Pages:\n\n
[Service Title](/{locale}/services/service-slug)\n\n
[Service Title](/{locale}/services/service-slug)\n\n
\n
Relevant Events & Tools:\n\n
[Event Name](url) - Description\n\n
[Event Name](url) - Description\n\n
[Event Name](url) - Description"
```

Key rules:
- External link format: `[Title](url)` — no trailing punctuation inside brackets
- Internal link format: `[Title](/{locale}/services/slug)` — with `{locale}` placeholder
- Event format: `[Name](url) - description` (space, hyphen, space)
- Each item separated by EXACTLY `\n\n` (double newline)
- Category headers: `"Recommended Reports & Readings:"`, `"Internal Service Pages:"`, `"Relevant Events & Tools:"` — each on their own line, followed by `\n\n`
- No bullet characters (`- `, `• `) — the `\n\n` split already creates paragraph spacing
- Blank line between categories: a single `\n` (not `\n\n`) between categories is OK as long as items within each category use `\n\n`

---

## Content Tone & Voice

### Sentence Style
- Short, declarative sentences. Punchy.
- Use em-dashes (\u2014) and colons to connect ideas.
- Avoid long subordinate clauses.

### Authority Signals
- Reference specific reports: "the EY MENA M&A Insights report recorded..."
- Use attribution: "according to the OECD Development Centre..."
- Regional specificity: always name specific cities/countries (Riyadh, Dubai, Cairo, Casablanca)

### Quotations
- Expert quotes use curly quotes (\u201c/\u201d): `\u201cQuote text.\u201d`
- Attribution: `\u2014 Name, Title` (em-dash, space, name, comma, title)
- Can be rendered as blockquotes (`>` prefix) or inline curly quotes

### Numbered Lists in Content
Use first-word format:
```
First, ensure your historical books are clean. Your financial records must be...

Next, you need to structure your entity for international scrutiny...

Finally, partner with experienced professionals...
```

Each "step" is a separate `\n\n`-separated paragraph.

For decision frameworks (like Digital's "Five decisions" section), use `N. **text**` — but note this renders with literal `**`. This is an accepted pattern from the Digital article.

---

## Translation Rules (Arabic `ar.json`)

- Same section structure (same keys, same number of sections)
- `heading` translated to Arabic
- `subheading` translated to Arabic
- `content` translated to Arabic
- Blockquote quotes use `\u00ab...\u00bb` (`«»`) instead of `\u201c...\u201d`
- Internal service links keep `/{locale}/services/...` format (locale auto-replaced at render time)
- External links stay identical

---

## Format Checklist (for verifying new articles)

- [ ] Section 0: no heading — intro hook paragraph
- [ ] All sections use `heading` key (NOT `title`)
- [ ] No `###` or `##` markers anywhere in content
- [ ] No `**bold**` markers in content (exception: Digital-style numbered decision lists)
- [ ] Blockquotes use `>` prefix on every line, with `—` attribution on last line
- [ ] Expert quotes use curly quotes \u201c/\u201d (English) or \u00ab/\u00bb (Arabic)
- [ ] Additional Resources uses exact three-category format
- [ ] Conclusion ends with forward-looking statement + call to connect
- [ ] Internal links use `/{locale}/services/...` pattern
- [ ] Arabic version matches English structure section-for-section

---

## Example: M&A Additional Resources (reference copy)

```
heading: "Additional Resources"
content: "Recommended Regional Reports & Readings:\n\n
[EY MENA M&A Insights 2025 Report](https://www.ey.com/...) (Released February 2026)\n\n
[IMF Regional Economic Outlook: Middle East and Central Asia](https://www.imf.org/...)\n\n
[PwC Deals MENA — Emerging Market M&A Trends](https://www.pwc.com/...)\n\n\n
Internal Service Pages:\n\n
[Corporate M&A Advisory](/{locale}/services/ma-advisory) — Our Approach & Services\n\n
[Corporate Restructuring Services for Gulf Businesses](/{locale}/services/corporate-restructuring)\n\n
[Feasibility Studies & Valuation Services](/{locale}/services/feasibility-studies)\n\n\n
Relevant Events & Tools:\n\n
[Saudi Capital Markets Forum (SCMF)](https://global-cmf.com/) — Riyadh, Annual\n\n
[UAE Investment Forum](https://moneyexpoglobal.com/...) — Abu Dhabi, Annual\n\n
[DIFC Deal Tracker](https://dxbinteract.com/...) — M&A data for UAE market participants"
```

Note: Each link item is its own `\n\n` block, and category headers are also followed by `\n\n`.

---

## Verifying Build

Always run after writing a new article:
```
npm run build
```
Check for: 0 errors, 0 warnings, correct route count (should match existing).
