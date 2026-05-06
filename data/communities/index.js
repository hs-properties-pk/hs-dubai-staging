import { theOasisData } from "./the-oasis";
import { grandPoloClubData } from "./grand-polo-club";
import { minaRashidData } from "./mina-rashid";
import { dubaiHillsEstateData } from "./dubai-hills-estate";
import { dubaiCreekHarbourData } from "./dubai-creek-harbour";
import { theValleyData } from "./the-valley";
import { palmJebelAliData } from "./palm-jebel-ali";
import { dubaiMaritimeCityData } from "./dubai-maritime-city";
import { dubaiIslandsData } from "./dubai-islands";
import { theHeightsData } from "./the-heights";
import { manchesterCityYasResidencesByOhanaData } from "./manchester-city-yas-residences-by-ohana";
import { sobhaCityAbuDhabiData } from "./sobha-city-abu-dhabi";

const communities = {
  "the-oasis": theOasisData,
  "grand-polo-club": grandPoloClubData,
  "mina-rashid-by-emaar": minaRashidData,
  "dubai-hills-estate": dubaiHillsEstateData,
  "dubai-creek-harbour": dubaiCreekHarbourData,
  "the-valley": theValleyData,
  "palm-jebel-ali": palmJebelAliData,
  "dubai-maritime-city": dubaiMaritimeCityData,
  "dubai-islands": dubaiIslandsData,
  "the-heights": theHeightsData,
  "manchester-city-yas-residences-by-ohana": manchesterCityYasResidencesByOhanaData,
  "sobha-city-abu-dhabi": sobhaCityAbuDhabiData,
};

export function getCommunityBySlug(slug) {
  return communities[slug] || null;
}

export function getAllCommunitySlugs() {
  return Object.keys(communities);
}

export function getAllCommunities() {
  return Object.values(communities);
}
