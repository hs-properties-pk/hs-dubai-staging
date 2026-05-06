# Brand page copy — one developer (handoff to SEO)

This is the **content** the dev team pastes into `data/brand-profiles.js` under the correct **key** (slug).  
**Do not worry about the JavaScript object** — work in the structure below. The developer maps it into code.

**What the site does without this file:** it still shows that developer, using **off-plan** and **community** listing counts and generic text from `lib/brandProfile.js`. This document is for **on-brand, SEO, and fact-led** copy.

**CTA / button labels:** the site reuses the same pattern for most brands (e.g. “Ask an expert”, “View all off-plan”), so **you do not need to supply CTA text** unless there is a special case. Omit those fields; dev will use defaults or wire `action: "expert"` only.

---

## 1) Identify the developer (required)

| Field | Your notes |
|--------|------------|
| **Slug (technical key)** | e.g. `emaar-properties` — must match the site URL last segment: `/brands/emaar-properties` |
| **Display name (must match data)** | e.g. `Emaar Properties` — same as the `brand` string used in our listing data (see developer’s row on `/brands`) |

**Logo — `logo` (path, one line):** same object in `BRAND_PROFILES` also stores the developer mark for `/brands` cards and the brand page model. Value is a **site path** such as `/brands-logos/emaar.png` (file lives in `public/brands-logos/`). Use `null` if there is no asset yet. **Not** a full `https://` URL unless we host off-site.

---

## 2) Hero (main top section)

| Field | What to write (guidance) | Example length |
|--------|-------------------------|----------------|
| **headline** | One line; primary SEO / H1 support | Short phrase |
| **tagline** | One line; districts, product type, or angle | Short phrase |
| **heroBody** | 1–2 short paragraphs: who they are, what the reader can do on *this* hub (off-plan + community links). Avoid repeating legal disclaimers in every line. | ~80–200 words total |

*Optional (only if the brand needs a custom hero link):* `heroCta` with label + URL — **usually leave to dev defaults.**

---

## 3) About block (the main SEO body)

| Field | What to write |
|--------|----------------|
| **aboutSubtitle** | Small caps line above the title, e.g. `ABOUT EMAAR PROPERTIES` |
| **aboutTitle** | Big heading for the about section — positioning / official angle |
| **description** | **Array of 2 paragraphs** (or more if we agree to extend the template):<br>• Para 1 — developer story, focus, geographies, public facts (cite year/source in copy if you use numbers).<br>• Para 2 — how H&S / this page helps: filters, shortlisting, escrow, team. |
| **stats** | **6 items** in a 2-column pattern on the page: each row = `{ "value", "label" }`.<br>Use **credible, sourced** numbers where possible. Labels should explain the metric (e.g. “Group revenue, FY 2024”). |

*Optional:* `about.cta` — **skip**; dev can use the standard expert action.

---

## 4) Lead banner (optional but recommended for major brands)

Short strip above the fold / mid page for lead capture. **Not** the same as mid-page CTA button text.

| Field | What to write |
|--------|----------------|
| **title** | e.g. “Get early access to new [Brand] launches” |
| **subtitle** | One supporting line (budget, timeline, shortlist). |
| **showWhatsapp** | `true` / `false` if we need to hide WhatsApp for a brand (rare) |

*Optional:* `brochureUrl` if we have a static PDF per brand (often `null`).

---

## 5) Mid CTA + payment section (optional)

**Why Emaar has these and other brands do not:** they are **optional** blocks. If you skip them, the **site still shows** a mid-CTA and a **payment** section using **sensible default copy** in code (`lib/brandProfile.js`). Emaar was written out in full to illustrate **custom** payment storytelling.

Supply these **only** when the brand has distinctive payment or messaging worth owning on-page.

**midCta (optional)**  
Only the **title** line is real “content” (the rest is standard buttons):

| Field | What to write |
|--------|----------------|
| **title** | e.g. “Looking for a specific [Brand] project?” |
| *primaryLabel, secondaryLabel, links* | **Do not write** — dev uses defaults. |

**paymentSection (optional)**

| Field | What to write |
|--------|----------------|
| **title** | Section heading for payment / escrow. |
| **body** | 1 short paragraph: RERA escrow, that plans vary by project, we confirm at reservation. |
| **plans** | 3–4 items: `title` (e.g. `60/40`) + `body` (one line each). |
| **downloadUrl** | If no PDF, leave empty / `null` in code. *downloadLabel* can stay default. |

---

# Example — one fictitious “fill the blanks” (not real data)

**Slug:** `example-developer`  
**Display name:** `Example Development LLC`

**headline**  
*Dubai [corridor/positioning] in one line*

**tagline**  
*Master plans · towers · or villa communities — your angle*

**heroBody**  
*Paragraph: what Example is known for in the UAE, typical product, buyer profile one line.*  
*Paragraph: on hsproperty.ae this page lists all Example-tagged off-plan; reader can filter and ask our RERA team about payment and handover.*

**aboutSubtitle**  
*ABOUT EXAMPLE DEVELOPMENT LLC*

**aboutTitle**  
*One line — official / investor-facing positioning*

**description — paragraph 1**  
*History, group structure, public scale, where they build, anything listed on the stock exchange, etc. Name the source of any big numbers (annual report, website “about”).*

**description — paragraph 2**  
*How this page works with H&S: same listings as the main off-plan index, shortlisting, payment plan check before booking, DLD-registered team.*

**stats** (6 rows)

1. *value* | *label* — e.g. public revenue or scale
2. *value* | *label* — e.g. units or GFA if published
3. *value* | *label* — e.g. geographies
4. *value* | *label* — e.g. listing / market note
5. *value* | *label* — e.g. product type
6. *value* | *label* — e.g. sustainability or award, if true

**leadBanner — title**  
*One line, conversion-oriented but no button copy*

**leadBanner — subtitle**  
*One line sub*

*If you are **not** providing custom `midCta` / `paymentSection`, write “Use site defaults” in your handoff; dev will omit those keys in `BRAND_PROFILES` and the layout still appears.*

---

## Checklist before handoff

- [ ] Every **number** in stats has a **source** (or mark “TBD / verify with IR”).
- [ ] **Display name** matches the `brand` field in our data (or tell dev if a rename is needed).
- [ ] **Slug** matches `/brands/[slug]` in the sitemap.
- [ ] **No** duplicate boilerplate CTA text unless a brand is an exception (handled by dev).

When done, return this as **Word / Google Docs / or filled spreadsheet**; the dev team will merge into `data/brand-profiles.js` under the right slug.
