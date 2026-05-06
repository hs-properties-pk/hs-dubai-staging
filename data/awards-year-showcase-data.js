/**
 * Horizontal year showcase — brand chips + “+N more” (2016–2025).
 * Order: newest first (left when LTR scroll).
 */
export const awardsYearShowcase = [
  {
    year: "2025",
    total: 13,
    chips: ["Nakheel", "EMAAR", "EMAAR", "Meraas/Nakheel"],
    moreCount: 9,
  },
  {
    year: "2024",
    total: 10,
    chips: ["EMAAR", "MERAAS", "EMAAR", "EMAAR"],
    moreCount: 6,
  },
  {
    year: "2023",
    total: 9,
    chips: ["EMAAR", "EMAAR", "EMAAR", "Meraas"],
    moreCount: 5,
  },
  {
    year: "2022",
    total: 9,
    chips: ["DAMAC", "EMAAR", "EMAAR", "EMAAR"],
    moreCount: 5,
  },
  {
    year: "2021",
    total: 8,
    chips: ["DAMAC Unity", "DAMAC", "EMAAR", "EMAAR"],
    moreCount: 4,
  },
  {
    year: "2020",
    total: 3,
    chips: ["EMAAR", "EMAAR", "DAMAC Unity"],
    moreCount: 0,
  },
  {
    year: "2019",
    total: 3,
    chips: ["Meraas", "MERAAS", "Bayut"],
    moreCount: 0,
  },
  {
    year: "2018",
    total: 1,
    chips: ["MERAAS"],
    moreCount: 0,
  },
  {
    year: "2017",
    total: 1,
    chips: ["Dubai Properties"],
    moreCount: 0,
  },
  {
    year: "2016",
    total: 2,
    chips: ["DP", "DP"],
    moreCount: 0,
  },
];

export function formatAwardCountLabel(n) {
  const num = Number(n);
  if (num === 1) return "1 award";
  return `${num} awards`;
}
