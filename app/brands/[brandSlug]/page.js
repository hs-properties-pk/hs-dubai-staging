import { notFound } from "next/navigation";
import BrandProjectsPage from "@/components/pages/BrandProjectsPage";
import { getAllBrandSlugs, getBrandBySlug } from "@/lib/brands";
import { resolveBrandPageProfile } from "@/lib/brandProfile";
import { getBrandDetail, getBrandsList } from "@/lib/fetchBrandsData";

export async function generateStaticParams() {
  try {
    const data = await getBrandsList();
    if (data?.data?.length) {
      return data.data.map((b) => ({ brandSlug: b.slug }));
    }
  } catch {}
  // Fallback to local static slugs
  return getAllBrandSlugs().map((brandSlug) => ({ brandSlug }));
}

export async function generateMetadata({ params }) {
  let b = null;

  const apiData = await getBrandDetail(params.brandSlug);
  if (apiData?.data) {
    b = apiData.data;
  } else {
    b = getBrandBySlug(params.brandSlug);
  }

  if (!b) {
    return { title: "Developer | H&S Real Estate" };
  }
  const parts = [];
  if (b.offPlanCount)
    parts.push(
      `${b.offPlanCount} off-plan project${b.offPlanCount === 1 ? "" : "s"}`,
    );
  if (b.communityCount)
    parts.push(
      `${b.communityCount} community guide${b.communityCount === 1 ? "" : "s"}`,
    );
  const summary = parts.length ? parts.join(" and ") : "Projects and communities";

  return {
    title: `${b.name} — off-plan & communities in Dubai | H&S Real Estate`,
    description: `View ${summary} for ${b.name} on H&S Real Estate. Filter off-plan by type, price, and bedrooms; open community guides from the same hub.`,
    alternates: {
      canonical: `https://hsproperty.ae/brands/${b.slug}`,
    },
    openGraph: {
      title: `${b.name} — off-plan in Dubai | H&S Real Estate`,
      url: `https://hsproperty.ae/brands/${b.slug}`,
    },
  };
}

export default async function Page({ params }) {
  let b = null;

  const apiData = await getBrandDetail(params.brandSlug);
  if (apiData?.data) {
    b = apiData.data;
  } else {
    b = getBrandBySlug(params.brandSlug);
  }

  if (!b) notFound();

  const intro =
    b.communityCount > 0 && b.offPlanCount > 0
      ? `Browse ${b.offPlanCount} off-plan project card${
          b.offPlanCount === 1 ? "" : "s"
        } and ${b.communityCount} community guide${
          b.communityCount === 1 ? "" : "s"
        } for ${b.name}. Use filters below for projects, or open a community page for area overviews and amenities.`
      : b.communityCount > 0
        ? `Explore ${b.communityCount} community guide${
            b.communityCount === 1 ? "" : "s"
          } for ${b.name} — in-depth pages linked to our main /communities hub.`
        : `View ${b.offPlanCount} off-plan listing${
            b.offPlanCount === 1 ? "" : "s"
          } by ${b.name}. Filter by villa, apartment, townhouse, price, and bedrooms — same data as the main off-plan search, focused on this developer.`;

  const profile = resolveBrandPageProfile({
    slug: b.slug,
    name: b.name,
    intro,
    offPlanCount: b.offPlanCount,
    communityCount: b.communityCount,
  });

  return (
    <BrandProjectsPage
      brandName={b.name}
      brandSlug={b.slug}
      intro={intro}
      profile={profile}
    />
  );
}