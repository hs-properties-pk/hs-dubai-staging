import React from "react";
import AreaGuidesNewCityPage from "@/components/pages/AreaGuidesNewCityPage";
import { getAreasByEmirate } from "@/lib/fetchAreaGuidesData";

// Dynamic rendering - don't require static generation at build time
export const dynamic = 'force-dynamic';

async function fetchAreasOnce(emirateSlug) {
  try {
    const data = await getAreasByEmirate(emirateSlug);
    return { data };
  } catch (error) {
    console.error(`Error fetching areas for ${emirateSlug}:`, error);
    return { data: null };
  }
}

export async function generateMetadata({ params }) {
  try {
    const { emirateSlug } = params;
    const { data } = await fetchAreasOnce(emirateSlug);

    const emirate = data?.emirate;
    return {
      title: emirate?.meta_title || `${emirate?.name} Area Guides | H&S Real Estate`,
      description:
        emirate?.meta_description ||
        `Explore detailed area guides for ${emirate?.name}. Find communities, amenities, and lifestyle options.`,
    };
  } catch (error) {
    return {
      title: "Area Guides | H&S Real Estate",
      description: "Explore area guides across emirates",
    };
  }
}

async function Page({ params }) {
  const { emirateSlug } = params;
  const { data } = await fetchAreasOnce(emirateSlug);

  if (!data || !data.success) {
    return <div className="text-center py-12">Emirate not found</div>;
  }

  return (
    <div>
      <AreaGuidesNewCityPage
        emirateSlug={emirateSlug}
        emirateData={data.emirate}
        areasData={data}
      />
    </div>
  );
}

export default Page;
