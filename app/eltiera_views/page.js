// app/EltieraViews/page.js
import EltieraViews from "./EltieraViews";

export const metadata = {
  title: "Eltiera Views Apartments: Luxury Living in Jumeirah Islands",
  description:
    "Experience unparalleled elegance with Eltiera Views apartments. Located in Jumeirah Islands, these luxury residences by Ellington redefine Dubai real estate.",
  keywords: [
    "Eltiera Views by Ellington",
    "Eltiera Views apartments",
    "Jumeirah Islands apartments",
    "Ellington apartments Dubai",
    "Luxury apartments Dubai",
    "Dubai real estate",
    "Jumeirah Islands properties",
    "Ellington properties",
    "Apartments in Jumeirah Islands",
    "Eltiera Views residences",
  ],
  openGraph: {
    title: "Eltiera Views Apartments: Luxury Living in Jumeirah Islands",
    description:
      "Waterfront luxury residences by Ellington in Jumeirah Islands with wellness amenities, smart homes and stunning Dubai skyline views.",
    type: "website",
    url: "https://hsproperty.ae/eltiera_views", // change to your real URL
  },
  alternates: {
    canonical: "https://hsproperty.ae/eltiera_views", // change to your real URL
  },
};

// FAQ + Offer Schema from your brief
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Eltiera Views by Ellington?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eltiera Views by Ellington is a luxury residential development located in the prestigious Jumeirah Islands community in Dubai. It offers high-end apartments and penthouses with wellness-focused amenities and breathtaking waterfront views.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties are available in Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eltiera Views offers luxury apartments and penthouses, including studio, one-bedroom, and two-bedroom apartments, with various sizes and layouts to suit different needs.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price range for apartments in Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The price for apartments in Eltiera Views starts from AED 2,100,000, with the final price depending on the unit type, size, and location.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a payment plan available for Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Eltiera Views offers a post-handover payment plan, providing buyers with flexible payment options after receiving the property.",
      },
    },
    {
      "@type": "Question",
      name: "When is the expected completion date for Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected handover date for Eltiera Views is between Q4 2028 and Q4 2029.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are available in Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eltiera Views offers wellness amenities like Japanese onsen baths, yoga spaces, Pilates zones, fitness areas, private pools, and infinity pools. Additionally, it features EV charging points, bicycle parking, and retail and dining facilities.",
      },
    },
    {
      "@type": "Question",
      name: "How is Eltiera Views connected to other parts of Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eltiera Views is well-connected to major highways and transport hubs, ensuring easy access to key locations like Downtown Dubai, Dubai Marina, Dubai International Airport, and other iconic landmarks.",
      },
    },
    {
      "@type": "Question",
      name: "Can international buyers invest in Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Eltiera Views offers freehold ownership, allowing international buyers to invest in this premium development in Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "What is the investment potential of Eltiera Views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Given its prime location in Jumeirah Islands, stunning waterfront views, and wellness amenities, Eltiera Views offers strong capital appreciation potential and high rental yields, making it a great investment opportunity.",
      },
    },
  ],
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  url: "https://hsproperty.ae/eltiera_views",
  priceCurrency: "AED",
  price: "2100000",
  priceValidUntil: "2029-12-31",
  itemOffered: {
    "@type": "Product",
    name: "Eltiera Views Apartments",
    description:
      "Luxury apartments and penthouses in Jumeirah Islands, offering stunning waterfront views and wellness-focused amenities.",
    category: "Real Estate",
    brand: {
      "@type": "Brand",
      name: "Ellington Properties",
    },
  },
  seller: {
    "@type": "Organization",
    name: "Ellington Properties",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [faqSchema, offerSchema],
};

export default function Page() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <>
      <EltieraViews pixelId={pixelId} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}
