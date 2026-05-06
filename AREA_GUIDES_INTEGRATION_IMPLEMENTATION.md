# Area Guides API Integration - Implementation Summary

## Overview

Implemented a new `/area-guides` route structure that fetches area guides data from the backend API (same pattern as blogs) with intelligent caching.

## Files Created

### 1. **Data Fetching Service** - `lib/fetchAreaGuidesData.js`

- Server-side data fetching with dual-layer caching
- **Features:**
  - Next.js ISR cache with configurable revalidation (default: 120 seconds)
  - Optional in-memory hot cache for ultra-fast access
  - Three main functions:
    - `getEmiratesList()` - Fetches all emirates
    - `getAreasByEmirate(emirateSlug)` - Fetches areas for specific emirate
    - `getAreaGuideDetail(areaSlug)` - Fetches full area guide with FAQs

### 2. **API Routes** - `app/api/area-guides/`

- `emirates/route.js` - GET /api/area-guides/emirates
- `emirates/[emirateSlug]/areas/route.js` - GET /api/area-guides/emirates/{emirateSlug}/areas
- `[areaSlug]/route.js` - GET /api/area-guides/{areaSlug}

### 3. **Page Components** - `components/pages/`

- **AreaGuidesNewPage.js** - Lists all emirates
  - Server-side rendering with API data as props
  - Client-side fallback fetching if needed
  - Fade animations for smooth loading

- **AreaGuidesNewCityPage.js** - Lists areas for a specific emirate
  - Displays emirate banner with featured image
  - Shows all areas in grid layout
  - "Read Guide" button for each area

- **AreaGuideNewDetailPage.js** - Full area guide with details
  - Hero banner with area image
  - Rich content rendering (HTML)
  - FAQ section with accordion-style FAQs
  - Share buttons (Facebook, Twitter, LinkedIn, WhatsApp, Copy Link)
  - PDF download functionality

### 4. **Card Components** - `components/`

New card components specifically for the new route structure:

- **AreaGuideCardNew.js** - Displays emirate cards
- **AreaGuideCityCardNew.js** - Displays area cards with "Read Guide" button

### 5. **Page Routes** - `app/area-guides/`

- `page.js` - Main page listing all emirates
  - Metadata configuration for SEO
  - Server-side data fetching
- `[emirateSlug]/page.js` - Emirate/city page
  - Dynamic metadata generation
  - Static param generation for all emirates
  - Error handling for 404 cases

- `[emirateSlug]/[areaSlug]/page.js` - Area detail page
  - Dynamic metadata for each area guide
  - Static param generation for all areas across emirates
  - Error handling

### 6. **Environment Configuration** - `.env.local`

```env
NEXT_PUBLIC_API_URL=https://cms.hsproperty.ae
# For production: NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Route Structure

### Old Structure (Hardcoded Data)

```
/area-guides                          â†’ Lists all emirates
/area-guides/[areaGuideId]           â†’ Lists areas in emirate
/area-guides/[areaGuideId]/[areaId]  â†’ Area detail page
```

### New Structure (API-Driven)

```
/area-guides                              â†’ Lists all emirates (fetched from API)
/area-guides/[emirateSlug]               â†’ Lists areas in emirate (fetched from API)
/area-guides/[emirateSlug]/[areaSlug]    â†’ Area detail page (fetched from API)
```

## API Endpoints Expected

Based on the integration guide:

### 1. Get All Emirates

```
GET /api/area-guides/emirates
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dubai",
      "slug": "dubai",
      "description": "...",
      "featured_image": "https://...",
      "area_guides_count": 7,
      "meta_title": "Dubai Area Guides",
      "meta_description": "..."
    }
  ],
  "total": 4
}
```

### 2. Get Areas by Emirate

```
GET /api/area-guides/emirates/{emirateSlug}/areas
Response:
{
  "success": true,
  "emirate": {
    "id": 1,
    "name": "Dubai",
    "slug": "dubai",
    "featured_image": "..."
  },
  "data": [
    {
      "id": 1,
      "slug": "jumeirah-village-circle",
      "title": "Jumeirah Village Circle",
      "description": "...",
      "featured_image": "...",
      "meta_title": "JVC - Dubai",
      "meta_description": "..."
    }
  ],
  "total": 7
}
```

### 3. Get Area Guide Details

```
GET /api/area-guides/{areaSlug}
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Jumeirah Village Circle",
    "slug": "jumeirah-village-circle",
    "description": "...",
    "detailed_content": "<h2>About JVC</h2><p>...</p>",
    "featured_image": "...",
    "meta_title": "JVC - Dubai",
    "meta_description": "...",
    "emirate": {
      "id": 1,
      "name": "Dubai",
      "slug": "dubai"
    },
    "faqs": [
      {
        "id": 1,
        "question": "What is JVC?",
        "answer": "JVC is a modern community...",
        "order": 1
      }
    ],
    "created_at": "March 09, 2026",
    "updated_at": "March 09, 2026"
  }
}
```

## Caching Strategy

### Two-Layer Caching (Like Blogs)

1. **In-Memory Cache** (fastest)
   - Per-server instance
   - Faster than filesystem or API
   - Duration: Configurable (120 seconds default for testing)

2. **Next.js ISR Cache** (persistent)
   - Cached at build time and revalidated
   - CDN-friendly
   - Duration: Configurable (120 seconds default for testing)

### Cache Revalidation

- **Testing**: 120 seconds (2 minutes)
- **Production**: Recommended 3600 seconds (1 hour)

Change in `lib/fetchAreaGuidesData.js`:

```javascript
const REVALIDATE_SECONDS = 3600; // 1 hour for production
```

## Features

âœ… **Server-Side Rendering** - Better SEO and performance
âœ… **Dynamic Metadata** - Each page has optimized meta tags
âœ… **Static Params Generation** - Build-time optimization
âœ… **Caching Strategy** - Same as blogs (in-memory + ISR)
âœ… **Responsive Design** - Grid layouts with Tailwind CSS
âœ… **Animations** - Fade animations using react-reveal
âœ… **Share Functionality** - Facebook, Twitter, LinkedIn, WhatsApp, Copy Link
âœ… **PDF Export** - Download area guides as PDF
âœ… **FAQ Section** - Interactive FAQ accordion
âœ… **Error Handling** - Graceful fallbacks and error messages
âœ… **Mobile-Friendly** - Responsive design for all screen sizes

## Configuration Steps

1. **Ensure Backend API is Running**
   - Update `NEXT_PUBLIC_API_URL` in `.env.local` if using different API
   - Default: `https://cms.hsproperty.ae`

2. **Verify API Endpoints**
   - Ensure endpoints match the structure above
  - Test with curl: `curl https://cms.hsproperty.ae/api/area-guides/emirates`

3. **Cache Duration**
   - For development: Use 120 seconds (already set)
   - For production: Update to 3600+ seconds

4. **Testing**
   - Visit `http://localhost:3000/area-guides`
   - Click on emirate to see areas
   - Click on area to see full guide with FAQs

## Differences from Old Implementation

| Aspect         | Old (/area-guides)          | New (/area-guides)        |
| -------------- | --------------------------- | ----------------------------- |
| Data Source    | Hardcoded in files          | API with caching              |
| Route Params   | id-based (delhi, abu-dhabi) | slug-based (dubai, abu-dhabi) |
| Cache Strategy | None                        | ISR + In-Memory               |
| Dynamic Pages  | No                          | Yes with generateStaticParams |
| Flexibility    | Static content              | Dynamic & updatable           |
| SEO Meta Tags  | Hardcoded                   | Dynamic per page              |

## Performance Metrics

- **Initial Load**: Server-side renders with API data (cached)
- **Subsequent Visits**: Uses Next.js ISR cache
- **Memory Cache Hit**: Ultra-fast response from memory
- **API Fallback**: If cache expires, re-validates automatically

## Next Steps

1. Update backend API URL in `.env.local` if needed
2. Test all three routes with actual API data
3. Monitor cache hits/misses in console logs
4. Adjust REVALIDATE_SECONDS based on update frequency
5. Deploy to production

## Troubleshooting

**CORS Errors?**

- Ensure backend has CORS configured for your domain
- Check `NEXT_PUBLIC_API_URL` is correct

**Empty Data?**

- Verify API endpoints are returning data
- Check `is_active` flag in backend (only active records shown)
- Ensure database migrations are run

**Cache Not Updating?**

- Check REVALIDATE_SECONDS setting
- ISR cache updates on next request after expiration
- Can trigger manual revalidation with API route

**Missing FAQs?**

- Verify area has FAQs in backend
- Check FAQ sorting with `order` field
- Empty FAQ section won't show if no FAQs present

