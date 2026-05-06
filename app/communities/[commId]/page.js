import CommunityLandingTemplate from "@/components/CommunityLandingTemplate";
import { getCommunityBySlug, getAllCommunitySlugs } from "@/data/communities";
import { notFound } from "next/navigation";

/** FAQ rich results: must mirror the on-page accordion (`data.faq.faqs`). */
function buildFaqPageSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export async function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ commId: slug }));
}

export async function generateMetadata({ params }) {
  const { commId } = await params;
  const data = getCommunityBySlug(commId);
  if (!data) return { title: "Community Not Found" };

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      images: [data.meta.ogImage || "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840"],
      type: "website",
      siteName: "HS Property",
      url: data.meta.url,
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [data.meta.ogImage || "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840"],
    },
  };
}

export default async function CommunityPage({ params }) {
  const { commId } = await params;
  const data = getCommunityBySlug(commId);
  if (!data) notFound();

  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  const schemaBlocks = data.meta.schemas
    ? Object.values(data.meta.schemas).filter(
        (schema) =>
          schema != null &&
          typeof schema === "object" &&
          Object.keys(schema).length > 0 &&
          schema["@type"] !== "FAQPage",
      )
    : [];

  const faqLd = buildFaqPageSchema(data.faq?.faqs);
  const jsonLdScripts = faqLd ? [...schemaBlocks, faqLd] : schemaBlocks;

  return (
    <>
      {jsonLdScripts.map((schema, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CommunityLandingTemplate data={data} pixelId={pixelId} />
    </>
  );
}
