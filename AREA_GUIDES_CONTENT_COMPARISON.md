# Area Guides Content & FAQ Comparison Report

**Date:** March 11, 2026

---

## ðŸ“Š COMPLETE INVENTORY - OLD VERSION (`/area-guides/`)

All content is **HARDCODED** in `components/pages/AreaGuideDetailPage.js`

### DUBAI (7 Areas)

| Area                    | Slug                    | FAQs        | Content      | Status   |
| ----------------------- | ----------------------- | ----------- | ------------ | -------- |
| Jumeirah Village Circle | jumeirah-village-circle | **13** âœ…   | âœ… Extensive | COMPLETE |
| Dubai Studio City       | dubai-studio-city       | **13** âœ…   | âœ… Extensive | COMPLETE |
| Dubai Land              | dubai-land              | **13** âœ…   | âœ… Extensive | COMPLETE |
| Arjan                   | arjan                   | **13** âœ…   | âœ… Extensive | COMPLETE |
| DAMAC Lagoons           | damac-lagoons           | **13** âœ…   | âœ… Extensive | COMPLETE |
| Dubai Creek Harbour     | dubai-creek-harbour     | **13** âœ…   | âœ… Extensive | COMPLETE |
| Al Rashidiya            | al-rashidiya            | **10** âœ…   | âœ… Extensive | COMPLETE |
| **SUBTOTAL**            | -                       | **88 FAQs** | 100%         | âœ…       |

---

### ABU-DHABI (6 Areas)

| Area                    | Slug                    | FAQs        | Content      | Status   |
| ----------------------- | ----------------------- | ----------- | ------------ | -------- |
| Al Reem Island          | al-reem-island          | **10** âœ…   | âœ… Extensive | COMPLETE |
| Khalifa City            | khalifa-city            | **10** âœ…   | âœ… Extensive | COMPLETE |
| Al Rehhan               | al-rehhan-abu-dhabi     | **10** âœ…   | âœ… Extensive | COMPLETE |
| Mohammed Bin Zayed City | mohammed-bin-zayed-city | **9** âœ…    | âœ… Extensive | COMPLETE |
| Al Jurf Gardens         | al-jurf-gardens         | **9** âœ…    | âœ… Extensive | COMPLETE |
| Yas Park Gate           | yas-park-gate           | **9** âœ…    | âœ… Extensive | COMPLETE |
| **SUBTOTAL**            | -                       | **57 FAQs** | 100%         | âœ…       |

---

### AJMAN (4 Areas)

| Area           | Slug           | FAQs        | Content      | Status   |
| -------------- | -------------- | ----------- | ------------ | -------- |
| Al Bustan      | al-bustan      | **10** âœ…   | âœ… Extensive | COMPLETE |
| Al Nuaimiya    | al-nuaimiya    | **10** âœ…   | âœ… Extensive | COMPLETE |
| Al Rawda       | al-rawda       | **10** âœ…   | âœ… Extensive | COMPLETE |
| Ajman Downtown | ajman-downtown | **10** âœ…   | âœ… Extensive | COMPLETE |
| **SUBTOTAL**   | -              | **40 FAQs** | 100%         | âœ…       |

---

### RAS-AL-KHAIMAH (6 Areas)

| Area             | Slug             | FAQs        | Content      | Status   |
| ---------------- | ---------------- | ----------- | ------------ | -------- |
| Al Marjan Island | al-marjan-island | **9** âœ…    | âœ… Extensive | COMPLETE |
| Yasmin Village   | yasmin-village   | **10** âœ…   | âœ… Extensive | COMPLETE |
| Dafan Al Nakheel | dafan-al-nakheel | **9** âœ…    | âœ… Extensive | COMPLETE |
| Mina Al Arab     | mina-al-arab     | **9** âœ…    | âœ… Extensive | COMPLETE |
| Bayti Homes      | bayti-homes      | **9** âœ…    | âœ… Extensive | COMPLETE |
| Al Dhait South   | al-dhait-south   | **9** âœ…    | âœ… Extensive | COMPLETE |
| **SUBTOTAL**     | -                | **55 FAQs** | 100%         | âœ…       |

---

## ðŸŽ¯ GRAND TOTAL

- **Total Areas:** 23
- **Total FAQs:** 240
- **Content Completeness:** 100%
- **Status:** âœ… ALL COMPLETE

---

## ðŸ†• NEW VERSION (`/area-guides/`) - EXPECTED STRUCTURE

The new version retrieves data from a **backend API** at `https://cms.hsproperty.ae`.

### Expected API Response Format

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Area Name",
    "slug": "area-slug",
    "featured_image": "image-url",
    "detailed_content": "<h2>Section Title</h2><p>Content here...</p>",
    "meta_title": "Page Title",
    "meta_description": "Meta description",
    "emirate": {
      "id": 1,
      "name": "Emirate",
      "slug": "emirate-slug"
    },
    "faqs": [
      {
        "id": 1,
        "question": "What is...?",
        "answer": "Answer here...",
        "order": 1
      }
    ]
  }
}
```

---

## âš ï¸ CRITICAL ISSUES - NEW VERSION

### Issue 1: Backend API Dependency

- **Status:** âŒ NOT YET VERIFIED
- **Required:** Backend must be running at `https://cms.hsproperty.ae`
- **Check:** `curl https://cms.hsproperty.ae/api/area-guides/emirates`

### Issue 2: Data Parity

- New version **MUST** have identical data to old version
- **Expected:** 23 areas with 240 FAQs total
- **Currently:** Unknown until backend is verified

### Issue 3: Field Mapping

- **Old version:** Field name = `details`
- **New version:** Field name = `detailed_content` or `description`
- Both versions render as: `dangerouslySetInnerHTML={{ __html: <content> }}`

---

## ðŸ” WHAT TO VERIFY

### Step 1: Check If Backend is Running

```bash
# Try this in terminal:
curl https://cms.hsproperty.ae/api/area-guides/emirates

# Expected: JSON response with emirates list
# If error: Backend not running
```

### Step 2: Run Comparison Script

```bash
# From workspace root:
node scripts/compare-area-guides.js

# This will:
# 1. Fetch all areas from new API version
# 2. Compare with old hardcoded version
# 3. Report any missing FAQs or content
```

### Step 3: Manual Browser Check

1. Visit `http://localhost:3000/area-guides/`
2. Click on an emirate (e.g., Dubai)
3. Click on an area (e.g., Jumeirah Village Circle)
4. **Check:**
   - Is there detailed content loaded?
   - Count the FAQs displayed
   - Compare with old version

---

## ðŸ“‹ CONTENT SECTIONS IN EACH AREA (OLD VERSION EXAMPLE)

### Jumeirah Village Circle Sample Structure:

- **Hero Image:** Featured property image
- **Title:** Area name (large heading)
- **Detailed Content:** Multiple sections covering:
  - Types of Properties Available
  - Family-Friendly Neighborhood
  - Amenities
  - Schools and Nurseries
  - Recreational Activities
  - Public Transportation
  - Cost of Living
  - Shopping and Dining Options
  - Upcoming Developments
  - Healthcare Facilities
  - Safety
  - Investment Opportunities
  - Community Events

- **FAQs Section:** 13 Q&A pairs covering:
  - Property types
  - Family friendliness
  - Amenities
  - Schools
  - Parks & recreation
  - Transportation
  - Cost of living
  - Shopping & dining
  - Developments
  - Healthcare
  - Safety
  - Investment opportunities
  - Community events

- **Sharing Options:**
  - Facebook
  - Instagram
  - WhatsApp
  - LinkedIn
  - Twitter
  - Copy Link
  - PDF Download

---

## âœ… NEXT STEPS

1. **Verify Backend:** Check if `https://cms.hsproperty.ae` API is running
2. **Run Comparison Script:** `node scripts/compare-area-guides.js`
3. **Review Results:** Identify any missing content or FAQs
4. **Report Findings:** Document any discrepancies

**If API is not running:**

- You must start the backend server
- OR migrate to old version until backend is ready
- OR populate API database with same 23 areas + 240 FAQs

---

## ðŸŽ¨ UI/UX COMPATIBILITY

Both versions have **identical** user interface:

- âœ… Same layout
- âœ… Same sharing buttons
- âœ… Same PDF download
- âœ… Same FAQ accordion
- âœ… Same content rendering

**Only difference:** Data source (hardcoded vs API)

