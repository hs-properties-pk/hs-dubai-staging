import MinaRashidLanding from "./MinaRashid";
import MetaPixel from "@/components/MetaPixel";

export const metadata = {
    title: "Mina Rashid by Emaar - Community",
    description: "Discover Mina Rashid by Emaar, a vibrant community offering luxurious amenities at the marina. Explore the Mina Rashid project today",
    keywords: "mina rashid marina, mina rashid, mina rashid emaar, mina rashid screening center, mina rashid testing center, emaar mina rashid, buy in mina rashid, mina rashid project, waterfront apartments dubai, marina properties dubai, port rashid development, emaar waterfront community",
    openGraph: {
        title: "Mina Rashid by Emaar - Luxury Waterfront Community in Dubai",
        description: "Explore Mina Rashid by Emaar: A vibrant marina community transforming historic Port Rashid into a modern waterfront destination with luxury apartments, full-service marina, and promenade lifestyle.",
        images: [
            "https://hsproperty.ae/mina_rashid/og-image.jpg",
        ],
        type: "website",
        siteName: "H&S Property Dubai",
        url: "https://hsproperty.ae/communities/mina-rashid-by-emaar",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mina Rashid by Emaar - Waterfront Marina Living",
        description: "Discover luxury waterfront living at Mina Rashid Marina. Modern apartments with sea views, full-service marina, and historic port location in Dubai.",
        images: [
            "https://hsproperty.ae/mina_rashid/twitter-image.jpg",
        ],
    },
    alternates: {
        canonical: "https://hsproperty.ae/communities/mina-rashid-by-emaar",
    },
};

// Schema.org structured data for Mina Rashid
const propertySchema = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    name: "Mina Rashid by Emaar Properties",
    description: "Luxury waterfront community at historic Port Rashid featuring modern apartments, full-service marina, and comprehensive amenities in Dubai.",
    url: "https://hsproperty.ae/communities/mina-rashid-by-emaar",
    image: "https://hsproperty.ae/mina_rashid/schema-image.jpg",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Port Rashid",
        addressRegion: "Dubai",
        addressCountry: "AE",
    },
    developer: {
        "@type": "Organization",
        name: "Emaar Properties",
        url: "https://www.emaar.com",
    },
    numberOfBedrooms: "1, 2, 3",
    priceRange: "AED 1,000,000+",
    amenityFeature: [
        "Full-Service Marina",
        "Yacht Berths",
        "Canal-Style Swimming Pool",
        "Waterfront Promenade",
        "Cruise Terminal Access",
        "Fitness Centers",
        "Landscaped Parks",
        "Children's Play Areas",
        "Retail & Dining",
        "Hotels",
        "Cycling Paths",
        "24/7 Security",
    ],
    openingHours: "Mo-Su 09:00-19:00",
    telephone: "+971-04-345-4888",
    hasMap: "https://goo.gl/maps/example",
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Where is Mina Rashid located?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Mina Rashid is located near Port Rashid on Dubai's coastline, between Old Dubai and modern business districts, offering easy access to major roads and Dubai International Airport.",
            },
        },
        {
            "@type": "Question",
            name: "What types of properties are available in Mina Rashid?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Mina Rashid primarily offers 1-3 bedroom luxury apartments in mid-rise buildings, with some penthouses and larger units featuring marina or sea views.",
            },
        },
        {
            "@type": "Question",
            name: "Is Mina Rashid freehold?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, eligible buyers can buy Mina Rashid Emaar residential buildings as freehold property. These buildings are part of a larger master community.",
            },
        },
        {
            "@type": "Question",
            name: "Is Mina Rashid ready or still under construction?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Mina Rashid is a multi-phase development. Some buildings are complete and handed over, while others are under construction or newly launched as off plan projects.",
            },
        },
        {
            "@type": "Question",
            name: "Who is Mina Rashid suitable for?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It suits end-users who want a quieter marina lifestyle near the city. It also suits investors who want branded waterfront off-plan opportunities in a growing port-side district.",
            },
        },
        {
            "@type": "Question",
            name: "What waterfront amenities are available at Mina Rashid?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Mina Rashid features a full-service marina with yacht berths, canal-style swimming pools, waterfront promenade, cruise terminal access, and comprehensive leisure facilities.",
            },
        },
        {
            "@type": "Question",
            name: "Who is the developer of Mina Rashid?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Mina Rashid is developed by Emaar Properties, one of Dubai's leading and most trusted real estate developers known for quality master-planned communities.",
            },
        },
    ],
};

// Local Business Schema for H&S Property
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "H&S Property",
    image: "https://hsproperty.ae/logo.png",
    "@id": "https://hsproperty.ae",
    url: "https://hsproperty.ae",
    telephone: "+971-04-345-4888",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Grey Square, Showroom 2, Umm Suqeim Road",
        addressLocality: "Al Barsha 2",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 25.1193,
        longitude: 55.2005,
    },
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
    },
};

export default function MinaRashidPage() {
    const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

    return (
        <>
            {/* Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* Main Landing Page Component */}
            <MinaRashidLanding pixelId={pixelId} />
        </>
    );
}