import React from "react";
import AwardsPage from "@/components/pages/AwardsPage";
import { awardsPageJsonLdGraph } from "@/lib/jsonld/awardsPage";

const pageUrl = "https://hsproperty.ae/awards";
const ogImage = "https://hsproperty.ae/Bg-Imgs/award-bg.jpg";

export const metadata = {
  title: "150+ Industry Awards | H&S Real Estate — Emaar, DLD, Nakheel",
  description:
    "150+ verified awards from 2016–2025. No.1 Sales Company UAE (DLD 2025). Emaar Annual Broker Award winner. Most awarded real estate brokerage in Dubai history.",
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "150+ Industry Awards | H&S Real Estate — Emaar, DLD, Nakheel",
    description:
      "150+ verified awards from 2016–2025. No.1 Sales Company UAE (DLD 2025). Emaar Annual Broker Award winner. Most awarded real estate brokerage in Dubai history.",
    url: pageUrl,
    siteName: "H&S Real Estate",
    locale: "en_AE",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "H&S Real Estate awards and recognition" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "150+ Industry Awards | H&S Real Estate — Emaar, DLD, Nakheel",
    description:
      "150+ verified awards from 2016–2025. No.1 Sales Company UAE (DLD 2025). Most awarded real estate brokerage in Dubai history.",
    images: [ogImage],
  },
};

export default function Page() {
  return (
    <>
      <script
        id="awards-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(awardsPageJsonLdGraph),
        }}
      />
      <AwardsPage />
    </>
  );
}
