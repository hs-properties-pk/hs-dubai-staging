#!/usr/bin/env node

/**
 * Area Guides Comparison Script
 * 
 * Compares OLD version (static data in AreaGuideDetailPage.js)
 * with NEW version (API data from /area-guides)
 * 
 * Usage: node scripts/compare-area-guides.js
 */

const oldData = {
  dubai: {
    "jumeirah-village-circle": { faqs: 13, hasContent: true },
    "dubai-studio-city": { faqs: 13, hasContent: true },
    "dubai-land": { faqs: 13, hasContent: true },
    "arjan": { faqs: 13, hasContent: true },
    "damac-lagoons": { faqs: 13, hasContent: true },
    "dubai-creek-harbour": { faqs: 13, hasContent: true },
    "al-rashidiya": { faqs: 10, hasContent: true },
  },
  "abu-dhabi": {
    "al-reem-island": { faqs: 10, hasContent: true },
    "khalifa-city": { faqs: 10, hasContent: true },
    "al-rehhan-abu-dhabi": { faqs: 10, hasContent: true },
    "mohammed-bin-zayed-city": { faqs: 9, hasContent: true },
    "al-jurf-gardens": { faqs: 9, hasContent: true },
    "yas-park-gate": { faqs: 9, hasContent: true },
  },
  ajman: {
    "al-bustan": { faqs: 10, hasContent: true },
    "al-nuaimiya": { faqs: 10, hasContent: true },
    "al-rawda": { faqs: 10, hasContent: true },
    "ajman-downtown": { faqs: 10, hasContent: true },
  },
  "ras-al-khaimah": {
    "al-marjan-island": { faqs: 9, hasContent: true },
    "yasmin-village": { faqs: 10, hasContent: true },
    "dafan-al-nakheel": { faqs: 9, hasContent: true },
    "mina-al-arab": { faqs: 9, hasContent: true },
    "bayti-homes": { faqs: 9, hasContent: true },
    "al-dhait-south": { faqs: 9, hasContent: true },
  },
};

async function fetchNewVersionData() {
  const baseUrl = "http://localhost:3000";
  const newData = {};

  console.log("ðŸ” Fetching NEW version data from API...\n");

  try {
    // First, get all emirates
    console.log("ðŸ“¡ Fetching emirates list...");
    const emiratesRes = await fetch(`${baseUrl}/api/area-guides/emirates`);
    
    if (!emiratesRes.ok) {
      console.error(`âŒ Failed to fetch emirates: ${emiratesRes.status}`);
      return null;
    }

    const emiratesData = await emiratesRes.json();
    const emirates = emiratesData.data || [];

    console.log(`âœ… Found ${emirates.length} emirates\n`);

    // For each emirate, fetch areas
    for (const emirate of emirates) {
      const emirateSlug = emirate.slug;
      console.log(`ðŸ“ Processing emirate: ${emirate.name}`);

      newData[emirateSlug] = {};

      try {
        const areasRes = await fetch(
          `${baseUrl}/api/area-guides/emirates/${emirateSlug}/areas`
        );
        
        if (!areasRes.ok) {
          console.error(`   âŒ Failed to fetch areas for ${emirateSlug}`);
          continue;
        }

        const areasData = areasRes.json();
        const areas = areasData.data || [];

        // For each area, fetch details
        for (const area of areas) {
          const areaSlug = area.slug;
          
          try {
            const detailRes = await fetch(
              `${baseUrl}/api/area-guides/${areaSlug}`
            );
            
            if (!detailRes.ok) {
              console.warn(`   âš ï¸ Failed to fetch ${areaSlug}`);
              newData[emirateSlug][areaSlug] = {
                faqs: 0,
                hasContent: false,
                error: `API returned ${detailRes.status}`,
              };
              continue;
            }

            const detailData = await detailRes.json();
            const areaDetail = detailData.data;

            const faqCount = areaDetail?.faqs?.length || 0;
            const hasContent = !!(areaDetail?.detailed_content || areaDetail?.description);

            newData[emirateSlug][areaSlug] = {
              faqs: faqCount,
              hasContent: hasContent,
              contentLength: hasContent ? (areaDetail.detailed_content || areaDetail.description).length : 0,
            };

            console.log(`   âœ“ ${areaSlug}: ${faqCount} FAQs, Content: ${hasContent ? "âœ“" : "âœ—"}`);
          } catch (err) {
            console.error(`   âŒ Error fetching ${areaSlug}:`, err.message);
            newData[emirateSlug][areaSlug] = { error: err.message };
          }
        }
      } catch (err) {
        console.error(`   âŒ Error fetching areas:`, err.message);
      }

      console.log("");
    }

    return newData;
  } catch (err) {
    console.error("âŒ Fatal error:", err.message);
    return null;
  }
}

async function compareVersions() {
  console.log("=" .repeat(70));
  console.log("  AREA GUIDES COMPARISON: OLD vs NEW");
  console.log("=" .repeat(70));
  console.log("");

  const newData = await fetchNewVersionData();

  if (!newData) {
    console.error("\nâŒ Could not fetch new version data. Is the dev server running?");
    console.error("   Run: npm run dev");
    return;
  }

  console.log("\n" + "=" .repeat(70));
  console.log("  COMPARISON RESULTS");
  console.log("=" .repeat(70) + "\n");

  let totalMatches = 0;
  let totalMismatches = 0;
  let totalMissing = 0;

  for (const emirate of Object.keys(oldData)) {
    console.log(`\nðŸ“Š ${emirate.toUpperCase()}`);
    console.log("-" .repeat(70));

    const oldEmirateData = oldData[emirate];
    const newEmirateData = newData[emirate] || {};

    for (const areaSlug of Object.keys(oldEmirateData)) {
      const oldArea = oldEmirateData[areaSlug];
      const newArea = newEmirateData[areaSlug];

      if (!newArea) {
        console.log(`\nâŒ MISSING in new version: ${areaSlug}`);
        totalMissing++;
        continue;
      }

      if (newArea.error) {
        console.log(`\nâš ï¸  ERROR fetching ${areaSlug}: ${newArea.error}`);
        totalMismatches++;
        continue;
      }

      const faqMatch = oldArea.faqs === newArea.faqs;
      const contentMatch = oldArea.hasContent === newArea.hasContent;

      if (faqMatch && contentMatch) {
        console.log(
          `âœ… ${areaSlug}: FAQs ${newArea.faqs}/${oldArea.faqs}, Content âœ“`
        );
        totalMatches++;
      } else {
        console.log(`\nâš ï¸  ${areaSlug} - MISMATCH:`);
        if (!faqMatch) {
          console.log(`   FAQs: OLD=${oldArea.faqs} vs NEW=${newArea.faqs} âŒ`);
        }
        if (!contentMatch) {
          console.log(`   Content: OLD=âœ“ vs NEW=${newArea.hasContent ? "âœ“" : "âœ—"} âŒ`);
        }
        totalMismatches++;
      }
    }
  }

  // Summary
  console.log("\n" + "=" .repeat(70));
  console.log("  SUMMARY");
  console.log("=" .repeat(70));
  console.log(`\nâœ… Matches: ${totalMatches}`);
  console.log(`âš ï¸  Mismatches: ${totalMismatches}`);
  console.log(`âŒ Missing: ${totalMissing}`);
  console.log(`\nTotal Areas: ${Object.values(oldData).reduce((sum, e) => sum + Object.keys(e).length, 0)}`);

  if (totalMissing === 0 && totalMismatches === 0) {
    console.log("\nðŸŽ‰ ALL CHECKS PASSED! New version matches old version perfectly.");
  } else {
    console.log("\nâš ï¸  There are discrepancies. Review the details above.");
  }

  console.log("");
}

compareVersions();

