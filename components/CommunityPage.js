import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import HomeHeroHeading from "./HomeHeroHeading";
import CommunityPageContent from "./pages/CommunityPageContent";
import PremiumPageHero from "./PremiumPageHero";

export default function CommunityPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      {/* <HomeHeroHeading
        image="/Bg-Imgs/community-bg.webp"
        title="Dubai Communities"
      /> */}
      <PremiumPageHero
        image="/Bg-Imgs/community-bg.webp"
        imageAlt="H&S Real Estate community"
        eyebrow="Dubai · 50+ Curated Communities · Expert Guides"
        titleBefore="Find Your Perfect Dubai Community"
        tagline="Your dream community awaits."
        description="Explore Dubai residential communities shaped by leading developers Emaar, DAMAC, Nakheel, Meraas, and Sobha. From beachfront and marina living to green suburbs and golf estates, find the lifestyle and budget that fit your goals. H&S guides you to the right neighbourhood."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Communities", href: null },
        ]}
        stats={[
          { value: "10+", label: "Communities" },
          { value: "6–10%", label: "Avg Rental Yield" },
          { value: "AED 600K", label: "Starting From" },
          { value: "100%", label: "Freehold Areas" },
        ]}
      />
     
      <CommunityPageContent />
      <Footer />
    </div >
  );
}
