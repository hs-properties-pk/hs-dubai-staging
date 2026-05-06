import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Fade from "react-reveal/Fade";
import BlogCardOriginal from "./BlogCardOriginal";

const Blog = () => {
  const blogs = [
    {
      id: "dubai-hills-estate-properties-sale-luxury-living",
      imageSrc: "/Blogs/dubai-hills-estate-properties-sale-luxury-living.jpg",
      title: "Dubai Hills Estate Properties for Sale – Luxury Living in Dubai's Most Prestigious Master Community",
      date: "February 21, 2026",
    },
    {
      id: "best-gated-communities-dubai-2026-secure-residential-areas",
      imageSrc: "/Blogs/Blog-36.jpeg",
      title: "Best Gated Communities in Dubai (2026): Top Secure Residential Areas to Live",
      date: "February 17, 2026",
    },
    {
      id: "best-communities-dubai-2026-top-residential-areas",
      imageSrc: "/Blogs/Blog-35.jpeg",
      title: "Best Communities in Dubai (2026): Top Residential Areas to Live, Invest & Buy Villas",
      date: "February 17, 2026",
    },
    {
      id: "best-villa-communities-dubai-2026-top-areas",
      imageSrc: "/Blogs/Blog-34.png",
      title: "Best Villa Communities in Dubai (2026): Top Areas to Buy Luxury & Family Villas",
      date: "February 17, 2026",
    },
    {
      id: "upcoming-attractions-lifestyle-features-the-valley-emaar",
      imageSrc: "/Blogs/Blog-33.jpg",
      title: "Upcoming Attractions and Lifestyle Features in The Valley by Emaar",
      date: "February 14, 2026",
    },
    {
      id: "best-communities-dubai-real-estate-brokers-add-value",
      imageSrc: "/Blogs/blog-32.jpg",
      title: "Best Communities in Dubai: How Real Estate Brokers like H&S Real Estate Add Value",
      date: "February 14, 2026",
    },
    {
      id: "best-real-estate-brokers-dubai-off-plan-projects",
      imageSrc: "/Blogs/blog-30.jpeg",
      title: "Finding the Best Real Estate Brokers in Dubai for Off-Plan Projects",
      date: "January 17, 2026",
    },
    {
      id: "exploring-skyline-dubai-real-estate-golden-opportunity",
      imageSrc: "/Blogs/exploring-skyline-dubai-real-estate-golden-opportunity.jpeg",
      title: "Exploring the Skyline: Why Investing in Dubai Real Estate is a Golden Opportunity",
      date: "January 8, 2026",
    },
    {
      id: "top-reasons-invest-valley-emaar-2026",
      imageSrc: "/Blogs/top-reasons-invest-valley-emaar-2026.webp",
      title: "Top Reasons to Invest in The Valley By Emaar in 2026",
      date: "January 7, 2026",
    },
    {
      id: "the-valley-emaar-vs-damac-hills-investment-lifestyle",
      imageSrc: "/Blogs/damac-vs-valley-1.png",
      title: "The Valley by Emaar vs DAMAC Hills: Key Differences in Investment Returns and Lifestyle",
      date: "January 7, 2026",
    },
    {
      id: "sustainable-luxury-living-palm-jebel-ali-infrastructure",
      imageSrc: "/Blogs/subtainable-palm-jabel-ali.png",
      title: "Sustainable Luxury Living: New Infrastructure in Palm Jebel Ali",
      date: "January 5, 2026",
    },
    {
      id: "new-year-new-home-best-areas-family-villa-dubai-2026",
      imageSrc: "/Blogs/2026.jpg",
      title: "New Year, New Home: Best Areas to Buy a Family Villa in Dubai (2026 Guide)",
      date: "January 1, 2026",
    },
    {
      id: "upcoming-attractions-resorts-palm-jebel-ali",
      imageSrc: "/Blogs/palm-jebel-attraction-blog.webp",
      title: "Upcoming Attractions and Resorts on Palm Jebel Ali: Dubai's Future Waterfront Destination",
      date: "December 19, 2025",
    },
    {
      id: "top-reasons-to-invest-in-palm-jebel-ali-villas-2026",
      imageSrc: "/Blogs/Palm-Jebel-Ali-Blogs-areal.webp",
      title: "Top Reasons to Invest in Palm Jebel Ali Villas in 2026",
      date: "December 19, 2025",
    },
    {
      id: "palm-jebel-ali-vs-palm-jumeirah-investment-lifestyle-comparison",
      imageSrc: "/Blogs/Palm-Jebel-Ali_vs_Palm-Jumeirah.png",
      title:
        "Palm Jebel Ali vs Palm Jumeirah: Which Is Better for Investment and Lifestyle?",
      date: "December 19, 2025",
    },
    {
      id: "exploring-dubai-off-plan-projects-2026",
      imageSrc: "/Blogs/Blog-29.webp",
      title:
        "Exploring Dubai's Most Promising Off-Plan Projects for Future Homeowners in Dubai 2026",
      date: "November 27, 2025",
    },
    {
      id: "damac-hills-1-vs-damac-hills-2",
      imageSrc: "/Blogs/Blog-28.webp",
      title: "Damac Hills 1 vs Damac Hills 2. Which Is Good For Investment?",
      date: "September 23, 2025",
    },
    {
      id: "top-5-emerging-neighbourhoods-in-dubai-for-real-estate-investment",
      imageSrc: "/Blogs/Blog-27.webp",
      title:
        "Top 5 Emerging Neighbourhoods in Dubai for Real-Estate Investment",
      date: "June 25, 2025",
    },
    {
      id: "off-plan-vs-ready-property-in-dubai-which-route-makes-you-more-money",
      imageSrc: "/Blogs/Blog-26.jpeg",
      title:
        "Off-Plan vs. Ready Property in Dubai  Which Route Makes You More Money?",
      date: "June 27, 2025",
    },
    {
      id: "how-dubais-golden-visa-is-attracting-real-estate-investors",
      imageSrc: "/Blogs/Blog-25.jpg",
      title: "How Dubai's Golden Visa is Attracting Real Estate Investors",
      date: "June 27, 2025",
    },
    {
      id: "the-role-of-technology-in-dubais-modern-real-estate-developments",
      imageSrc: "/Blogs/Blog-24.webp",
      title:
        "The Role of Technology in Dubai's Modern Real Estate Developments",
      date: "June 27, 2025",
    },
    {
      id: "comparing-emaar-damac-and-nakheel-which-developer-fits-your-investment-goals",
      imageSrc: "/Blogs/Blog-23.jpg",
      title:
        "Comparing Emaar, DAMAC, and Nakheel: Which Developer Fits Your Investment Goals?",
      date: "June 16, 2025",
    },
    {
      id: "best-areas-to-buy-real-estate-in-dubai",
      imageSrc: "/Blogs/Blog-22.png",
      title: "The Best Areas to Buy Real Estate in Dubai: Your Complete Guide",
      date: "March 11, 2025",
    },
    {
      id: "is-damac-hills-dubai-a-good-investment",
      imageSrc: "/Blogs/Blog-21.jpg",
      title: "Is Damac Hills Dubai a Good Investment in 2025?",
      date: "March 10, 2025",
    },
    {
      id: "what-is-the-sales-and-purchase-agreement-in-dubai",
      imageSrc: "/Blogs/Blog-20.jpg",
      title: "What is the Sales & Purchase Agreement (SPA) in Dubai? ",
      date: "March 6, 2025",
    },
    {
      id: "what-is-an-affection-plan-dubai",
      imageSrc: "/Blogs/Blog-19.jpg",
      title: "What is an Affection Plan Dubai?",
      date: "January 17, 2025",
    },
    {
      id: "how-much-rent-can-be-increased-in-dubai",
      imageSrc: "/Blogs/Blog-18.jpg",
      title: "How much rent can be increased in Dubai?",
      date: "December 27, 2024",
    },
    {
      id: "what-is-the-dubai-municipality-housing-fee",
      imageSrc: "/Blogs/Blog-17.jpg",
      title:
        "What is the Dubai Municipality Housing Fee? A Comprehensive Guide",
      date: "December 27, 2024",
    },
    {
      id: "renting-vs-buying-in-dubais",
      imageSrc: "/Blogs/Blog-16.jpg",
      title: "Renting vs. Buying in Dubai: Which Option is Right for You?",
      date: "December 27, 2024",
    },
    {
      id: "challenges-in-property-management-and-how-to-overcome-them",
      imageSrc: "/Blogs/Blog-15.jpg",
      title:
        "Common Challenges in Property Management and How to Overcome Them",
      date: "December 27, 2024",
    },
    {
      id: "off-plan-vs-ready-to-move-properties",
      imageSrc: "/Blogs/Blog-14.jpg",
      title:
        "Off-Plan vs. Ready-to-Move Properties: Which is the Better Investment?",
      date: "December 27, 2024",
    },
    {
      id: "selling-your-property-faster-in-dubai-market",
      imageSrc: "/Blogs/Blog-13.jpg",
      title:
        "A Step-by-Step Guide to Selling Your Property Faster in Dubai’s Market",
      date: "December 27, 2024",
    },
    {
      id: "benefits-of-investing-in-off-plan-properties-in-dubai",
      imageSrc: "/Blogs/Blog-12.jpg",
      title: "Top Benefits of Investing in Off-Plan Properties in Dubai",
      date: "December 27, 2024",
    },
    {
      id: "why-dubai-is-a-prime-destination-for-real-estate-investment",
      imageSrc: "/Blogs/Blog-11.jpg",
      title:
        "Why Dubai is a Prime Destination for Real Estate Investment in 2025",
      date: "December 27, 2024",
    },
    {
      id: "5-mistakes-to-avoid-when-selling-your-property-in-dubai",
      imageSrc: "/Blogs/Blog-10.jpg",
      title: "5 Mistakes to Avoid When Selling Your Property in Dubai",
      date: "December 27, 2024",
    },
    {
      id: "10-facts-about-the-palm-jumeirah",
      imageSrc: "/Blogs/Blog-9.jpg",
      title: "10 Facts about the Palm Jumeirah",
      date: "December 27, 2024",
    },
    {
      id: "all-seasons-residence-ideal-place-to-live-dubai",
      imageSrc: "/Blogs/Blog-8.jpg",
      title: "Why All Seasons Residence is the Ideal Place to Live in Dubai?",
      date: "December 12, 2024",
    },
    {
      id: "can-residential-property-be-used-for-commercial-use",
      imageSrc: "/Blogs/Blog-1.jpg",
      title: "Can Residential Property Be Used for Commercial Use?",
      date: "September 01, 2024",
    },
    {
      id: "can-you-have-two-mortgages-on-one-property",
      imageSrc: "/Blogs/Blog-2.jpg",
      title: "Can You Have Two Mortgages on One Property?",
      date: "September 01, 2024",
    },
    {
      id: "the-ultimate-guide-to-buying-a-property-in-dubai",
      imageSrc: "/Blogs/Blog-6.jpg",
      title: "The Ultimate Guide to Buying a Property in Dubai",
      date: "September 01, 2024",
    },
    {
      id: "what-is-off-plan-property",
      imageSrc: "/Blogs/Blog-3.jpg",
      title: "What Is Off-Plan Property?",
      date: "September 01, 2024",
    },

    {
      id: "what-is-the-rera-rental-calculator",
      imageSrc: "/Blogs/Blog-7.jpg",
      title: "What Is the RERA Rental Calculator and What Does It Do?",
      date: "September 01, 2024",
    },
    {
      id: "what-are-property-registration-trustees-in-dubai",
      imageSrc: "/Blogs/Blog-4.jpg",
      title: "What are Property Registration Trustees in Dubai?",
      date: "September 01, 2024",
    },
    {
      id: "a-mortgage-guide-for-first-time-buyers-in-dubai",
      imageSrc: "/Blogs/Blog-5.jpg",
      title: "A Mortgage Guide for First-Time Buyers in Dubai",
      date: "September 01, 2024",
    },
  ];

  // const [visibleBlogs, setVisibleBlogs] = useState(5);
  const type = "blogs";
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8   ">
        {blogs.map((blog, index) => (
          <Fade bottom duration={1000 + index * 200} key={index}>
            <BlogCardOriginal
              type={type}
              imageSrc={blog.imageSrc}
              date={blog.date}
              title={blog.title}
              id={blog.id}
            />
          </Fade>
        ))}
      </div>
      <div className="hidden md:block ">
        <div className="grid lg:grid-cols-6 gap-4">
          <div className="lg:col-span-4">
            <Fade left duration={1500}>
              <BlogCard
                type={type}
                imageSrc={blogs[0].imageSrc}
                date={blogs[0].date}
                title={blogs[0].title}
                id={blogs[0].id}
                large
              />
            </Fade>
          </div>
          <div className="lg:col-span-2 space-y-3.5">
            {blogs.slice(1, 5).map((blog, index) => (
              <Fade right duration={1000 + index * 200} key={index}>
                <BlogCard
                  type={type}
                  imageSrc={blog.imageSrc}
                  date={blog.date}
                  title={blog.title}
                  id={blog.id}
                />
              </Fade>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {blogs.slice(5, blogs.length).map((blog, index) => (
            <Fade bottom duration={1000 + index * 200} key={index}>
              <BlogCardOriginal
                type={type}
                imageSrc={blog.imageSrc}
                date={blog.date}
                title={blog.title}
                id={blog.id}
              />
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
