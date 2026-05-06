// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Import mock blog data as fallback
// We'll get this from the Blog.js component's mock data structure
// const mockBlogs = [
//   {
//     id: "exploring-dubai-off-plan-projects-2026",
//     slug: "exploring-dubai-off-plan-projects-2026",
//     imageSrc: "/Blogs/Blog-29.webp",
//     image: "/Blogs/Blog-29.webp",
//     title: "Exploring Dubai's Most Promising Off-Plan Projects for Future Homeowners in Dubai 2026",
//     date: "November 27, 2025",
//   },
//   {
//     id: "damac-hills-1-vs-damac-hills-2",
//     slug: "damac-hills-1-vs-damac-hills-2",
//     imageSrc: "/Blogs/Blog-28.webp",
//     image: "/Blogs/Blog-28.webp",
//     title: "Damac Hills 1 vs Damac Hills 2. Which Is Good For Investment?",
//     date: "September 23, 2025",
//   },
//   {
//     id: "top-5-emerging-neighbourhoods-in-dubai-for-real-estate-investment",
//     slug: "top-5-emerging-neighbourhoods-in-dubai-for-real-estate-investment",
//     imageSrc: "/Blogs/Blog-27.webp",
//     image: "/Blogs/Blog-27.webp",
//     title: "Top 5 Emerging Neighbourhoods in Dubai for Real-Estate Investment",
//     date: "June 25, 2025",
//   },
//   {
//     id: "off-plan-vs-ready-property-in-dubai-which-route-makes-you-more-money",
//     slug: "off-plan-vs-ready-property-in-dubai-which-route-makes-you-more-money",
//     imageSrc: "/Blogs/Blog-26.jpeg",
//     image: "/Blogs/Blog-26.jpeg",
//     title: "Off-Plan vs. Ready Property in Dubai — Which Route Makes You More Money?",
//     date: "June 27, 2025",
//   },
//   {
//     id: "how-dubais-golden-visa-is-attracting-real-estate-investors",
//     slug: "how-dubais-golden-visa-is-attracting-real-estate-investors",
//     imageSrc: "/Blogs/Blog-25.jpg",
//     image: "/Blogs/Blog-25.jpg",
//     title: "How Dubai's Golden Visa is Attracting Real Estate Investors",
//     date: "June 27, 2025",
//   },
//   {
//     id: "the-role-of-technology-in-dubais-modern-real-estate-developments",
//     slug: "the-role-of-technology-in-dubais-modern-real-estate-developments",
//     imageSrc: "/Blogs/Blog-24.webp",
//     image: "/Blogs/Blog-24.webp",
//     title: "The Role of Technology in Dubai's Modern Real Estate Developments",
//     date: "June 27, 2025",
//   },
//   {
//     id: "comparing-emaar-damac-and-nakheel-which-developer-fits-your-investment-goals",
//     slug: "comparing-emaar-damac-and-nakheel-which-developer-fits-your-investment-goals",
//     imageSrc: "/Blogs/Blog-23.jpg",
//     image: "/Blogs/Blog-23.jpg",
//     title: "Comparing Emaar, DAMAC, and Nakheel: Which Developer Fits Your Investment Goals?",
//     date: "June 16, 2025",
//   },
//   {
//     id: "best-areas-to-buy-real-estate-in-dubai",
//     slug: "best-areas-to-buy-real-estate-in-dubai",
//     imageSrc: "/Blogs/Blog-22.png",
//     image: "/Blogs/Blog-22.png",
//     title: "The Best Areas to Buy Real Estate in Dubai: Your Complete Guide",
//     date: "March 11, 2025",
//   },
//   {
//     id: "is-damac-hills-dubai-a-good-investment",
//     slug: "is-damac-hills-dubai-a-good-investment",
//     imageSrc: "/Blogs/Blog-21.jpg",
//     image: "/Blogs/Blog-21.jpg",
//     title: "Is Damac Hills Dubai a Good Investment in 2025?",
//     date: "March 10, 2025",
//   },
//   {
//     id: "what-is-the-sales-and-purchase-agreement-in-dubai",
//     slug: "what-is-the-sales-and-purchase-agreement-in-dubai",
//     imageSrc: "/Blogs/Blog-20.jpg",
//     image: "/Blogs/Blog-20.jpg",
//     title: "What is the Sales & Purchase Agreement (SPA) in Dubai? ",
//     date: "March 6, 2025",
//   },
//   {
//     id: "what-is-an-affection-plan-dubai",
//     slug: "what-is-an-affection-plan-dubai",
//     imageSrc: "/Blogs/Blog-19.jpg",
//     image: "/Blogs/Blog-19.jpg",
//     title: "What is an Affection Plan Dubai?",
//     date: "January 17, 2025",
//   },
//   {
//     id: "how-much-rent-can-be-increased-in-dubai",
//     slug: "how-much-rent-can-be-increased-in-dubai",
//     imageSrc: "/Blogs/Blog-18.jpg",
//     image: "/Blogs/Blog-18.jpg",
//     title: "How much rent can be increased in Dubai?",
//     date: "December 27, 2024",
//   },
//   {
//     id: "what-is-the-dubai-municipality-housing-fee",
//     slug: "what-is-the-dubai-municipality-housing-fee",
//     imageSrc: "/Blogs/Blog-17.jpg",
//     image: "/Blogs/Blog-17.jpg",
//     title: "What is the Dubai Municipality Housing Fee? A Comprehensive Guide",
//     date: "December 27, 2024",
//   },
//   {
//     id: "renting-vs-buying-in-dubais",
//     slug: "renting-vs-buying-in-dubais",
//     imageSrc: "/Blogs/Blog-16.jpg",
//     image: "/Blogs/Blog-16.jpg",
//     title: "Renting vs. Buying in Dubai: Which Option is Right for You?",
//     date: "December 27, 2024",
//   },
//   {
//     id: "challenges-in-property-management-and-how-to-overcome-them",
//     slug: "challenges-in-property-management-and-how-to-overcome-them",
//     imageSrc: "/Blogs/Blog-15.jpg",
//     image: "/Blogs/Blog-15.jpg",
//     title: "Common Challenges in Property Management and How to Overcome Them",
//     date: "December 27, 2024",
//   },
//   {
//     id: "off-plan-vs-ready-to-move-properties",
//     slug: "off-plan-vs-ready-to-move-properties",
//     imageSrc: "/Blogs/Blog-14.jpg",
//     image: "/Blogs/Blog-14.jpg",
//     title: "Off-Plan vs. Ready-to-Move Properties: Which is the Better Investment?",
//     date: "December 27, 2024",
//   },
//   {
//     id: "selling-your-property-faster-in-dubai-market",
//     slug: "selling-your-property-faster-in-dubai-market",
//     imageSrc: "/Blogs/Blog-13.jpg",
//     image: "/Blogs/Blog-13.jpg",
//     title: "A Step-by-Step Guide to Selling Your Property Faster in Dubai's Market",
//     date: "December 27, 2024",
//   },
//   {
//     id: "benefits-of-investing-in-off-plan-properties-in-dubai",
//     slug: "benefits-of-investing-in-off-plan-properties-in-dubai",
//     imageSrc: "/Blogs/Blog-12.jpg",
//     image: "/Blogs/Blog-12.jpg",
//     title: "Top Benefits of Investing in Off-Plan Properties in Dubai",
//     date: "December 27, 2024",
//   },
//   {
//     id: "why-dubai-is-a-prime-destination-for-real-estate-investment",
//     slug: "why-dubai-is-a-prime-destination-for-real-estate-investment",
//     imageSrc: "/Blogs/Blog-11.jpg",
//     image: "/Blogs/Blog-11.jpg",
//     title: "Why Dubai is a Prime Destination for Real Estate Investment in 2025",
//     date: "December 27, 2024",
//   },
//   {
//     id: "5-mistakes-to-avoid-when-selling-your-property-in-dubai",
//     slug: "5-mistakes-to-avoid-when-selling-your-property-in-dubai",
//     imageSrc: "/Blogs/Blog-10.jpg",
//     image: "/Blogs/Blog-10.jpg",
//     title: "5 Mistakes to Avoid When Selling Your Property in Dubai",
//     date: "December 27, 2024",
//   },
//   {
//     id: "10-facts-about-the-palm-jumeirah",
//     slug: "10-facts-about-the-palm-jumeirah",
//     imageSrc: "/Blogs/Blog-9.jpg",
//     image: "/Blogs/Blog-9.jpg",
//     title: "10 Facts about the Palm Jumeirah",
//     date: "December 27, 2024",
//   },
//   {
//     id: "all-seasons-residence-ideal-place-to-live-dubai",
//     slug: "all-seasons-residence-ideal-place-to-live-dubai",
//     imageSrc: "/Blogs/Blog-8.jpg",
//     image: "/Blogs/Blog-8.jpg",
//     title: "Why All Seasons Residence is the Ideal Place to Live in Dubai?",
//     date: "December 12, 2024",
//   },
//   {
//     id: "can-residential-property-be-used-for-commercial-use",
//     slug: "can-residential-property-be-used-for-commercial-use",
//     imageSrc: "/Blogs/Blog-1.jpg",
//     image: "/Blogs/Blog-1.jpg",
//     title: "Can Residential Property Be Used for Commercial Use?",
//     date: "September 01, 2024",
//   },
//   {
//     id: "can-you-have-two-mortgages-on-one-property",
//     slug: "can-you-have-two-mortgages-on-one-property",
//     imageSrc: "/Blogs/Blog-2.jpg",
//     image: "/Blogs/Blog-2.jpg",
//     title: "Can You Have Two Mortgages on One Property?",
//     date: "September 01, 2024",
//   },
//   {
//     id: "the-ultimate-guide-to-buying-a-property-in-dubai",
//     slug: "the-ultimate-guide-to-buying-a-property-in-dubai",
//     imageSrc: "/Blogs/Blog-6.jpg",
//     image: "/Blogs/Blog-6.jpg",
//     title: "The Ultimate Guide to Buying a Property in Dubai",
//     date: "September 01, 2024",
//   },
//   {
//     id: "what-is-off-plan-property",
//     slug: "what-is-off-plan-property",
//     imageSrc: "/Blogs/Blog-3.jpg",
//     image: "/Blogs/Blog-3.jpg",
//     title: "What Is Off-Plan Property?",
//     date: "September 01, 2024",
//   },
//   {
//     id: "what-is-the-rera-rental-calculator",
//     slug: "what-is-the-rera-rental-calculator",
//     imageSrc: "/Blogs/Blog-7.jpg",
//     image: "/Blogs/Blog-7.jpg",
//     title: "What Is the RERA Rental Calculator and What Does It Do?",
//     date: "September 01, 2024",
//   },
//   {
//     id: "what-are-property-registration-trustees-in-dubai",
//     slug: "what-are-property-registration-trustees-in-dubai",
//     imageSrc: "/Blogs/Blog-4.jpg",
//     image: "/Blogs/Blog-4.jpg",
//     title: "What are Property Registration Trustees in Dubai?",
//     date: "September 01, 2024",
//   },
//   {
//     id: "a-mortgage-guide-for-first-time-buyers-in-dubai",
//     slug: "a-mortgage-guide-for-first-time-buyers-in-dubai",
//     imageSrc: "/Blogs/Blog-5.jpg",
//     image: "/Blogs/Blog-5.jpg",
//     title: "A Mortgage Guide for First-Time Buyers in Dubai",
//     date: "September 01, 2024",
//   },
// ]

/**
 * Blog list API — returns empty; listings use CMS (`lib/fetchBlogLinks`) or local data on the client.
 */
export async function GET() {
  // Prevent caching to ensure fresh data
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
  
  try {
    // Return empty array (components should use their own mock data)
    return Response.json({ 
      success: true, 
      data: [],
      source: 'fallback',
      count: 0
    }, { headers })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    
    // Return empty array on error
    return Response.json({ 
      success: true, 
      data: [],
      source: 'fallback',
      error: error.message
    }, { headers })
  }
}

