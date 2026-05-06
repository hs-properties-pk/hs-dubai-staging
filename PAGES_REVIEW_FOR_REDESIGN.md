# H&S Real Estate Dubai - Pages Review for Website Redesign

> **Instructions**: Review each page listed below. Move page links from **Exclude Pages** section to **Include Pages** section (or vice versa) to finalize which pages will be included in the new redesigned website.

---

## ✅ INCLUDE PAGES (Confirmed for New Website)

### **TIER 1: CORE PAGES** (Foundation)

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Homepage with hero, featured content, call-to-action |
| Communities | `/communities` | All communities/developments listing page |
| Off-Plan Properties | `/properties/off-plan` | All offplans with filters (Type: Apartment, Villa, Townhouse, Penthouse) |
| Mortgages | `/mortgages` | Mortgage calculator & information |
| Property Valuation | `/property-valuation` | Property valuation tool |
| Contact | `/contact` | Contact form page |
| Awards (New) | `/awards` | Awards carousel section (from hspknew pattern) |

---

### **TIER 2: INFORMATION PAGES** (Company Info)

| Page | Route | Description |
|------|-------|-------------|
| Our Story | `/our-story` | Company history, background, mission |
| Why Choose H&S | `/why-choose-hs-real-estate` | Company differentiators, benefits |
| Services | `/services` | Services offered (visa assistance, banking, etc.) |
| Our Approach | `/real-estate-brokers-in-dubai` | Brokerage approach & methodology |
| Client Reviews | `/client-reviews` | Client testimonials & reviews |
| Careers | `/careers` | Job listings & career opportunities |

---

### **TIER 3: CONTENT HUB** (Educational Resources)

| Page | Route | Description |
|------|-------|-------------|
| Blogs | `/blogs` | Blog articles library |
| Blog Detail | `/blogs/[blogId]` | Individual blog article |
| News & Videos | `/news` | News articles & video library |
| News Detail | `/news/[newsId]` | Individual news article |
| Market Insights | `/market-insights` | Market analysis reports |
| Market Insights Detail | `/market-insights/[insightId]` | Individual market report |
| Area Guides | `/area-guides` | Geographic guides by emirate |
| Area Guide City | `/area-guides/[emirateSlug]/[citySlug]` | City-level area guides |

---

### **TIER 4: DYNAMIC PAGES** (Data-Driven)

| Page | Route | Description |
|------|-------|-------------|
| Property Details | `/properties/[propertyId]` | Individual property listing details |

---

### **TIER 5: LEGAL PAGES** (Required)

| Page | Route | Description |
|------|-------|-------------|
| Privacy Policy | `/privacy-policy` | Privacy policy document |
| Terms & Conditions | `/terms-and-conditions` | Terms & conditions document |

---

## ❌ EXCLUDE PAGES (Not in New Website)

### **TIER 4: SPECIAL PROJECT PAGES** (Current: 20 dedicated pages)

> **Confirm Exclude**:

| Page | Route | Status |
|------|-------|--------|
| Expo | `/expo` | Partner/special project page |
| Studio | `/studio` | Studio/special project page |
| Avana Residences | `/avana-residences` | Individual project page |
| Avana Residences (Thank You) | `/avana-residences/thankyou` | Form submission thank you |
| Binghatti | `/binghatti` | Individual project page |
| BNW Developments | `/bnw-developments` | Individual project page |
| China LPS | `/china-lps` | Individual project page |
| HNS DPS | `/hns-dps` | Individual project page |


### **TIER 5: Current Communities pages**
| Page | Route | Status |
|------|-------|--------|
| DAMAC Island 2 | `/damac-island-2` | Individual project page |
| Dubai Creek Harbour | `/dubai-creek-harbour` | Individual project page |
| Dubai Creek Harbour (Thank You) | `/dubai-creek-harbour/thankyou` | Form submission thank you |
| Dubai Hills Estate | `/dubai-hills-estate` | Individual project page |
| Dubai Maritime City | `/dubai-maritime-city` | Individual project page |
| Eltiera Views | `/eltiera-views` | Individual project page |
| Farm Garden Valley | `/farm-garden-valley` | Individual project page |
| Grand Polo Club | `/grand-polo-club` | Individual project page |
| Mina Rashid by Emaar | `/mina-rashid-by-emaar` | Individual project page |
| Montiva by Vida | `/montiva-by-vida` | Individual project page |
| Ohana Yas Canal | `/ohana-yas-canal` | Individual project page |
| Palm Jebel Ali | `/palm-jebel-ali` | Individual project page |
| Rashid Yachts Marina | `/rashid-yachts-marina` | Individual project page |
| Shahrukhz by Danube | `/shahrukhz-by-danube` | Individual project page |
| The Oasis | `/the-oasis` | Individual project page |
| The Valley | `/the-valley` | Individual project page |


---

### **TIER 6: BUY/RENT PAGES** (External Service - On Hold)

| Page | Route | Status |
|------|-------|--------|
| Buy Properties | `/properties/for-sale` | External service redirect (Bayut/Dubizzle/PropertyFinder) |
| Rent Properties | `/properties/for-rent` | External service redirect (Bayut/Dubizzle/PropertyFinder) |

---

### **TIER 7: SPECIAL/PARTNER PAGES** (Niche)

IGNORE
---

### **TIER 8: GERMAN VERSION** (Localization - English-Only Launch)

> **IGNORE THESE PAGES FOR GERMAN** 


| Page | Route | Status |
|------|-------|--------|
| German Homepage | `/german` | German language version (skip for now) |
| German About Us | `/german/about-us` | German about page |
| German Why Dubai | `/german/why-dubai` | German why Dubai page |
| German Why H&S | `/german/why-hs` | German why H&S page |
| German Contact | `/germankontakt` | German contact form |
| German Ads | `/germanads` | German marketing page |
| Landing Page (German) | `/landing_page` | German landing page |

---

## 📋 Additional Notes

### **Current API Endpoints** (Not migrating - use new CMS structure)
- `/api/area-guides/` - Area guides data
- `/api/blogs/` - Blog data
- `/api/instagram/` - Instagram integration
- `/api/mortage-approval/` - Mortgage approvals
- `/api/off-plan-properties/` - Off-plan data
- **Form Submission Endpoints** (20+ project-specific endpoints)

### **Sample websites for Design**
- https://crafixhtml.websitelayout.net/index.html
- E:\imroz-nextjs


### **Data Structure Decisions Made**
- ✅ **Framework**: Next.js 15+
- ✅ **Data Source**: JSON files initially, external CMS (blogs, area guides) later
- ✅ **Homepage Style**: Luxury/Premium
- ✅ **Awards Section**: Include (carousel from hspknew pattern)
- ✅ **Navigation**: Brands → Communities → Offplans hierarchy
- ✅ **Components**: Modular, reusable, scalable

### **New Structure to Implement**
```
/brands
  - List all brands (Emaar, DAMAC, Nakheel, etc.)
  - Single file with brand data

/communities
  - List communities by brand
  - Single file with communities data
  - Link to brands

/properties/off-plan  
  - List all offplans with filters
  - Single file with offplan data
  - Link to communities and brands

/dynamic-project-pages (Optional - replaces 20 individual pages)
  - `/communities/[communitySlug]` - Dynamic community showcase
  - Data-driven instead of hardcoded pages
```

---

## ✏️ REVIEW INSTRUCTIONS

1. **Review** the pages in the Exclude section
2. **If you want to keep** a page (like Avana Residences project page), **move the page link** from **Exclude Pages** → **Include Pages** section
3. **If you want to remove** a page from Include, move it to **Exclude Pages**
4. **Special considerations**:
   - **Project Pages (20 total)**: Decide if you want individual showcase pages or dynamic pages
   - **Buy/Rent**: On hold for API integration
   - **German Pages**: Skip for English-only launch
   - **Tier 3 (Content)**: Keep all or limit to specific content types?

5. **Return this file** with your final Include/Exclude selections

---

## 📊 Summary Statistics

| Category | Current Count | Status |
|----------|---------------|--------|
| **Tier 1 - Core** | 6 pages | 100% Included |
| **Tier 2 - Info** | 6 pages | 100% Included |
| **Tier 3 - Content** | 8 pages + details | 100% Included |
| **Tier 4 - Projects** | 20 pages | Pending Decision |
| **Tier 5 - Legal** | 2 pages | 100% Included |
| **Tier 6 - Buy/Rent** | 2 pages | On Hold |
| **Tier 7 - Special** | 2 pages | Pending Decision |
| **Tier 8 - German** | 7 pages | Skipped |
| **TOTAL** | ~60+ routes | **Pending 5 decisions** |

---

**Ready for next step**: Once you finalize the Include/Exclude sections, I'll create the complete implementation plan with:
- ✅ New project structure
- ✅ Component architecture
- ✅ Data schemas (JSON templates)
- ✅ Routing structure
- ✅ Modular patterns for dynamic content
- ✅ Documentation for future CMS integration
