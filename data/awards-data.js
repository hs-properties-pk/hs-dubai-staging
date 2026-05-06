import { awardsHistory } from "./awards-history-data";

/** Newest-first, same photos as /awards — for homepage carousel. */
function parseYearSortKey(y) {
  const nums = String(y).match(/\d{4}/g);
  if (!nums?.length) return 0;
  return Math.max(...nums.map(Number));
}

export const homepageAwardsCarousel = [...awardsHistory]
  .sort((a, b) => {
    const yd = parseYearSortKey(b.year) - parseYearSortKey(a.year);
    if (yd !== 0) return yd;
    return b.id - a.id;
  })
  .map((a) => ({
    id: a.id,
    image: a.image,
    year: a.year,
    details: a.name,
    name: a.brand,
  }));

export const awardsData = [
  {
    image: "/awards/emaar-14.png",
    year: "2024",
    details: "Top Sales Award",
    name: "Emaar",
  },
  {
    image: "/awards/OCTA.png",
    year: "2022",
    details: "No. 1 Sales Award 2022",
    name: "OCTA",
  },
  {
    image: "/awards/emaar-1.png",
    year: "2022",
    details: "Outstanding Performance",
    name: "Emaar",
  },
  {
    image: "/awards/tilal.png",
    year: "2022",
    details: "1st Performing Broker Award",
    name: "Tilal Al Ghaf",
  },
  {
    image: "/awards/emaar-2.png",
    year: "2022",
    details: "Q1 Top Alliance Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-3.png",
    year: "2022",
    details: "Q2 Top Alliance Award",
    name: "Emaar",
  },
  {
    image: "/awards/damac.png",
    year: "2022",
    details: "Top Sales Award Half YR",
    name: "Damac",
  },
  {
    image: "/awards/emaar-4.png",
    year: "2021",
    details: "Top Sales Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-5.png",
    year: "2021",
    details: "Q2 No.1 Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-6.png",
    year: "2021",
    details: "Q2 Top Alliance Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-7.png",
    year: "2021",
    details: "Q1 Top Alliance Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-8.png",
    year: "2021",
    details: "Q3 Top Alliance Award",
    name: "Emaar",
  },
  {
    image: "/awards/dubai-prop.png",
    year: "2018",
    details: "Top performing Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/dubai-prop-1.png",
    year: "2017",
    details: "Outstanding Sales Achievement Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/dubai-prop-2.png",
    year: "2016",
    details: "Top Achievement Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/dubai-prop-3.png",
    year: "2016",
    details: "Achievement Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/dubai-prop-4.png",
    year: "2016",
    details: "Q2 Achievement Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/dubai-prop-5.png",
    year: "2016",
    details: "Q3 Achievement Award",
    name: "Dubai Properties",
  },
  {
    image: "/awards/maf.png",
    year: "2021",
    details: "Top Performing Partner Award",
    name: "Tilal Al Ghaf",
  },
  {
    image: "/awards/damac-1.png",
    year: "2021",
    details: "Broker Award",
    name: "damac",
  },
  {
    image: "/awards/damac-2.png",
    year: "2021",
    details: "Q3 Broker Award",
    name: "damac",
  },
  {
    image: "/awards/damac-3.png",
    year: "2020",
    details: "Highest Selling Brokerage Award",
    name: "damac",
  },
  {
    image: "/awards/dubai-land.png",
    year: "2021",
    details: "DLD & RERA Gold Award",
    name: "dubai land",
  },
  {
    image: "/awards/dubai-land-2.png",
    year: "2022",
    details: "DLD & RERA Gold Award",
    name: "dubai land",
  },
  {
    image: "/awards/emaar-9.png",
    year: "2019",
    details: "Annual Broker Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-10.png",
    year: "2019",
    details: "Annual Broker Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-11.png",
    year: "2019",
    details: "Half Yearly Brokers Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-12.png",
    year: "2020",
    details: "Annual Broker Award",
    name: "Emaar",
  },
  {
    image: "/awards/emaar-13.png",
    year: "2024",
    details: "Q3 Broker Award",
    name: "Emaar",
  },
  {
    image: "/awards/meraas.png",
    year: "2019",
    details: "Top Performing Agency Award",
    name: "Meraas",
  },
  // {
  //   image: "/awards/meraas-1.png",
  //   year: "2021",
  //   details: "Q3 Top Alliance Award",
  //   name: "Meraas",
  // },
  {
    image: "/awards/meraas-2.png",
    year: "2021",
    details: "Top Performing Award",
    name: "Meraas",
  },
  {
    image: "/awards/nakheel.png",
    year: "2021",
    details: "the diamond club Award",
    name: "Nakheel",
  },
  {
    image: "/awards/nakheel-1.png",
    year: "2021",
    details: "the diamond club Award",
    name: "Nakheel",
  },
  {
    image: "/awards/nshama.png",
    year: "2020",
    details: "Appreciation Award",
    name: "Nshama",
  },
];
