import React from "react";
import AreaGuideNewDetailPage from "@/components/pages/AreaGuideNewDetailPage";
import { getAreaGuideDetail } from "@/lib/fetchAreaGuidesData";

// Dynamic rendering - don't require static generation at build time
export const dynamic = 'force-dynamic';

async function fetchAreaOnce(areaSlug) {
  try {
    const data = await getAreaGuideDetail(areaSlug);
    return { data };
  } catch (error) {
    console.error(`Error fetching area ${areaSlug}:`, error);
    return { data: null };
  }
}

export async function generateMetadata({ params }) {
  try {
    const { areaSlug } = params;
    const { data } = await fetchAreaOnce(areaSlug);

    const area = data?.data;
    return {
      title: area?.meta_title || `${area?.title} | H&S Real Estate`,
      description:
        area?.meta_description ||
        `Discover ${area?.title}. Explore properties, amenities, and lifestyle options.`,
    };
  } catch (error) {
    return {
      title: "Area Guide | H&S Real Estate",
      description: "Explore detailed area guides",
    };
  }
}

async function Page({ params }) {
  const { areaSlug } = params;
  const { data } = await fetchAreaOnce(areaSlug);

  if (!data || !data.success) {
    return <div className="text-center py-12">Area guide not found</div>;
  }

  return (
    <div>
      <AreaGuideNewDetailPage areaSlug={areaSlug} areaData={data.data} />
    </div>
  );
}

export default Page;
