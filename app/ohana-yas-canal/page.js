import OhanaYasCanalLanding from "./OhanaYasCanal";

export const metadata = {
    title: "Ohana Yas Canal - Luxury Waterfront Residences in Abu Dhabi",
    description: "Discover Ohana Yas Canal, a prestigious waterfront development on Yas Island, Abu Dhabi. Luxury villas, townhouses, and apartments with world-class amenities in partnership with Manchester City.",
    keywords: "ohana yas canal, ohana yas island, abu dhabi waterfront, luxury villas abu dhabi, yas canal residences, ohana development, manchester city partnership, waterfront properties abu dhabi",
    openGraph: {
        title: "Ohana Yas Canal - Luxury Waterfront Residences | Abu Dhabi",
        description: "Experience luxury living at Ohana Yas Canal on Yas Island. Premium villas, townhouses, and apartments with exclusive amenities in partnership with Manchester City.",
        images: [
            "https://hsproperty.ae/ohana-yas-canal/og-image.jpg",
        ],
        type: "website",
        siteName: "H&S Property Dubai",
        url: "https://hsproperty.ae/ohana-yas-canal",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ohana Yas Canal - Luxury Waterfront Living in Abu Dhabi",
        description: "Premium waterfront residences on Yas Island with world-class amenities. Partnership with Manchester City.",
        images: [
            "https://hsproperty.ae/ohana-yas-canal/twitter-image.jpg",
        ],
    },
    alternates: {
        canonical: "https://hsproperty.ae/ohana-yas-canal",
    },
};

// Schema.org structured data for Ohana Yas Canal
const propertySchema = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    name: "Ohana Yas Canal",
    description: "Luxury waterfront residential development on Yas Canal, Abu Dhabi. Premium villas, townhouses, and apartments with world-class amenities in partnership with Manchester City.",
    url: "https://hsproperty.ae/ohana-yas-canal",
    image: "https://hsproperty.ae/ohana-yas-canal/schema-image.jpg",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Yas Island",
        addressRegion: "Abu Dhabi",
        addressCountry: "AE",
    },
    developer: {
        "@type": "Organization",
        name: "Ohana Real Estate Development & Construction L.L.C – S.P.C",
        url: "https://www.ohana.ae",
    },
    numberOfBedrooms: "1, 2, 3, 4, 5",
    priceRange: "AED 4,500,000 - AED 36,500,000",
    amenityFeature: [
        "Social Club & Lobby",
        "Fine Dining Restaurant",
        "Rooftop Pool",
        "Oxygen Therapy Room",
        "Hydrotherapy Circuit",
        "Gym & Fitness Center",
        "Altitude/Heat Room",
        "Canal Sports Lounge",
        "Watersports Club",
        "Recovery Pier",
        "Canal Promenade",
        "Heritage Center",
        "Skybox Lounge",
        "Trophy Gallery",
        "Brand Academy",
        "Central Garden",
        "Sports Complex",
    ],
    openingHours: "Mo-Su 09:00-18:00",
    telephone: "+971-54-2000-444",
    email: "info@ohana.ae",
    hasMap: "https://goo.gl/maps/example",
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Where is Ohana Yas Canal located?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ohana Yas Canal is located on Yas Canal, Yas Island, Abu Dhabi, overlooking major entertainment hubs with panoramic views ensuring a premium living experience within a prestigious address.",
            },
        },
        {
            "@type": "Question",
            name: "What types of properties are available at Ohana Yas Canal?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ohana Yas Canal offers Townhouses, Twin Villas, 4 BR Villas, 5 BR Villas, Maisonettes, and Apartments, with prices starting from AED 4,500,000.",
            },
        },
        {
            "@type": "Question",
            name: "What payment plans are available?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ohana Yas Canal offers two flexible payment plans: Option 1 (50/50) with 5% booking and installments, and Option 2 (75/25) with 5% booking and 20% down payment. Both plans are designed to suit different investor needs.",
            },
        },
        {
            "@type": "Question",
            name: "What amenities are included?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The development features world-class amenities including Social Club with lobby and fine dining, Wellness & Recovery facilities, Waterfront & Outdoor amenities, Signature amenities like Heritage Center and Trophy Gallery, and Lifestyle & Sports facilities including Brand Academy and Sports Complex.",
            },
        },
        {
            "@type": "Question",
            name: "Who is the developer?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ohana Yas Canal is developed by Ohana Real Estate Development & Construction L.L.C – S.P.C, with offices in Abu Dhabi, Corniche, Landmark Tower. The project is in partnership with Manchester City.",
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
        closes: "18:00",
    },
};

export default function OhanaYasCanalPage() {
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
            <OhanaYasCanalLanding pixelId={pixelId} />
        </>
    );
}