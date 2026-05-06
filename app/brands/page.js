import BrandsPage from "@/components/pages/BrandsPage";
import { getBrandsIndex } from "@/lib/brands";
import { getBrandLogoSrc } from "@/data/brand-profiles";
import { getBrandsList } from "@/lib/fetchBrandsData";

export const metadata = {
  title: "Dubai property developers & brands | Off-plan projects | H&S Real Estate",
  description:
    "Browse Dubai property developers — off-plan project counts plus community guides from our /communities data. Search, enquire, or open each brand's projects and community pages.",
  alternates: {
    canonical: "https://hsproperty.ae/brands",
  },
  openGraph: {
    title: "Dubai property developers & brands | Off-plan projects | H&S Real Estate",
    description:
      "Browse Dubai property developers — off-plan project counts plus community guides from our /communities data. Search, enquire, or open each brand's projects and community pages.",
    url: "https://hsproperty.ae/brands",
  },
};

export default async function Page() {
  let brands = [];

  const apiData = await getBrandsList();
  if (apiData?.data?.length) {
    brands = apiData.data.map((b) => ({
      ...b,
      logoSrc: getBrandLogoSrc(b.slug),
    }));
  } else {
    // Fallback to local static data
    brands = getBrandsIndex().map((b) => ({
      ...b,
      logoSrc: getBrandLogoSrc(b.slug),
    }));
  }

  return <BrandsPage brands={brands} />;
}