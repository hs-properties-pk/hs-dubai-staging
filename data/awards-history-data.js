/** Normalize brand to filter tab keys (emaar, nakheel, meraas, dld, damac, other). */
export function getAwardFilterTags(brand) {
  const raw = String(brand).trim();
  const b = raw.toLowerCase();
  const tags = new Set();
  if (/\bemaar\b/i.test(raw)) tags.add("emaar");
  if (b.includes("dubai land")) tags.add("dld");
  if (/\bdamac\b/i.test(raw) || b.includes("damac unity")) tags.add("damac");
  if (b.includes("meraas") && b.includes("nakheel")) {
    tags.add("nakheel");
    tags.add("meraas");
  } else {
    if (b.includes("nakheel")) tags.add("nakheel");
    if (b.includes("meraas")) tags.add("meraas");
  }
  if (tags.size === 0) tags.add("other");
  return [...tags];
}

export const AWARD_FILTER_TABS = [
  { key: "all", label: "All awards" },
  { key: "emaar", label: "Emaar" },
  { key: "nakheel", label: "Nakheel" },
  { key: "meraas", label: "Meraas" },
  { key: "dld", label: "DLD" },
  { key: "damac", label: "DAMAC" },
  { key: "other", label: "Other" },
];

/** Order preserved — images under public/awards/latest/ */
const RAW_AWARDS = [
  { id: 18, file: "DSC09809.png.jpg", name: "No. 1 Company in UAE", year: "2025", brand: "Nakheel" },
  { id: 24, file: "DSC09815.png.jpg", name: "H1 Broker Awards No. 10", year: "2025", brand: "EMAAR" },
  { id: 26, file: "DSC09817.png.jpg", name: "Annual Broker Awards", year: "2025", brand: "EMAAR" },
  { id: 33, file: "DSC09830.png.jpg", name: "Black Onyx - Platinum Award", year: "2025", brand: "Meraas/Nakheel" },
  { id: 34, file: "DSC09831.png.jpg", name: "Black Onyx Awards", year: "2025", brand: "Meraas" },
  { id: 35, file: "DSC09832.png.jpg", name: "Top Sales Company in UAE", year: "2025", brand: "Nakheel" },
  { id: 39, file: "DSC09836.png.jpg", name: "Top 5 Performing Broker Award", year: "Q2 2025", brand: "EMAAR" },
  { id: 42, file: "DSC09840.png.jpg", name: "Horizon Awards Rising Star Channel Partner", year: "2025", brand: "ARDEE" },
  { id: 43, file: "DSC09841.png.jpg", name: "Horizon Awards Rising Star Channel Partner", year: "2025", brand: "ARDEE" },
  { id: 44, file: "DSC09842.png.jpg", name: "Star Performing Broker Award", year: "2025", brand: "Binghatti" },
  { id: 49, file: "DSC09848.png.jpg", name: "Top 13 Performing Broker", year: "Q3 2025", brand: "EMAAR" },
  { id: 51, file: "DSC09850.png.jpg", name: "No. 1 Sales Company in UAE", year: "2025", brand: "Dubai Land Department" },
  { id: 52, file: "DSC09851.png.jpg", name: "Top 15 Performing Broker", year: "Q1 2025", brand: "EMAAR" },
  { id: 60, file: "DSC09862.png.jpg", name: "Platinum Sponsor", year: "2025", brand: "Innovasmilesedu" },
  { id: 67, file: "DSC09875.png.jpg", name: "Best Sales Service in Dubai", year: "2025", brand: "Dubai Land Department" },
  { id: 50, file: "DSC09849.png.jpg", name: "Top 19 Performing Broker", year: "Q4 2024", brand: "EMAAR" },
  { id: 5, file: "DSC09791.png.jpg", name: "Quarterly Awards Top 20 Certificate", year: "2024", brand: "MERAAS" },
  { id: 7, file: "DSC09794.png.jpg", name: "Quarter 2 Broker Awards No. 15", year: "2024", brand: "EMAAR" },
  { id: 11, file: "DSC09800.png.jpg", name: "Quarter 1 Broker Awards No. 12", year: "2024", brand: "EMAAR" },
  { id: 12, file: "DSC09801.png.jpg", name: "Quarter 3 Broker Awards No. 12", year: "2024", brand: "EMAAR" },
  { id: 20, file: "DSC09811.png.jpg", name: "The Black Onyx Awards", year: "2024", brand: "Meraas/Nakheel" },
  { id: 21, file: "DSC09812.png.jpg", name: "Annual Broker Awards", year: "2024", brand: "EMAAR" },
  { id: 27, file: "DSC09818.png.jpg", name: "Envoy Award Q4", year: "2024", brand: "Aldar" },
  { id: 56, file: "DSC09855.png.jpg", name: "No. 11 Performing Broker", year: "2024", brand: "EMAAR" },
  { id: 66, file: "DSC09874.png.jpg", name: "Black Onyx - Platinum Certificate", year: "2024", brand: "Meraas/Nakheel" },
  { id: 10, file: "DSC09797.png.jpg", name: "Quarter 1 Broker Awards No. 20", year: "2023", brand: "EMAAR" },
  { id: 13, file: "DSC09802.png.jpg", name: "Annual Broker Awards", year: "2023", brand: "EMAAR" },
  { id: 17, file: "DSC09808.png.jpg", name: "Quarter 3 Broker Awards No. 4", year: "2023", brand: "EMAAR" },
  { id: 19, file: "DSC09810.png.jpg", name: "The Black Onyx Awards", year: "2023", brand: "Meraas" },
  { id: 22, file: "DSC09813.png.jpg", name: "1st Performing Broker Award", year: "2023", brand: "Tilal Al Ghaf" },
  { id: 23, file: "DSC09814.png.jpg", name: "Annual Broker Awards", year: "2023", brand: "EMAAR" },
  { id: 41, file: "DSC09838.png.jpg", name: "Top Performing Agency", year: "2023", brand: "DARGLOBAL" },
  // { id: 47, file: "DSC09847.png.jpg", name: "Top 12 Performing Broker", year: "2023", brand: "EMAAR" },
  { id: 53, file: "DSC09852.png.jpg", name: "Top 7 Performing Broker", year: "Q2 2023", brand: "EMAAR" },
  { id: 3, file: "DSC09789.png.jpg", name: "DAMAC Broker Awards 16th Place", year: "2022", brand: "DAMAC" },
  { id: 4, file: "DSC09790.png.jpg", name: "DAMAC Broker Awards 16th Place", year: "2022", brand: "DAMAC" },
  { id: 6, file: "DSC09793.png.jpg", name: "Quarter 3 Broker Awards No. 15", year: "2022", brand: "EMAAR" },
  { id: 9, file: "DSC09796.png.jpg", name: "Quarter 2 Broker Awards No. 10", year: "2022", brand: "EMAAR" },
  { id: 25, file: "DSC09816.png.jpg", name: "Annual Broker Awards", year: "2022", brand: "EMAAR" },
  { id: 29, file: "DSC09826.png.jpg", name: "Top Performing Broker Award", year: "2022", brand: "EMAAR" },
  { id: 40, file: "DSC09837.png.jpg", name: "Top 11 Performing Broker Award", year: "Q1 2022", brand: "EMAAR" },
  { id: 45, file: "DSC09843.png.jpg", name: "No. 1 Sales Performance", year: "2022", brand: "OCTA" },
  { id: 68, file: "DSC09877.png.jpg", name: "Outstanding Performance", year: "2022", brand: "EMAAR" },
  { id: 8, file: "DSC09795.png.jpg", name: "ARY Laguna DHA City Annual Awards 2nd Place", year: "2021", brand: "ARY Laguna" },
  { id: 14, file: "DSC09804.png.jpg", name: "Q1 Broker Awards 10th Place", year: "2021", brand: "DAMAC Unity" },
  { id: 15, file: "DSC09806.png.jpg", name: "Broker Awards Q3 11th Place", year: "2021", brand: "DAMAC" },
  { id: 16, file: "DSC09807.png.jpg", name: "Quarter 2 Broker Awards No. 4", year: "2021", brand: "EMAAR" },
  { id: 28, file: "DSC09825.png.jpg", name: "Quarter 1 Broker Awards", year: "2021", brand: "EMAAR" },
  { id: 59, file: "DSC09861.png.jpg", name: "Dubai Main Sponsor", year: "2021", brand: "STAR Pakistan" },
  { id: 61, file: "DSC09864.png.jpg", name: "Top Performing Broker", year: "2021", brand: "EMAAR" },
  { id: 62, file: "DSC09867.png.jpg", name: "No. 1 Top Performing Broker", year: "Q3 2021", brand: "EMAAR" },
  { id: 30, file: "DSC09827.png.jpg", name: "Top Performing Broker Award", year: "2020", brand: "EMAAR" },
  { id: 63, file: "DSC09870.png.jpg", name: "Annual Broker Awards", year: "2020", brand: "EMAAR" },
  { id: 65, file: "DSC09873.png.jpg", name: "No. 3 Highest Selling Brokerage", year: "2020", brand: "DAMAC Unity" },
  { id: 32, file: "DSC09829.png.jpg", name: "Top Performing Broker", year: "Q2 2019", brand: "Meraas" },
  { id: 36, file: "DSC09833.png.jpg", name: "Top Performing Agency", year: "2019", brand: "MERAAS" },
  { id: 48, file: "DSC09846.png.jpg", name: "Agency of the Month", year: "2019", brand: "Bayut" },
  { id: 58, file: "DSC09857.png.jpg", name: "Port de La Mer Launch Appreciation", year: "2018", brand: "MERAAS" },
  { id: 31, file: "DSC09828.png.jpg", name: "Outstanding Sales Achievement", year: "2017", brand: "Dubai Properties" },
  { id: 1, file: "DSC09787.png.jpg", name: "Achievement Award", year: "2016", brand: "DP" },
  { id: 2, file: "DSC09788.png.jpg", name: "Top Achievement Award", year: "2016", brand: "DP" },
];

export const awardsHistory = RAW_AWARDS.map((a) => ({
  id: a.id,
  image: `/awards/latest/${a.file}`,
  name: a.name,
  year: a.year,
  brand: a.brand,
  filterTags: getAwardFilterTags(a.brand),
}));

export function awardShowsNoOneBadge(name) {
  return /\bno\.?\s*1\b/i.test(String(name));
}
