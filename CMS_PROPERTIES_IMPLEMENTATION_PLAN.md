# CMS Properties Data Fetching — Implementation Plan

## Overview

Replace the Bayut RapidAPI as the data source for `for-sale` and `for-rent` properties with the internal CMS.
Off-plan properties remain entirely on their existing static-data + Bayut path.

### Data Flow

```
HomeHero (filter widget)
  → navigates to /properties/for-sale?filters...
  → page.js (async server component) fetches ALL CMS properties via ISR
  → PropertiesListingPage (client, cmsData prop)
      → client-side filter on formData changes
      → client-side pagination
      → "View on Map" → MapboxPropertyListing (CMS-normalized pins)
  → /properties/for-sale/SLUG → page.js fetches CMS detail by slug
      → PropertiesDetailsPage (cmsPropertyData prop)
```

---

## Decisions

| Decision | Choice |
|---|---|
| for-sale / for-rent source | **CMS** (replaces Bayut) |
| Off-plan source | Unchanged (static array + Bayut) |
| CMS lookup | Slug-based: `GET /api/properties/{slug}` |
| Listing component | Adapt existing `PropertiesListingPage` |
| URL structure | `/properties/for-sale/SLUG`, `/properties/for-rent/SLUG` |
| Filters | Client-side on top of CMS data fetched server-side |

---

## API Endpoints

| Purpose | Endpoint |
|---|---|
| For-rent listings | `GET /api/properties/for-rent` |
| For-sale listings | `GET /api/properties/for-sale` |
| Single property | `GET /api/properties/{slug}` |

API base is read from env: `NEXT_PUBLIC_API_URL` (default `https://cms.hsproperty.ae`).

---

## Phase 1 — `lib/fetchPropertiesData.js` *(new)*

Mirrors `lib/fetchAreaGuidesData.js` pattern exactly.

**Functions:**
- `getPropertiesByPurpose(purpose)` — fetches `GET ${API}/api/properties/${purpose}`
  - ISR cache tags: `["properties", "properties:purpose:${purpose}"]`
  - In-memory hot cache keyed by purpose (same TTL as ISR)
- `getPropertyBySlug(slug)` — fetches `GET ${API}/api/properties/${slug}`
  - ISR cache tags: `["properties", "properties:detail:${slug}"]`

**Config:**
- `REVALIDATE_SECONDS = Number(process.env.PROPERTIES_REVALIDATE_SECONDS || 3600)`
- `"use server"` at top
- Graceful fallback to in-memory cache on error

---

## Phase 2 — `app/properties/[purpose]/page.js`

- Add `export const dynamic = 'force-dynamic'`
- `async function Page({ params })` — for `for-sale`/`for-rent`: call `getPropertiesByPurpose(purpose)`, pass `cmsData` prop to `<PropertiesListingPage>`
- `off-plan`: `<PropertiesListingPage purpose={purpose} />` — no `cmsData` → unchanged
- Metadata, JSON-LD, canonical, allowed-purposes validation: **unchanged**

---

## Phase 3 — `app/properties/[purpose]/[propertyId]/page.js`

- Add `export const dynamic = 'force-dynamic'`
- `for-sale`/`for-rent`: call `getPropertyBySlug(propertyId)` instead of `getBayutPropertyDataForPage`
  - `null` result → `notFound()`
  - Pass as `cmsPropertyData` to `<PropertiesDetailsPage>`
- `generateMetadata` for for-sale/for-rent: use CMS `meta_title` / `meta_description` fields
- Off-plan logic (OffPlanDetailsPage, static array, offPlanMetaData): **no change**

---

## Phase 4 — `components/pages/PropertiesListingPage.js`

### New prop: `cmsData` (default `null`)

### Key changes when `cmsData` is present:

1. **`normalizeCmsProperty(item)`** helper added — maps CMS API fields to the internal shape `PropertyCardBig` + `MapboxPropertyListing` expect:
   - `slug` → `id` + link segment
   - `title`
   - `price` (numeric)
   - `bedrooms`/`rooms` → `rooms` (int)
   - `bathrooms`/`baths` → `baths` (int)
   - `area`/`size`/`square_feet` → `area` (number)
   - `cover_photo`/`featured_image` → `coverPhoto: { url }`
   - `images`/`photos` → for map popup
   - `location` (string or nested) → `[{ name }]` array
   - `latitude`/`longitude` or `lat`/`lng` → `geography: { lat, lng }`
   - `purpose` → passed through
   - `property_type`/`type` → `category: [{ name }]`
   - `completion_status`/`status` → `completionStatus`

2. **`cmsBaseListRef`** — `useRef([])` holds all normalized CMS properties

3. **`useEffect([cmsData])`** — on mount/change, normalizes all CMS items into `cmsBaseListRef`

4. **`applyCmsFilters(page)`** — new function, runs when `cmsData` present:
   - Filters `cmsBaseListRef.current` by `propertyType`, `bedrooms`, `priceMin/Max`, `subOption`, `selectedLocation`
   - Sorts by `formData.sortBy`
   - Paginates (slice `itemsPerPage`)
   - Sets `listings`, `totalNbPages`, `hasNextPage`, `loading`

5. **`fetchListings`** — add early return calling `applyCmsFilters(page)` when `cmsData` present and `purpose !== "off-plan"`

6. **`fetchSuggestions`** — when `cmsData` present and not off-plan: filter `cmsBaseListRef.current` for unique location name strings matching the query. No API call.

7. Off-plan + Bayut paths: **completely unchanged**

---

## Phase 5 — `components/MapboxPropertyListing.js`

Verify field access after normalization in Phase 4. The normalized shape already matches:
- `coverPhoto?.url` ✓ (normalizer ensures `{ url: string }`)
- `location` as `[{ name }]` array ✓
- `geography.lat` / `geography.lng` ✓ (map pins skipped gracefully if missing)
- Popup link `/properties/${purpose}/${slug}` ✓

Minor fix: `area` in popup was converted (`area * 10.76391041671`) assuming sq m. CMS likely stores sq ft already — normalizer sets a flag or the popup uses the value directly.

---

## Phase 6 — `components/pages/PropertiesDetailsPage.js`

### New prop: `cmsPropertyData` (default `null`)

When `cmsPropertyData` is present:
- Feed it directly to the existing `normalizePropertyData()` function — that function already handles many field shapes robustly
- Pass normalized result as initial `listings` state
- Skip the `serverData` path and skip the client-side Bayut fetch fallback

When absent: existing Bayut/off-plan rendering unchanged.

---

## Phase 7 — `components/HomeHero.js`

For `for-sale` / `for-rent` tabs:
- Replace `GET /api/bayut/locations-search` with `GET /api/cms/locations-search?query=...&purpose=...`
- Off-plan suggestion (local `offPlanListings` search): **no change**
- `handleSearch` (builds URL query string): **no change**

---

## Phase 8 — `app/api/cms/locations-search/route.js` *(new)*

```
GET /api/cms/locations-search?query=searchText&purpose=for-sale
```

1. Call `getPropertiesByPurpose(purpose)` (backed by in-memory hot cache — fast)
2. Extract unique location name strings from all property `location` fields
3. Filter by `query` (case-insensitive substring match)
4. Return `{ hits: [{ name: "Dubai Marina" }, ...] }` — same shape as Bayut autocomplete

---

## Relevant Files

| File | Action |
|---|---|
| `lib/fetchPropertiesData.js` | **CREATE** |
| `app/api/cms/locations-search/route.js` | **CREATE** |
| `app/properties/[purpose]/page.js` | **UPDATE** |
| `app/properties/[purpose]/[propertyId]/page.js` | **UPDATE** |
| `components/pages/PropertiesListingPage.js` | **ADAPT** |
| `components/pages/PropertiesDetailsPage.js` | **ADAPT** |
| `components/MapboxPropertyListing.js` | **VERIFY/FIX** |
| `components/HomeHero.js` | **UPDATE** |

---

## Verification Checklist

- [ ] Homepage hero: typing location (Buy/Rent tab) shows CMS-sourced location suggestions
- [ ] Search navigates to `/properties/for-sale?filters...`
- [ ] `/properties/for-sale` renders CMS listings — zero `/api/bayut/properties-search` calls in DevTools
- [ ] `/properties/for-rent` same as above
- [ ] Bedroom/price/type/location filters work client-side without network requests
- [ ] "View on Map" shows CMS property pins; popup links to `/properties/for-sale/SLUG`
- [ ] `/properties/for-sale/SLUG` renders CMS property detail page
- [ ] `/properties/for-rent/SLUG` same as above
- [ ] `/properties/off-plan` and off-plan detail pages: **fully unchanged**
- [ ] HomeHero off-plan tab: still searches static `offPlanListings` locally

---

## Important Note on CMS Field Names

`normalizeCmsProperty()` in Phase 4 is the **single point of adaptation** for the unknown CMS API field names. If the real CMS response uses different field names than assumed, only that one function needs updating. All downstream components (`PropertyCardBig`, `MapboxPropertyListing`) will continue to receive the normalized internal shape.

### Assumed CMS response shapes

**Listing endpoint** (`/api/properties/for-sale`):
```json
{
  "data": [
    {
      "id": 1,
      "slug": "luxury-apartment-dubai-marina",
      "title": "Luxury 2BR Apartment — Dubai Marina",
      "price": 2500000,
      "purpose": "for-sale",
      "bedrooms": 2,
      "bathrooms": 2,
      "area": 1200,
      "description": "...",
      "cover_photo": "https://cms.hsproperty.ae/storage/...",
      "images": ["https://...", "https://..."],
      "amenities": ["Pool", "Gym", "Parking"],
      "location": "Dubai Marina, Dubai",
      "latitude": 25.0757,
      "longitude": 55.1394,
      "property_type": "Apartment",
      "completion_status": "completed",
      "meta_title": "Luxury 2BR Apartment in Dubai Marina | H&S Real Estate",
      "meta_description": "..."
    }
  ],
  "success": true
}
```

**Detail endpoint** (`/api/properties/{slug}`):
```json
{
  "data": { ...same fields as above... },
  "success": true
}
```
