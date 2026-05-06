import CommunityPage from "@/components/CommunityPage";
import Script from "next/script";

export const metadata = {
  title: "Best Areas to Live in Dubai | Residential Communities Guide",
  description:
    "Discover the best communities in Dubai, including top residential communities, Dubai residential areas, villa communities, and the best areas in Dubai to live.",
  keywords:
    "real estate, dubai real estate, real estate broker, real estate investing, best real estate brokers in dubai, real estate brokers in dubai, top real estate agency in dubai, luxury real estate dubai",
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which are the best real estate communities in Dubai to live in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai offers a wide range of top communities including Downtown Dubai, Palm Jumeirah, Dubai Marina, and emerging master-planned areas. The best community depends on your lifestyle, budget, and long-term goals.",
      },
    },
    {
      "@type": "Question",
      name: "How can a real estate broker help me choose the right community in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A professional real estate broker in Dubai understands market trends, community facilities, and property values, helping you choose a location that matches your living or investment needs.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dubai a good place for real estate investing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Dubai is considered one of the strongest real estate markets globally due to high rental yields, tax advantages, and continuous development across prime and emerging areas.",
      },
    },
    {
      "@type": "Question",
      name: "What makes luxury real estate in Dubai so popular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Luxury real estate in Dubai offers world-class amenities, iconic architecture, waterfront living, and access to exclusive communities, making it attractive to both residents and investors.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the best real estate brokers in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for licensed, experienced brokers with strong local market knowledge, transparent processes, and a proven track record in Dubai real estate transactions.",
      },
    },
    {
      "@type": "Question",
      name: "Can foreigners invest in real estate in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, foreign investors can buy freehold properties in designated areas across Dubai, making it a popular destination for international real estate investing.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of investing in Dubai real estate through an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Working with a top real estate agency in Dubai ensures access to verified listings, expert advice, legal guidance, and better negotiation opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Are luxury communities in Dubai suitable for families?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many luxury communities in Dubai are family-friendly, offering parks, schools, healthcare facilities, and secure environments designed for long-term living.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties are available in Dubai communities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai communities offer apartments, townhouses, villas, and waterfront residences, catering to different lifestyles and investment preferences.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I choose a trusted real estate broker in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A trusted broker provides market insights, protects your interests, simplifies the buying process, and helps you make informed decisions in Dubai's competitive real estate market.",
      },
    },
    {
      "@type": "Question",
      name: "Why to invest in Dubai real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Why to invest in Dubai real estate is simple: high rental yields, tax-free property ownership, strong capital appreciation, and a stable, investor-friendly market make it a top global destination to invest in Dubai real estate.",
      },
    },
  ],
};

export default function CommunitiesPage() {
  return (
    <>
      <Script
        id="community-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CommunityPage />
    </>
  );
}
