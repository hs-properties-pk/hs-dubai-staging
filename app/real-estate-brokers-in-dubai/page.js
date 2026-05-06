import RealEstateBrokersInDubaiPage from "@/components/pages/RealEstateBrokersInDubaiPage";
import Script from "next/script";
import React from "react";

export const metadata = {
    title: "Top Real Estate Agents & Brokers Dubai | H&S Real Estate",
    description:
        "Looking for the best real estate agents in Dubai? H&S Real Estate offers expert brokers and top agents to guide you in finding your perfect property.",
};

const ORG_ID = "https://hsproperty.ae/#organization";

const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "@id": "https://hsproperty.ae/real-estate-brokers-in-dubai#breadcrumbs",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://hsproperty.ae/",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Real Estate Brokers Dubai",
                    item: "https://hsproperty.ae/real-estate-brokers-in-dubai",
                },
            ],
        },
        {
            "@type": "AboutPage",
            "@id": "https://hsproperty.ae/real-estate-brokers-in-dubai#aboutpage",
            url: "https://hsproperty.ae/real-estate-brokers-in-dubai",
            name: "Real Estate Agents in Dubai",
            inLanguage: "en",
            description:
                "H&S Real Estate  a Haqsons Group subsidiary  is a global real estate leader headquartered in Dubai with presence across the UAE, Pakistan, Angola and Japan.",
            isPartOf: {
                "@type": "WebSite",
                "@id": "https://hsproperty.ae/#website",
                url: "https://hsproperty.ae/",
                name: "Real Estate Agents in Dubai",
            },
            breadcrumb: {
                "@id": "https://hsproperty.ae/real-estate-brokers-in-dubai#breadcrumbs",
            },
            mainEntity: { "@id": ORG_ID },
        },
        {
            "@type": ["Organization", "RealEstateAgent"],
            "@id": ORG_ID,
            name: "H&S Real Estate",
            url: "https://hsproperty.ae/real-estate-brokers-in-dubai",
            slogan: "Trusted Real Estate Brokers in Dubai",
            parentOrganization: { "@type": "Organization", name: "Haqsons Group" },
            foundingDate: "2006",
            foundingLocation: {
                "@type": "Place",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dubai",
                    addressCountry: "AE",
                },
            },
            areaServed: ["AE", "PK", "AO", "JP"],
            address: {
                "@type": "PostalAddress",
                streetAddress:
                    "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                addressCountry: "AE",
            },
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    telephone: "+971-4-345-4888",
                    email: "info@hsproperty.ae",
                    areaServed: "AE",
                    availableLanguage: ["en"],
                },
            ],
            award: [
                "Emaar Top Sales Award (2024)",
                "Dubai Land Department & RERA Gold Award (2021, 2022)",
                "Tilal Al Ghaf Top Performing Partner Award (2021)",
            ],
            sameAs: [
                "https://www.instagram.com/hs_property/",
                "https://www.facebook.com/hspropertyrealestate/",
                "https://www.youtube.com/@HSRealEstate",
                "https://www.tiktok.com/@hsrealestatedubai",
                "https://x.com/hspropertydubai",
            ],
        },
        {
            "@type": "Service",
            "@id": "https://hsproperty.ae/real-estate-brokers-in-dubai#service",
            name: "Real Estate Brokers Dubai | H&S Real Estate",
            url: "https://hsproperty.ae/real-estate-brokers-in-dubai",
            description:
                "Award-winning RERA-certified real estate brokers in Dubai with 25+ years in off-plan and luxury properties.",
            serviceType: "RealEstate",
            provider: { "@id": ORG_ID },
            areaServed: {
                "@type": "City",
                name: "Dubai",
            },
            availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://hsproperty.ae/real-estate-brokers-in-dubai",
                servicePhone: "+97143454888",
            },
        },
    ],
};

function page() {
    return (
        <div>
            <Script
                id="real-estate-brokers-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <RealEstateBrokersInDubaiPage />
        </div>
    );
}

export default page;
